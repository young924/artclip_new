const express = require('express');
const { home, search } = require('../controllers/imageController');
const {
  getJoin, postJoin, getLogin, postLogin, logout, showcase,
} = require('../controllers/userController');
const routes = require('../routes');

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.showcase, showcase);

module.exports = globalRouter;
