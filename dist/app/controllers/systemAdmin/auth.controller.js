'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Returns jwt token if valid email and password is valid
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.login = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body$params, email, password;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        console.log('CCOme and seee');
                        _req$body$params = req.body.params, email = _req$body$params.email, password = _req$body$params.password;
                        _context.next = 5;
                        return _admin2.default.findOne({ 'email': email, adminType: "0" }).then(function (admin) {
                            if (admin) {
                                admin.comparePassword(password, function (err, match) {
                                    if (err) {
                                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                    }
                                    if (match === true) {
                                        var token = _jsonwebtoken2.default.sign(admin.toJSON(), _config2.default.JWTSecret, { expiresIn: _config2.default.JWTExpireTime });
                                        res.send({ code: 200, message: _message2.default.infoMessage.login, data: { token: 'JWT ' + token, user: admin }, error: [] });
                                    } else {
                                        res.send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                                    }
                                });
                            } else {
                                res.send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                            }
                        }).catch(function (err) {
                            res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 5:
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context.t0 });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Create Admin if valid email and username
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.singup = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var saveToUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        req.body.params.emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        req.body.params.emailVerificationTokenExpire = _config2.default.emailVerifyTokenExpireTime;
                        req.body.params.adminType = "0";
                        saveToUser = (0, _admin2.default)(req.body.params);
                        _context2.next = 7;
                        return saveToUser.save().then(function (admin) {
                            var mailOptions = {
                                to: admin.email,
                                subject: _message2.default.userEmails.signup.subject,
                                text: _util2.default.format(_message2.default.userEmails.signup.body, admin.firstName, _config2.default.adminUrl, admin.emailVerificationToken)
                            };
                            _email2.default.email(mailOptions, function (err, info) {
                                if (err) {
                                    res.send({ code: 401, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                }
                                res.send({ code: 200, message: _message2.default.infoMessage.saveUser, data: admin, error: [] });
                            });
                        }).catch(function (err) {
                            res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 7:
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);

                        res.send({ code: 402, message: _message2.default.errorMessage.genericError, data: [], error: _context2.t0 });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * Send email if email is valid and exist 
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.forgotPassword = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var email;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        email = req.body.params.email;
                        _context3.next = 4;
                        return _admin2.default.findOne({ 'email': email }).then(function (admin) {
                            if (admin) {
                                var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                admin.resetPasswordToken = token;
                                admin.resetPasswordExpires = _config2.default.resetPasswordTokenExpireTime;
                                admin.save();
                                var mailOptions = {
                                    to: admin.email,
                                    subject: _message2.default.userEmails.forgotPassword.subject,
                                    text: _util2.default.format(_message2.default.userEmails.forgotPassword.body, _config2.default.adminUrl, token)
                                };
                                _email2.default.email(mailOptions, function (err, info) {
                                    if (err) {
                                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                    }
                                    res.send({ code: 200, message: _message2.default.infoMessage.forgotPassword, data: [], error: [] });
                                });
                            } else {
                                res.send({ code: 401, message: _message2.default.errorMessage.emailNotFound, data: [], error: [] });
                            }
                        }).catch(function (err) {
                            res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 4:
                        _context3.next = 9;
                        break;

                    case 6:
                        _context3.prev = 6;
                        _context3.t0 = _context3['catch'](0);

                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context3.t0 });

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 6]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Reset password if token is valid
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.resetPassword = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$body$params2, password, token;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _req$body$params2 = req.body.params, password = _req$body$params2.password, token = _req$body$params2.token;
                        _context4.next = 4;
                        return _admin2.default.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).then(function (admin, error) {
                            if (admin) {
                                admin.password = password;
                                var savedUser = _admin2.default.saveUser(admin);
                                var mailOptions = {
                                    to: admin.email,
                                    subject: _message2.default.emails.resetPassword.subject,
                                    text: _util2.default.format(_message2.default.emails.resetPassword.body, admin.email)
                                };
                                _email2.default.email(mailOptions, function (err, info) {
                                    if (err) {
                                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                    }
                                    res.send({ code: 200, message: _message2.default.infoMessage.resetPassword, data: [], error: [] });
                                });
                            } else {
                                res.send({ code: 400, message: _message2.default.errorMessage.tokenNotFound, data: [], error: [] });
                            }
                        }).catch(function (err) {
                            res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 4:
                        _context4.next = 9;
                        break;

                    case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4['catch'](0);

                        res.send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context4.t0 });

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();