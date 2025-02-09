const Joi = require("joi");
const studentSchema = require("./Student");

const workshopSchema = Joi.object({
  student: studentSchema,
  priorExperience: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced", "Refresher")
    .required()
    .messages({
      "any.only":
        "Prior Experience must be one of: Beginner, Intermediate, Advanced, Refresher",
    }),
  workshopType: Joi.string()
    .valid("google_analytics", "figma")
    .required()
    .messages({
      "any.only": "Workshop Type must be either google_analytics or figma",
    }),
});

module.exports = workshopSchema;
