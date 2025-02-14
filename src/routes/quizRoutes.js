const express = require("express");
const { registerQuizTeam } = require("../controllers/quizController");
const { validateQuizRegistration } = require("../middleware/validateQuiz");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /quiz/register:
 *   post:
 *     summary: Register a team for the Quiz
 *     description: Registers a team with a leader and two members.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamName
 *               - leader
 *               - member2
 *               - member3
 *             properties:
 *               teamName:
 *                 type: string
 *                 description: Unique team name
 *               leader:
 *                 type: object
 *                 description: Details of the team leader
 *                 properties:
 *                   name:
 *                     type: string
 *                   registrationNumber:
 *                     type: string
 *                   officialMail:
 *                     type: string
 *                     format: email
 *                   mobileNumber:
 *                     type: string
 *                     example: "+919876543210"
 *               member2:
 *                 type: object
 *                 description: Details of the second team member
 *                 properties:
 *                   name:
 *                     type: string
 *                   registrationNumber:
 *                     type: string
 *                   officialMail:
 *                     type: string
 *                     format: email
 *                   mobileNumber:
 *                     type: string
 *                     example: "+919876543211"
 *               member3:
 *                 type: object
 *                 description: Details of the third team member
 *                 properties:
 *                   name:
 *                     type: string
 *                   registrationNumber:
 *                     type: string
 *                   officialMail:
 *                     type: string
 *                     format: email
 *                   mobileNumber:
 *                     type: string
 *                     example: "+919876543212"
 *     responses:
 *       201:
 *         description: Team successfully registered
 *       400:
 *         description: Validation error (e.g., duplicate team members, already in another team, team name taken)
 *       500:
 *         description: Internal server error
 */
router.post("/register", protect, validateQuizRegistration, registerQuizTeam);

module.exports = router;
