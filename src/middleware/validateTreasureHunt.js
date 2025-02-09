const treasureHuntSchema = require("../validation/Schemas/TreasureHunt");

const validateTreasureHuntRegistration = (req, res, next) => {
  const { error } = treasureHuntSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Invalid request data",
      errors: error.details.map((err) => err.message),
    });
  }

  // Ensure unique emails among team members
  const emails = [
    req.body.leader.officialMail,
    req.body.member2.officialMail,
    req.body.member3.officialMail,
  ];
  if (new Set(emails).size !== emails.length) {
    return res.status(400).json({
      code: "DUPLICATE_EMAIL",
      message: "Each team member must have a unique email address.",
    });
  }

  next();
};

module.exports = { validateTreasureHuntRegistration };
