const Joi = require("joi");

const memberSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
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
  profession: Joi.string().valid("Student", "Working Professional").required(),
  city: Joi.string().trim().min(3).max(100).required(),
  state: Joi.string().trim().length(2).required(),
  pincode: Joi.string()
    .trim()
    .length(6)
    .required()
    .pattern(/^\d{6}$/),

  collegeName: Joi.alternatives().conditional("profession", {
    is: "Student",
    then: Joi.string().trim().max(100).required(),
    otherwise: Joi.forbidden(),
  }),
  collegeLocation: Joi.alternatives().conditional("profession", {
    is: "Student",
    then: Joi.string().trim().max(100).required(),
    otherwise: Joi.forbidden(),
  }),

  companyName: Joi.alternatives().conditional("profession", {
    is: "Working Professional",
    then: Joi.string().trim().max(100).required(),
    otherwise: Joi.forbidden(),
  }),
  companyLocation: Joi.alternatives().conditional("profession", {
    is: "Working Professional",
    then: Joi.string().trim().max(100).required(),
    otherwise: Joi.forbidden(),
  }),
});

const ventureClashSchema = Joi.object({
  teamName: Joi.string().trim().min(3).max(100).required(),
  canTravel: Joi.bool().required(),
  member1: memberSchema.required(),
  member2: memberSchema.required(),
  member3: memberSchema,
  member4: memberSchema,
});

module.exports = ventureClashSchema;
