const express = require("express");
const { registerForWorkshop } = require("../controllers/workshopController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", protect, registerForWorkshop);

module.exports = router;
