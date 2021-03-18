const express = require("express");
const { home, search } = require("../controllers/imageController");
const {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  showcase,
  kakaoLogin,
  kakaoLoginCallback,
  naverLogin,
  naverLoginCallback,
  facebookLogin,
  facebookLoginCallback
} = require("../controllers/userController");
const { onlyPublic, onlyPrivate } = require("../middlewares");
const routes = require("../routes");

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.showcase, showcase);

// social login

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(routes.kakaoCallback, kakaoLoginCallback, (req, res) =>
  res.redirect(routes.home)
);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(routes.naverCallback, naverLoginCallback, (req, res) =>
  res.redirect(routes.home)
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, facebookLoginCallback, (req, res) =>
  res.redirect(routes.home)
);

module.exports = globalRouter;
