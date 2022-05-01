'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _supplierCategory = require('../../models/supplierCategory.model');

var _supplierCategory2 = _interopRequireDefault(_supplierCategory);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode, supplierLogo, supplierForSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            params.businessId = decode._id;
                            params.type = "2";
                            supplierLogo = "";
                            supplierForSave = (0, _supplier2.default)(params);

                            supplierForSave.save().then(function (supplier) {
                                params.supplierId = supplier._id;
                                var companySuppliers = (0, _companySuppliers2.default)(params);
                                companySuppliers.save().then(function (companySuppliers) {
                                    res.status(201).send({
                                        code: 201,
                                        Message: _message2.default.infoMessage.saveSupplier,
                                        data: supplier,
                                        error: []
                                    });
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    Message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    err: err
                                });
                            });
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
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
exports.edit = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _companySuppliers2.default.findByIdAndUpdate(params.id, params).then(function (supplier) {
                                _supplier2.default.findByIdAndUpdate(supplier.supplierId, params).then(function (supplierUpdate) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.updateData,
                                        data: supplier,
                                        error: []
                                    });
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    Message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    err: err
                                });
                            });
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
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
                        _context3.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context3.next = 5;
                        return _companySuppliers2.default.find({
                            businessId: decode._id,
                            type: "2",
                            status: {
                                $ne: 0
                            }
                        }).populate({
                            path: 'supplierId',
                            model: _supplier2.default
                        }).then(function (data) {
                            if (!data) {
                                res.status(401).send({
                                    code: 401,
                                    Message: _message2.default.errorMessage.dataNotFound,
                                    data: [],
                                    err: []
                                });
                            } else {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: data.sort(compare),
                                    error: []
                                });
                            }
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
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
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context3.t0
                        });

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
function compare(a, b) {
    var genreA = a.supplierId.name.toLowerCase(); //set which field was sorted
    var genreB = b.supplierId.name.toLowerCase();

    var comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}
exports.detail = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _companySuppliers2.default.aggregate([{
                                $match: {
                                    '_id': _mongoose2.default.Types.ObjectId(params.id)
                                }
                            }, {
                                $lookup: {
                                    from: 'productRangeItems',
                                    localField: '_id',
                                    foreignField: 'suppliersProduct.id',
                                    as: 'linkProductRangeItems'
                                }
                            }, {
                                $lookup: {
                                    from: 'suppliers',
                                    localField: 'supplierId',
                                    foreignField: '_id',
                                    as: 'linkSupplier'
                                }
                            }]).then(function (supplier) {
                                if (supplier && supplier.status != 0) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.getDetails,
                                        data: supplier,
                                        err: []
                                    });
                                } else {
                                    res.status(401).send({
                                        code: 401,
                                        Message: _message2.default.errorMessage.dataNotFound,
                                        data: [],
                                        err: []
                                    });
                                }
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    Message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    err: err
                                });
                            });
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
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
exports.delete = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        params = req.body.params;
                        _context5.next = 4;
                        return _companySuppliers2.default.findByIdAndUpdate(params.id, { status: 0 }, { new: true }).then(function (result) {
                            res.status(200).send({
                                code: 200,
                                Message: _message2.default.infoMessage.deleteUser,
                                data: result,
                                err: []
                            });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 4:
                        _context5.next = 9;
                        break;

                    case 6:
                        _context5.prev = 6;
                        _context5.t0 = _context5['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context5.t0
                        });

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 6]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

exports.suggestion = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            _supplier2.default.find({
                                type: "2",
                                status: {
                                    $ne: "0"
                                }
                            }).then(function (suppliers) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: suppliers,
                                    error: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    Message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    err: err
                                });
                            });
                        } catch (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        }

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();