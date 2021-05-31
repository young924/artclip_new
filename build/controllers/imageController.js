"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var routes = require("../routes");

var Image = require("../models/Image");

var User = require("../models/User");

var Comment = require("../models/Comment");

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var images;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Image.find({}).sort({
              _id: -1
            }).populate("creator").populate("likes");

          case 3:
            images = _context.sent;
            res.render("home", {
              pageTitle: "Home",
              images: images
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: "Home",
              images: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, images;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            images = [];
            _context2.prev = 2;
            _context2.next = 5;
            return Image.find({
              title: {
                $regex: String(searchingBy),
                $options: "i"
              }
            }).populate("creator");

          case 5:
            images = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render("search", {
              pageTitle: searchingBy,
              searchingBy: searchingBy,
              images: images
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getUpload = function getUpload(req, res) {
  res.render("upload", {
    pageTitle: "Upload"
  });
};

var postUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, tag, _volatile, location, id, newImage;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, tag = _req$body.tag, _volatile = _req$body["volatile"], location = req.file.location, id = req.user.id;
            _context3.prev = 1;
            _context3.next = 4;
            return Image.create({
              creator: id,
              fileUrl: location,
              title: title,
              description: description,
              tag: tag,
              "volatile": _volatile === "on" ? false : true
            });

          case 4:
            newImage = _context3.sent;
            _context3.next = 7;
            return User.findByIdAndUpdate(id, {
              $push: {
                images: newImage
              },
              $set: {
                lastUpload: Date.now()
              }
            });

          case 7:
            res.redirect(routes.imageDetail(newImage.id));
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);
            res.redirect(routes.home);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var imageDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, like, image, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return Image.findById(id).populate("creator").populate("likes").populate({
              path: "comments",
              populate: {
                path: "creator",
                select: "name avatarUrl"
              }
            });

          case 4:
            image = _context4.sent;
            image.views += 1;

            if (req.user) {
              _context4.next = 10;
              break;
            }

            like = false;
            _context4.next = 14;
            break;

          case 10:
            _context4.next = 12;
            return User.findById(req.user._id);

          case 12:
            user = _context4.sent;
            if (user.likeImages.includes(id)) like = true;else like = false;

          case 14:
            image.save();
            res.render("imageDetail", {
              pageTitle: image.title,
              image: image,
              like: like
            });
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.redirect(routes.home);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));

  return function imageDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getEditImage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, userId, image;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id, userId = req.user._id;
            _context5.next = 4;
            return Image.findById(id);

          case 4:
            image = _context5.sent;

            if (!(String(image.creator._id) !== String(userId))) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.redirect(routes.home));

          case 9:
            // 로그인된 유저가 해당 이미지 creator 아니면 home으로 보내기
            res.render("editImage", {
              pageTitle: "Edit ".concat(image.title),
              image: image
            });

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);
            res.redirect(routes.home);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function getEditImage(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var postEditImage = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, title, description, id, userId, image;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, id = req.params.id, userId = req.user._id;
            _context6.next = 4;
            return Image.findById(id);

          case 4:
            image = _context6.sent;

            if (!(String(image.creator._id) !== String(userId))) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.redirect(routes.home));

          case 7:
            _context6.next = 9;
            return Image.findByIdAndUpdate(id, {
              title: title,
              description: description
            });

          case 9:
            res.redirect(routes.imageDetail(id));
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            res.redirect(routes.home);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
  }));

  return function postEditImage(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, userId, image;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id, userId = req.user._id;
            _context7.prev = 1;
            _context7.next = 4;
            return Image.findById(id);

          case 4:
            image = _context7.sent;

            if (!(String(image.creator._id) !== String(userId))) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.redirect(routes.home));

          case 7:
            _context7.next = 9;
            return Image.findByIdAndDelete(id);

          case 9:
            _context7.next = 11;
            return User.updateOne({
              _id: userId
            }, {
              $pull: {
                images: id
              }
            });

          case 11:
            res.redirect(routes.home);
            _context7.next = 18;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](1);
            console.error(_context7.t0);
            res.redirect(routes.editImage(id));

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 14]]);
  }));

  return function deleteImage(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var postAddComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, comment, user, image, newComment;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return Image.findById(id);

          case 4:
            image = _context8.sent;
            _context8.next = 7;
            return Comment.create({
              text: comment,
              creator: user.id
            });

          case 7:
            newComment = _context8.sent;
            image.comments.push(newComment.id);
            image.save();
            res.redirect(routes.imageDetail(id));
            _context8.next = 17;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            res.redirect(routes.home);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13]]);
  }));

  return function postAddComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var deleteComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$params, id, commentId;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, commentId = _req$params.commentId;
            _context9.prev = 1;
            _context9.next = 4;
            return Image.updateOne({
              _id: id
            }, {
              $pull: {
                comments: commentId
              }
            });

          case 4:
            _context9.next = 6;
            return Comment.findByIdAndDelete(commentId);

          case 6:
            res.redirect(routes.imageDetail(id));
            _context9.next = 13;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);
            res.redirect(routes.home);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 9]]);
  }));

  return function deleteComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var postLike = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, like, user, image, userIndex, imageIndex;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, like = req.body.like, user = req.user;
            _context10.prev = 1;
            _context10.next = 4;
            return Image.findById(id);

          case 4:
            image = _context10.sent;

            if (like === true && !user.likeImages.includes(id)) {
              image.likes.push(user);
              user.likeImages.push(image);
              user.save();
              image.save();
            } else if (like === false && user.likeImages.includes(id)) {
              userIndex = image.like.indexOf(user);
              image.likeImages.splice(userIndex, 1);
              imageIndex = user.likeImages.indexOf(id);
              user.likeImages.splice(imageIndex, 1);
              user.save();
              image.save();
            }

            res.status(200);
            _context10.next = 12;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](1);
            res.status(400);

          case 12:
            _context10.prev = 12;
            res.end();
            return _context10.finish(12);

          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 9, 12, 15]]);
  }));

  return function postLike(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

module.exports = {
  home: home,
  search: search,
  getUpload: getUpload,
  postUpload: postUpload,
  imageDetail: imageDetail,
  getEditImage: getEditImage,
  postEditImage: postEditImage,
  deleteImage: deleteImage,
  deleteComment: deleteComment,
  postLike: postLike,
  postAddComment: postAddComment
};