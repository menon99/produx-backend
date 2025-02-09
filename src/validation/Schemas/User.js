const Joi = require("joi");

const userSchema = Joi.object({
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

module.exports = userSchema;
