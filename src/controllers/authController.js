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
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    console.log("User Registered");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Invalid Creds");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    console.log("Logged in successfully!");

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
