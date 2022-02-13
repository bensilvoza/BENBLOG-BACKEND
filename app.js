// require
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

// require routes
var index = require("./routes/index");
var posts = require("./routes/posts");
// var products = require("./routes/products");
// var checkout = require("./routes/checkout");

// ===
// ENV
// ===
// process.env.ENV_VARIABLE_NAME
var dbUrl = process.env.DB_URL;
// protectRoute
// Protecting the route from unathorized access
// adding checkpoint in endpoint
var protectRoute = process.env.PROTECT_ROUTE;

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
app.use(`/${protectRoute}`, index);
app.use(`/${protectRoute}`, posts);
// app.use(products);
// app.use(checkout);

//app.listen
app.listen(process.env.PORT || 5000, function () {
  console.log("Backend server is running.");
  console.log(".");
  console.log(".");
  console.log(".");
});
