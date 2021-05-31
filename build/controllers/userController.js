"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var passport = require("passport");

var routes = require("../routes");

var User = require("../models/User");

var Image = require("../models/Image");

var users = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.find({});

          case 2:
            users = _context.sent;
            res.render("users", {
              pageTitle: "Users",
              users: users
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function users(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "Sign Up"
  });
};

var postJoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body, name, emailId, emailDomain, password, password2, email, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, emailId = _req$body.emailId, emailDomain = _req$body.emailDomain, password = _req$body.password, password2 = _req$body.password2;
            email = "".concat(emailId, "@").concat(emailDomain);
            req.body.email = email; // next로 넘길때 passport.authenticate() 함수가 얘를 봐야 함 -> // usernameField를 email에서 name으로 바꿔서 필요 없을것같음

            if (!(password !== password2 || password.length < 8)) {
              _context2.next = 8;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "join",
              passwordUnmatch: true
            });
            _context2.next = 26;
            break;

          case 8:
            _context2.next = 10;
            return User.findOne({
              name: name
            });

          case 10:
            if (!_context2.sent) {
              _context2.next = 15;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "join",
              userAlreadyExist: true
            });
            _context2.next = 26;
            break;

          case 15:
            _context2.prev = 15;
            user = User({
              name: name,
              email: email
            }); // passport-local-mongoose가 준 register 함수. mongodb의 해당 유저에 salt, hash 필드 작성하여 저장함. (이 단계에서는 아직 쿠키나 세션같은건 없음!!!!!!)

            _context2.next = 19;
            return User.register(user, password);

          case 19:
            next();
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](15);
            console.error(_context2.t0);
            res.redirect("/");

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[15, 22]]);
  }));

  return function postJoin(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getLogin = function getLogin(req, res) {
  res.render("login", {
    pageTitle: "Sign In"
  });
};

var postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  successFlash: "환영합니다!",
  failureFlash: "로그인할 수 없습니다. 아이디와 비밀번호를 확인해주세요."
}); // social login

var kakaoLogin = passport.authenticate("kakao");
var kakaoLoginCallback = passport.authenticate("kakao", {
  failureRedirect: routes.join,
  successFlash: "환영합니다!",
  failureFlash: "현재 카카오로 로그인할 수 없습니다."
});
var naverLogin = passport.authenticate("naver");
var naverLoginCallback = passport.authenticate("naver", {
  failureRedirect: routes.join,
  successFlash: "환영합니다!",
  failureFlash: "현재 네이버로 로그인할 수 없습니다"
});
var facebookLogin = passport.authenticate("facebook");
var facebookLoginCallback = passport.authenticate("facebook", {
  failureRedirect: routes.join,
  successFlash: "환영합니다!",
  failureFlash: "현재 페이스북으로 로그인할 수 없습니다"
});

var logout = function logout(req, res) {
  req.logout();
  res.redirect(req.url);
};

var showcase = function showcase(req, res) {
  return res.render("showcase", {
    pageTitle: "Showcase"
  });
};

var userDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var viewedName, viewedUser, images, viewerName, viewer, viewerFollowesViewedUser, _viewerFollowesViewedUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            viewedName = req.params.name;
            _context3.next = 4;
            return User.findOne({
              name: viewedName
            }).populate("likeImages").populate({
              path: "images",
              select: "fileUrl title likes",
              populate: [{
                path: "creator",
                select: "name avatarUrl"
              }, {
                path: "comments",
                populate: {
                  path: "creator",
                  select: "name avatarUrl"
                }
              }]
            });

          case 4:
            viewedUser = _context3.sent;
            images = viewedUser.images;

            if (!req.user) {
              _context3.next = 15;
              break;
            }

            viewerName = req.user.name;
            _context3.next = 10;
            return User.findOne({
              name: viewerName
            });

          case 10:
            viewer = _context3.sent;
            viewerFollowesViewedUser = viewedUser.follower.includes(viewer._id) ? true : false;
            res.render("userDetail", {
              pageTitle: "User Detail",
              viewedUser: viewedUser,
              viewerFollowesViewedUser: viewerFollowesViewedUser,
              images: images
            });
            _context3.next = 17;
            break;

          case 15:
            _viewerFollowesViewedUser = false;
            res.render("userDetail", {
              pageTitle: "User Detail",
              viewedUser: viewedUser,
              viewerFollowesViewedUser: _viewerFollowesViewedUser
            });

          case 17:
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            res.redirect(routes.home);

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function userDetail(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var follow = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var followedName, followerId, followed, followedId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            followedName = req.params.name, followerId = req.user._id;
            _context4.prev = 1;
            _context4.next = 4;
            return User.findOne({
              name: followedName
            });

          case 4:
            followed = _context4.sent;
            followedId = followed._id;

            if (!(String(followedId) != String(followerId))) {
              _context4.next = 11;
              break;
            }

            _context4.next = 9;
            return User.findOneAndUpdate({
              name: followedName
            }, {
              $addToSet: {
                follower: followerId
              }
            });

          case 9:
            _context4.next = 11;
            return User.findByIdAndUpdate(followerId, {
              $addToSet: {
                following: followedId
              }
            });

          case 11:
            res.redirect(routes.userDetail(followed.name));
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);
            res.redirect(routes.home);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 14]]);
  }));

  return function follow(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var unfollow = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var unfollowedName, unfollowerId, unfollowed, unfollowedId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            unfollowedName = req.params.name, unfollowerId = req.user._id;
            _context5.prev = 1;
            _context5.next = 4;
            return User.findOne({
              name: unfollowedName
            });

          case 4:
            unfollowed = _context5.sent;
            unfollowedId = unfollowed._id; // await follower.follow(followed);
            // await followed.getFollowed(follower);

            _context5.next = 8;
            return User.findOneAndUpdate({
              name: unfollowedName
            }, {
              $pull: {
                follower: unfollowerId
              }
            });

          case 8:
            _context5.next = 10;
            return User.findByIdAndUpdate(unfollowerId, {
              $pull: {
                following: unfollowedId
              }
            });

          case 10:
            res.redirect(routes.userDetail(unfollowed.name));
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            res.redirect(routes.home);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function unfollow(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var getEditProfile = function getEditProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "Edit Profile"
  });
};

var postEditProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, name, career, description, file, id, nameChanged, careerList;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, career = _req$body2.career, description = _req$body2.description, file = req.file, id = req.user.id;
            _context6.prev = 1;
            nameChanged = false;

            if (!name) {
              _context6.next = 15;
              break;
            }

            _context6.t0 = req.user.name !== name;

            if (!_context6.t0) {
              _context6.next = 9;
              break;
            }

            _context6.next = 8;
            return User.findOne({
              name: name
            });

          case 8:
            _context6.t0 = _context6.sent;

          case 9:
            if (!_context6.t0) {
              _context6.next = 12;
              break;
            }

            res.status(400);
            return _context6.abrupt("return", res.redirect(routes.editProfile(req.user.name)));

          case 12:
            _context6.next = 14;
            return User.findByIdAndUpdate(id, {
              name: name
            });

          case 14:
            nameChanged = true;

          case 15:
            if (!file) {
              _context6.next = 18;
              break;
            }

            _context6.next = 18;
            return User.findByIdAndUpdate(id, {
              avatarUrl: file.location
            });

          case 18:
            if (!career) {
              _context6.next = 22;
              break;
            }

            careerList = career.split(",").map(function (e) {
              return e.trim();
            });
            _context6.next = 22;
            return User.findByIdAndUpdate(id, {
              career: careerList
            });

          case 22:
            if (!description) {
              _context6.next = 25;
              break;
            }

            _context6.next = 25;
            return User.findByIdAndUpdate(id, {
              description: description
            });

          case 25:
            if (nameChanged) {
              res.redirect(routes.userDetail(name));
            } else {
              res.redirect(routes.userDetail(req.user.name));
            }

            _context6.next = 32;
            break;

          case 28:
            _context6.prev = 28;
            _context6.t1 = _context6["catch"](1);
            console.error(_context6.t1);
            res.redirect(routes.editProfile());

          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 28]]);
  }));

  return function postEditProfile(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

var editInfo = function editInfo(req, res) {
  res.render("editInfo", {
    pageTitle: "Account Info"
  });
};

module.exports = {
  users: users,
  getJoin: getJoin,
  postJoin: postJoin,
  getLogin: getLogin,
  postLogin: postLogin,
  kakaoLogin: kakaoLogin,
  kakaoLoginCallback: kakaoLoginCallback,
  naverLogin: naverLogin,
  naverLoginCallback: naverLoginCallback,
  facebookLogin: facebookLogin,
  facebookLoginCallback: facebookLoginCallback,
  logout: logout,
  showcase: showcase,
  userDetail: userDetail,
  follow: follow,
  unfollow: unfollow,
  getEditProfile: getEditProfile,
  postEditProfile: postEditProfile,
  editInfo: editInfo
};