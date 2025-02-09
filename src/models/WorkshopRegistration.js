const mongoose = require("mongoose");

const WorkshopRegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  priorExperience: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Refresher"],
    required: true,
  },
  workshopType: {
    type: String,
    enum: ["google_analytics", "figma"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "WorkshopRegistration",
  WorkshopRegistrationSchema
);
