const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@iimshillong\.ac\.in$/)
    .required()
    .messages({
      "string.pattern.base": "Email must belong to iimshillong.ac.in domain",
      "string.empty": "Email is required",
    }),

  password: Joi.string().min(8).max(30).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 30 characters",
  }),
});

module.exports = userSchema;
