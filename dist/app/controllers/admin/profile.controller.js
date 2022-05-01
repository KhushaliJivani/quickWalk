'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Update Profile if params is valid
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.updateProfile = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context.next = 6;
                        return _admin2.default.findByIdAndUpdate(decode._id, params).then(function (admin) {
                            res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateProfile, data: admin, error: [] });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 6:
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context.t0 });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.changePassword = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body$params, password, oldPassword, exe, decode;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _req$body$params = req.body.params, password = _req$body$params.password, oldPassword = _req$body$params.oldPassword;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context2.next = 6;
                        return _admin2.default.findById(decode._id).then(function (admin) {
                            admin.comparePassword(oldPassword, function (err, match) {
                                if (err) {
                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                }
                                if (match === true) {
                                    admin.password = password;
                                    admin.save();
                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateProfile, data: [], error: [] });
                                } else {
                                    res.status(401).send({ code: 401, message: _message2.default.errorMessage.passwordNotMatch, data: [], error: [] });
                                }
                            });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 6:
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context2.t0 });

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();