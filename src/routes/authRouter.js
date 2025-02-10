const express = require("express");
const { signup, login, refreshToken } = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validateAuth");

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/signup", validateSignup, signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates the user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", validateLogin, login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Generate a new access token from an expired token
 *     description: Verifies the expired token and issues a new valid access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expiredToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New token generated successfully
 *       400:
 *         description: Token is required
 *       401:
 *         description: Invalid or tampered token
 *       404:
 *         description: User not found
 */
router.post("/refresh", refreshToken);

module.exports = router;
