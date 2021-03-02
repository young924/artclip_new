/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require("express-flash");
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');

const { localsMiddleware } = require('./middlewares');
const routes = require('./routes');
const globalRouter = require('./routers/globalRouter');
const userRouter = require('./routers/userRouter');
const imageRouter = require('./routers/imageRouter');
const apiRouter = require('./routers/apiRouter');
const User = require('./models/User');
require('./passport');
require('./db');

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_ID));
app.use(session({
    secret: process.env.COOKIE_ID,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(flash());

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);
app.use(express.static('static'));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.images, imageRouter);
app.use(routes.api, apiRouter);

module.exports = app;