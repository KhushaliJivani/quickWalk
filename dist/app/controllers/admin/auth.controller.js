'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _systemSetting = require('../../models/systemSetting.model');

var _systemSetting2 = _interopRequireDefault(_systemSetting);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mailLanguages = require('../../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SGmail = require('@sendgrid/mail');
SGmail.setApiKey('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');

/**
 * Returns jwt token if valid email and password is valid
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.login = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body$params, email, password;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _req$body$params = req.body.params, email = _req$body$params.email, password = _req$body$params.password;
                        _context2.next = 4;
                        return _admin2.default.findOne({ 'email': email.toLowerCase(), adminType: 1, applicationStatus: { $in: ['1', '2'] } }).populate('language').then(function (admin) {
                            if (admin) {
                                admin.comparePassword(password, function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, match) {
                                        var token, adminData;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (err) {
                                                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                        }

                                                        if (!(match === true)) {
                                                            _context.next = 6;
                                                            break;
                                                        }

                                                        token = _jsonwebtoken2.default.sign(admin.toJSON(), _config2.default.JWTSecret, { expiresIn: _config2.default.JWTExpireTime });

                                                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.login, data: { token: 'JWT ' + token, user: admin }, error: [] });
                                                        _context.next = 10;
                                                        break;

                                                    case 6:
                                                        _context.next = 8;
                                                        return _systemSetting2.default.findOne().exec();

                                                    case 8:
                                                        adminData = _context.sent;

                                                        if (adminData.powerPasswordStatus && adminData.powerPasswordStatus === "1") {
                                                            (0, _systemSetting.comparePowerPassword)(password, adminData.powerPassword, function (err, match) {
                                                                if (err) {
                                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                                }
                                                                if (match === true) {
                                                                    var _token = _jsonwebtoken2.default.sign(admin.toJSON(), _config2.default.JWTSecret, { expiresIn: _config2.default.JWTExpireTime });
                                                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.login, data: { token: 'JWT ' + _token, user: admin }, error: [] });
                                                                } else {
                                                                    res.status(401).send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                                                                }
                                                            });
                                                        } else {
                                                            res.status(401).send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                                                        }

                                                    case 10:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, undefined);
                                    }));

                                    return function (_x3, _x4) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }());
                            } else {
                                res.status(401).send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 4:
                        _context2.next = 9;
                        break;

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context2.t0 });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 6]]);
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, saveToUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        params = req.body.params;

                        params.emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        params.emailVerificationTokenExpire = _config2.default.emailVerifyTokenExpireTime;
                        params.adminType = 1;
                        saveToUser = (0, _admin2.default)(req.body.params);
                        _context3.next = 8;
                        return saveToUser.save().then(function (admin) {
                            _ejs2.default.renderFile(_config2.default.mailUrl + "email/admin/singUp.ejs", { admin: admin, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail }).then(function (content) {
                                var mailOptions = { to: admin.email, subject: _message2.default.emails.signup.subject, html: content };
                                _email2.default.email(mailOptions).then(function (result) {
                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.saveUser, data: admin, error: [] });
                                }).catch(function (err) {
                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                });
                            });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 8:
                        _context3.next = 13;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](0);

                        res.status(402).send({ code: 402, message: _message2.default.errorMessage.genericError, data: [], error: _context3.t0 });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 10]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
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
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var email;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;

                        console.log('Calll Forgot Password API');
                        email = req.body.params.email;
                        _context5.next = 5;
                        return _admin2.default.findOne({ 'email': email.toLowerCase(), "applicationStatus": { $in: ['1', '2'] } }).then(function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(admin) {
                                var token, mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                if (!admin) {
                                                    _context4.next = 13;
                                                    break;
                                                }

                                                token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                                                admin.resetPasswordToken = token;
                                                admin.resetPasswordExpires = _config2.default.resetPasswordTokenExpireTime;
                                                _context4.next = 6;
                                                return admin.save();

                                            case 6:
                                                _context4.next = 8;
                                                return findMailLanguage(admin.language, "forgetPassword");

                                            case 8:
                                                mailContent = _context4.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/admin/adminForgotpass.ejs", { admin: admin, URL: config.adminUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: admin.email, subject: _message2.default.emails.forgotPassword.subject, template: 'admin/adminForgotpass.ejs', type: 'business', id: admin._id, data: { admin: admin, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function (result) {
                                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.forgotPassword, data: [], error: [] });
                                                }).catch(function (err) {
                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                });
                                                // SMTP.email(mailOptions)
                                                // .then(() => {
                                                //     res.status(200).send({ code: 200, message: Message.infoMessage.forgotPassword, data: [], error: [] });
                                                // })
                                                //     .catch((err) => {
                                                //         res.status(400).send({ code: 400, message: Message.errorMessage.genericError, data: [], error: err });
                                                //     });
                                                // })
                                                _context4.next = 14;
                                                break;

                                            case 13:
                                                res.status(401).send({ code: 401, message: _message2.default.errorMessage.emailNotFound, data: [], error: [] });

                                            case 14:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, undefined);
                            }));

                            return function (_x9) {
                                return _ref5.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 5:
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context5.t0 });

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
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
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _req$body$params2, password, token;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        _req$body$params2 = req.body.params, password = _req$body$params2.password, token = _req$body$params2.token;
                        _context7.next = 4;
                        return _admin2.default.findOne({ resetPasswordToken: token, adminType: 1, "applicationStatus": { $in: ['1', '2'] } }).then(function () {
                            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(admin) {
                                var savedUser, mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                if (!admin) {
                                                    _context6.next = 10;
                                                    break;
                                                }

                                                admin.password = password;
                                                savedUser = _admin2.default.saveUser(admin);
                                                _context6.next = 5;
                                                return findMailLanguage(admin.language, "resetPassword");

                                            case 5:
                                                mailContent = _context6.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/admin/resetPass.ejs", { admin: admin, URL: config.adminUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                // ejs.renderFile(config.mailUrl + "email/admin/resetPass.ejs", { admin: admin }).then(content => {
                                                mailOptions = { to: admin.email, subject: _message2.default.emails.resetPassword.subject, template: 'admin/resetPass.ejs', type: 'business', id: admin._id, data: { admin: admin, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function (result) {
                                                    res.status(200).send({
                                                        code: 200,
                                                        message: _message2.default.infoMessage.resetPassword,
                                                        data: [],
                                                        error: []
                                                    });
                                                }).catch(function (err) {
                                                    res.status(400).send({
                                                        code: 400,
                                                        message: _message2.default.errorMessage.genericError,
                                                        data: [],
                                                        error: err
                                                    });
                                                });
                                                // })
                                                // const mailOptions = {
                                                //     to: admin.email,
                                                //     subject: Message.emails.resetPassword.subject,
                                                //     text: util.format(Message.emails.resetPassword.body, admin.email)
                                                // };
                                                // SMTP.email(mailOptions)
                                                //     .then(() => {
                                                //         res.status(200).send({ code: 200, message: Message.infoMessage.resetPassword, data: [], error: [] });
                                                //     })
                                                _context6.next = 11;
                                                break;

                                            case 10:
                                                res.status(400).send({ code: 400, message: _message2.default.errorMessage.tokenNotFound, data: [], error: [] });

                                            case 11:
                                            case 'end':
                                                return _context6.stop();
                                        }
                                    }
                                }, _callee6, undefined);
                            }));

                            return function (_x12) {
                                return _ref7.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 4:
                        _context7.next = 9;
                        break;

                    case 6:
                        _context7.prev = 6;
                        _context7.t0 = _context7['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context7.t0 });

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 6]]);
    }));

    return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();
/**
 * Verify account if token is valid and not expire
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.verify = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var _req$body$params3, token, password;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;

                        console.log('Enter Admin verify API..................................');
                        _req$body$params3 = req.body.params, token = _req$body$params3.token, password = _req$body$params3.password;
                        _context9.next = 5;
                        return _admin2.default.findOne({ emailVerificationToken: token, applicationStatus: { $ne: 0 } }).then(function () {
                            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(users) {
                                var mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                if (!users) {
                                                    _context8.next = 12;
                                                    break;
                                                }

                                                users.password = password;
                                                users.emailVerificationToken = null;
                                                _context8.next = 5;
                                                return users.save();

                                            case 5:
                                                _context8.next = 7;
                                                return findMailLanguage(users.language, "verify");

                                            case 7:
                                                mailContent = _context8.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/admin/verify.ejs", { admin: users, URL: config.adminUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: users.email, subject: _message2.default.emails.verifyUser.subject, template: 'admin/verify.ejs', type: 'business', id: users._id, data: { admin: users, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function (result) {
                                                    res.status(200).send({
                                                        code: 200,
                                                        message: _message2.default.infoMessage.accountVerify,
                                                        data: [],
                                                        error: []
                                                    });
                                                }).catch(function (err) {
                                                    res.status(400).send({
                                                        code: 400,
                                                        message: _message2.default.errorMessage.genericError,
                                                        data: [],
                                                        error: err
                                                    });
                                                });
                                                // })
                                                _context8.next = 13;
                                                break;

                                            case 12:
                                                res.status(404).send({ code: 404, message: _message2.default.errorMessage.tokenNotFound, data: [], error: [] });

                                            case 13:
                                            case 'end':
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee8, undefined);
                            }));

                            return function (_x15) {
                                return _ref9.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 5:
                        _context9.next = 10;
                        break;

                    case 7:
                        _context9.prev = 7;
                        _context9.t0 = _context9['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context9.t0 });

                    case 10:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[0, 7]]);
    }));

    return function (_x13, _x14) {
        return _ref8.apply(this, arguments);
    };
}();

var findMailLanguage = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(languageId, label) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        return _context10.abrupt('return', _mailLanguages2.default.findOne({ languageId: languageId, label: label }));

                    case 1:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function findMailLanguage(_x16, _x17) {
        return _ref10.apply(this, arguments);
    };
}();