const express = require("express");
const routes = require("../routes");
const {
    postLike,
    postAddComment,
} = require("../controllers/imageController");

const apiRouter = express.Router();

apiRouter.post(routes.like, postLike);
apiRouter.post(routes.addComment, postAddComment);

module.exports = apiRouter;
