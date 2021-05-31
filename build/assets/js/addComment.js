"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById("jsAddComment");
var commentList = document.getElementById("jsCommentList");
var commentNumber = document.getElementById("jsCommentNumber");
var commentCreator = document.getElementById("jsCreator");

var increaseNumber = function increaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

var addComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comment) {
    var li, commentSpan, dateSpan;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            li = document.createElement("li");
            commentSpan = document.createElement("span");
            dateSpan = document.createElement("span");
            commentSpan.innerHTML = "".concat(commentCreator.innerHTML, " : ").concat(comment, " ");
            dateSpan.innerHTML = Date.now().toLocaleString();
            li.appendChild(commentSpan);
            li.appendChild(dateSpan);
            commentList.prepend(li);
            increaseNumber();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var sendComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(comment) {
    var imageId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imageId = window.location.href.split("/images/")[1];
            _context2.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(imageId, "/comment"),
              method: "POST",
              data: {
                comment: comment
              }
            });

          case 3:
            response = _context2.sent;

            if (response.status === 200) {
              addComment(comment);
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendComment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = addCommentForm.querySelector("input");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}