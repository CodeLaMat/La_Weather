const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const authController = require("../controllers/authController");

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many password reset attempts from this IP, please try again after 15 minutes.",
});

// Register Route
router.post("/register", authController.register);

// Login Route
router.post("/login", authController.login);

// Logout Route
router.post("/logout", authController.logout);

// Request Password Reset Route
router.post(
  "/request-password-reset",
  resetPasswordLimiter,
  authController.requestPasswordReset
);

// Reset Password Route
router.post("/reset-password", authController.resetPassword);

// Create Google User Route (New)
router.post("/create-google-user", authController.createGoogleUser);

module.exports = router;
