const express = require("express");
const { registerForWebinar } = require("../controllers/webinarController");
const { protect } = require("../middleware/authMiddleware");
const {
  validateWebinarRegistration,
} = require("../middleware/validateWebinar");

const router = express.Router();

/**
 * @swagger
 * /webinar/register:
 *   post:
 *     summary: Register for the webinar
 *     description: Allows logged-in users to register for the webinar.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - profession
 *               - lastCollegeLevel
 *               - lastCollegeName
 *               - email
 *               - mobileNumber
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the participant
 *               profession:
 *                 type: string
 *                 enum: [Student, Working Professional]
 *               yearsOfExperience:
 *                 type: number
 *                 description: Required for Working Professionals, must be non-negative
 *               lastCollegeLevel:
 *                 type: string
 *                 enum: [UG, PG]
 *               lastCollegeName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               mobileNumber:
 *                 type: string
 *                 description: Must be in +91XXXXXXXXXX format
 *               questionForSpeaker:
 *                 type: string
 *                 description: Optional question for the speaker
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Validation error or duplicate registration
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  protect,
  validateWebinarRegistration,
  registerForWebinar
);

module.exports = router;
