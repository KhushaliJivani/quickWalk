'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _environment = require('../../../../environment');

var _environment2 = _interopRequireDefault(_environment);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _language = require('../../models/language.model');

var _language2 = _interopRequireDefault(_language);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mailLanguages = require('../../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplierCategory = require('../../models/supplierCategory.model');

var _supplierCategory2 = _interopRequireDefault(_supplierCategory);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _checklistCombination = require('../../models/checklistCombination.model');

var _checklistCombination2 = _interopRequireDefault(_checklistCombination);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 *  Create Admin if valid email and username
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _admin2.default.findOne({ email: req.body.params.email, "applicationStatus": { $ne: 0 } }).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(result) {
                                var exe, decode, saveAdmin;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (!result) {
                                                    _context2.next = 4;
                                                    break;
                                                }

                                                res.status(409).send({ code: 409, Message: _message2.default.errorMessage.userAlreadyExists, data: [], err: [] });
                                                _context2.next = 16;
                                                break;

                                            case 4:
                                                exe = req.headers.authorization.split(' ');
                                                decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                                                req.body.params.adminId = decode._id;
                                                req.body.params.adminType = "1";
                                                req.body.params.email = req.body.params.email.toLowerCase();
                                                req.body.params.isAdminActive = "0";
                                                req.body.params.emailVerificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                                                // if(!req.body.params.timeZone){
                                                //     req.body.params.timeZone = "Asia/Kathmandu";/**static timezone set */
                                                // }
                                                _context2.next = 13;
                                                return (0, _admin2.default)(req.body.params);

                                            case 13:
                                                saveAdmin = _context2.sent;
                                                _context2.next = 16;
                                                return saveAdmin.save().then(function () {
                                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
                                                        var mailContent, mailOptions;
                                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        if (!(result.applicationStatus == "2" || result.applicationStatus == "1")) {
                                                                            _context.next = 11;
                                                                            break;
                                                                        }

                                                                        result.isAdminActive = "1";
                                                                        _context.next = 4;
                                                                        return result.save();

                                                                    case 4:
                                                                        _context.next = 6;
                                                                        return findMailLanguage(result.language, "signUp");

                                                                    case 6:
                                                                        mailContent = _context.sent;

                                                                        // await ejs.renderFile(config.mailUrl +"email/admin/signUp.ejs", )
                                                                        // .then(content => {
                                                                        // await ejs.renderFile(config.mailUrl +"email/admin/signUp.ejs", { admin: result,URL:config.adminUrl }).then(content => {
                                                                        mailOptions = { to: result.email, subject: _message2.default.emails.signup.subject, template: 'admin/signUp.ejs', type: 'business', id: result._id, data: { admin: result, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                                        _email2.default.email(mailOptions).then(function () {
                                                                            res.status(201).send({ code: 201, Message: _message2.default.infoMessage.forgotPassword, data: [], error: [] });
                                                                        });

                                                                        // res.status(201).send({ code: 201, Message: Message.infoMessage.saveAdmin, data: result, err: [] });
                                                                        // })
                                                                        _context.next = 12;
                                                                        break;

                                                                    case 11:
                                                                        res.status(201).send({ code: 201, Message: _message2.default.infoMessage.saveAdmin, data: [], error: [] });

                                                                    case 12:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, undefined);
                                                    }));

                                                    return function (_x4) {
                                                        return _ref3.apply(this, arguments);
                                                    };
                                                }()).catch(function (err) {
                                                    res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                                                });

                                            case 16:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 3:
                        _context3.next = 8;
                        break;

                    case 5:
                        _context3.prev = 5;
                        _context3.t0 = _context3['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context3.t0 });

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 5]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
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
                        return _admin2.default.findOne({ emailVerificationToken: token }).then(function (result) {
                            if (result) {
                                result.applicationStatus = "2";
                                result.password = password;
                                result.save();

                                _ejs2.default.renderFile(_config2.default.mailUrl + "email/admin/verify.ejs", { admin: result, clientMail: _config2.default.clientMail, URL: _environment2.default.development.masterAdminUri }).then(function (content) {
                                    var mailOptions = { to: result.email, subject: _message2.default.emails.verifyUser.subject, html: content };
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
                                }).catch(function (err) {
                                    res.status(400).send({
                                        code: 400,
                                        message: _message2.default.errorMessage.genericError,
                                        data: [],
                                        error: err
                                    });
                                });
                            }
                            res.status(404).send({ code: 404, Message: _message2.default.errorMessage.tokenNotFound, data: [], err: [] });
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

    return function (_x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();
exports.edit = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context6.next = 6;
                        return _admin2.default.findById(req.body.params.id).then(function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(adminData) {
                                var updateAdminData, mailContent, mailOptions, _updateAdminData;

                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                if (!(adminData.isAdminActive == "0" && params.applicationStatus == "2")) {
                                                    _context5.next = 12;
                                                    break;
                                                }

                                                params.isAdminActive = "1";
                                                _context5.next = 4;
                                                return updateAdmin(params);

                                            case 4:
                                                updateAdminData = _context5.sent;
                                                _context5.next = 7;
                                                return findMailLanguage(updateAdminData.language, "signUp");

                                            case 7:
                                                mailContent = _context5.sent;

                                                // await ejs.renderFile(config.mailUrl +"email/admin/signUp.ejs", { admin: updateAdminData,URL:config.adminUrl,clientMail:config.clientMail, 
                                                // mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort }).then(content => {
                                                mailOptions = { to: updateAdminData.email, subject: _message2.default.emails.signup.subject, template: 'admin/signUp.ejs', type: 'business', id: adminData._id, data: { admin: updateAdminData, URL: _config2.default.adminUrl, clientMail: _config2.default.clientMail, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort } };

                                                _email2.default.email(mailOptions).then(function () {
                                                    res.status(200).send({ code: 200, Message: _message2.default.infoMessage.forgotPassword, data: [], error: [] });
                                                }).catch(function (err) {
                                                    res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                                                });
                                                // })
                                                _context5.next = 16;
                                                break;

                                            case 12:
                                                _context5.next = 14;
                                                return updateAdmin(params);

                                            case 14:
                                                _updateAdminData = _context5.sent;

                                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.updateData, data: _updateAdminData, error: [] });

                                            case 16:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, undefined);
                            }));

                            return function (_x9) {
                                return _ref6.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 6:
                        _context6.next = 11;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context6.t0 });

                    case 11:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 8]]);
    }));

    return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();

var updateAdmin = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(params) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _admin2.default.findByIdAndUpdate(params.id, params, { new: true }).then(function (result) {
                            return result;
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 2:
                        return _context7.abrupt('return', _context7.sent);

                    case 3:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function updateAdmin(_x10) {
        return _ref7.apply(this, arguments);
    };
}();
/**
 *  get admin data 
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.adminGet = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        _context8.next = 3;
                        return _admin2.default.find({ "adminType": 1, "applicationStatus": { $ne: 0 } }).populate({
                            path: 'language', model: _language2.default
                        }).sort({ createdAt: 'desc' }).then(function (result) {
                            res.status(200).send({ code: 200, Message: _message2.default.infoMessage.getDetails, data: result, err: [] });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 3:
                        _context8.next = 8;
                        break;

                    case 5:
                        _context8.prev = 5;
                        _context8.t0 = _context8['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context8.t0 });

                    case 8:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 5]]);
    }));

    return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
    };
}();

/**
 *  admin delete if valid jwt token 
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.adminDelete = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context10.next = 5;
                        return _admin2.default.findById(req.body.params.id).then(function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(result) {
                                var removeUser, removeProductRange, removeSupplierProduct, removeChecklist, removeLocation, removeCompanySupplier, removeSupplier, removechecklistCombination, removeCategorie, removeOrderDetail, order;
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                        switch (_context9.prev = _context9.next) {
                                            case 0:
                                                if (!(result.applicationStatus != 0)) {
                                                    _context9.next = 40;
                                                    break;
                                                }

                                                result.applicationStatus = 0;
                                                _context9.next = 4;
                                                return result.save();

                                            case 4:
                                                _context9.next = 6;
                                                return removeUsers(result._id);

                                            case 6:
                                                removeUser = _context9.sent;
                                                _context9.next = 9;
                                                return removeProductRanges(result._id);

                                            case 9:
                                                removeProductRange = _context9.sent;
                                                _context9.next = 12;
                                                return removeSupplierProducts(result._id);

                                            case 12:
                                                removeSupplierProduct = _context9.sent;
                                                _context9.next = 15;
                                                return removeChecklists(result._id);

                                            case 15:
                                                removeChecklist = _context9.sent;
                                                _context9.next = 18;
                                                return removeLocations(result._id);

                                            case 18:
                                                removeLocation = _context9.sent;
                                                _context9.next = 21;
                                                return removeCompanySuppliers(result._id);

                                            case 21:
                                                removeCompanySupplier = _context9.sent;
                                                _context9.next = 24;
                                                return removeSuppliers(result._id);

                                            case 24:
                                                removeSupplier = _context9.sent;
                                                _context9.next = 27;
                                                return removechecklistCombinations(result._id);

                                            case 27:
                                                removechecklistCombination = _context9.sent;
                                                _context9.next = 30;
                                                return removeCategories(result._id);

                                            case 30:
                                                removeCategorie = _context9.sent;
                                                _context9.next = 33;
                                                return removeOrderDetails(result._id);

                                            case 33:
                                                removeOrderDetail = _context9.sent;
                                                _context9.next = 36;
                                                return orders(result._id);

                                            case 36:
                                                order = _context9.sent;

                                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.deleteUser, data: result, err: [] });
                                                _context9.next = 41;
                                                break;

                                            case 40:
                                                res.status(200).send({ code: 200, Message: _message2.default.infoMessage.alreadyDelete, data: result, err: [] });

                                            case 41:
                                            case 'end':
                                                return _context9.stop();
                                        }
                                    }
                                }, _callee9, undefined);
                            }));

                            return function (_x15) {
                                return _ref10.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 5:
                        _context10.next = 10;
                        break;

                    case 7:
                        _context10.prev = 7;
                        _context10.t0 = _context10['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context10.t0 });

                    case 10:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[0, 7]]);
    }));

    return function (_x13, _x14) {
        return _ref9.apply(this, arguments);
    };
}();

var removeUsers = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(businessId) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        return _context11.abrupt('return', _users2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function removeUsers(_x16) {
        return _ref11.apply(this, arguments);
    };
}();
var removeProductRanges = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(businessId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        return _context12.abrupt('return', _productRangeItems2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined);
    }));

    return function removeProductRanges(_x17) {
        return _ref12.apply(this, arguments);
    };
}();
var removeSupplierProducts = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(businessId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        return _context13.abrupt('return', _supplierProducts2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined);
    }));

    return function removeSupplierProducts(_x18) {
        return _ref13.apply(this, arguments);
    };
}();
var removeChecklists = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(businessId) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        return _context14.abrupt('return', _checklist2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, undefined);
    }));

    return function removeChecklists(_x19) {
        return _ref14.apply(this, arguments);
    };
}();
var removeLocations = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(businessId) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        return _context15.abrupt('return', _location2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, undefined);
    }));

    return function removeLocations(_x20) {
        return _ref15.apply(this, arguments);
    };
}();
var removeCompanySuppliers = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(businessId) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        return _context16.abrupt('return', _companySuppliers2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, _callee16, undefined);
    }));

    return function removeCompanySuppliers(_x21) {
        return _ref16.apply(this, arguments);
    };
}();
var removeSuppliers = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(businessId) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        return _context17.abrupt('return', _supplier2.default.updateMany({ businessId: businessId }, { status: 0 }).exec());

                    case 1:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, undefined);
    }));

    return function removeSuppliers(_x22) {
        return _ref17.apply(this, arguments);
    };
}();
var removechecklistCombinations = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(businessId) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        return _context18.abrupt('return', _checklistCombination2.default.updateMany({ businessId: businessId }, { isDelete: 1 }).exec());

                    case 1:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee18, undefined);
    }));

    return function removechecklistCombinations(_x23) {
        return _ref18.apply(this, arguments);
    };
}();
var removeCategories = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(businessId) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        _context19.next = 2;
                        return _companySuppliers2.default.find({ businessId: businessId }).then(function (comapnySupplier) {
                            if (comapnySupplier) {
                                return _supplierCategory2.default.updateMany({ supplierId: { $in: comapnySupplier } }, { status: 0 }).exec();
                            } else {
                                return comapnySupplier;
                            }
                        });

                    case 2:
                        return _context19.abrupt('return', _context19.sent);

                    case 3:
                    case 'end':
                        return _context19.stop();
                }
            }
        }, _callee19, undefined);
    }));

    return function removeCategories(_x24) {
        return _ref19.apply(this, arguments);
    };
}();
var removeOrderDetails = function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(businessId) {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        return _context20.abrupt('return', _orderDetail2.default.deleteMany({ businessId: businessId }).exec());

                    case 1:
                    case 'end':
                        return _context20.stop();
                }
            }
        }, _callee20, undefined);
    }));

    return function removeOrderDetails(_x25) {
        return _ref20.apply(this, arguments);
    };
}();
var orders = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(businessId) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        return _context21.abrupt('return', _order2.default.deleteMany({ businessId: businessId }).exec());

                    case 1:
                    case 'end':
                        return _context21.stop();
                }
            }
        }, _callee21, undefined);
    }));

    return function orders(_x26) {
        return _ref21.apply(this, arguments);
    };
}();

exports.detail = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        _context22.prev = 0;
                        params = req.body.params;
                        _context22.next = 4;
                        return _admin2.default.findById(params.id).then(function (admin) {
                            res.status(200).send({ code: 200, Message: _message2.default.infoMessage.deleteUser, data: admin, err: [] });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 4:
                        _context22.next = 9;
                        break;

                    case 6:
                        _context22.prev = 6;
                        _context22.t0 = _context22['catch'](0);

                        res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: _context22.t0 });

                    case 9:
                    case 'end':
                        return _context22.stop();
                }
            }
        }, _callee22, undefined, [[0, 6]]);
    }));

    return function (_x27, _x28) {
        return _ref22.apply(this, arguments);
    };
}();

var findMailLanguage = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(languageId, label) {
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        return _context23.abrupt('return', _mailLanguages2.default.findOne({ languageId: languageId, label: label }));

                    case 1:
                    case 'end':
                        return _context23.stop();
                }
            }
        }, _callee23, undefined);
    }));

    return function findMailLanguage(_x29, _x30) {
        return _ref23.apply(this, arguments);
    };
}();