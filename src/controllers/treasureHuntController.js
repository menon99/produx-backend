const TreasureHuntRegistration = require("../models/TreasureHuntRegistration");
const Student = require("../models/Student");

const registerTreasureHuntTeam = async (req, res) => {
  const { teamName, leader, member2, member3 } = req.body;

  try {
    // Check if the team name is already taken
    const existingTeam = await TreasureHuntRegistration.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({
        code: "TEAM_NAME_TAKEN",
        message: "This team name is already in use. Please choose another.",
      });
    }

    // Fetch or Create Student Entries
    const findOrCreateStudent = async (studentData) => {
      let student = await Student.findOne({
        officialMail: studentData.registrationNumber,
      });

      // If student exists, check if they are already in a Treasure Hunt team
      if (student) {
        const alreadyRegistered = await TreasureHuntRegistration.findOne({
          $or: [
            { leader: student._id },
            { member2: student._id },
            { member3: student._id },
          ],
        });

        if (alreadyRegistered) {
          throw new Error(
            `STUDENT_ALREADY_REGISTERED: ${studentData.officialMail}`
          );
        }
      } else {
        // Create new student entry
        student = new Student({
          name: studentData.name,
          registrationNumber: studentData.registrationNumber,
          officialMail: studentData.officialMail,
          mobileNumber: studentData.mobileNumber,
        });

        await student.save();
      }

      return student;
    };

    let leaderStudent, member2Student, member3Student;

    try {
      leaderStudent = await findOrCreateStudent(leader);
      member2Student = await findOrCreateStudent(member2);
      member3Student = await findOrCreateStudent(member3);
    } catch (error) {
      if (error.message.startsWith("STUDENT_ALREADY_REGISTERED")) {
        return res.status(400).json({
          code: "ALREADY_IN_TEAM",
          message: `Student with email ${
            error.message.split(": ")[1]
          } is already registered in another team.`,
        });
      }
      throw error;
    }

    // Register the new team
    const newTeam = new TreasureHuntRegistration({
      leader: leaderStudent._id,
      member2: member2Student._id,
      member3: member3Student._id,
      teamName,
    });

    await newTeam.save();

    return res.status(201).json({
      code: "REGISTRATION_SUCCESS",
      message: "Team successfully registered for the Treasure Hunt!",
    });
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerTreasureHuntTeam };
