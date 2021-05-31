"use strict";

require("regenerator-runtime");

var app = require("./app");

var dotenv = require("dotenv");

var setUserRefresh = require("./userRefresh");

dotenv.config(); // 1일에 한번씩 30일 내로 이미지 업로드 안한 유저 삭제

setUserRefresh(1, 30);
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  return console.log("\u2705 listening on port: ".concat(PORT));
});