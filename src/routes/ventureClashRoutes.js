const express = require("express");
const {
  registerVentureClash,
} = require("../controllers/ventureClashController");
const {
  validateVentureClashRegistration,
} = require("../middleware/validateVentureClash");

const router = express.Router();

/**
 * @swagger
 * /api/registerVentureClash:
 *   post:
 *     summary: Register a team for Venture Clash
 *     description: Registers a team for the Venture Clash event, ensuring no member has already registered with another team.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamName
 *               - canTravel
 *               - member1
 *               - member2
 *             properties:
 *               teamName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               canTravel:
 *                 type: boolean
 *               member1:
 *                 type: object
 *                 $ref: '#/components/schemas/Member'
 *               member2:
 *                 type: object
 *                 $ref: '#/components/schemas/Member'
 *               member3:
 *                 type: object
 *                 nullable: true
 *                 $ref: '#/components/schemas/Member'
 *               member4:
 *                 type: object
 *                 nullable: true
 *                 $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Team registered successfully
 *       400:
 *         description: Validation error or duplicate registration detected
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - mobileNumber
 *         - profession
 *         - city
 *         - state
 *         - pincode
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *         mobileNumber:
 *           type: string
 *           pattern: '^\+91\d{10}$'
 *         profession:
 *           type: string
 *           enum: ["Student", "Working Professional"]
 *         city:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         state:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *         pincode:
 *           type: string
 *           pattern: '^\d{6}$'
 */
router.post(
  "/registerVentureClash",
  validateVentureClashRegistration,
  registerVentureClash
);

module.exports = router;
