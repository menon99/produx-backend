const quizSchema = require("../validation/Schemas/Quiz");

const validateQuizRegistration = (req, res, next) => {
  const { error } = quizSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Invalid request data",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { validateQuizRegistration };
