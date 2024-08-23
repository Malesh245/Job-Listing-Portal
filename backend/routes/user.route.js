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
  updatePassword,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { isAdmin } from "../auth/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import passport from "passport";
import { getSiteStatistics } from "../controllers/statistics.controller.js";
import {
  getAllJobs,
  updateJob,
  deleteJob,
  approveJob,
  rejectJob,
} from "../controllers/job.controller.js";

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
router.route("/update/password").put(isAuthenticated, updatePassword);

// User Management
router.route("/users").get(isAuthenticated, isAdmin, getAllUsers);
router.route("/users/:id").put(isAuthenticated, isAdmin, updateUser);
router.route("/users/:id").delete(isAuthenticated, isAdmin, deleteUser);

// Job Management
router.route("/jobs").get(isAuthenticated, isAdmin, getAllJobs);
router.route("/jobs/:id").put(isAuthenticated, isAdmin, updateJob);
router.route("/jobs/:id").delete(isAuthenticated, isAdmin, deleteJob);
router.route("/jobs/:id/approve").put(isAuthenticated, isAdmin, approveJob);
router.route("/jobs/:id/reject").put(isAuthenticated, isAdmin, rejectJob);

// Site Statistics
router.route("/statistics").get(isAuthenticated, isAdmin, getSiteStatistics);

// super admin login

router.route("/login-superadmin").post(login);

// Social auth routes
// Google Auth
router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/register" }),
    (req, res) => {
      const role = req.user.role;

      if (role === "recruiter") {
        res.redirect(`${process.env.FRONTEND_URL}/admin/companies`);
      } else if (role === "student") {
        res.redirect(`${process.env.FRONTEND_URL}/`);
      }
    }
  );

// GitHub Auth
router.route("/auth/github").get(
  passport.authenticate(
    "github",
    (req, res, next) => {
      req.session.role = req.query.role; // Store role in session
      next();
    },
    passport.authenticate("github", { scope: ["user:email"] })
  )
);
router
  .route("/auth/github/callback")
  .get(
    passport.authenticate("github", { failureRedirect: "/register" }),
    (req, res) => {
      const role = req.user.role;

      if (role === "recruiter") {
        res.redirect(`${process.env.FRONTEND_URL}/admin/companies`);
      } else if (role === "student") {
        res.redirect(`${process.env.FRONTEND_URL}/`);
      }
    }
  );

export default router;
