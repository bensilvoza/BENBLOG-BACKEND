var express = require("express");
var router = express.Router();
var Register = require("../models/register");
var apiEndpointCheckpoint = process.env.API_ENDPOINT_CHECKPOINT;

// =====
// login
// =====
router.get(`/login/${apiEndpointCheckpoint}`, async function (req, res) {
  var getUsers = await Register.find({});
  res.json(getUsers);
});

router.post("/login", async function (req, res) {});

// ========
// REGISTER
// ========
router.get(`/register/${apiEndpointCheckpoint}`, async function (req, res) {
  var data = await Register.find({});
  res.json(data);
});

router.post(`/register/${apiEndpointCheckpoint}`, async function (req, res) {
  var data = new Register({
    email: req.body.email,
    password: req.body.password,
  });

  await data.save();
  res.json("User registered");
});

// update account
router.post("/register/update", async function (req, res) {
  //var updatedData = {fname:req.body.fname, lname:req.body.lname, role:req.body.role, email:req.body.email, password:req.body.password}
  //await data.save()

  var data = await Register.findById(req.body._id);
  data["password"] = req.body.password;
  console.log(data);

  var check = await Register.findByIdAndUpdate(data["_id"], data);
  console.log(check);
  res.json("Registered");
});

// administrator side edit
router.post("/register/edit/:userId", async function (req, res) {
  var updatedUser = await Register.findByIdAndUpdate(
    req.params.userId,
    req.body
  );
  res.json("Updated");
});

router.get("/register/:userId", async function (req, res) {
  var data = await Register.findById(req.params.userId);
  res.json(data);
});

// logout
router.get("/logout", function (req, res) {});

// exports
module.exports = router;
