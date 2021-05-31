"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var multer = require("multer");

var multerS3 = require("multer-s3");

var aws = require("aws-sdk");

var routes = require("./routes");

var Image = require("./models/Image");

var dotenv = require("dotenv");

dotenv.config();
var s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});
var multerImage = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "artclip2021/image"
  })
});
var multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "artclip2021/avatar"
  })
});
var uploadImage = multerImage.single("imageFile");
var uploadAvatar = multerAvatar.single("avatar");

var awsDeleteImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _id, image, url, fileName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.params.id;
            _context.next = 4;
            return Image.findById(_id);

          case 4:
            image = _context.sent;
            url = image.fileUrl.split("/");
            fileName = url[url.length - 1];
            s3.deleteObject({
              Bucket: "artclip2021/image",
              Key: fileName
            }, function (err) {
              if (err) throw new Error("Cannot delete object");
            });
            next();
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.redirect(routes.editImage(id));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function awsDeleteImage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "Art Clip";
  res.locals.logoImageUrl = "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/KakaoTalk_Photo_2021-03-09-18-06-06.png";
  res.locals.greyImageUrl = "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/solid+grey+image.jpg";
  res.locals.routes = routes;
  res.locals.loginImage = "https://artclip2021.s3.ap-northeast-2.amazonaws.com/source/login.jpg";
  res.locals.loggedUser = req.user || null;
  next();
}; // 로그인 여부에 따라 접근 가능/불가능


var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

module.exports = {
  awsDeleteImage: awsDeleteImage,
  uploadImage: uploadImage,
  uploadAvatar: uploadAvatar,
  localsMiddleware: localsMiddleware,
  onlyPrivate: onlyPrivate,
  onlyPublic: onlyPublic
};