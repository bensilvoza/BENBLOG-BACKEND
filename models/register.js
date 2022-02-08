var mongoose = require("mongoose");

// Register
var registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
var Register = mongoose.model("Register", registerSchema);

module.exports = Register;
