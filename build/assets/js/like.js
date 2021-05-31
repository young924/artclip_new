"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var likeButton = document.getElementById("jsLike");
var likeNumber = document.getElementById("jsLikeNumber");
var heartIcon = document.getElementById("jsHeart");
var like;

var increaseLike = function increaseLike() {
  likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) + 1;
};

var decreaseLike = function decreaseLike() {
  likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) - 1;
};

var fillHeart = function fillHeart() {
  heartIcon.classList.replace("far", "fas");
};

var emptyHeart = function emptyHeart() {
  heartIcon.classList.replace("fas", "far");
};

var handleLike = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var imageId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            imageId = window.location.href.split("/images/")[1];
            _context.prev = 1;

            if (!like) {
              _context.next = 10;
              break;
            }

            like = false;
            _context.next = 6;
            return (0, _axios["default"])({
              url: "/api/".concat(imageId, "/like"),
              method: "POST",
              data: {
                like: like
              }
            });

          case 6:
            response = _context.sent;

            if (response.status === 200) {
              decreaseLike();
              emptyHeart();
            }

            _context.next = 15;
            break;

          case 10:
            like = true;
            _context.next = 13;
            return (0, _axios["default"])({
              url: "/api/".concat(imageId, "/like"),
              method: "POST",
              data: {
                like: like
              }
            });

          case 13:
            response = _context.sent;

            if (response.status === 200) {
              increaseLike();
              fillHeart();
            }

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 17]]);
  }));

  return function handleLike(_x) {
    return _ref.apply(this, arguments);
  };
}();

function init() {
  likeButton.addEventListener("click", handleLike);
}

if (likeButton) {
  like = heartIcon.classList.contains("fas") ? true : false;
  init();
}