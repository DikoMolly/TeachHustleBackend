const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Not required for Google/Apple logins
    googleId: { type: String, unique: true, sparse: true }, // For Google login
    appleId: { type: String, unique: true, sparse: true }, // For Apple login
    gender: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    termsAccepted: { type: Boolean, required: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
