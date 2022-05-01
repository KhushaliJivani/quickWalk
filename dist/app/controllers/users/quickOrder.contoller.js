'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.productDetails = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context.next = 6;
                        return _supplierProducts2.default.find({
                            name: {
                                $regex: params.productName.toString().trim(),
                                $options: "$i"
                            },
                            businessId: decode.businessId,
                            status: 1
                        }).populate({
                            path: 'supplierId',
                            model: _companySuppliers2.default,
                            select: 'supplierId',
                            "populate": {
                                path: 'supplierId',
                                model: _supplier2.default,
                                select: 'name'
                            }
                        }).then(function (productRangeItems) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: productRangeItems,
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
exports.supplierDetails = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _supplier2.default.aggregate([{
                                $match: {
                                    name: {
                                        $regex: params.supplierName
                                    }
                                }
                            }, {
                                $match: {
                                    businessId: _mongoose2.default.Types.ObjectId(decode.businessId)
                                }
                            }, {
                                $lookup: {
                                    from: 'companysuppliers',
                                    localField: '_id',
                                    foreignField: 'supplierId',
                                    as: 'linkCompanySupplier'
                                }
                            }, {
                                $unwind: '$linkCompanySupplier'
                            }, {
                                $lookup: {
                                    from: 'productRangeItems',
                                    localField: 'linkCompanySupplier._id',
                                    foreignField: 'suppliersProduct.id',
                                    as: 'linkProductRange'
                                }
                            }, {
                                $unwind: '$linkProductRange'
                            }, {
                                $project: {
                                    "supplierId": "$_id",
                                    "supplierName": "$name",
                                    "linkCompanySupplier": 1,
                                    "productId": "$linkProductRange._id",
                                    "image": "$linkProductRange.image",
                                    "productName": "$linkProductRange.name",
                                    "linkProductRange.suppliersProduct.id": '$linkCompanySupplier._id'
                                }
                            }]).then(function (productRangeItems) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.getDetails,
                                    data: productRangeItems,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
                                    message: _message2.default.errorMessage.genericError,
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
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

exports.locationAndSubLocationProduct = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _productRangeItems2.default.find({
                                "locationId": params.id,
                                "businessId": decode.businessId,
                                status: 1
                            }).sort({
                                'locationPreferredIndex': 1
                            }).collation({ locale: "en_US", numericOrdering: true }).then(function (locationProduct) {
                                return locationProduct;
                            }).then(function () {
                                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(locationProduct) {
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    if (!(params.childProduct == "true")) {
                                                        _context3.next = 5;
                                                        break;
                                                    }

                                                    _context3.next = 3;
                                                    return _location2.default.aggregate([{
                                                        "$match": { "status": "1" }
                                                    }, {
                                                        $match: { "businessId": _mongoose2.default.Types.ObjectId(decode.businessId) }
                                                    }, {
                                                        "$graphLookup": {
                                                            "from": "location",
                                                            "startWith": "$_id",
                                                            "connectFromField": "_id",
                                                            "connectToField": "parentId",
                                                            "depthField": "depth",
                                                            "as": "parent"
                                                        }
                                                    }, {
                                                        $unwind: '$parent'
                                                    }, {
                                                        $match: { "_id": _mongoose2.default.Types.ObjectId(params.id) }
                                                    }, {
                                                        $lookup: {
                                                            from: 'productRangeItems',
                                                            localField: 'parent._id',
                                                            foreignField: 'locationId',
                                                            as: 'childLocationProduct'
                                                        }
                                                    }, {
                                                        $project: {
                                                            "locations": "$parent",
                                                            "childLocationProduct": {
                                                                "$filter": {
                                                                    "input": "$childLocationProduct",
                                                                    "as": "childLocationProduct",
                                                                    "cond": {
                                                                        $and: [{
                                                                            "$eq": ["$$childLocationProduct.businessId", _mongoose2.default.Types.ObjectId(decode.businessId)]
                                                                        }, {
                                                                            "$eq": ["$$childLocationProduct.status", "1"]
                                                                        }]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }, {
                                                        $unwind: '$childLocationProduct'
                                                    }, {
                                                        $sort: {
                                                            "locations.preferredIndex": 1,
                                                            "childLocationProduct.locationPreferredIndex": 1
                                                        }
                                                    }, {
                                                        $group: {
                                                            "_id": null,
                                                            "locationData": { "$push": "$locations" },
                                                            "childLocationProduct": {
                                                                "$push": "$childLocationProduct"
                                                            }
                                                        }
                                                    }]).sort({ 'locationData.preferredIndex': 1 }).collation({ locale: "en_US", numericOrdering: true }).then(function (data) {
                                                        if (data.length == 0) {
                                                            res.status(200).send({
                                                                code: 200,
                                                                message: _message2.default.infoMessage.getDetails,
                                                                data: {
                                                                    'locationProduct': locationProduct,
                                                                    childLocationProduct: data
                                                                },
                                                                err: []
                                                            });
                                                        } else {
                                                            res.status(200).send({
                                                                code: 200,
                                                                message: _message2.default.infoMessage.getDetails,
                                                                data: {
                                                                    'locationProduct': locationProduct,
                                                                    childLocationProduct: data[0].childLocationProduct,
                                                                    parent: data[0].locationData
                                                                },
                                                                err: []
                                                            });
                                                        }
                                                    });

                                                case 3:
                                                    _context3.next = 6;
                                                    break;

                                                case 5:
                                                    res.status(200).send({
                                                        code: 200,
                                                        message: _message2.default.infoMessage.getDetails,
                                                        data: locationProduct,
                                                        err: []
                                                    });

                                                case 6:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, undefined);
                                }));

                                return function (_x7) {
                                    return _ref4.apply(this, arguments);
                                };
                            }()).catch(function (err) {
                                res.status(401).send({
                                    code: 401,
                                    message: _message2.default.errorMessage.genericError,
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
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
exports.getSupplier = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context5.next = 5;
                        return _companySuppliers2.default.aggregate([{
                            $match: {
                                type: "1",
                                businessId: _mongoose2.default.Types.ObjectId(decode.businessId),
                                "status": "1"
                            }
                        }, {
                            $lookup: {
                                from: 'suppliers',
                                localField: 'supplierId',
                                foreignField: '_id',
                                as: 'supplier'
                            }
                        }]).then(function (supplier) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: supplier,
                                err: []
                            });
                        }).catch(function (err) {
                            res.status(401).send({
                                code: 401,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
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

    return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();
exports.getStore = function () {
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
                        return _companySuppliers2.default.find({
                            type: 2,
                            businessId: decode.businessId,
                            "status": 1
                        }).populate({ path: 'supplierId', model: _supplier2.default, select: 'name' }).then(function (store) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: store,
                                err: []
                            });
                        }).catch(function (err) {
                            res.status(401).send({
                                code: 401,
                                message: _message2.default.errorMessage.genericError,
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

    return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

exports.getLocation = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context7.next = 5;
                        return _location2.default.find({
                            businessId: decode.businessId,
                            status: "1",
                            parentId: null
                        }).sort({
                            preferredIndex: 1
                        }).then(function (location) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: location,
                                err: []
                            });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 401,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 5:
                        _context7.next = 10;
                        break;

                    case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](0);

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
        }, _callee7, undefined, [[0, 7]]);
    }));

    return function (_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();
exports.getSubLocation = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _location2.default.find({
                                parentId: params.id,
                                status: "1",
                                "businessId": decode.businessId
                            }).sort({
                                preferredIndex: 1
                            }).collation({ locale: "en_US", numericOrdering: true }).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: result,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({
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
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function (_x14, _x15) {
        return _ref8.apply(this, arguments);
    };
}();
exports.getSubLocationDetails = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _location2.default.findOne({
                                _id: params.id,
                                status: "1"
                            }).then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: result,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({
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
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x16, _x17) {
        return _ref9.apply(this, arguments);
    };
}();
exports.getSupplierAndShop = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _companySuppliers2.default.find({
                                "status": 1,
                                "businessId": decode.businessId
                            }).populate({
                                path: 'supplierId',
                                model: _supplier2.default
                            }).then(function (getSupplierAndShop) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: getSupplierAndShop,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({
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
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function (_x18, _x19) {
        return _ref10.apply(this, arguments);
    };
}();
exports.supplierProductToProductRangeItem = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _productRangeItems2.default.find({ "suppliersProduct.supplierProductId": params.id, "status": 1 }).populate({ path: 'locationId', model: _location2.default, select: "name" }).then(function (productRangeItem) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: productRangeItem,
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
exports.supplierProduct = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        params = req.body.params;
                        _context12.next = 4;
                        return _supplierProducts2.default.find({
                            status: 1,
                            "supplierId": params.supplierId
                        }).sort({
                            'name': 1
                        }).then(function (supplierProduct) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: supplierProduct,
                                err: []
                            });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 401,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 4:
                        _context12.next = 9;
                        break;

                    case 6:
                        _context12.prev = 6;
                        _context12.t0 = _context12['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context12.t0
                        });

                    case 9:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[0, 6]]);
    }));

    return function (_x22, _x23) {
        return _ref12.apply(this, arguments);
    };
}();
exports.productList = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        _context13.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context13.next = 6;
                        return _productRangeItems2.default.find({
                            name: {
                                $regex: params.productName.toString().trim(),
                                $options: "$i"
                            },
                            businessId: decode.businessId,
                            status: 1
                        }).then(function (productRangeItems) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: productRangeItems,
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

                    case 6:
                        _context13.next = 11;
                        break;

                    case 8:
                        _context13.prev = 8;
                        _context13.t0 = _context13['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context13.t0
                        });

                    case 11:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined, [[0, 8]]);
    }));

    return function (_x24, _x25) {
        return _ref13.apply(this, arguments);
    };
}();