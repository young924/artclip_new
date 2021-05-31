"use strict";

var express = require("express");

var _require = require("../controllers/imageController"),
    home = _require.home,
    search = _require.search;

var _require2 = require("../controllers/userController"),
    getJoin = _require2.getJoin,
    postJoin = _require2.postJoin,
    getLogin = _require2.getLogin,
    postLogin = _require2.postLogin,
    logout = _require2.logout,
    showcase = _require2.showcase,
    kakaoLogin = _require2.kakaoLogin,
    kakaoLoginCallback = _require2.kakaoLoginCallback,
    naverLogin = _require2.naverLogin,
    naverLoginCallback = _require2.naverLoginCallback,
    facebookLogin = _require2.facebookLogin,
    facebookLoginCallback = _require2.facebookLoginCallback;

var _require3 = require("../middlewares"),
    onlyPublic = _require3.onlyPublic,
    onlyPrivate = _require3.onlyPrivate;

var routes = require("../routes");

var globalRouter = express.Router();
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.showcase, showcase); // social login

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(routes.kakaoCallback, kakaoLoginCallback, function (req, res) {
  return res.redirect(routes.home);
});
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(routes.naverCallback, naverLoginCallback, function (req, res) {
  return res.redirect(routes.home);
});
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, facebookLoginCallback, function (req, res) {
  return res.redirect(routes.home);
});
module.exports = globalRouter;