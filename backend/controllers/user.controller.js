import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/email.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendtoken.js";

// Register user with email verification
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let user = await User.findOne({ email });
    if (user) {
      if (!user.isVerified) {
        // send verification code
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString(); // Ensuring it's a string

        user.verificationCode = verificationCode;
        await user.save();

        await sendEmail(
          email,
          "Verify Email",
          `Please verify your email by copying the code and pasting it: ${verificationCode}`
        );

        return res.status(400).json({
          message:
            "User already exists but not verified. Verification code resent.",
          success: false,
        });
      } else {
        return res.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Ensuring it's a string
    user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
      verificationCode, // Save the code
      isVerified: false,
    });

    await sendEmail(
      email,
      "Verify Email",
      `Please verify your email by copying the code and pasting it: ${verificationCode}`
    );

    return res.status(201).json({
      message: "Account created successfully. Please verify your email.",
      success: true,
    });
  } catch (error) {
    console.log("Error during registration:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Verify Email Function
export const verifyEmail = async (req, res) => {
  try {
    const code = req.body.code.trim(); // Ensure we're getting the code from the body
    console.log("Request body:", req.body);
    console.log("Received code:", code);
    console.log("Type of received code:", typeof code);

    const user = await User.findOne({ verificationCode: code }); // Query using string if code is a string
    console.log("User found:", user); // Log the user found in the database

    if (!user) {
      return res.status(400).json({ message: "Invalid code", success: false });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    console.log("User updated:", user); // Log the updated user

    return res
      .status(200)
      .json({ message: "Email verified successfully", success: true });
  } catch (error) {
    console.log("Error during verification:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Resend Verification Code
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate a random 6-digit code
    user.verificationCode = verificationCode;
    await user.save();

    const message = `Your verification code is ${verificationCode}`;
    await sendEmail(user.email, "Email Verification Code", message);

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    user.resetPasswordToken = resetToken;
    await user.save();

    await sendEmail(
      email,
      "Reset Password",
      `Please reset your password by clicking on the following link: ${resetLink}`
    );

    return res.status(200).json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "Email not verified. Please check your email for the verification code.",
        success: false,
      });
    }

    // Check if the role is correct
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const skillsArray = skills.split(",");
    const userId = req.id; // Assume req.id contains the user's ID

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Updating the profile
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Update the resume URL and original file name
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    // Prepare the user data to send in the response
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
// Upadte password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("New password & confirm password do not match.", 400)
      );
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res, "Password updated successfully.");
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
