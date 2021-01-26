const express = require('express');
const {
    userDetail, editProfile, editInfo
} = require('../controllers/userController');
const routes = require('../routes');

const userRouter = express.Router();

userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.editInfo, editInfo);

module.exports = userRouter;
