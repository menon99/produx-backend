const Joi = require("joi");
const studentSchema = require("./Student");

const treasureHuntSchema = Joi.object({
  teamName: Joi.string().trim().required(),
  leader: studentSchema,
  member2: studentSchema,
  member3: studentSchema,
});

module.exports = treasureHuntSchema;
