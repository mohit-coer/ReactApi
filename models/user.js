const mongoose = require("mongoose");

//const Scheme = mongoose.Schema;
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema, "users");
