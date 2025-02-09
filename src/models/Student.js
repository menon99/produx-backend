const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  officialMail: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
