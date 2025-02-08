const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  validateWorkshopRegistration,
} = require("../middleware/validateWorkshop");
const { registerForWorkshop } = require("../controllers/workshopController");

const router = express.Router();

router.post(
  "/register",
  protect,
  validateWorkshopRegistration,
  registerForWorkshop
);

module.exports = router;
