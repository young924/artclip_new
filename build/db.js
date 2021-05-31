"use strict";

var mongoose = require("mongoose");

var dotenv = require("dotenv");

dotenv.config();

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  console.log("\u274C Error on DB Connection:".concat(error));
  connect();
};

var connect = function connect() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  var db = mongoose.connection;
  db.once("open", handleOpen);
  db.on("error", handleError);
};

connect();