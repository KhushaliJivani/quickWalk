'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * checklist add by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.addChecklist = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var exe, decode, params, checklistData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                            params = req.body.params;

                            params.businessId = decode._id;
                            checklistData = (0, _checklist2.default)(params);

                            checklistData.save().then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.updateData,
                                    data: result,
                                    error: []
                                });
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
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
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * checklist edit by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.editChecklist = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var exe, decode, params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                            params = req.body.params;

                            params.businessId = decode._id;
                            _checklist2.default.findByIdAndUpdate(params.id, params, {
                                new: true
                            }).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.updateData,
                                    data: result,
                                    error: []
                                });
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
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

/**
 * checklist delete by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.deleteChecklist = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _checklist2.default.findById(params.id).then(function (result) {
                                if (result.status != "0") {
                                    result.status = 0;
                                    result.save();
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.deleteChecklist,
                                        data: result,
                                        error: []
                                    });
                                } else {
                                    res.status(409).send({
                                        code: 409,
                                        Message: _message2.default.infoMessage.alreadyDelete,
                                        data: result,
                                        err: []
                                    });
                                }
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
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

/**
 * all checklist get by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.getChecklist = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _checklist2.default.find({
                                "businessId": decode._id,
                                status: {
                                    $ne: 0
                                }
                            }).populate({ path: 'product', model: _productRangeItems2.default, match: { status: "1" } }).sort({
                                name: 1
                            }).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: result,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
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
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * single checklist get by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.detailsChecklistGet = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _checklist2.default.findById(params.id).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: result,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
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
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();