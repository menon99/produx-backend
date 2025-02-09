const WorkshopRegistration = require("../models/WorkshopRegistration");
const Student = require("../models/Student");

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
  const userId = req.user;
  try {
    let student = await Student.findOne({ registrationNumber });

    // If the student already exists, check for existing registration
    if (student) {
      const existingRegistration = await WorkshopRegistration.findOne({
        student: student._id,
        workshopType,
      });
      if (existingRegistration) {
        return res.status(400).json({
          code: "USER_ALREADY_REGISTERED",
          message: "You are already registered for this workshop.",
        });
      }
    } else {
      // If student doesn't exist, create a new entry
      student = new Student({
        name,
        registrationNumber,
        officialMail,
        mobileNumber,
      });

      await student.save();
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

    // Create a new Workshop Registration with a reference to the student
    const newRegistration = new WorkshopRegistration({
      student: student._id,
      user: userId,
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

const getRegistrationStatus = async (req, res) => {
  const userId = req.user;

  try {
    // Check if the user is registered for Google Analytics workshop
    const googleAnalyticsRegistration = await WorkshopRegistration.findOne({
      user: userId,
      workshopType: "google_analytics",
    });

    // Check if the user is registered for Figma workshop
    const figmaRegistration = await WorkshopRegistration.findOne({
      user: userId,
      workshopType: "figma",
    });

    return res.json({
      code: "REGISTRATION_STATUS",
      message: "Workshop registration status retrieved successfully",
      data: {
        google_analytics: !!googleAnalyticsRegistration,
        figma: !!figmaRegistration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error fetching registration status",
      error: error.message,
    });
  }
};

module.exports = { registerForWorkshop, getSeatsLeft, getRegistrationStatus };
