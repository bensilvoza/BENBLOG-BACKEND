var express = require("express");
var router = express.Router();
var Register = require("../models/register");

// =====
// login
// =====
router.get("/login", async function (req, res) {
  var getUsers = await Register.find({});
  res.json(getUsers);
});

// ========
// REGISTER
// ========
router.get("/register", async function (req, res) {
  var data = await Register.find({});
  res.json(data);
});

router.post("/register", async function (req, res) {
  var data = new Register({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await data.save();
  res.json("User registered");
});

// exports
module.exports = router;
