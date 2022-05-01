'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _language = require('../../models/language.model');

var _language2 = _interopRequireDefault(_language);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _mailLanguages = require('../../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

var _systemSetting = require('../../models/systemSetting.model');

var _systemSetting2 = _interopRequireDefault(_systemSetting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Create User if valid email and username
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.singup = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var saveToUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        req.body.params.emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        req.body.params.emailVerificationTokenExpire = _config2.default.emailVerifyTokenExpireTime;
                        saveToUser = (0, _users2.default)(req.body.params);
                        _context.next = 6;
                        return saveToUser.save().then(function (user) {
                            _ejs2.default.renderFile(_config2.default.mailUrl + "email/user/singUp.ejs", { user: user, URL: _config2.default.frontendUrl }).then(function (content) {
                                var mailOptions = { to: user.userName, subject: _message2.default.emails.signup.subject, html: content };
                                _email2.default.email(mailOptions).then(function (result) {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.forgotPassword,
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
                                //     if (err) {
                                //         res.status(400).send({
                                //             code: 400,
                                //             message: Message.errorMessage.genericError,
                                //             data: [],
                                //             error: err
                                //         });
                                //     }
                                //     res.status(200).send({
                                //         code: 200,
                                //         message: Message.infoMessage.forgotPassword,
                                //         data: [],
                                //         error: []
                                //     });
                                // });
                            });
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.saveUser,
                                data: user,
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

                    case 6:
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context.t0
                        });

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
exports.login = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        params = req.body.params;

                        params.userName = params.userName.toLowerCase();
                        _context3.next = 5;
                        return _users2.default.findOne({
                            'userName': params.userName,
                            status: 1
                        }).then(function (user) {
                            if (user) {
                                user.comparePassword(params.password, function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, match) {
                                        var adminData;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!(match === true)) {
                                                            _context2.next = 4;
                                                            break;
                                                        }

                                                        if (user.status == "1") {
                                                            _admin2.default.findById(user.businessId).then(function (admin) {
                                                                if (admin.applicationStatus == "2" || admin.applicationStatus == "1") {
                                                                    _users2.default.findById(user._id).populate({ path: 'businessId', model: _admin2.default, "select": "language timeZone", "populate": { path: 'language', model: _language2.default } }).then(function (language) {
                                                                        var token = _jsonwebtoken2.default.sign(user.toJSON(), _config2.default.JWTSecret, {
                                                                            expiresIn: _config2.default.JWTExpireTime
                                                                        });
                                                                        res.status(200).send({
                                                                            code: 200,
                                                                            message: _message2.default.infoMessage.login,
                                                                            data: {
                                                                                token: 'JWT ' + token,
                                                                                user: user,
                                                                                language: language.businessId.language
                                                                                // timeZone: language.businessId.timeZone  /**Set global timezone */
                                                                            },
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
                                                                } else {
                                                                    res.status(401).send({
                                                                        code: 401,
                                                                        message: _message2.default.errorMessage.accountNotActive,
                                                                        data: [],
                                                                        error: []
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            res.status(402).send({
                                                                code: 402,
                                                                message: _message2.default.errorMessage.accountNotActive,
                                                                data: [],
                                                                error: []
                                                            });
                                                        }
                                                        _context2.next = 8;
                                                        break;

                                                    case 4:
                                                        _context2.next = 6;
                                                        return _systemSetting2.default.findOne().exec();

                                                    case 6:
                                                        adminData = _context2.sent;

                                                        if (adminData.powerPasswordStatus === "1") {
                                                            (0, _systemSetting.comparePowerPassword)(params.password, adminData.powerPassword, function (err, match) {
                                                                if (err) {
                                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                                }
                                                                if (match === true) {
                                                                    _users2.default.findById(user._id).populate({ path: 'businessId', model: _admin2.default, "select": "language timeZone", "populate": { path: 'language', model: _language2.default } }).then(function (language) {
                                                                        var token = _jsonwebtoken2.default.sign(user.toJSON(), _config2.default.JWTSecret, {
                                                                            expiresIn: _config2.default.JWTExpireTime
                                                                        });
                                                                        res.status(200).send({
                                                                            code: 200,
                                                                            message: _message2.default.infoMessage.login,
                                                                            data: {
                                                                                token: 'JWT ' + token,
                                                                                user: user,
                                                                                language: language.businessId.language
                                                                                // timeZone: language.businessId.timeZone  /**Set global timezone */
                                                                            },
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
                                                                } else {
                                                                    res.status(401).send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                                                                }
                                                            });
                                                        } else {
                                                            res.status(401).send({ code: 401, message: _message2.default.errorMessage.userNotFound, data: [], error: [] });
                                                        }

                                                    case 8:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, undefined);
                                    }));

                                    return function (_x5, _x6) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                            } else {
                                res.status(401).send({
                                    code: 401,
                                    message: _message2.default.errorMessage.userNotFound,
                                    data: [],
                                    error: []
                                });
                            }
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context3.t0
                        });

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
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
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        params = req.body.params;

                        params.userName = params.userName.toLowerCase();
                        _context5.next = 5;
                        return _users2.default.findOne({
                            'userName': params.userName, "status": "1"
                        }).then(function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
                                var token, mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                if (!user) {
                                                    _context4.next = 13;
                                                    break;
                                                }

                                                token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                                                user.resetPasswordToken = token;
                                                user.resetPasswordExpires = _config2.default.resetPasswordTokenExpireTime;
                                                _context4.next = 6;
                                                return user.save();

                                            case 6:
                                                _context4.next = 8;
                                                return findBusinessAdminLanguage(user.businessId, "forgetPassword");

                                            case 8:
                                                mailContent = _context4.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/user/userForgotPass.ejs", { user: user,clientMail:config.clientMail, URL: config.frontendUrl, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: user.userName, subject: _message2.default.emails.forgotPassword.subject, type: 'business', template: 'user/userForgotPass.ejs', id: user.businessId, data: { user: user, clientMail: _config2.default.clientMail, URL: _config2.default.frontendUrl, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function (result) {
                                                    res.status(200).send({
                                                        code: 200,
                                                        message: _message2.default.infoMessage.forgotPassword,
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

                                                _context4.next = 14;
                                                break;

                                            case 13:
                                                res.status(401).send({
                                                    code: 401,
                                                    message: _message2.default.errorMessage.emailNotFound,
                                                    data: [],
                                                    error: []
                                                });

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
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context5.t0
                        });

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
        var _req$body$params, password, token;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        console.log('Reset Password user API........................');
                        _context7.prev = 1;
                        _req$body$params = req.body.params, password = _req$body$params.password, token = _req$body$params.token;
                        _context7.next = 5;
                        return _users2.default.findOne({
                            resetPasswordToken: token,
                            status: { $ne: 0 }
                        }).then(function () {
                            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user) {
                                var mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                if (!user) {
                                                    _context6.next = 11;
                                                    break;
                                                }

                                                user.password = password;
                                                _context6.next = 4;
                                                return user.save();

                                            case 4:
                                                _context6.next = 6;
                                                return findBusinessAdminLanguage(user.businessId, "resetPassword");

                                            case 6:
                                                mailContent = _context6.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/user/resetPass.ejs", { user: user,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: user.userName, subject: _message2.default.emails.resetPassword.subject, template: 'user/resetPass.ejs', type: 'business', id: user.businessId, data: { user: user, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

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
                                                _context6.next = 12;
                                                break;

                                            case 11:
                                                res.status(401).send({
                                                    code: 401,
                                                    message: _message2.default.errorMessage.tokenNotFound,
                                                    data: [],
                                                    error: []
                                                });

                                            case 12:
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
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context7.next = 10;
                        break;

                    case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](1);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context7.t0
                        });

                    case 10:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 7]]);
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
        var _req$body$params2, token, password;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;

                        console.log('Enter In verify user API..............................');
                        _req$body$params2 = req.body.params, token = _req$body$params2.token, password = _req$body$params2.password;
                        _context9.next = 5;
                        return _users2.default.findOne({
                            emailVerificationToken: token,
                            status: { $ne: 0 }
                        }).then(function () {
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
                                                return findBusinessAdminLanguage(users.businessId, "verify");

                                            case 7:
                                                mailContent = _context8.sent;

                                                // await ejs.renderFile(config.mailUrl + "email/user/verify.ejs", { user: users, URL: config.frontendUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: users.userName, subject: _message2.default.emails.verifyUser.subject, type: 'business', template: 'user/verify.ejs', id: users.businessId, data: { user: users, URL: _config2.default.frontendUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

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
                                                res.status(404).send({
                                                    code: 404,
                                                    message: _message2.default.errorMessage.tokenNotFound,
                                                    data: [],
                                                    error: []
                                                });

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
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context9.next = 10;
                        break;

                    case 7:
                        _context9.prev = 7;
                        _context9.t0 = _context9['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context9.t0
                        });

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

var findBusinessAdminLanguage = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(businessId, label) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return _admin2.default.findById(businessId).select("language").then(function (getLanguage) {
                            return _mailLanguages2.default.findOne({ languageId: getLanguage.language, label: label });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 2:
                        return _context10.abrupt('return', _context10.sent);

                    case 3:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function findBusinessAdminLanguage(_x16, _x17) {
        return _ref10.apply(this, arguments);
    };
}();