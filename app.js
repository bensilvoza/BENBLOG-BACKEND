// require
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

// require routes
var index = require("./routes/index");
// var administrator = require("./routes/administrator");
// var products = require("./routes/products");
// var checkout = require("./routes/checkout");

// process.env.ENV_VARIABLE_NAME
var dbUrl = process.env.DB_URL;

// use
var app = express();
app.use(express.json());
app.use(cors());

// ========
// DATABASE
// ========
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

var connection = mongoose.connection;
connection.once("open", function () {
  // console.log("Database is now connected");
});

// ======
// ROUTES
// ======
app.use(index);
// app.use(administrator);
// app.use(products);
// app.use(checkout);

//app.listen
app.listen(process.env.PORT || 5000, function () {
  console.log("Backend server is running.");
  console.log(".");
  console.log(".");
  console.log(".");
});
