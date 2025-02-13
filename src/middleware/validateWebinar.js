const webinarSchema = require("../validation/Schemas/Webinar");

const validateWebinarRegistration = (req, res, next) => {
  const { error } = webinarSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: `Validation error: ${err.message}`,
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = { validateWebinarRegistration };
