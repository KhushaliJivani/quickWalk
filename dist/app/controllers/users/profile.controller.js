'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import groupModel from '../../models/group.model';


/**
 * Update Profile if params is valid
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.updateProfile = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode, pam;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            if (params.image !== undefined && params.image !== null) {
                                pam = {
                                    'destination': 'profile-image',
                                    'decodeImage': params.image,
                                    fieldName: 'image',
                                    imageOrignalName: params.imageName
                                };

                                _uploadFile2.default.base64Upload(pam, function (err, imageName) {
                                    if (imageName) {
                                        params.image = imageName;
                                        _users2.default.findByIdAndUpdate(decode._id, params, {
                                            upsert: true,
                                            new: true
                                        }).then(function (admin) {
                                            res.status(200).send({
                                                code: 200,
                                                message: _message2.default.infoMessage.updateProfile,
                                                data: admin,
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
                                        res.status(400).send({
                                            code: 400,
                                            message: _message2.default.errorMessage.genericError,
                                            data: [],
                                            error: err
                                        });
                                    }
                                });
                            } else {
                                _users2.default.findByIdAndUpdate(decode._id, params, {
                                    upsert: true,
                                    new: true
                                }).then(function (admin) {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.updateProfile,
                                        data: admin,
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
                            }
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        }

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
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
                        try {
                            _req$body$params = req.body.params, password = _req$body$params.password, oldPassword = _req$body$params.oldPassword;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _users2.default.findById(decode._id).then(function (admin) {
                                admin.comparePassword(oldPassword, function (err, match) {
                                    if (err) {
                                        res.status(400).send({
                                            code: 400,
                                            message: _message2.default.errorMessage.genericError,
                                            data: [],
                                            error: err
                                        });
                                    }
                                    if (match === true) {
                                        admin.password = password;
                                        admin.save();
                                        res.status(200).send({
                                            code: 200,
                                            message: _message2.default.infoMessage.updateProfile,
                                            data: [],
                                            error: []
                                        });
                                    } else {
                                        res.status(401).send({
                                            code: 401,
                                            message: _message2.default.errorMessage.passwordNotMatch,
                                            data: [],
                                            error: []
                                        });
                                    }
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    error: err
                                });
                            });
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        }

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
exports.get = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _users2.default.findById(decode._id).then(function (admin) {
                                if (admin !== null && admin.groups !== '0') {} else {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.getProfile,
                                        data: {
                                            'profile': admin,
                                            'group': '0'
                                        },
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
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();