const mongoose = require("mongoose");

const WebinarRegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 3,
  },
  profession: {
    type: String,
    enum: ["Student", "Working Professional"],
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    max: 100,
  },
  lastCollegeLevel: {
    type: String,
    enum: ["UG", "PG"],
    required: true,
  },
  lastCollegeName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [
      /^\+91\d{10}$/,
      "Invalid WhatsApp number format. Use +91XXXXXXXXXX",
    ],
  },
  questionForSpeaker: {
    type: String,
    default: null,
    trim: true,
    maxlength: 150,
    minlength: 3,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "WebinarRegistration",
  WebinarRegistrationSchema
);
