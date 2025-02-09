const express = require("express");
const {
  registerTreasureHuntTeam,
} = require("../controllers/treasureHuntController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /treasurehunt/register:
 *   post:
 *     summary: Register a team for the Treasure Hunt
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
router.post("/register", protect, registerTreasureHuntTeam);

module.exports = router;
