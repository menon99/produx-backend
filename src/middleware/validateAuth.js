const Joi = require("joi");

// Signup Schema
const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().min(8).max(30).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 30 characters",
  }),
});

// Login Schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Error Codes Mapping
const errorCodes = {
  "string.empty": "FIELD_REQUIRED",
  "string.email": "INVALID_EMAIL_FORMAT",
  "string.min": "FIELD_TOO_SHORT",
  "string.max": "FIELD_TOO_LONG",
};

// Middleware Function for Signup Validation
const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body, { abortEarly: false });

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
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

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
