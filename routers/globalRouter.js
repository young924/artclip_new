const express = require('express');
const { home, search } = require('../controllers/imageController');
const {
  getJoin, postJoin, getLogin, postLogin, logout, showcase,
} = require('../controllers/userController');
const { onlyPublic, onlyPrivate } = require('../middlewares');
const routes = require('../routes');

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.showcase, showcase);

module.exports = globalRouter;
