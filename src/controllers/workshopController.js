const WorkshopRegistration = require("../models/WorkshopRegistration");

const SEAT_LIMITS = {
  google_analytics: 50,
  figma: 50,
};

const registerForWorkshop = async (req, res) => {
  const {
    name,
    registrationNumber,
    officialMail,
    mobileNumber,
    priorExperience,
    workshopType,
  } = req.body;
  const userId = req.user; // Retrieved from JWT middleware

  try {
    // Check if the user is already registered
    const existingRegistration = await WorkshopRegistration.findOne({
      user: userId,
      workshopType,
    });
    if (existingRegistration) {
      return res.status(400).json({
        code: "USER_ALREADY_REGISTERED",
        message: "You are already registered for this workshop.",
      });
    }

    // Check if seats are available
    const currentRegistrations = await WorkshopRegistration.countDocuments({
      workshopType,
    });

    if (currentRegistrations >= SEAT_LIMITS[workshopType]) {
      return res.status(400).json({
        code: "SEATS_FULL",
        message: "No seats available for this workshop.",
      });
    }

    // Create a new registration
    const newRegistration = new WorkshopRegistration({
      user: userId,
      name,
      registrationNumber,
      officialMail,
      mobileNumber,
      priorExperience,
      workshopType,
    });

    await newRegistration.save();
    return res.status(201).json({
      code: "REGISTRATION_SUCCESS",
      message: "Successfully registered for the workshop!",
    });
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerForWorkshop };
