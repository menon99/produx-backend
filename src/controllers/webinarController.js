const WebinarRegistration = require("../models/WebinarRegistration");

const registerForWebinar = async (req, res) => {
  const {
    fullName,
    profession,
    yearsOfExperience,
    lastCollegeLevel,
    lastCollegeName,
    email,
    mobileNumber,
    questionForSpeaker,
  } = req.body;

  try {
    // Check if the user has already registered using the same email
    const existingRegistration = await WebinarRegistration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        code: "ALREADY_REGISTERED",
        message: "You have already registered for the webinar with this email.",
      });
    }

    // Create a new webinar registration
    const newRegistration = new WebinarRegistration({
      fullName,
      profession,
      yearsOfExperience,
      lastCollegeLevel,
      lastCollegeName,
      email,
      mobileNumber,
      questionForSpeaker,
    });

    await newRegistration.save();

    return res.status(201).json({
      code: "REGISTRATION_SUCCESS",
      message: "Successfully registered for the webinar!",
    });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerForWebinar };
