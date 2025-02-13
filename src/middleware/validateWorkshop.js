const workshopSchema = require("../validation/Schemas/Workshop");

const errorCodes = {
  "string.empty": "FIELD_REQUIRED",
  "string.pattern.base": "INVALID_MOBILE_FORMAT",
  "string.email": "INVALID_EMAIL_FORMAT",
  "string.min": "FIELD_TOO_SHORT",
  "string.max": "FIELD_TOO_LONG",
  "any.only": "INVALID_VALUE",
};

const validateWorkshopRegistration = (req, res, next) => {
  const { error } = workshopSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      code: "VALIDATION_FAILED",
      message: `Validation error: ${err.message}`,
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
        code: errorCodes[err.type] || "UNKNOWN_VALIDATION_ERROR",
      })),
    });
  }

  next();
};

module.exports = { validateWorkshopRegistration };
