const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phoneNumber: { type: Number, unique: true },
  dob: Date,
  nin: { type: Number, unique: true },
  email: { type: String, unique: true },
});

module.exports = mongoose.model("User", userSchema);
