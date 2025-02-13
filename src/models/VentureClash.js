const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  email: { type: String, required: true, trim: true },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\+91\d{10}$/,
      "Invalid WhatsApp number format. Use +91XXXXXXXXXX.",
    ],
  },
  profession: {
    type: String,
    required: true,
    enum: ["Student", "Working Professional"],
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    length: 3,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{6}$/, "Invalid pincode format."],
  },
  collegeName: { type: String, trim: true, maxlength: 100 },
  collegeLocation: { type: String, trim: true, maxlength: 100 },
  companyName: { type: String, trim: true, maxlength: 100 },
  companyLocation: { type: String, trim: true, maxlength: 100 },
});

const ventureClashSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    canTravel: { type: Boolean, required: true },
    member1: { type: memberSchema, required: true },
    member2: { type: memberSchema, required: true },
    member3: { type: memberSchema },
    member4: { type: memberSchema },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VentureClash", ventureClashSchema);
