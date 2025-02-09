const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
  }),

  registrationNumber: Joi.string()
    .alphanum()
    .min(5)
    .max(15)
    .required()
    .messages({
      "string.empty": "Registration Number is required",
      "string.alphanum":
        "Registration Number must contain only letters and numbers",
      "string.min": "Registration Number must be at least 5 characters",
      "string.max": "Registration Number must be at most 15 characters",
    }),

  officialMail: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@iimshillong\.ac\.in$/)
    .required()
    .messages({
      "string.pattern.base": "Email must belong to iimshillong.ac.in domain",
      "string.empty": "Email is required",
    }),

  mobileNumber: Joi.string()
    .pattern(/^\+91[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be in format +91XXXXXXXXXX",
      "string.empty": "Mobile number is required",
    }),
});

module.exports = studentSchema;
