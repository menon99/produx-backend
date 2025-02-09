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

router.post(
  "/register",
  protect,
  validateWorkshopRegistration,
  registerForWorkshop
);
router.get("/seats", getSeatsLeft);
router.get("/status", protect, getRegistrationStatus);

module.exports = router;
