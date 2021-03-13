const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

mongoose.connect(db, (err) => {
  if (err) {
    console.err(err);
  } else {
    console.log("Connected to Mongoose");
  }
});

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token: token, user: user });
      }
    }
  });
});

module.exports = router;
