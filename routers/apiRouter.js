const express = require("express");
const routes = require("../routes");
const {
    postLike,
} = require("../controllers/imageController");

const apiRouter = express.Router();

apiRouter.post(routes.like, postLike);

module.exports = apiRouter;
