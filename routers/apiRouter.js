const express = require("express");
const routes = require("../routes");
const {
    postAddComment,
    postRegisterView,
} = require("../controllers/imageController");

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

module.exports = apiRouter;
