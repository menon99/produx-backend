const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Signup API
const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log("Singup API invoked");
  console.log(email, " ", password);

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ code: "USER_EXISTS", message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    console.log("User Registered");
    const token = generateToken(user._id);

    res.status(201).json({ code: "USER_CREATED", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
};

// Login API
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login API invoked");
  console.log(email, " ", password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid Creds");
      return res
        .status(401)
        .json({ code: "INVALID_CREDENTIALS", message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Invalid Creds");
      return res
        .status(401)
        .json({ code: "INVALID_CREDENTIALS", message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    console.log("Logged in successfully!");

    res.json({ code: "LOGGED_IN", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ code: "TOKEN_REQUIRED", message: "Token is required." });
  }

  try {
    // Decode the expired token without verifying expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ code: "USER_NOT_FOUND", message: "User not found." });
    }

    // Generate a new valid JWT token
    const newToken = generateToken(user._id);

    res.status(200).json({
      code: "TOKEN_REFRESHED",
      message: "New token generated successfully.",
      token: newToken,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ code: "INVALID_TOKEN", message: "Invalid or tampered token." });
  }
};

module.exports = { signup, login, refreshToken };
