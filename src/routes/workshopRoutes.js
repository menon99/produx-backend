const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  validateWorkshopRegistration,
} = require("../middleware/validateWorkshop");
const {
  registerForWorkshop,
  getSeatsLeft,
  getRegistrationStatus,
} = require("../controllers/workshopController");

const router = express.Router();

/**
 * @swagger
 * /workshop/register:
 *   post:
 *     summary: Register for a workshop
 *     description: Registers a user for a selected workshop.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - registrationNumber
 *               - officialMail
 *               - mobileNumber
 *               - priorExperience
 *               - workshopType
 *             properties:
 *               name:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               officialMail:
 *                 type: string
 *                 format: email
 *               mobileNumber:
 *                 type: string
 *                 example: "+919876543210"
 *               priorExperience:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced, Refresher]
 *               workshopType:
 *                 type: string
 *                 enum: [google_analytics, figma]
 *     responses:
 *       201:
 *         description: Successfully registered for the workshop
 *       400:
 *         description: Validation error or no seats available
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  protect,
  validateWorkshopRegistration,
  registerForWorkshop
);

/**
 * @swagger
 * /workshop/seats:
 *   get:
 *     summary: Get available seats
 *     description: Returns the number of remaining seats for each workshop.
 *     responses:
 *       200:
 *         description: Returns the available seats for each workshop
 *       500:
 *         description: Internal server error
 */
router.get("/seats", getSeatsLeft);

/**
 * @swagger
 * /workshop/status:
 *   get:
 *     summary: Get registration status
 *     description: Returns whether the user is registered for each workshop.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the registration status of the logged-in user
 *       500:
 *         description: Internal server error
 */
router.get("/status", protect, getRegistrationStatus);

module.exports = router;
