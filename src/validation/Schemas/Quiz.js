const Joi = require("joi");

const quizSchema = Joi.object({
  teamName: Joi.string().trim().min(2).max(100).required(),
  leaderName: Joi.string().trim().min(2).max(100).required(),
  leaderRegistrationNumber: Joi.string()
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
  leaderOfficialMail: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@iimshillong\.ac\.in$/)
    .required()
    .messages({
      "string.pattern.base": "Email must belong to iimshillong.ac.in domain",
      "string.empty": "Email is required",
    }),
  member2Name: Joi.string().trim().min(2).max(100).required(),
  member3Name: Joi.string().trim().min(2).max(100),
  member4Name: Joi.string().trim().min(2).max(100),
});

module.exports = quizSchema;
