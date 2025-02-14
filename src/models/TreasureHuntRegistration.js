const mongoose = require("mongoose");

const TreasureHuntRegistrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  leaderName: { type: String, required: true },
  leaderRegistrationNumber: { type: String, required: true },
  leaderOfficialMail: { type: String, required: true },
  member2Name: { type: String, required: true },
  member3Name: { type: String, required: true },
  member4Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "TreasureHuntRegistration",
  TreasureHuntRegistrationSchema
);
