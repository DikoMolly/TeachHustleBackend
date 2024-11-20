const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../utils/validations"); // Import validation rules
const { validationResult } = require("express-validator"); // To handle validation errors

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Local signup route
router.post("/signup", validateSignup, handleValidationErrors, authController.signup);

// Local login route (if implemented)
router.post("/login", validateLogin, handleValidationErrors, authController.login);

// Google authentication routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.googleCallback
);

// Apple authentication routes
router.get(
  "/apple",
  passport.authenticate("apple", { scope: ["name", "email"] })
);
router.post(
  "/apple/callback",
  passport.authenticate("apple", { failureRedirect: "/" }),
  authController.appleCallback
);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
