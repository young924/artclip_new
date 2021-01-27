const express = require('express');
const {
    userDetail, editProfile, editInfo
} = require('../controllers/userController');
const { onlyPrivate } = require('../middlewares');
const routes = require('../routes');

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.editInfo, onlyPrivate, editInfo);

module.exports = userRouter;
