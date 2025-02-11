const Joi = require("joi");

const webinarSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  profession: Joi.string().valid("Student", "Working Professional").required(),
  yearsOfExperience: Joi.number().min(0).max(100).optional().required(),
  lastCollegeLevel: Joi.string().valid("UG", "PG").required(),
  lastCollegeName: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid email address." }),
  mobileNumber: Joi.string()
    .trim()
    .pattern(/^\+91\d{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid WhatsApp number format. Use +91XXXXXXXXXX.",
    }),
  questionForSpeaker: Joi.string().trim().min(0).max(150).allow(null, ""),
});

module.exports = webinarSchema;
