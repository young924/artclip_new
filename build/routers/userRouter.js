"use strict";

var express = require("express");

var _require = require("../controllers/userController"),
    users = _require.users,
    userDetail = _require.userDetail,
    getEditProfile = _require.getEditProfile,
    postEditProfile = _require.postEditProfile,
    editInfo = _require.editInfo,
    follow = _require.follow,
    unfollow = _require.unfollow;

var _require2 = require("../middlewares"),
    onlyPrivate = _require2.onlyPrivate,
    uploadAvatar = _require2.uploadAvatar;

var routes = require("../routes");

var userRouter = express.Router();
userRouter.get(routes.home, users);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.follow(), onlyPrivate, follow);
userRouter.get(routes.unfollow(), onlyPrivate, unfollow);
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile(), onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.editInfo, onlyPrivate, editInfo);
module.exports = userRouter;