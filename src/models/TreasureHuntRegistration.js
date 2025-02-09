const mongoose = require("mongoose");

const TreasureHuntRegistrationSchema = new mongoose.Schema({
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    member2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    member3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "TreasureHuntRegistration",
  TreasureHuntRegistrationSchema
);
