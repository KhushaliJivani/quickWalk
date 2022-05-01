'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _language = require('.././../models/language.model');

var _language2 = _interopRequireDefault(_language);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _systemSetting = require('../../models/systemSetting.model');

var _systemSetting2 = _interopRequireDefault(_systemSetting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * get language 
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.updateProfile = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params, tempPassword, exe, decode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        params = req.body.params;
                        tempPassword = void 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                        if (params.password != undefined) {
                            tempPassword = params.password;
                        }
                        delete params.password;
                        _context2.next = 9;
                        return _admin2.default.findByIdAndUpdate(decode._id, params, { new: true }).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(admin) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (tempPassword != undefined) {
                                                    admin.password = tempPassword;
                                                }
                                                admin.save().then(function (adminData) {
                                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateProfile, data: adminData, error: [] });
                                                }).catch(function (err) {
                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                });

                                            case 2:
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
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 9:
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context2.t0 });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.powerPassword = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            (0, _systemSetting.savePowerPassword)(params.powerPassword, function (err, hash) {
                                if (err) {
                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                }
                                params.powerPassword = hash;
                                _systemSetting2.default.findOne().then(function (settings) {
                                    if (settings) {
                                        settings.powerPassword = params.powerPassword;
                                        settings.powerPasswordStatus = params.powerPasswordStatus;
                                        settings.save();
                                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateData, data: settings, error: [] });
                                    } else {
                                        var systemSettings = (0, _systemSetting2.default)(params);
                                        systemSettings.save();
                                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateData, data: settings, error: [] });
                                    }
                                }).catch(function (err) {
                                    res.status(400).send({ code: 401, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                });
                            });
                        } catch (err) {
                            res.status(400).send({ code: 402, message: _message2.default.errorMessage.genericError, data: [], error: err });
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

exports.getProfile = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _admin2.default.findById(decode._id).then(function (admin) {
                                return admin;
                            }).then(function (admin) {
                                _systemSetting2.default.findOne().then(function (settings) {
                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.getDetails, data: { profile: admin, settings: settings }, error: [] });
                                });
                            }).catch(function (err) {
                                res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                            });
                        } catch (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        }

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

exports.saveCutomMail = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _systemSetting2.default.findOne().then(function (settings) {
                                if (settings) {
                                    settings.masterEmail = params.email;
                                    settings.save();
                                    res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateData, data: [], error: [] });
                                } else {
                                    var systemSettings = (0, _systemSetting2.default)(params);
                                    systemSettings.save();
                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                }
                            }).catch(function (err) {
                                res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                            });
                        } catch (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        }

                    case 1:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();