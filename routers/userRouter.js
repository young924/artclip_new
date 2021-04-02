const express = require("express");
const {
  users,
  userDetail,
  getEditProfile,
  postEditProfile,
  editInfo,
  follow,
  unfollow
} = require("../controllers/userController");
const { onlyPrivate, uploadAvatar } = require("../middlewares");
const routes = require("../routes");

const userRouter = express.Router();

userRouter.get(routes.home, users);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.follow(), onlyPrivate, follow);
userRouter.get(routes.unfollow(), onlyPrivate, unfollow);
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile(),
  onlyPrivate,
  uploadAvatar,
  postEditProfile
);
userRouter.get(routes.editInfo, onlyPrivate, editInfo);

module.exports = userRouter;
