const User = require("../models/user");

// Local signup logic
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, gender, phoneNumber, dateOfBirth, termsAccepted } = req.body;

  try {
    // Validate input
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Hash password in the User model pre-save middleware
      gender,
      phoneNumber,
      dateOfBirth,
      termsAccepted,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// Local login logic (if needed)
exports.login = (req, res) => {
  res.send("Local login logic (if implemented)");
};

// Google login success callback
exports.googleCallback = (req, res) => {
  // Redirect or send user info after Google authentication
  res.status(200).json({
    message: "Google login successful.",
    user: req.user, // Passport will attach the user object
  });
};

// Apple login success callback
exports.appleCallback = (req, res) => {
  // Redirect or send user info after Apple authentication
  res.status(200).json({
    message: "Apple login successful.",
    user: req.user, // Passport will attach the user object
  });
};

// Logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.status(200).json({ message: "Logged out successfully." });
  });
};
