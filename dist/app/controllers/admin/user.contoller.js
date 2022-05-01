'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

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

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mailLanguages = require('../../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        params = req.body.params;

                        params.userName.toLowerCase();
                        params.userName = params.userName.toLowerCase();
                        _context2.next = 6;
                        return _users2.default.findOne({ userName: params.userName, status: { $ne: 0 } }).then(function (foundUser) {
                            if (foundUser) {
                                res.status(409).send({ code: 409, Message: _message2.default.errorMessage.userAlreadyExists, data: [], err: [] });
                            } else {
                                var exe = req.headers.authorization.split(' ');
                                var _decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                                params.businessId = _decode._id;
                                params.isUserActive = "0";
                                params.emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                var saveUser = (0, _users2.default)(params);
                                saveUser.save().then(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
                                        var mailContent, mailOptions;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (!(result.status == "1")) {
                                                            _context.next = 11;
                                                            break;
                                                        }

                                                        result.isUserActive = "1";
                                                        _context.next = 4;
                                                        return result.save();

                                                    case 4:
                                                        _context.next = 6;
                                                        return findBusinessAdminLanguage(result.businessId, "signUp");

                                                    case 6:
                                                        mailContent = _context.sent;

                                                        // await ejs.renderFile(config.mailUrl +"email/user/signUp.ejs", { user: result , URL:config.frontendUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                        mailOptions = { to: result.userName, subject: _message2.default.emails.signup.subject, template: 'user/signUp.ejs', type: 'business', id: _decode._id, data: { user: result, URL: _config2.default.frontendUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                        _email2.default.email(mailOptions).then(function (result) {
                                                            res.status(201).send({
                                                                code: 201,
                                                                message: _message2.default.infoMessage.forgotPassword,
                                                                data: [],
                                                                error: []
                                                            });
                                                        }).catch(function (err) {
                                                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                                                        });
                                                        // }).catch((err) => {
                                                        //     res.status(400).send({ code: 400, Message: Message.errorMessage.genericError, data: [], err: err });
                                                        // });
                                                        _context.next = 12;
                                                        break;

                                                    case 11:
                                                        res.status(201).send({ code: 201, message: _message2.default.infoMessage.saveUser, data: [], error: [] });

                                                    case 12:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, undefined);
                                    }));

                                    return function (_x3) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }()).catch(function (err) {
                                    res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                                });
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 6:
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context2.t0 });

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
exports.get = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var exe, _decode2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            _decode2 = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _users2.default.find({ status: { $ne: 0 }, businessId: _decode2._id }).collation({ locale: "en" }).sort({ firstName: 1 }).then(function (result) {
                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.getDetails, data: result, err: [] });
                            }).catch(function (err) {
                                res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                            });
                        } catch (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();
exports.verify = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$body$params, token, password;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _req$body$params = req.body.params, token = _req$body$params.token, password = _req$body$params.password;
                        _context4.next = 4;
                        return _users2.default.findOne({ emailVerificationToken: token }).then(function (result) {
                            if (result) {
                                result.status = "1";
                                result.password = password;
                                result.save();
                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.accountVerify, data: [], err: [] });
                            } else {
                                res.status(404).send({ code: 404, Message: _message2.default.errorMessage.tokenNotFound, data: [], err: [] });
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 4:
                        _context4.next = 9;
                        break;

                    case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context4.t0 });

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
exports.detail = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        params = req.body.params;
                        _context5.next = 4;
                        return _users2.default.findOne({ _id: params.id, "status": { $ne: '0' } }).then(function (result) {
                            if (result) {
                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.getDetails, data: result, err: [] });
                            } else {
                                res.status(404).send({ code: 404, Message: _message2.default.errorMessage.dataNotFound, data: [], err: [] });
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 4:
                        _context5.next = 9;
                        break;

                    case 6:
                        _context5.prev = 6;
                        _context5.t0 = _context5['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context5.t0 });

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 6]]);
    }));

    return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();
exports.delete = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        params = req.body.params;
                        _context6.next = 4;
                        return _users2.default.find({ _id: params.id }).then(function (result) {
                            if (result.length > 0) {
                                result[0].status = 0;
                                result[0].save();
                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.deleteUser, data: result, err: [] });
                            } else {
                                res.status(404).send({ code: 404, Message: _message2.default.errorMessage.userNotFound, data: result, err: [] });
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 4:
                        _context6.next = 9;
                        break;

                    case 6:
                        _context6.prev = 6;
                        _context6.t0 = _context6['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context6.t0 });

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 6]]);
    }));

    return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();
exports.edit = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        params = req.body.params;
                        _context8.next = 4;
                        return _users2.default.findById(params.id).then(function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userData) {
                                var updateUserData, mailContent, mailOptions, _updateUserData;

                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                if (!(userData.isUserActive == "0" && params.status == "1")) {
                                                    _context7.next = 12;
                                                    break;
                                                }

                                                params.isUserActive = "1";
                                                _context7.next = 4;
                                                return updateUser(params);

                                            case 4:
                                                updateUserData = _context7.sent;
                                                _context7.next = 7;
                                                return findBusinessAdminLanguage(updateUserData.businessId, "signUp");

                                            case 7:
                                                mailContent = _context7.sent;

                                                // await ejs.renderFile(config.mailUrl +"email/user/signUp.ejs", { user: updateUserData , URL:config.frontendUrl,clientMail:config.clientMail, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: updateUserData.userName, subject: _message2.default.emails.signup.subject, template: 'user/signUp.ejs', type: 'business', id: decode._id, data: { user: updateUserData, URL: _config2.default.frontendUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function (result) {
                                                    res.status(200).send({
                                                        code: 200,
                                                        message: _message2.default.infoMessage.forgotPassword,
                                                        data: [],
                                                        error: []
                                                    });
                                                }).catch(function (err) {
                                                    res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                                                });
                                                // }).catch((err) => {
                                                //     res.status(400).send({ code: 400, Message: Message.errorMessage.genericError, data: [], err: err });
                                                // });
                                                _context7.next = 16;
                                                break;

                                            case 12:
                                                _context7.next = 14;
                                                return updateUser(params);

                                            case 14:
                                                _updateUserData = _context7.sent;

                                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.updateData, data: _updateUserData, error: [] });

                                            case 16:
                                            case 'end':
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, undefined);
                            }));

                            return function (_x14) {
                                return _ref8.apply(this, arguments);
                            };
                        }());

                    case 4:
                        _context8.next = 9;
                        break;

                    case 6:
                        _context8.prev = 6;
                        _context8.t0 = _context8['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context8.t0 });

                    case 9:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 6]]);
    }));

    return function (_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

var updateUser = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(params) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return _users2.default.findByIdAndUpdate(params.id, params, { new: true }).then(function (result) {
                            return result;
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 2:
                        return _context9.abrupt('return', _context9.sent);

                    case 3:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function updateUser(_x15) {
        return _ref9.apply(this, arguments);
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