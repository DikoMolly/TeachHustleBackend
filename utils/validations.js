const { body } = require("express-validator");

const validateSignup = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string."),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("confirmPassword")
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other."),
  body("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number."),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Please provide a valid date of birth."),
  body("termsAccepted")
    .optional()
    .isBoolean()
    .withMessage("Terms accepted must be true or false."),
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("password")
    .exists()
    .withMessage("Password is required."),
];

module.exports = {
  validateSignup,
  validateLogin,
};
