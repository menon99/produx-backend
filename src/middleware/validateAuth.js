const userSchema = require("../validation/Schemas/User");

// Error Codes Mapping
const errorCodes = {
  "string.empty": "FIELD_REQUIRED",
  "string.email": "INVALID_EMAIL_FORMAT",
  "string.min": "FIELD_TOO_SHORT",
  "string.max": "FIELD_TOO_LONG",
};

// Middleware Function for Signup Validation
const validateSignup = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_FAILED",
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
        code: errorCodes[err.type] || "UNKNOWN_VALIDATION_ERROR",
      })),
    });
  }

  next();
};

// Middleware Function for Login Validation
const validateLogin = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_FAILED",
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
        code: errorCodes[err.type] || "UNKNOWN_VALIDATION_ERROR",
      })),
    });
  }

  next();
};

module.exports = { validateSignup, validateLogin };
