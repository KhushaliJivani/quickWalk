'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode, productImage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            params.businessId = decode._id;
                            productImage = "";

                            _productRangeItems2.default.find({
                                locationId: params.locationId,
                                status: {
                                    $ne: 0
                                }
                            }).then(function (location) {
                                params.locationPreferredIndex = location.length + 1;
                                var productForSave = (0, _productRangeItems2.default)(params);
                                return productForSave.save();
                            }).then(function (product) {
                                if (Boolean(params.photo)) {
                                    var param = {
                                        'destination': 'product',
                                        'decodeImage': params.photo,
                                        fieldName: 'imageName',
                                        imageOrignalName: params.imageName
                                    };
                                    return _uploadFile2.default.base64Upload(param).then(function (image) {
                                        product.image = image;
                                        product.save();
                                        return product;
                                    });
                                } else {
                                    return product;
                                }
                            }).then(function (product) {
                                var updateArray = {
                                    $push: {
                                        product: product._id
                                    }
                                };
                                _checklist2.default.updateMany({
                                    _id: {
                                        $in: params.checklist
                                    }
                                }, updateArray).then(function (checklist) {
                                    res.status(201).send({
                                        code: 201,
                                        Message: _message2.default.infoMessage.saveProduct,
                                        data: product,
                                        error: []
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

exports.edit = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                        params.businessId = decode._id;
                        _context3.next = 7;
                        return _productRangeItems2.default.findByIdAndUpdate(params.id, params, {
                            new: true
                        }).then(function (data) {
                            if (Boolean(params.imageName)) {
                                var param = {
                                    'destination': 'product',
                                    'decodeImage': params.photo,
                                    fieldName: 'imageName',
                                    imageOrignalName: params.imageName
                                };
                                return _uploadFile2.default.base64Upload(param).then(function (image) {
                                    data.image = image;
                                    return data.save();
                                });
                            } else {
                                return data;
                            }
                        }).then(function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
                                var removeProduct, insertProduct;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.next = 2;
                                                return removeAllChecklistProduct(product);

                                            case 2:
                                                removeProduct = _context2.sent;

                                                if (!(params.checklist.length > 0)) {
                                                    _context2.next = 10;
                                                    break;
                                                }

                                                _context2.next = 6;
                                                return insertProductChecklist(product, params);

                                            case 6:
                                                insertProduct = _context2.sent;

                                                res.status(200).send({
                                                    code: 200,
                                                    Message: _message2.default.infoMessage.updateData,
                                                    data: product,
                                                    error: []
                                                });
                                                _context2.next = 11;
                                                break;

                                            case 10:
                                                res.status(200).send({
                                                    code: 200,
                                                    Message: _message2.default.infoMessage.updateData,
                                                    data: product,
                                                    error: []
                                                });

                                            case 11:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x5) {
                                return _ref3.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 7:
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context3.t0
                        });

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var insertProductChecklist = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(product, params) {
        var updateArray;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        updateArray = {
                            $push: {
                                product: product._id
                            }
                        };
                        _context4.next = 3;
                        return _checklist2.default.updateMany({ _id: { $in: params.checklist } }, updateArray);

                    case 3:
                        return _context4.abrupt('return', _context4.sent);

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function insertProductChecklist(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
var removeAllChecklistProduct = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(product) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _checklist2.default.updateMany({ status: { $ne: 0 } }, { $pull: { product: product._id } }).exec();

                    case 2:
                        return _context5.abrupt('return', _context5.sent);

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function removeAllChecklistProduct(_x8) {
        return _ref5.apply(this, arguments);
    };
}();

exports.get = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context6.next = 5;
                        return _productRangeItems2.default.find({
                            businessId: decode._id,
                            status: {
                                $ne: 0
                            }
                        }).collation({ locale: "en" }).sort({ name: 1 }).then(function (data) {
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
                                    data: data,
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
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context6.t0
                        });

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 7]]);
    }));

    return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

exports.detail = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        params = req.body.params;
                        _context7.next = 4;
                        return _productRangeItems2.default.findById(params.id).sort({
                            createdAt: 'desc'
                        }).populate({
                            path: 'suppliersProduct.supplierProductId',
                            model: _supplierProducts2.default
                        }).then(function (result) {
                            return result;
                        }).then(function (product) {
                            _checklist2.default.find({
                                product: params.id
                            }).then(function (checklist) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: {
                                        product: product,
                                        checklist: checklist
                                    },
                                    err: []
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

                    case 4:
                        _context7.next = 9;
                        break;

                    case 6:
                        _context7.prev = 6;
                        _context7.t0 = _context7['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context7.t0
                        });

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[0, 6]]);
    }));

    return function (_x11, _x12) {
        return _ref7.apply(this, arguments);
    };
}();

exports.delete = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        params = req.body.params;
                        _context9.next = 4;
                        return _productRangeItems2.default.findByIdAndUpdate(params.id, { status: 0 }, { new: true }).then(function () {
                            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(result) {
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                res.status(200).send({
                                                    code: 200,
                                                    Message: _message2.default.infoMessage.deleteProduct,
                                                    data: result,
                                                    err: []
                                                });

                                            case 1:
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
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 4:
                        _context9.next = 9;
                        break;

                    case 6:
                        _context9.prev = 6;
                        _context9.t0 = _context9['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context9.t0
                        });

                    case 9:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[0, 6]]);
    }));

    return function (_x13, _x14) {
        return _ref8.apply(this, arguments);
    };
}();
var removeChecklistProduct = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(checklist, params, res, result) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleChecklist;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context10.prev = 3;
                        _iterator = checklist[Symbol.iterator]();

                    case 5:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context10.next = 12;
                            break;
                        }

                        singleChecklist = _step.value;
                        _context10.next = 9;
                        return _checklist2.default.findByIdAndUpdate(singleChecklist._id, { $pull: { product: params.id } }, { new: true });

                    case 9:
                        _iteratorNormalCompletion = true;
                        _context10.next = 5;
                        break;

                    case 12:
                        _context10.next = 18;
                        break;

                    case 14:
                        _context10.prev = 14;
                        _context10.t0 = _context10['catch'](3);
                        _didIteratorError = true;
                        _iteratorError = _context10.t0;

                    case 18:
                        _context10.prev = 18;
                        _context10.prev = 19;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 21:
                        _context10.prev = 21;

                        if (!_didIteratorError) {
                            _context10.next = 24;
                            break;
                        }

                        throw _iteratorError;

                    case 24:
                        return _context10.finish(21);

                    case 25:
                        return _context10.finish(18);

                    case 26:
                        res.status(200).send({
                            code: 200,
                            Message: _message2.default.infoMessage.deleteProduct,
                            data: result,
                            err: []
                        });

                    case 27:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function removeChecklistProduct(_x16, _x17, _x18, _x19) {
        return _ref10.apply(this, arguments);
    };
}();

exports.linkedProductWithSupplierProduct = function (req, res) {
    try {
        var params = req.body.params;

        _productRangeItems2.default.findById(params.id).populate({
            path: 'suppliersProduct.supplierProductId',
            model: _supplierProducts2.default
        }).populate({
            path: 'suppliersProduct.id',
            model: _companySuppliers2.default,
            select: 'supplierId status',
            populate: {
                path: 'supplierId',
                model: _supplier2.default,
                select: 'name'
            }
        }).sort({
            createdAt: 'desc'
        }).then(function (suppliersProduct) {
            var exe = req.headers.authorization.split(' ');
            var decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
            _supplierProducts2.default.find({
                businessId: decode._id
            }).then(function (supplierProducts) {
                res.status(200).send({
                    code: 200,
                    Message: _message2.default.infoMessage.linkProduct,
                    data: {
                        linkedProduct: suppliersProduct.suppliersProduct,
                        supplierProducts: supplierProducts
                    },
                    err: []
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
    } catch (err) {
        res.status(400).send({
            code: 400,
            message: _message2.default.errorMessage.genericError,
            data: [],
            error: err
        });
    }
};

exports.linkProducts = function (req, res) {
    try {
        var params = req.body.params;

        _productRangeItems2.default.findById(params.productRangeId).then(function (productRange) {
            if (productRange) {
                if (params.isSoldInStore == "0") {
                    productRange.suppliersProduct.push({
                        id: params.supplierId,
                        supplierProductId: params.supplierProductId,
                        preferredIndex: productRange.suppliersProduct.length > 0 ? productRange.suppliersProduct.length + 1 : 1,
                        calculation: params.calculation,
                        isSoldInStore: params.isSoldInStore
                    });
                } else {
                    productRange.suppliersProduct.push({
                        id: params.supplierId,
                        preferredIndex: productRange.suppliersProduct.length > 0 ? productRange.suppliersProduct.length + 1 : 1,
                        isSoldInStore: params.isSoldInStore
                    });
                }
                productRange.save();
                res.status(200).send({
                    code: 200,
                    Message: _message2.default.infoMessage.linkedProduct,
                    data: productRange,
                    err: []
                });
            } else {
                res.status(401).send({
                    code: 401,
                    message: _message2.default.errorMessage.productNotFound,
                    data: [],
                    error: err
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
};
exports.delinkProducts = function (req, res) {
    try {
        var params = req.body.params;

        _productRangeItems2.default.findByIdAndUpdate(params.ProductRangeId, {
            $pull: {
                'suppliersProduct': {
                    "_id": params.supplierProductId
                }
            }

        }, {
            new: true
        }).then(function (productRange) {
            if (productRange) {
                res.status(200).send({
                    code: 200,
                    Message: _message2.default.infoMessage.delinkProduct,
                    data: productRange,
                    err: []
                });
            } else {
                res.status(401).send({
                    code: 401,
                    message: _message2.default.errorMessage.productNotFound,
                    data: [],
                    error: err
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
};

exports.order = function (req, res) {
    try {
        var params = req.body.params;

        _productRangeItems2.default.findById(params.id).then(function (productRange) {
            params.suppliersProduct.forEach(function (supplierProduct) {
                productRange.suppliersProduct.forEach(function (productRangeSuppliersProduct) {
                    if (supplierProduct._id == productRangeSuppliersProduct._id) {
                        productRangeSuppliersProduct.preferredIndex = supplierProduct.preferredIndex;
                    }
                });
            });
            productRange.save();
            res.status(200).send({
                code: 200,
                Message: _message2.default.infoMessage.getDetails,
                data: productRange,
                err: []
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
};

exports.calculation = function (req, res) {
    try {
        var params = req.body.params;

        _productRangeItems2.default.findById(params.id).then(function (productRange) {
            params.supplierProduct.forEach(function (supplierProduct) {
                productRange.suppliersProduct.forEach(function (productRangeSuppliersProduct) {
                    if (supplierProduct._id == productRangeSuppliersProduct._id) {
                        productRangeSuppliersProduct.calculation = supplierProduct.calculation;
                    }
                });
            });
            productRange.save();
            res.status(200).send({
                code: 200,
                Message: _message2.default.infoMessage.getDetails,
                data: productRange,
                err: []
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
};
exports.locationDetails = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _location2.default.aggregate([{
                                $match: {
                                    $and: [{
                                        "status": "1"
                                    }, {
                                        "businessId": _mongoose2.default.Types.ObjectId(decode._id)
                                    }]
                                }
                            }, {
                                "$graphLookup": {
                                    "from": "location",
                                    "startWith": "$parentId",
                                    "connectFromField": "parentId",
                                    "connectToField": "_id",
                                    "as": "parent"
                                }
                            }, {
                                "$project": {
                                    "name": {
                                        "$concat": [{
                                            "$reduce": {
                                                "input": "$parent",
                                                "initialValue": "",
                                                "in": {
                                                    "$concat": ["$$value", "$$this.name", ","]
                                                }
                                            }
                                        }, "$name"]
                                    },
                                    "preferredIndex": 1,
                                    "parentId": 1
                                }
                            }, {
                                $sort: {
                                    "preferredIndex": 1
                                }
                            }]).sort({ 'preferredIndex': 1 }).collation({ locale: "en_US", numericOrdering: true }).then(function (result) {
                                result.forEach(function (Element) {
                                    Element.name = spaceData(Element.name.split(','));
                                });
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.getDetails,
                                    data: result,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
                                    message: _message2.default.errorMessage.genericError,
                                    data: [],
                                    err: []
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
                        return _context11.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function (_x20, _x21) {
        return _ref11.apply(this, arguments);
    };
}();

function spaceData(location) {
    var space = "";
    var length = location.length;
    var lastLocation = location[length - 1];
    for (var i = 0; i < length - 1; i++) {
        space += ". . ";
    }
    space += lastLocation;
    return space;
}