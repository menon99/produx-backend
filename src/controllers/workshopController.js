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

const getSeatsLeft = async (req, res) => {
  try {
    // Count the number of registrations for each workshop
    const googleAnalyticsCount = await WorkshopRegistration.countDocuments({
      workshopType: "google_analytics",
    });
    const figmaCount = await WorkshopRegistration.countDocuments({
      workshopType: "figma",
    });

    // Calculate the remaining seats
    const googleAnalyticsSeatsLeft =
      SEAT_LIMITS.google_analytics - googleAnalyticsCount;
    const figmaSeatsLeft = SEAT_LIMITS.figma - figmaCount;

    // Return the response with the seats left
    res.json({
      code: "SEATS_STATUS",
      message: "Number of seats left for each workshop",
      data: {
        google_analytics: googleAnalyticsSeatsLeft,
        figma: figmaSeatsLeft,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error fetching seat availability",
      error: error.message,
    });
  }
};

module.exports = { registerForWorkshop, getSeatsLeft };
