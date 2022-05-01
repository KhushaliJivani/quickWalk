'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

var _supplierCategory = require('../../models/supplierCategory.model');

var _supplierCategory2 = _interopRequireDefault(_supplierCategory);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode, productForSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            params.businessId = decode._id;
                            productForSave = (0, _supplierProducts2.default)(params);

                            productForSave.save().then(function (product) {
                                if (Boolean(params.photo)) {
                                    var param = {
                                        'destination': 'product',
                                        'decodeImage': params.photo,
                                        fieldName: 'image',
                                        imageOrignalName: params.imageName
                                    };
                                    _uploadFile2.default.base64Upload(param).then(function (image) {
                                        product.image = image;
                                        product.save();
                                        res.status(201).send({
                                            code: 201,
                                            Message: _message2.default.infoMessage.saveProduct,
                                            data: product,
                                            error: []
                                        });
                                    });
                                } else {
                                    res.status(201).send({
                                        code: 201,
                                        Message: _message2.default.infoMessage.saveProduct,
                                        data: product,
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                        params.businessId = decode._id;
                        _context4.next = 7;
                        return _supplierProducts2.default.findByIdAndUpdate(params.id, params, {
                            new: true
                        }).then(function (product) {
                            if (Boolean(params.photo)) {
                                var param = {
                                    'destination': 'product',
                                    'decodeImage': params.photo,
                                    fieldName: 'image',
                                    imageOrignalName: params.imageName
                                };
                                return _uploadFile2.default.base64Upload(param).then(function (image) {
                                    product.image = image;
                                    return product.save();
                                });
                            } else {
                                return product;
                            }
                        }).then(function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(product) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.next = 2;
                                                return _productRangeItems2.default.find({ 'suppliersProduct.supplierProductId': product._id }).then(function () {
                                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productRangeList) {
                                                        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, productRangeData;

                                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        _iteratorNormalCompletion = true;
                                                                        _didIteratorError = false;
                                                                        _iteratorError = undefined;
                                                                        _context2.prev = 3;
                                                                        _iterator = productRangeList[Symbol.iterator]();

                                                                    case 5:
                                                                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                                            _context2.next = 13;
                                                                            break;
                                                                        }

                                                                        productRangeData = _step.value;

                                                                        productRangeData.suppliersProduct.filter(function (supplierProducts) {
                                                                            if (supplierProducts.supplierProductId && String(supplierProducts.supplierProductId) == String(product._id)) {
                                                                                return supplierProducts.id = params.supplierId;
                                                                            }
                                                                        });
                                                                        _context2.next = 10;
                                                                        return _productRangeItems2.default.findByIdAndUpdate(productRangeData._id, { suppliersProduct: productRangeData.suppliersProduct }, { new: true });

                                                                    case 10:
                                                                        _iteratorNormalCompletion = true;
                                                                        _context2.next = 5;
                                                                        break;

                                                                    case 13:
                                                                        _context2.next = 19;
                                                                        break;

                                                                    case 15:
                                                                        _context2.prev = 15;
                                                                        _context2.t0 = _context2['catch'](3);
                                                                        _didIteratorError = true;
                                                                        _iteratorError = _context2.t0;

                                                                    case 19:
                                                                        _context2.prev = 19;
                                                                        _context2.prev = 20;

                                                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                                                            _iterator.return();
                                                                        }

                                                                    case 22:
                                                                        _context2.prev = 22;

                                                                        if (!_didIteratorError) {
                                                                            _context2.next = 25;
                                                                            break;
                                                                        }

                                                                        throw _iteratorError;

                                                                    case 25:
                                                                        return _context2.finish(22);

                                                                    case 26:
                                                                        return _context2.finish(19);

                                                                    case 27:
                                                                        res.status(200).send({
                                                                            code: 200,
                                                                            Message: _message2.default.infoMessage.saveProduct,
                                                                            data: product,
                                                                            error: []
                                                                        });

                                                                    case 28:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, undefined, [[3, 15, 19, 27], [20,, 22, 26]]);
                                                    }));

                                                    return function (_x6) {
                                                        return _ref4.apply(this, arguments);
                                                    };
                                                }());

                                            case 2:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined);
                            }));

                            return function (_x5) {
                                return _ref3.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 7:
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context4.t0
                        });

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
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
                        return _supplierProducts2.default.findByIdAndUpdate(params.id, { status: 0 }, { new: true }).then(function (result) {
                            res.status(200).send({
                                code: 200,
                                Message: _message2.default.infoMessage.deleteProduct,
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
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context5.t0
                        });

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 6]]);
    }));

    return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();
exports.get = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _supplierProducts2.default.aggregate([{
                                $lookup: {
                                    from: 'productRangeItems',
                                    localField: '_id',
                                    foreignField: 'suppliersProduct.supplierProductId',
                                    as: 'linkProduct'
                                }
                            }, {
                                $lookup: {
                                    from: 'suppliercategories',
                                    localField: 'categoryId',
                                    foreignField: '_id',
                                    as: 'suppliercategories'
                                }
                            }, {
                                $match: {
                                    'businessId': _mongoose2.default.Types.ObjectId(decode._id)
                                }
                            }, {
                                $match: {
                                    $or: [{ 'status': { $ne: "0" } }]
                                }
                            }]).collation({ locale: "en" }).sort({ name: 1 }).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
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
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();
exports.productRange = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _productRangeItems2.default.find({
                                businessId: decode._id,
                                status: {
                                    $ne: 0
                                }
                            }).sort({
                                createdAt: 'desc'
                            }).then(function (productRangeItems) {
                                _mongoose2.default.Types.ObjectId(params.id);
                                _productRangeItems2.default.aggregate([{
                                    "$match": {
                                        "suppliersProduct.supplierProductId": _mongoose2.default.Types.ObjectId(params.id)
                                    }
                                }, {
                                    $lookup: {
                                        from: 'location',
                                        localField: 'locationId',
                                        foreignField: '_id',
                                        as: 'linkLocation'
                                    }
                                }, {
                                    "$project": {
                                        "name": "$name",
                                        "packaging": "$packaging",
                                        "image": "$image",
                                        "status": "$status",
                                        "location": "$linkLocation",
                                        "suppliersProducts": {
                                            "$filter": {
                                                "input": "$suppliersProduct",
                                                "as": "suppliersProduct",
                                                "cond": {
                                                    "$eq": ["$$suppliersProduct.supplierProductId", _mongoose2.default.Types.ObjectId(params.id)]
                                                }
                                            }
                                        }
                                    }
                                }]).then(function (linkProduct) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.getDetails,
                                        data: {
                                            productRange: productRangeItems,
                                            linkProduct: linkProduct
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

                    case 1:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x11, _x12) {
        return _ref7.apply(this, arguments);
    };
}();
exports.linkProduct = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _productRangeItems2.default.findById(params.productRangeId).then(function (productRange) {
                                if (productRange) {
                                    productRange.suppliersProduct.push({
                                        isSoldInStore: "0",
                                        id: params.id,
                                        preferredIndex: productRange.suppliersProduct.length > 0 ? productRange.suppliersProduct.length + 1 : 1,
                                        supplierProductId: params.supplierProductId,
                                        calculation: params.calculation
                                    });
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

                    case 1:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x13, _x14) {
        return _ref8.apply(this, arguments);
    };
}();
exports.delinkProduct = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _productRangeItems2.default.findByIdAndUpdate(params.productRangeId, {
                                $pull: {
                                    'suppliersProduct': {
                                        "supplierProductId": params.supplierProductId
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

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x15, _x16) {
        return _ref9.apply(this, arguments);
    };
}();
exports.detail = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _supplierProducts2.default.findById(params.id).then(function (productRange) {
                                if (productRange) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.suggestedProduct,
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

                    case 1:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function (_x17, _x18) {
        return _ref10.apply(this, arguments);
    };
}();
exports.category = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _supplierCategory2.default.find({
                                supplierId: params.id
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
                        return _context11.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function (_x19, _x20) {
        return _ref11.apply(this, arguments);
    };
}();
exports.getSupplier = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context12.next = 5;
                        return _companySuppliers2.default.find({
                            businessId: decode._id,
                            type: "1",
                            status: {
                                $eq: 1
                            }
                        }).sort({
                            createdAt: 'desc'
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
                        _context12.next = 10;
                        break;

                    case 7:
                        _context12.prev = 7;
                        _context12.t0 = _context12['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context12.t0
                        });

                    case 10:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[0, 7]]);
    }));

    return function (_x21, _x22) {
        return _ref12.apply(this, arguments);
    };
}();