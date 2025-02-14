const QuizRegistration = require("../models/QuizRegistration");

const registerQuizTeam = async (req, res) => {
  const {
    teamName,
    leaderName,
    leaderRegistrationNumber,
    leaderOfficialMail,
    member2Name,
    member3Name,
    member4Name,
  } = req.body;

  try {
    // Check if the team name is already taken
    const existingTeam = await QuizRegistration.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({
        code: "TEAM_NAME_TAKEN",
        message: "This team name is already in use. Please choose another.",
      });
    }

    // Register the new team
    const newTeam = new QuizRegistration({
      leaderName,
      leaderRegistrationNumber,
      leaderOfficialMail,
      member2Name,
      member3Name,
      member4Name,
      teamName,
    });

    await newTeam.save();

    return res.status(201).json({
      code: "REGISTRATION_SUCCESS",
      message: "Team successfully registered for the Quiz!",
    });
  } catch (error) {
    console.log(req.body);
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerQuizTeam };
