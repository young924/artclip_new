"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require("mongoose");

var User = require("./models/User");

var Image = require("./models/Image");

var Comment = require("./models/Comment");

var deleteUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(uploadRenewalInterval) {
    var now, before, lazyUsers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            now = new Date();
            before = new Date(now);
            before.setDate(now.getDate() - uploadRenewalInterval);
            _context.next = 6;
            return User.find({
              lastUpload: {
                $lte: String(before)
              }
            });

          case 6:
            lazyUsers = _context.sent;
            lazyUsers.forEach(function (lazyUser) {
              return console.log(" user name: ", lazyUser.name, " last upload: ", lazyUser.lastUpload);
            });
            _context.next = 10;
            return User.deleteMany({
              lastUpload: {
                $lte: String(before)
              }
            });

          case 10:
            return _context.abrupt("return", lazyUsers);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function deleteUsers(_x) {
    return _ref.apply(this, arguments);
  };
}();

var deleteImages = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(lazyUsers) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              lazyUsers.forEach( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(lazyUser) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return Image.updateMany({
                            creator: mongoose.Types.ObjectId(lazyUser.id),
                            "volatile": false
                          }, {
                            creator: mongoose.Types.ObjectId("6055fb85f6d0b0c9c4ecfa35")
                          });

                        case 2:
                          _context2.next = 4;
                          return Image.deleteMany({
                            creator: mongoose.Types.ObjectId(lazyUser.id),
                            "volatile": true
                          });

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.error(err);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteImages(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteComments = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(lazyUsers) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              lazyUsers.forEach( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(lazyUser) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return Image.updateMany({}, {
                            $pull: {
                              comments: mongoose.Types.ObjectId(lazyUser.id)
                            }
                          });

                        case 2:
                          _context4.next = 4;
                          return Comment.deleteMany({
                            creator: mongoose.Types.ObjectId(lazyUser.id)
                          });

                        case 4:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x5) {
                  return _ref5.apply(this, arguments);
                };
              }());
            } catch (err) {
              console.error(err);
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteComments(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var setUserRefresh = function setUserRefresh(refreshInterval, uploadRenewalInterval) {
  console.log("\uD83D\uDD03 User refresh interval: ".concat(refreshInterval, " days"));
  console.log("\uD83D\uDD03 User should upload image at least every ".concat(uploadRenewalInterval, " days"));
  setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var lazyUsers;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log("\uD83D\uDD03 ".concat(refreshInterval, " days passed. user refresh starts."));
            _context6.next = 3;
            return deleteUsers(uploadRenewalInterval);

          case 3:
            lazyUsers = _context6.sent;
            _context6.next = 6;
            return deleteImages(lazyUsers);

          case 6:
            _context6.next = 8;
            return deleteComments(lazyUsers);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })), refreshInterval * 24 * 60 * 60 * 1000);
};

module.exports = setUserRefresh;