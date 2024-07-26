import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import passport from "passport";

const router = express.Router();

// Register and login routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/resend-verification-code").post(resendVerificationCode);

// Social auth routes
router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
  );

router
  .route("/auth/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));
router
  .route("/auth/github/callback")
  .get(
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
  );

export default router;
