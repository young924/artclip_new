"use strict";

var express = require("express");

var routes = require("../routes");

var _require = require("../controllers/imageController"),
    postLike = _require.postLike;

var apiRouter = express.Router();
apiRouter.post(routes.like, postLike);
module.exports = apiRouter;