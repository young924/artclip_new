"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var crypto = require("crypto");

var passport = require("passport");

var User = require("./models/User");

var KakaoStrategy = require("passport-kakao").Strategy;

var NaverStrategy = require("passport-naver").Strategy;

var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); // req.session 에 유저 id만 넣음

passport.deserializeUser(User.deserializeUser()); // cookie에 있는 값으로 req.session 에서 id 얻어와서 req.user에 유저 넣음
// kakao

passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_ID,
  // kakao developer에서 발급받는 REST API 키
  callbackURL: "/auth/kakao/callback" // 인증 결과를 받을 라우터

}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, __, profile, cb) {
    var id, name, profile_image, email, user, newUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(profile);
            _context.prev = 1;
            id = profile.id, name = profile.username, profile_image = profile._json.properties.profile_image;
            email = crypto.createHash("sha512").update("kakao".concat(id)).digest("base64") + "@randomEmail.com";
            _context.next = 6;
            return User.findOne({
              email: email
            });

          case 6:
            user = _context.sent;

            if (!user) {
              _context.next = 15;
              break;
            }

            if (user.kakoId) {
              _context.next = 12;
              break;
            }

            user.kakaoID = id;
            _context.next = 12;
            return user.save();

          case 12:
            return _context.abrupt("return", cb(null, user));

          case 15:
            _context.next = 17;
            return User.create({
              email: email,
              name: name,
              kakaoId: id,
              avatarUrl: profile_image
            });

          case 17:
            newUser = _context.sent;
            return _context.abrupt("return", cb(null, newUser));

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", cb(_context.t0));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 21]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}())); // naver

passport.use(new NaverStrategy({
  clientID: process.env.NAVER_ID,
  clientSecret: process.env.NAVER_SECRET,
  callbackURL: "/auth/naver/callback"
}, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var id, email, name, user, newUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = profile.id, email = profile._json.email;
            _context2.prev = 1;
            name = email.split("@")[0]; // console.log(id, email, name);

            _context2.next = 5;
            return User.findOne({
              email: email
            });

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 14;
              break;
            }

            if (user.naverId) {
              _context2.next = 11;
              break;
            }

            user.naverId = id;
            _context2.next = 11;
            return user.save();

          case 11:
            return _context2.abrupt("return", cb(null, user));

          case 14:
            _context2.next = 16;
            return User.create({
              email: email,
              name: name,
              naverId: id
            });

          case 16:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 18:
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 20]]);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}())); // facebook

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback"
}, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, __, profile, cb) {
    var id, name, email, user, newUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            console.log(profile);
            id = profile.id, name = profile._json.name; // facebook doesn't give email address

            email = crypto.createHash("sha512").update("facebook".concat(id)).digest("base64") + "@randomEmail.com";
            _context3.next = 6;
            return User.findOne({
              email: email
            });

          case 6:
            user = _context3.sent;

            if (!user) {
              _context3.next = 15;
              break;
            }

            if (user.facebookId) {
              _context3.next = 12;
              break;
            }

            user.facebookId = id;
            _context3.next = 12;
            return user.save();

          case 12:
            return _context3.abrupt("return", cb(null, user));

          case 15:
            _context3.next = 17;
            return User.create({
              name: name,
              email: email,
              facebookId: id
            });

          case 17:
            newUser = _context3.sent;
            return _context3.abrupt("return", cb(null, newUser));

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", cb(_context3.t0));

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21]]);
  }));

  return function (_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}()));