const Joi = require("joi");

const workshopSchema = Joi.object({
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
      message: "Validation error",
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
