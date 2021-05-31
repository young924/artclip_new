"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-console */
var express = require("express");

var morgan = require("morgan");

var helmet = require("helmet");

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var session = require("express-session");

var path = require("path");

var flash = require("express-flash");

var MongoStore = require("connect-mongo")(session);

var passport = require("passport");

var mongoose = require("mongoose");

var _require = require("./middlewares"),
    localsMiddleware = _require.localsMiddleware;

var routes = require("./routes");

var globalRouter = require("./routers/globalRouter");

var userRouter = require("./routers/userRouter");

var imageRouter = require("./routers/imageRouter");

var apiRouter = require("./routers/apiRouter");

var User = require("./models/User");

require("./passport");

require("./db");

var app = express();
app.use(helmet({
  contentSecurityPolicy: {
    directives: _objectSpread(_objectSpread({}, helmet.contentSecurityPolicy.getDefaultDirectives()), {}, {
      "img-src": ["'self'", "artclip2021.s3.ap-northeast-2.amazonaws.com", "https://k.kakaocdn.net"]
    })
  }
}));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/uploads", express["static"]("uploads"));
app.use("/static", express["static"](path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_ID));
app.use(session({
  secret: process.env.COOKIE_ID,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(flash());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.images, imageRouter);
app.use(routes.api, apiRouter);
module.exports = app;