"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _checklistCombination = require('../../models/checklistCombination.model');

var _checklistCombination2 = _interopRequireDefault(_checklistCombination);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _checkedChecklistProduct = require('../../models/checkedChecklistProduct.model');

var _checkedChecklistProduct2 = _interopRequireDefault(_checkedChecklistProduct);

var _shoppinglist = require('./shoppinglist.controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.getChecklist = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _checklist2.default.find({
                                status: "1",
                                businessId: decode.businessId
                            }).sort({
                                createdAt: 'desc'
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
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
exports.checklistCombination = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params, exe, decode, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            params.userId = decode._id;
                            params.businessId = decode.businessId;
                            params.isDelete = 0;
                            data = (0, _checklistCombination2.default)(params);

                            data.save().then(function (result) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.checklistCollection,
                                    data: result,
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
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
exports.getChecklistCombination = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var resturnArray, exe, decode;
        return regeneratorRuntime.wrap(function _callee6$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;
                        resturnArray = void 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context7.next = 6;
                        return _checklistCombination2.default.find({
                            isDelete: "0",
                            "businessId": decode.businessId
                        }).populate({
                            path: 'userId',
                            model: _users2.default,
                            businessId: decode.businessId
                        }).then(function (linkChecklist) {
                            if (linkChecklist.length > 0) {
                                resturnArray = linkChecklist.map(function (checklist, index) {
                                    return {
                                        checklistCombinationDetail: checklist,
                                        checklistCombinationProduct: []
                                    };
                                });
                                return resturnArray;
                            } else {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.errorMessage.dataNotFound,
                                    data: [],
                                    err: []
                                });
                                return null;
                            }
                        }).then(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(checklistCombination) {
                                var index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

                                return regeneratorRuntime.wrap(function _callee5$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                index = 0;
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context6.prev = 4;
                                                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                                                    var checklist;
                                                    return regeneratorRuntime.wrap(function _loop$(_context5) {
                                                        while (1) {
                                                            switch (_context5.prev = _context5.next) {
                                                                case 0:
                                                                    checklist = _step.value;
                                                                    _context5.next = 3;
                                                                    return _checklistCombination2.default.aggregate([{
                                                                        "$match": {
                                                                            "isDelete": "0",
                                                                            "_id": _mongoose2.default.Types.ObjectId(checklist.checklistCombinationDetail._id)
                                                                        }
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "Users",
                                                                            "localField": "userId",
                                                                            "foreignField": "_id",
                                                                            "as": "user"
                                                                        }
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "checklist",
                                                                            "localField": "checklistId",
                                                                            "foreignField": "_id",
                                                                            "as": "linkChecklist"
                                                                        }
                                                                    }, {
                                                                        "$unwind": "$linkChecklist"
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "orderDetail",
                                                                            "localField": "linkChecklist.product",
                                                                            "foreignField": "productRangeId",
                                                                            "as": "orderProduct"
                                                                        }
                                                                    }, {
                                                                        "$unwind": {
                                                                            "path": "$orderProduct"
                                                                        }
                                                                    }, {
                                                                        "$match": {
                                                                            "orderProduct.quantity": {
                                                                                $ne: 0
                                                                            }
                                                                        }
                                                                    }, {
                                                                        "$match": {
                                                                            "orderProduct.statusIndex": {
                                                                                $ne: "4"
                                                                            }
                                                                        }
                                                                    }, {
                                                                        "$match": {
                                                                            "orderProduct.checklistCombinationId": _mongoose2.default.Types.ObjectId(checklist.checklistCombinationDetail._id)
                                                                        }
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "companysuppliers",
                                                                            "localField": "orderProduct.supplierId",
                                                                            "foreignField": "_id",
                                                                            "as": "comapnySupplier"
                                                                        }
                                                                    }, {
                                                                        "$unwind": {
                                                                            "path": "$comapnySupplier"
                                                                        }
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "order",
                                                                            "localField": "orderProduct.orderId",
                                                                            "foreignField": "_id",
                                                                            "as": "orderData"
                                                                        }
                                                                    }, {
                                                                        "$unwind": {
                                                                            "path": "$orderData"
                                                                        }
                                                                    }, {
                                                                        "$match": {
                                                                            "orderData.status": "0"
                                                                        }
                                                                    }, {
                                                                        "$match": {
                                                                            "orderData.status": {
                                                                                $ne: "3"
                                                                            }
                                                                        }
                                                                    }, {
                                                                        "$lookup": {
                                                                            "from": "suppliers",
                                                                            "localField": "comapnySupplier.supplierId",
                                                                            "foreignField": "_id",
                                                                            "as": "supplier"
                                                                        }
                                                                    }, {
                                                                        "$unwind": {
                                                                            "path": "$supplier"
                                                                        }
                                                                    }, {
                                                                        "$project": {
                                                                            "_id": 1,
                                                                            "name": 1,
                                                                            "createdAt": 1,
                                                                            "user": 1,
                                                                            "linkChecklist": 1,
                                                                            "orderProduct": 1,
                                                                            "isPause": 1,
                                                                            'orderData': 1,
                                                                            "comapnySupplier": 1,
                                                                            "supplier": 1
                                                                        }
                                                                    }, {
                                                                        $group: {
                                                                            _id: {
                                                                                id: '$_id',
                                                                                name: '$name',
                                                                                userName: '$user.firstName',
                                                                                supplierId: "$supplier._id",
                                                                                supplierName: "$supplier.name",
                                                                                supplierType: "$comapnySupplier.type",
                                                                                expectedDeliveryDate: '$orderData.expectedDeliveryDate'
                                                                            },
                                                                            placeOrderAhead: {
                                                                                "$first": '$comapnySupplier.placeOrderAhead'
                                                                            },
                                                                            placeOrderBeforeTime: {
                                                                                "$first": '$comapnySupplier.placeOrderBeforeTime'
                                                                            },
                                                                            expectedDeliveryDate: {
                                                                                "$first": '$orderData.expectedDeliveryDate'
                                                                            },
                                                                            // items: { "$sum": "$orderProduct.quantity" },
                                                                            orderDta: {
                                                                                "$addToSet": '$orderProduct'
                                                                            },
                                                                            createdDate: {
                                                                                "$first": '$createdAt'
                                                                            },
                                                                            isPause: {
                                                                                "$first": "$isPause"
                                                                            }
                                                                        }
                                                                    }, {
                                                                        $unwind: '$orderDta'
                                                                    }, {
                                                                        $group: {
                                                                            _id: {
                                                                                id: '$_id.id',
                                                                                name: '$_id.name',
                                                                                userName: '$_id.userName',
                                                                                supplierId: "$_id.supplierId",
                                                                                supplierName: "$_id.supplierName",
                                                                                supplierType: "$_id.supplierType",
                                                                                expectedDeliveryDate: '$_id.expectedDeliveryDate'
                                                                            },
                                                                            placeOrderAhead: {
                                                                                "$first": '$placeOrderAhead'
                                                                            },
                                                                            placeOrderBeforeTime: {
                                                                                "$first": '$placeOrderBeforeTime'
                                                                            },
                                                                            expectedDeliveryDate: {
                                                                                "$first": '$expectedDeliveryDate'
                                                                            },
                                                                            items: {
                                                                                "$sum": "$orderDta.quantity"
                                                                            },
                                                                            // orderDta:{"$push":'$orderProduct'},
                                                                            createdDate: {
                                                                                "$first": '$createdDate'
                                                                            },
                                                                            isPause: {
                                                                                "$first": "$isPause"
                                                                            }
                                                                        }
                                                                    }, {
                                                                        $group: {
                                                                            _id: '$_id.id',
                                                                            name: {
                                                                                "$first": "$_id.name"
                                                                            },
                                                                            userName: {
                                                                                "$first": "$_id.userName"
                                                                            },
                                                                            createdDate: {
                                                                                "$first": '$createdDate'
                                                                            },
                                                                            product: {
                                                                                $push: "$linkChecklist.product"
                                                                            },
                                                                            isPause: {
                                                                                "$first": "$isPause"
                                                                            },
                                                                            supplier: {
                                                                                "$push": {
                                                                                    "supplierId": "$_id.supplierId",
                                                                                    "supplierName": "$_id.supplierName",
                                                                                    "items": '$items',
                                                                                    "placeOrderBeforeTime": '$placeOrderBeforeTime',
                                                                                    "placeOrderAhead": '$placeOrderAhead',
                                                                                    "expectedDeliveryDate": '$expectedDeliveryDate',
                                                                                    "type": '$_id.supplierType'
                                                                                }
                                                                            }
                                                                        }
                                                                    }]).then(function () {
                                                                        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(checklistCombinationProduct) {
                                                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                                                while (1) {
                                                                                    switch (_context3.prev = _context3.next) {
                                                                                        case 0:
                                                                                            return _context3.abrupt('return', checklistCombinationProduct);

                                                                                        case 1:
                                                                                        case 'end':
                                                                                            return _context3.stop();
                                                                                    }
                                                                                }
                                                                            }, _callee3, undefined);
                                                                        }));

                                                                        return function (_x8) {
                                                                            return _ref5.apply(this, arguments);
                                                                        };
                                                                    }()).then(function () {
                                                                        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(checklistCombinationProduct) {
                                                                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                                                while (1) {
                                                                                    switch (_context4.prev = _context4.next) {
                                                                                        case 0:
                                                                                            checklist.checklistCombinationProduct = checklistCombinationProduct;
                                                                                            if (checklistCombination.length - 1 == index) {
                                                                                                res.status(200).send({
                                                                                                    code: 200,
                                                                                                    Message: _message2.default.infoMessage.suggestedProduct,
                                                                                                    data: checklistCombination,
                                                                                                    err: []
                                                                                                });
                                                                                            }

                                                                                        case 2:
                                                                                        case 'end':
                                                                                            return _context4.stop();
                                                                                    }
                                                                                }
                                                                            }, _callee4, undefined);
                                                                        }));

                                                                        return function (_x9) {
                                                                            return _ref6.apply(this, arguments);
                                                                        };
                                                                    }()).catch(function (err) {
                                                                        res.status(400).send({
                                                                            code: 400,
                                                                            message: _message2.default.errorMessage.genericError,
                                                                            data: [],
                                                                            error: err
                                                                        });
                                                                    });

                                                                case 3:
                                                                    index++;

                                                                case 4:
                                                                case 'end':
                                                                    return _context5.stop();
                                                            }
                                                        }
                                                    }, _loop, undefined);
                                                });
                                                _iterator = checklistCombination[Symbol.iterator]();

                                            case 7:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context6.next = 12;
                                                    break;
                                                }

                                                return _context6.delegateYield(_loop(), 't0', 9);

                                            case 9:
                                                _iteratorNormalCompletion = true;
                                                _context6.next = 7;
                                                break;

                                            case 12:
                                                _context6.next = 18;
                                                break;

                                            case 14:
                                                _context6.prev = 14;
                                                _context6.t1 = _context6['catch'](4);
                                                _didIteratorError = true;
                                                _iteratorError = _context6.t1;

                                            case 18:
                                                _context6.prev = 18;
                                                _context6.prev = 19;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 21:
                                                _context6.prev = 21;

                                                if (!_didIteratorError) {
                                                    _context6.next = 24;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 24:
                                                return _context6.finish(21);

                                            case 25:
                                                return _context6.finish(18);

                                            case 26:
                                            case 'end':
                                                return _context6.stop();
                                        }
                                    }
                                }, _callee5, undefined, [[4, 14, 18, 26], [19,, 21, 25]]);
                            }));

                            return function (_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 6:
                        _context7.next = 11;
                        break;

                    case 8:
                        _context7.prev = 8;
                        _context7.t0 = _context7['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context7.t0
                        });

                    case 11:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee6, undefined, [[0, 8]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var getProduct = function getProduct(id, index) {
    return new Promise(function (resolve, reject) {
        try {
            _checklistCombination2.default.aggregate([{
                "$match": {
                    "isDelete": "0",
                    "_id": _mongoose2.default.Types.ObjectId(id)
                }
            }, {
                "$lookup": {
                    "from": "Users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            }, {
                "$lookup": {
                    "from": "checklist",
                    "localField": "checklistId",
                    "foreignField": "_id",
                    "as": "linkChecklist"
                }
            }, {
                "$unwind": "$linkChecklist"
            }, {
                "$lookup": {
                    "from": "orderDetail",
                    "localField": "linkChecklist.product",
                    "foreignField": "productRangeId",
                    "as": "orderProduct"
                }
            }, {
                "$unwind": {
                    "path": "$orderProduct"
                }
            }, {
                "$match": {
                    "orderProduct.checklistCombinationId": _mongoose2.default.Types.ObjectId(id)
                }
            }, {
                "$lookup": {
                    "from": "companysuppliers",
                    "localField": "orderProduct.supplierId",
                    "foreignField": "_id",
                    "as": "comapnySupplier"
                }
            }, {
                "$unwind": {
                    "path": "$comapnySupplier"
                }
            }, {
                "$lookup": {
                    "from": "order",
                    "localField": "orderProduct.orderId",
                    "foreignField": "_id",
                    "as": "orderData"
                }
            }, {
                "$unwind": {
                    "path": "$orderData"
                }
            }, {
                "$lookup": {
                    "from": "suppliers",
                    "localField": "comapnySupplier.supplierId",
                    "foreignField": "_id",
                    "as": "supplier"
                }
            }, {
                "$unwind": {
                    "path": "$supplier"
                }
            }, {
                "$project": {
                    "_id": 1,
                    "name": 1,
                    "createdAt": 1,
                    "user": 1,
                    "linkChecklist": 1,
                    "orderProduct": 1,
                    "isPause": 1,
                    'orderData': 1,
                    "comapnySupplier": 1,
                    "supplier": 1
                }
            }, {
                $group: {
                    _id: {
                        id: '$_id',
                        name: '$name',
                        userName: '$user.firstName',
                        supplierId: "$supplier._id",
                        supplierName: "$supplier.name",
                        supplierType: "$comapnySupplier.type"
                    },
                    placeOrderAhead: {
                        "$first": '$comapnySupplier.placeOrderAhead'
                    },
                    placeOrderBeforeTime: {
                        "$first": '$comapnySupplier.placeOrderBeforeTime'
                    },
                    expectedDeliveryDate: {
                        "$first": '$orderData.expectedDeliveryDate'
                    },
                    items: {
                        "$sum": "$orderProduct.quantity"
                    },
                    createdDate: {
                        "$first": '$createdAt'
                    },
                    isPause: {
                        "$first": "$isPause"
                    }
                }
            }, {
                $group: {
                    _id: '$_id._id',
                    name: {
                        "$first": "$_id.name"
                    },
                    userName: {
                        "$first": "$_id.userName"
                    },
                    createdDate: {
                        "$first": '$createdDate'
                    },
                    product: {
                        $push: "$linkChecklist.product"
                    },
                    isPause: {
                        "$first": "$isPause"
                    },
                    supplier: {
                        "$push": {
                            "supplierId": "$_id.supplierId",
                            "supplierName": "$_id.supplierName",
                            "items": '$items',
                            "placeOrderBeforeTime": '$placeOrderBeforeTime',
                            "placeOrderAhead": '$placeOrderAhead',
                            "expectedDeliveryDate": '$expectedDeliveryDate',
                            "type": '$_id.supplierType'
                        }
                    }
                }
            }]).then(function (product) {
                resolve({
                    product: product,
                    index: index
                });
            }).catch(function (err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
};

exports.checklistProductDetail = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee8$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        params = req.body.params;
                        /**Base on location base product listing */

                        if (!(params.custom === "1")) {
                            _context9.next = 7;
                            break;
                        }

                        _context9.next = 5;
                        return _checklistCombination2.default.aggregate([{
                            $match: {
                                _id: _mongoose2.default.Types.ObjectId(params.id)
                            }
                        }, {
                            $lookup: {
                                from: 'checklist',
                                localField: 'checklistId',
                                foreignField: '_id',
                                as: 'checklist'
                            }
                        }, {
                            $unwind: '$checklist'
                        },
                        /**  get only active Checklist  */
                        {
                            $match: {
                                "checklist.status": "1"
                            }
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'checklist.product',
                                foreignField: '_id',
                                as: 'checklistProduct'
                            }
                        }, {
                            $unwind: '$checklistProduct'
                        },

                        /**  get only active product  */
                        {
                            $match: {
                                'checklistProduct.status': "1"
                            }
                        }, {
                            $lookup: {
                                from: 'location',
                                localField: 'checklistProduct.locationId',
                                foreignField: '_id',
                                as: 'locationData'
                            }
                        }, {
                            $unwind: '$locationData'
                        }, {
                            $lookup: {
                                from: 'checkedChecklistProduct',
                                localField: '_id',
                                foreignField: 'checklistCombinationId',
                                as: 'checkedChecklistProduct'
                            }
                        }, {
                            $lookup: {
                                from: 'orderDetail',
                                localField: 'checklistProduct._id',
                                foreignField: 'productRangeId',
                                as: 'orderProduct'
                            }
                        }, {
                            $project: {
                                "checklistProduct": 1,
                                "locationData": 1,
                                "checkedChecklistProduct": {
                                    $filter: {
                                        "input": "$checkedChecklistProduct",
                                        "as": "checkedChecklistProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$checkedChecklistProduct.productId", "$checklistProduct._id"]
                                            }]
                                        }
                                    }
                                },
                                "orderProduct": {
                                    $filter: {
                                        "input": "$orderProduct",
                                        "as": "orderProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$orderProduct.statusIndex", "0"]
                                            }, {
                                                $ne: ["$$orderProduct.statusIndex", "4"]
                                            }, {
                                                $eq: ["$$orderProduct.checklistCombinationId", _mongoose2.default.Types.ObjectId(params.id)]
                                            }]
                                        }
                                    }
                                }
                            }
                        }, {
                            $group: {
                                _id: "$checklistProduct._id",
                                locationData: {
                                    "$push": "$locationData"
                                },
                                checklistProduct: {
                                    "$first": "$checklistProduct"
                                },
                                orderProduct: {
                                    "$first": "$orderProduct"
                                },
                                checkedChecklistProduct: {
                                    "$first": "$checkedChecklistProduct"
                                }
                            }
                        }, {
                            $sort: {
                                // "locationData.preferredIndex":1,
                                "checklistProduct.locationPreferredIndex": 1
                            }
                        }]).sort({
                            'locationData.preferredIndex': 1
                        }).collation({
                            locale: "en_US",
                            numericOrdering: true
                        }).then(function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(orderProduct) {
                                var tempOrderProduct, temp, tempArray, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, singleChecklistProduct;

                                return regeneratorRuntime.wrap(function _callee7$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                if (!(orderProduct.length > 0)) {
                                                    _context8.next = 26;
                                                    break;
                                                }

                                                tempOrderProduct = orderProduct;
                                                temp = 0;
                                                tempArray = [];
                                                _iteratorNormalCompletion2 = true;
                                                _didIteratorError2 = false;
                                                _iteratorError2 = undefined;
                                                _context8.prev = 7;

                                                for (_iterator2 = orderProduct[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                    singleChecklistProduct = _step2.value;

                                                    // console.log("singleChecklistProduct.checkedChecklistProduct : ",singleChecklistProduct)
                                                    if (singleChecklistProduct.checkedChecklistProduct.length > 0 && singleChecklistProduct.checkedChecklistProduct[0].isChecked == true) {
                                                        // console.log("singleChecklistProduct.checkedChecklistProduct.isChecked : ",singleChecklistProduct.checkedChecklistProduct[0].isChecked)
                                                        // console.log("temp :---------- ",temp)
                                                        // tempOrderProduct.splice(temp, 1);
                                                        // console.log("tempOrderProduct.length : ",tempOrderProduct.length)
                                                    } else if (singleChecklistProduct.checkedChecklistProduct.length > 0 && singleChecklistProduct.checkedChecklistProduct[0].isChecked == false) {
                                                        // console.log("temp :---------- ",temp)
                                                        // tempOrderProduct.splice(temp, 1);
                                                        // console.log("tempOrderProduct.length : ",tempOrderProduct.length)
                                                        tempArray.push(singleChecklistProduct);
                                                    } else {
                                                        tempArray.push(singleChecklistProduct);
                                                    }
                                                    // if (singleChecklistProduct.checkedChecklistProduct.length > 0) {
                                                    //     orderProduct.splice(temp, 1);
                                                    // }
                                                    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                                                    // temp++;
                                                }

                                                // console.log("________________________________________________________________")
                                                _context8.next = 15;
                                                break;

                                            case 11:
                                                _context8.prev = 11;
                                                _context8.t0 = _context8['catch'](7);
                                                _didIteratorError2 = true;
                                                _iteratorError2 = _context8.t0;

                                            case 15:
                                                _context8.prev = 15;
                                                _context8.prev = 16;

                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                    _iterator2.return();
                                                }

                                            case 18:
                                                _context8.prev = 18;

                                                if (!_didIteratorError2) {
                                                    _context8.next = 21;
                                                    break;
                                                }

                                                throw _iteratorError2;

                                            case 21:
                                                return _context8.finish(18);

                                            case 22:
                                                return _context8.finish(15);

                                            case 23:
                                                res.status(200).send({
                                                    code: 200,
                                                    message: _message2.default.infoMessage.getDetails,
                                                    data: tempArray,
                                                    err: []
                                                });
                                                _context8.next = 27;
                                                break;

                                            case 26:

                                                res.status(200).send({
                                                    code: 200,
                                                    message: _message2.default.infoMessage.getDetails,
                                                    data: orderProduct,
                                                    err: []
                                                });

                                            case 27:
                                            case 'end':
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee7, undefined, [[7, 11, 15, 23], [16,, 18, 22]]);
                            }));

                            return function (_x12) {
                                return _ref8.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            console.log("err", err);
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context9.next = 9;
                        break;

                    case 7:
                        _context9.next = 9;
                        return _checklistCombination2.default.aggregate([{
                            $match: {
                                _id: _mongoose2.default.Types.ObjectId(params.id)
                            }
                        }, {
                            $lookup: {
                                from: 'checklist',
                                localField: 'checklistId',
                                foreignField: '_id',
                                as: 'checklist'
                            }
                        }, {
                            $unwind: '$checklist'
                        },
                        /**  get only active Checklist  */
                        {
                            $match: {
                                "checklist.status": "1"
                            }
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'checklist.product',
                                foreignField: '_id',
                                as: 'checklistProduct'
                            }
                        }, {
                            $unwind: '$checklistProduct'
                        },

                        /**  get only active product  */
                        {
                            $match: {
                                'checklistProduct.status': "1"
                            }
                        }, {
                            $lookup: {
                                from: 'location',
                                localField: 'checklistProduct.locationId',
                                foreignField: '_id',
                                as: 'locationData'
                            }
                        }, {
                            $unwind: '$locationData'
                        }, {
                            $lookup: {
                                from: 'checkedChecklistProduct',
                                localField: '_id',
                                foreignField: 'checklistCombinationId',
                                as: 'checkedChecklistProduct'
                            }
                        }, {
                            $lookup: {
                                from: 'orderDetail',
                                localField: 'checklistProduct._id',
                                foreignField: 'productRangeId',
                                as: 'orderProduct'
                            }
                        }, {
                            $project: {
                                "checklistProduct": 1,
                                "locationData": 1,
                                "checkedChecklistProduct": {
                                    $filter: {
                                        "input": "$checkedChecklistProduct",
                                        "as": "checkedChecklistProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$checkedChecklistProduct.productId", "$checklistProduct._id"]
                                            }, {
                                                $eq: ["$$checkedChecklistProduct.isChecked", true]
                                            }]
                                        }
                                    }
                                },
                                "orderProduct": {
                                    $filter: {
                                        "input": "$orderProduct",
                                        "as": "orderProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$orderProduct.statusIndex", "0"]
                                            }, {
                                                $ne: ["$$orderProduct.statusIndex", "4"]
                                            }, {
                                                $eq: ["$$orderProduct.checklistCombinationId", _mongoose2.default.Types.ObjectId(params.id)]
                                            }]
                                        }
                                    }
                                }
                            }
                        }, {
                            $group: {
                                _id: "$checklistProduct._id",
                                locationData: {
                                    "$push": "$locationData"
                                },
                                checklistProduct: {
                                    "$first": "$checklistProduct"
                                },
                                orderProduct: {
                                    "$first": "$orderProduct"
                                },
                                checkedChecklistProduct: {
                                    "$first": "$checkedChecklistProduct"
                                }
                            }
                        }, {
                            $sort: {
                                // "locationData.preferredIndex":1,
                                "checklistProduct.locationPreferredIndex": 1
                            }
                        }]).sort({
                            'locationData.preferredIndex': 1
                        }).collation({
                            locale: "en_US",
                            numericOrdering: true
                        }).then(function (orderProduct) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderProduct,
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

                    case 9:
                        _context9.next = 14;
                        break;

                    case 11:
                        _context9.prev = 11;
                        _context9.t0 = _context9['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context9.t0
                        });

                    case 14:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee8, undefined, [[0, 11]]);
    }));

    return function (_x10, _x11) {
        return _ref7.apply(this, arguments);
    };
}();
exports.orderSuppplierProduct = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var params, storeOrderList, supplierOrderList, allOrder;
        return regeneratorRuntime.wrap(function _callee9$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.prev = 0;
                        params = req.body.params;
                        _context10.next = 4;
                        return storeOrder(params);

                    case 4:
                        storeOrderList = _context10.sent;
                        _context10.next = 7;
                        return supplierOrder(params);

                    case 7:
                        supplierOrderList = _context10.sent;
                        allOrder = [].concat(_toConsumableArray(storeOrderList), _toConsumableArray(supplierOrderList));

                        res.status(200).send({
                            code: 200,
                            message: _message2.default.infoMessage.getDetails,
                            data: allOrder,
                            err: []
                        });
                        _context10.next = 15;
                        break;

                    case 12:
                        _context10.prev = 12;
                        _context10.t0 = _context10['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context10.t0
                        });

                    case 15:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee9, undefined, [[0, 12]]);
    }));

    return function (_x13, _x14) {
        return _ref9.apply(this, arguments);
    };
}();

var storeOrder = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(params) {
        return regeneratorRuntime.wrap(function _callee10$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        return _context11.abrupt('return', _orderDetail2.default.aggregate([{
                            $match: {
                                checklistCombinationId: _mongoose2.default.Types.ObjectId(params.checklistCombinationId)
                            }
                        }, {
                            $match: _defineProperty({
                                quantity: {
                                    $ne: 0
                                },
                                statusIndex: {
                                    $ne: "4"
                                }
                            }, 'statusIndex', {
                                $eq: "1"
                            })
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'productRangeId',
                                foreignField: '_id',
                                as: 'productRangeList'
                            }
                        }, {
                            $unwind: '$productRangeList'
                        }, {
                            $lookup: {
                                from: 'companysuppliers',
                                localField: 'supplierId',
                                foreignField: '_id',
                                as: 'companySupplier'
                            }
                        }, {
                            "$unwind": {
                                "path": "$companySupplier",
                                "preserveNullAndEmptyArrays": true
                            }
                        }, {
                            $match: {
                                'companySupplier.type': {
                                    $ne: "1"
                                }
                            }
                        }, {
                            $lookup: {
                                from: 'suppliers',
                                localField: 'companySupplier.supplierId',
                                foreignField: '_id',
                                as: 'supplier'
                            }
                        }, {
                            $group: {
                                _id: {
                                    supplierId: "$supplier._id",
                                    supplierName: "$supplier.name",
                                    placeOrderBeforeTime: '$companySupplier.placeOrderBeforeTime',
                                    placeOrderAhead: '$companySupplier.placeOrderAhead',
                                    supplierType: '$companySupplier.type',
                                    estimatedDate: '$expectedDeliveryDate'
                                },
                                quantity: {
                                    "$push": "$quantity"
                                },
                                checklistProduct: {
                                    "$push": {
                                        "_id": "$productRangeList._id",
                                        "status": "$productRangeList.status",
                                        "name": "$productRangeList.name",
                                        "packaging": "$productRangeList.packaging",
                                        "standardQuantity": "$productRangeList.standardQuantity",
                                        "locationId": "$productRangeList.locationId",
                                        "businessId": "$productRangeList.businessId",
                                        "locationPreferredIndex": "$productRangeList.locationPreferredIndex",
                                        "suppliersProduct": "$productRangeList.suppliersProduct",
                                        "updatedAt": "$productRangeList.updatedAt",
                                        "createdAt": "$productRangeList.createdAt",
                                        "image": "$productRangeList.image",
                                        "asap": "$asap"
                                    }
                                },
                                asap: {
                                    "$push": {
                                        'asap': "$asap",
                                        'id': '$productRangeId'
                                    }
                                },
                                estimatedDate: {
                                    "$first": '$expectedDeliveryDate'
                                }
                            }
                        }]));

                    case 1:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function storeOrder(_x15) {
        return _ref10.apply(this, arguments);
    };
}();
var supplierOrder = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(params) {
        return regeneratorRuntime.wrap(function _callee11$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        return _context12.abrupt('return', _orderDetail2.default.aggregate([{
                            $match: {
                                checklistCombinationId: _mongoose2.default.Types.ObjectId(params.checklistCombinationId)
                            }
                        }, {
                            $match: _defineProperty({
                                quantity: {
                                    $ne: 0
                                },
                                statusIndex: {
                                    $ne: "4"
                                }
                            }, 'statusIndex', {
                                $eq: "0"
                            })
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'productRangeId',
                                foreignField: '_id',
                                as: 'productRangeList'
                            }
                        }, {
                            $unwind: '$productRangeList'
                        }, {
                            $lookup: {
                                from: 'companysuppliers',
                                localField: 'supplierId',
                                foreignField: '_id',
                                as: 'companySupplier'
                            }
                        }, {
                            "$unwind": {
                                "path": "$companySupplier",
                                "preserveNullAndEmptyArrays": true
                            }
                        }, {
                            $match: {
                                'companySupplier.type': {
                                    $eq: "1"
                                }
                            }
                        }, {
                            $lookup: {
                                from: 'suppliers',
                                localField: 'companySupplier.supplierId',
                                foreignField: '_id',
                                as: 'supplier'
                            }
                        }, {
                            $group: {
                                _id: {
                                    supplierId: "$supplier._id",
                                    supplierName: "$supplier.name",
                                    placeOrderBeforeTime: '$companySupplier.placeOrderBeforeTime',
                                    placeOrderAhead: '$companySupplier.placeOrderAhead',
                                    supplierType: '$companySupplier.type',
                                    estimatedDate: '$expectedDeliveryDate'
                                },
                                quantity: {
                                    "$push": "$quantity"
                                },
                                checklistProduct: {
                                    "$push": {
                                        "_id": "$productRangeList._id",
                                        "status": "$productRangeList.status",
                                        "name": "$productRangeList.name",
                                        "packaging": "$productRangeList.packaging",
                                        "standardQuantity": "$productRangeList.standardQuantity",
                                        "locationId": "$productRangeList.locationId",
                                        "businessId": "$productRangeList.businessId",
                                        "locationPreferredIndex": "$productRangeList.locationPreferredIndex",
                                        "suppliersProduct": "$productRangeList.suppliersProduct",
                                        "updatedAt": "$productRangeList.updatedAt",
                                        "createdAt": "$productRangeList.createdAt",
                                        "image": "$productRangeList.image",
                                        "asap": "$asap"
                                    }
                                },
                                asap: {
                                    "$push": {
                                        'asap': "$asap",
                                        'id': '$productRangeId'
                                    }
                                },
                                estimatedDate: {
                                    "$first": '$expectedDeliveryDate'
                                }
                            }
                        }]));

                    case 1:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function supplierOrder(_x16) {
        return _ref11.apply(this, arguments);
    };
}();
exports.finalOrder = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee12$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        _context13.prev = 0;
                        params = req.body.params;
                        _context13.next = 4;
                        return _orderDetail2.default.find({
                            checklistCombinationId: params.checklistCombinationId,
                            statusIndex: 1
                        }).populate({
                            path: 'supplierId',
                            model: _companySuppliers2.default,
                            "select": "supplierId deliveryDaysStandard placeOrderAhead placeOrderBeforeTime",
                            "populate": {
                                path: 'supplierId',
                                model: _supplier2.default,
                                "select": "name"
                            }
                        }).then(function (supplier) {
                            var dateTime = new Date();
                            var currentTime = dateTime.getHours() + ':' + dateTime.getMinutes();
                            var date = void 0;
                            var errorProduct = [];
                            supplier.forEach(function (supplierData) {

                                date = (0, _moment2.default)(supplierData.expectedDeliveryDate).subtract(supplierData.supplierId.placeOrderAhead, "days").format("MM-DD-YYYY");
                                if (new Date((0, _moment2.default)().format("MM-DD-YYYY")) < new Date(date) && (0, _moment2.default)().format("HH:mm") > supplierData.supplierId.placeOrderBeforeTime) {
                                    errorProduct.push(supplierData);
                                }
                            });
                            if (errorProduct.length > 0) {
                                res.status(401).send({
                                    code: 401,
                                    message: _message2.default.infoMessage.changeDeliveryDate,
                                    data: errorProduct,
                                    err: []
                                });
                            } else {
                                _orderDetail2.default.updateMany({
                                    checklistCombinationId: params.checklistCombinationId
                                }, {
                                    $set: {
                                        statusIndex: "1"
                                    }
                                }).then(function (orderDetails) {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.orderConfirm,
                                        data: orderDetails,
                                        err: []
                                    });
                                }).catch(function (err) {
                                    res.status(400).send({
                                        code: 400,
                                        message: _message2.default.errorMessage.genericError,
                                        data: [],
                                        err: err
                                    });
                                });
                            }
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 4:
                        _context13.next = 9;
                        break;

                    case 6:
                        _context13.prev = 6;
                        _context13.t0 = _context13['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context13.t0
                        });

                    case 9:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee12, undefined, [[0, 6]]);
    }));

    return function (_x17, _x18) {
        return _ref12.apply(this, arguments);
    };
}();
exports.asap = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var params, exe, decode, orderForSave;
        return regeneratorRuntime.wrap(function _callee13$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                            orderForSave = (0, _order2.default)({
                                businessId: decode.businessId,
                                expectedDeliveryDate: params.expectedDeliveryDate,
                                status: 0,
                                supplierId: params.supplierId,
                                asap: params.asap
                            });

                            orderForSave.save().then(function (order) {
                                params.businessId = decode.businessId;
                                params.orderId = order._id;
                                params.orderByUserId = decode._id;
                                params.orderOnDateTime = Date.now();
                                params.statusIndex = 0;
                                var orderDetailForSave = (0, _orderDetail2.default)(params);
                                orderDetailForSave.save();
                                return _productRangeItems2.default.findById(params.productRangeId);
                            }).then(function (orderDetail) {
                                _companySuppliers2.default.findById(params.supplierId).select('orderEmail').then(function (companySupplier) {
                                    _ejs2.default.renderFile('src/views/email/sendAsap.ejs', {
                                        orderDetail: orderDetail,
                                        items: params.quantity
                                    }).then(function (content) {
                                        var mailOptions = {
                                            to: companySupplier.orderEmail,
                                            subject: "Check That",
                                            html: content
                                        };
                                        _email2.default.email(mailOptions).then(function (info) {
                                            res.send(orderDetail);
                                        }).catch(function (err) {});
                                    });
                                });
                            }).catch(function (err) {
                                res.status(400).send({
                                    code: 400,
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
                        return _context14.stop();
                }
            }
        }, _callee13, undefined);
    }));

    return function (_x19, _x20) {
        return _ref13.apply(this, arguments);
    };
}();
exports.orderList = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee14$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context15.next = 5;
                        return _order2.default.aggregate([{
                            $match: {
                                "businessId": _mongoose2.default.Types.ObjectId(decode.businessId),
                                "status": "0"
                            }
                        }, {
                            "$lookup": {
                                "from": "companysuppliers",
                                "localField": "supplierId",
                                "foreignField": "_id",
                                "as": "companySupplier"
                            }
                        }, {
                            $unwind: "$companySupplier"
                        }, {
                            $match: {
                                "companySupplier.type": "1"
                            }
                        }, {
                            "$lookup": {
                                "from": "suppliers",
                                "localField": "companySupplier.supplierId",
                                "foreignField": "_id",
                                "as": "supplier"
                            }
                        }, {
                            $unwind: "$supplier"
                        }, {
                            "$lookup": {
                                "from": "orderDetail",
                                "localField": "_id",
                                "foreignField": "orderId",
                                "as": "orderList"
                            }
                        }, {
                            $unwind: "$orderList"
                        }, {
                            $match: {
                                'orderList.quantity': {
                                    $ne: 0
                                }
                            }
                        }, {
                            $match: {
                                'orderList.statusIndex': {
                                    $ne: "4"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    id: "$supplier._id",
                                    supplierName: "$supplier.name",
                                    orderId: "$_id"
                                },
                                expectedDeliveryDate: {
                                    "$first": {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$expectedDeliveryDate"
                                        }
                                    }
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$first": "$orderList"
                                },
                                placeOrderAhead: {
                                    "$first": "$companySupplier.placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$companySupplier.placeOrderBeforeTime"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    expectedDeliveryDate: "$expectedDeliveryDate",
                                    id: "$_id.id"
                                },
                                supplierName: {
                                    "$first": "$_id.supplierName"
                                },
                                supplierId: {
                                    "$first": "$_id.id"
                                },
                                orderId: {
                                    "$first": "$_id.orderId"
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$push": "$orderSupplier"
                                },
                                placeOrderAhead: {
                                    "$first": "$placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$placeOrderBeforeTime"
                                }
                            }
                        }, {
                            "$sort": {
                                "_id.expectedDeliveryDate": 1
                            }
                        }]).then(function (orderList) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderList,
                                err: []
                            });
                        });

                    case 5:
                        _context15.next = 10;
                        break;

                    case 7:
                        _context15.prev = 7;
                        _context15.t0 = _context15['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context15.t0
                        });

                    case 10:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee14, undefined, [[0, 7]]);
    }));

    return function (_x21, _x22) {
        return _ref14.apply(this, arguments);
    };
}();
exports.orderListSend = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee15$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        _context16.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context16.next = 5;
                        return _order2.default.aggregate([{
                            $match: {
                                "businessId": _mongoose2.default.Types.ObjectId(decode.businessId),
                                "status": "1"
                            }
                        }, {
                            "$lookup": {
                                "from": "companysuppliers",
                                "localField": "supplierId",
                                "foreignField": "_id",
                                "as": "companySupplier"
                            }
                        }, {
                            $unwind: "$companySupplier"
                        }, {
                            $match: {
                                "companySupplier.type": "1"
                            }
                        }, {
                            "$lookup": {
                                "from": "suppliers",
                                "localField": "companySupplier.supplierId",
                                "foreignField": "_id",
                                "as": "supplier"
                            }
                        }, {
                            $unwind: "$supplier"
                        }, {
                            "$lookup": {
                                "from": "orderDetail",
                                "localField": "_id",
                                "foreignField": "orderId",
                                "as": "orderList"
                            }
                        }, {
                            $unwind: "$orderList"
                        }, {
                            $match: {
                                'orderList.quantity': {
                                    $ne: 0
                                }
                            }
                        }, {
                            $match: {
                                'orderList.statusIndex': {
                                    $ne: "4"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    id: "$supplier._id",
                                    supplierName: "$supplier.name",
                                    orderId: "$_id"
                                },
                                expectedDeliveryDate: {
                                    "$first": {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$expectedDeliveryDate"
                                        }
                                    }
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$first": "$orderList"
                                },
                                placeOrderAhead: {
                                    "$first": "$companySupplier.placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$companySupplier.placeOrderBeforeTime"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    expectedDeliveryDate: "$expectedDeliveryDate",
                                    id: "$_id.orderId"
                                },
                                supplierName: {
                                    "$first": "$_id.supplierName"
                                },
                                supplierId: {
                                    "$first": "$_id.id"
                                },
                                orderId: {
                                    "$first": "$_id.orderId"
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$push": "$orderSupplier"
                                },
                                placeOrderAhead: {
                                    "$first": "$placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$placeOrderBeforeTime"
                                }
                            }
                        }, {
                            "$sort": {
                                "_id.expectedDeliveryDate": 1
                            }
                        }]).then(function (orderList) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderList,
                                err: []
                            });
                        });

                    case 5:
                        _context16.next = 10;
                        break;

                    case 7:
                        _context16.prev = 7;
                        _context16.t0 = _context16['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context16.t0
                        });

                    case 10:
                    case 'end':
                        return _context16.stop();
                }
            }
        }, _callee15, undefined, [[0, 7]]);
    }));

    return function (_x23, _x24) {
        return _ref15.apply(this, arguments);
    };
}();
exports.orderListReceived = function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
        var exe, decode, date;
        return regeneratorRuntime.wrap(function _callee16$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        _context17.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        date = (0, _moment2.default)(new Date()).subtract('days', 1);
                        // let admin = await adminDetails(decode.businessId);

                        _context17.next = 6;
                        return _order2.default.aggregate([{
                            $match: {
                                "businessId": _mongoose2.default.Types.ObjectId(decode.businessId),
                                "status": "2",
                                "actualDeliveryDate": {
                                    $gt: new Date(date)
                                    // "actualDeliveryDate":{ $gt: momentTimeZone.tz(new Date(date),admin.timeZone) }
                                } }
                        }, {
                            "$lookup": {
                                "from": "companysuppliers",
                                "localField": "supplierId",
                                "foreignField": "_id",
                                "as": "companySupplier"
                            }
                        }, {
                            $unwind: "$companySupplier"
                        }, {
                            $match: {
                                "companySupplier.type": "1"
                            }
                        }, {
                            "$lookup": {
                                "from": "suppliers",
                                "localField": "companySupplier.supplierId",
                                "foreignField": "_id",
                                "as": "supplier"
                            }
                        }, {
                            $unwind: "$supplier"
                        }, {
                            "$lookup": {
                                "from": "orderDetail",
                                "localField": "_id",
                                "foreignField": "orderId",
                                "as": "orderList"
                            }
                        }, {
                            $unwind: "$orderList"
                        }, {
                            $match: {
                                'orderList.quantity': {
                                    $ne: 0
                                }
                            }
                        }, {
                            $match: {
                                'orderList.statusIndex': {
                                    $ne: "4"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    id: "$supplier._id",
                                    supplierName: "$supplier.name",
                                    orderId: "$_id"
                                },
                                expectedDeliveryDate: {
                                    "$first": {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$expectedDeliveryDate"
                                        }
                                    }
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$first": "$orderList"
                                },
                                placeOrderAhead: {
                                    "$first": "$companySupplier.placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$companySupplier.placeOrderBeforeTime"
                                }
                            }
                        }, {
                            $group: {
                                _id: {
                                    expectedDeliveryDate: "$expectedDeliveryDate",
                                    id: "$_id.orderId"
                                },
                                supplierName: {
                                    "$first": "$_id.supplierName"
                                },
                                supplierId: {
                                    "$first": "$_id.id"
                                },
                                orderId: {
                                    "$first": "$_id.orderId"
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$push": "$orderSupplier"
                                },
                                placeOrderAhead: {
                                    "$first": "$placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$placeOrderBeforeTime"
                                }
                            }
                        }, {
                            "$sort": {
                                "_id.expectedDeliveryDate": 1
                            }
                        }]).then(function (orderList) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderList,
                                err: []
                            });
                        });

                    case 6:
                        _context17.next = 11;
                        break;

                    case 8:
                        _context17.prev = 8;
                        _context17.t0 = _context17['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context17.t0
                        });

                    case 11:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee16, undefined, [[0, 8]]);
    }));

    return function (_x25, _x26) {
        return _ref16.apply(this, arguments);
    };
}();
exports.orderListProductWise = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee17$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.prev = 0;
                        params = req.body.params;
                        _context18.next = 4;
                        return _order2.default.aggregate([{
                            $match: {
                                "_id": _mongoose2.default.Types.ObjectId(params.id)
                            }
                        }, {
                            "$lookup": {
                                "from": "orderDetail",
                                "localField": "_id",
                                "foreignField": "orderId",
                                "as": "orderDetailsData"
                            }
                        }, {
                            $unwind: "$orderDetailsData"
                        }, {
                            $match: {
                                'orderDetailsData.quantity': {
                                    "$ne": 0
                                }
                            }
                        }, {
                            $match: {
                                'orderDetailsData.statusIndex': {
                                    $ne: "4"
                                }
                            }
                        }, {
                            "$lookup": {
                                "from": "companysuppliers",
                                "localField": "orderDetailsData.supplierId",
                                "foreignField": "_id",
                                "as": "companySupplier"
                            }
                        }, {
                            $unwind: "$companySupplier"
                        }, {
                            $match: {
                                "companySupplier.type": "1"
                            }
                        }, {
                            "$lookup": {
                                "from": "suppliers",
                                "localField": "companySupplier.supplierId",
                                "foreignField": "_id",
                                "as": "supplier"
                            }
                        }, {
                            $unwind: "$supplier"
                        }, {
                            "$lookup": {
                                "from": "productRangeItems",
                                "localField": "orderDetailsData.productRangeId",
                                "foreignField": "_id",
                                "as": "productRage"
                            }
                        }, {
                            $unwind: "$productRage"
                        }, {
                            $group: {
                                "_id": {
                                    "id": "$productRage._id",
                                    "name": "$productRage.name"
                                },
                                "orderSupplierProduct": {
                                    "$first": "$productRage"
                                },
                                "orderDetails": {
                                    "$push": '$orderDetailsData'
                                },
                                "remark": {
                                    "$first": '$remark'
                                },
                                "orderStatus": {
                                    "$first": '$status'
                                },
                                "quantity": {
                                    $sum: "$orderDetailsData.quantity"
                                },
                                "packaging": {
                                    $sum: "$orderDetailsData.packaging"
                                }
                            }
                        }, {
                            $project: {
                                name: "$_id.name",
                                "orderSupplierProduct": "$orderSupplierProduct",
                                "Quantity": "$quantity",
                                "orderDetails": "$orderDetails",
                                "packaging": "$packaging",
                                "remark": "$remark",
                                "orderStatus": "$orderStatus"
                            }
                        }]).then(function (supplierProduct) {
                            _supplierProducts2.default.populate(supplierProduct, {
                                path: 'orderSupplierProduct.suppliersProduct.supplierProductId'
                            }).then(function (data) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.getDetails,
                                    data: data,
                                    err: []
                                });
                            });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 4:
                        _context18.next = 9;
                        break;

                    case 6:
                        _context18.prev = 6;
                        _context18.t0 = _context18['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context18.t0
                        });

                    case 9:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee17, undefined, [[0, 6]]);
    }));

    return function (_x27, _x28) {
        return _ref17.apply(this, arguments);
    };
}();

// **New change */
// exports.orderListProductWise = async (req, res) => {
//     try {
//         const {
//             params
//         } = req.body;
//         let tempArray = [];
//         let addProductPrice = [];
//         const array = ['5e0dd21c2778cc210c294e45','5e0dd4982778cc210c294e48'];
//         const arrayValue = array.values();
//         for (let singleValue of arrayValue){
//             await orderModel.aggregate([{
//                 $match: {
//                     "_id": mongoose.Types.ObjectId(singleValue)
//                 }
//             },
//             {
//                 "$lookup": {
//                     "from": "orderDetail",
//                     "localField": "_id",
//                     "foreignField": "orderId",
//                     "as": "orderDetailsData"
//                 }
//             },
//             {
//                 $unwind: "$orderDetailsData"
//             },
//             {
//                 $match: {
//                     'orderDetailsData.quantity': {
//                         "$ne": 0
//                     }
//                 }
//             },
//             {
//                 $match: {
//                     'orderDetailsData.statusIndex': {
//                         $ne: "4"
//                     }
//                 }
//             },
//             {
//                 "$lookup": {
//                     "from": "companysuppliers",
//                     "localField": "orderDetailsData.supplierId",
//                     "foreignField": "_id",
//                     "as": "companySupplier"
//                 }
//             },
//             {
//                 $unwind: "$companySupplier"
//             },
//             {
//                 $match: {
//                     "companySupplier.type": "1"
//                 }
//             },
//             {
//                 "$lookup": {
//                     "from": "suppliers",
//                     "localField": "companySupplier.supplierId",
//                     "foreignField": "_id",
//                     "as": "supplier"
//                 }
//             },
//             {
//                 $unwind: "$supplier"
//             },
//             {
//                 "$lookup": {
//                     "from": "productRangeItems",
//                     "localField": "orderDetailsData.productRangeId",
//                     "foreignField": "_id",
//                     "as": "productRage"
//                 }
//             },
//             {
//                 $unwind: "$productRage"
//             },
//             {
//                 $group: {
//                     "_id": {
//                         "id": "$productRage._id",
//                         "name": "$productRage.name"
//                     },
//                     "orderSupplierProduct": {
//                         "$first": "$productRage"
//                     },
//                     "orderDetails": {
//                         "$push": '$orderDetailsData'
//                     },
//                     "remark": {
//                         "$first": '$remark'
//                     },
//                     "orderStatus": {
//                         "$first": '$status'
//                     },
//                     "quantity": {
//                         $sum: "$orderDetailsData.quantity"
//                     },
//                     "packaging": {
//                         $sum: "$orderDetailsData.packaging"
//                     }
//                 }
//             }, {
//                 $project: {
//                     name: "$_id.name",
//                     "orderSupplierProduct": "$orderSupplierProduct",
//                     "Quantity": "$quantity",
//                     "orderDetails": "$orderDetails",
//                     "packaging": "$packaging",
//                     "remark": "$remark",
//                     "orderStatus": "$orderStatus"
//                 }
//             }
//         ]).then(async(supplierProduct) => {
//             await supplierProductsModel.populate(supplierProduct, {
//                     path: 'orderSupplierProduct.suppliersProduct.supplierProductId'
//                 })
//                 .then(data => {
//                     tempArray = [...tempArray,...data];
//                 })
//         }).catch(err => {
//             res.status(400).send({
//                 code: 400,
//                 message: Message.errorMessage.genericError,
//                 data: [],
//                 err: err
//             })
//         })
//         }
//         tempArray.forEach(function (a) {
//             console.log("a : ",a._id.id)
//             if (!this[a._id.id]) {
//                 this[a._id.id] = { _id: a._id, name: a.name, orderSupplierProduct: a.orderSupplierProduct, Quantity: 0, packaging: a.packaging, remark: a.remark, orderStatus: a.orderStatus };
//                 addProductPrice.push(this[a._id.id]);
//             }
//             this[a._id.id].Quantity += a.Quantity;
//             this[a._id.id].packaging += a.packaging;
//         }, Object.create(null));

//         res.status(200).send({
//             code: 200,
//             message: Message.infoMessage.getDetails,
//             // data: tempArray,
//             data: addProductPrice,
//             err: []
//         })

//     } catch (err) {
//         console.log("errrr",err)
//         res.status(400).send({
//             code: 400,
//             message: Message.errorMessage.genericError,
//             data: [],
//             error: err
//         });
//     }
// }

exports.orderProductComment = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(req, res) {
        var params, i, exe, decode;
        return regeneratorRuntime.wrap(function _callee21$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        _context22.prev = 0;
                        params = req.body.params;
                        i = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        // let admin = await adminDetails(decode.businessId);

                        _context22.next = 7;
                        return params.product.forEach(function (Element) {
                            if (i == params.product.length - 1) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.updateData,
                                    data: [],
                                    err: []
                                });
                            }
                            if (Element.status == 3) {
                                _orderDetail2.default.findByIdAndUpdate(Element.id, {
                                    deliveryComment: Element.orderComment,
                                    deliveredQuantity: Element.quantity,
                                    actualDeliveryDate: new Date(),
                                    // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone),
                                    statusIndex: 3
                                }, {
                                    new: true
                                }).then(function () {
                                    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(updateOrderDetails) {
                                        return regeneratorRuntime.wrap(function _callee19$(_context20) {
                                            while (1) {
                                                switch (_context20.prev = _context20.next) {
                                                    case 0:
                                                        _context20.next = 2;
                                                        return _order2.default.findByIdAndUpdate(updateOrderDetails.orderId, {
                                                            deliveryDateTime: Date.now(),
                                                            status: 2,
                                                            actualDeliveryDate: new Date()
                                                        }, {
                                                            new: true
                                                        })
                                                        // orderModel.findByIdAndUpdate(updateOrderDetails.orderId, { deliveryDateTime: momentTimeZone.tz(new Date(),admin.timeZone), status: 2, actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone) }, { new: true })
                                                        .then(function () {
                                                            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(updateOrder) {
                                                                return regeneratorRuntime.wrap(function _callee18$(_context19) {
                                                                    while (1) {
                                                                        switch (_context19.prev = _context19.next) {
                                                                            case 0:
                                                                                _context19.next = 2;
                                                                                return _orderDetail2.default.updateMany({
                                                                                    orderId: updateOrderDetails.orderId,
                                                                                    productRangeId: updateOrderDetails.productRangeId,
                                                                                    statusIndex: {
                                                                                        $ne: "4"
                                                                                    },
                                                                                    quantity: {
                                                                                        $ne: 0
                                                                                    }
                                                                                }, {
                                                                                    deliveryComment: Element.orderComment,
                                                                                    deliveredQuantity: Element.quantity,
                                                                                    actualDeliveryDate: new Date(),
                                                                                    // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone),
                                                                                    statusIndex: 3
                                                                                }, {
                                                                                    new: true
                                                                                }).then(function (data) {});

                                                                            case 2:
                                                                            case 'end':
                                                                                return _context19.stop();
                                                                        }
                                                                    }
                                                                }, _callee18, undefined);
                                                            }));

                                                            return function (_x32) {
                                                                return _ref20.apply(this, arguments);
                                                            };
                                                        }());

                                                    case 2:
                                                    case 'end':
                                                        return _context20.stop();
                                                }
                                            }
                                        }, _callee19, undefined);
                                    }));

                                    return function (_x31) {
                                        return _ref19.apply(this, arguments);
                                    };
                                }());
                            } else {
                                _orderDetail2.default.findByIdAndUpdate(Element.id, {
                                    deliveryComment: Element.orderComment,
                                    deliveredQuantity: Element.quantity,
                                    actualDeliveryDate: new Date(),
                                    // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone),
                                    statusIndex: 2
                                }, {
                                    new: true
                                }).then(function (updateOrderDetails) {
                                    _order2.default.findByIdAndUpdate(updateOrderDetails.orderId, {
                                        deliveryDateTime: Date.now(),
                                        status: 2,
                                        actualDeliveryDate: new Date()
                                    }, {
                                        new: true
                                    })
                                    // orderModel.findByIdAndUpdate(updateOrderDetails.orderId, { deliveryDateTime: momentTimeZone.tz(new Date(),admin.timeZone), status: 2, actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone) }, { new: true })
                                    .then(function () {
                                        var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(updateOrder) {
                                            return regeneratorRuntime.wrap(function _callee20$(_context21) {
                                                while (1) {
                                                    switch (_context21.prev = _context21.next) {
                                                        case 0:
                                                            _context21.next = 2;
                                                            return _orderDetail2.default.updateMany({
                                                                orderId: updateOrderDetails.orderId,
                                                                productRangeId: updateOrderDetails.productRangeId,
                                                                statusIndex: {
                                                                    $ne: "4"
                                                                },
                                                                quantity: {
                                                                    $ne: 0
                                                                }
                                                            }, {
                                                                deliveryComment: Element.orderComment,
                                                                deliveredQuantity: Element.quantity,
                                                                actualDeliveryDate: new Date(),
                                                                // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone),
                                                                statusIndex: 2
                                                            }, {
                                                                new: true
                                                            }).then(function (data) {});

                                                        case 2:
                                                        case 'end':
                                                            return _context21.stop();
                                                    }
                                                }
                                            }, _callee20, undefined);
                                        }));

                                        return function (_x33) {
                                            return _ref21.apply(this, arguments);
                                        };
                                    }());
                                });
                            }
                            i++;
                        });

                    case 7:
                        _context22.next = 12;
                        break;

                    case 9:
                        _context22.prev = 9;
                        _context22.t0 = _context22['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context22.t0
                        });

                    case 12:
                    case 'end':
                        return _context22.stop();
                }
            }
        }, _callee21, undefined, [[0, 9]]);
    }));

    return function (_x29, _x30) {
        return _ref18.apply(this, arguments);
    };
}();
exports.getChecklistCombinationName = function () {
    var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee22$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _checklistCombination2.default.findOne({
                                checklistId: params.checklist
                            }).then(function (checklist) {
                                if (checklist) {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.getDetails,
                                        data: checklist.name,
                                        err: []
                                    });
                                } else {
                                    res.status(200).send({
                                        code: 200,
                                        message: _message2.default.infoMessage.checklistCombinationName,
                                        data: [],
                                        err: []
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
                        return _context23.stop();
                }
            }
        }, _callee22, undefined);
    }));

    return function (_x34, _x35) {
        return _ref22.apply(this, arguments);
    };
}();
exports.checklistCombinationPause = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee23$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _checklistCombination2.default.findByIdAndUpdate(params.checklistCombinationId, {
                                isPause: 1,
                                "pauseData.checklistCombinationId": params.checklistCombinationId,
                                "pauseData.productId": params.productId,
                                "pauseData.productIndex": params.productIndex,
                                "pauseData.userId": decode._id
                            }, {
                                upsert: true,
                                new: true
                            }).then(function (pausedata) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.checklistComninationPause,
                                    data: pausedata,
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
                        return _context24.stop();
                }
            }
        }, _callee23, undefined);
    }));

    return function (_x36, _x37) {
        return _ref23.apply(this, arguments);
    };
}();
exports.resumeChecklistCombination = function () {
    var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee24$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        _context25.prev = 0;
                        params = req.body.params;
                        _context25.next = 4;
                        return _checklistCombination2.default.findByIdAndUpdate(params.checklistCombinationId, {
                            isPause: 0
                        }, {
                            new: true
                        }).populate({
                            path: 'userId',
                            model: _users2.default
                        }).populate({
                            path: 'productId',
                            model: _productRangeItems2.default
                        }).then(function (pauseData) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: pauseData,
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

                    case 4:
                        _context25.next = 9;
                        break;

                    case 6:
                        _context25.prev = 6;
                        _context25.t0 = _context25['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context25.t0
                        });

                    case 9:
                    case 'end':
                        return _context25.stop();
                }
            }
        }, _callee24, undefined, [[0, 6]]);
    }));

    return function (_x38, _x39) {
        return _ref24.apply(this, arguments);
    };
}();

exports.checklistProductList = function () {
    var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee25$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        _context26.prev = 0;
                        params = req.body.params;
                        _context26.next = 4;
                        return _checklistCombination2.default.aggregate([{
                            $match: {
                                _id: _mongoose2.default.Types.ObjectId(params.id)
                            }
                        }, {
                            $lookup: {
                                from: 'checklist',
                                localField: 'checklistId',
                                foreignField: '_id',
                                as: 'checklist'
                            }
                        }, {
                            $unwind: '$checklist'
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'checklist.product',
                                foreignField: '_id',
                                as: 'checklistProduct'
                            }
                        }, {
                            $unwind: '$checklistProduct'
                        }, {
                            $lookup: {
                                from: 'orderDetail',
                                localField: 'checklistProduct._id',
                                foreignField: 'productRangeId',
                                as: 'orderProduct'
                            }
                        }, {
                            "$project": {
                                "checklistProduct": "$checklistProduct",
                                "orderProduct": {
                                    "$filter": {
                                        "input": "$orderProduct",
                                        "as": "orderProduct",
                                        "cond": {
                                            "$eq": ["$$orderProduct.checklistCombinationId", _mongoose2.default.Types.ObjectId(params.id)]
                                        }
                                    }
                                }
                            }
                        }]).then(function (checklistWiseData) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: checklistWiseData,
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

                    case 4:
                        _context26.next = 9;
                        break;

                    case 6:
                        _context26.prev = 6;
                        _context26.t0 = _context26['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context26.t0
                        });

                    case 9:
                    case 'end':
                        return _context26.stop();
                }
            }
        }, _callee25, undefined, [[0, 6]]);
    }));

    return function (_x40, _x41) {
        return _ref25.apply(this, arguments);
    };
}();

exports.submitOrder = function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee26$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                            // let admin = await adminDetails(decode.businessId);

                            _checklistCombination2.default.findOne({
                                _id: params.checklistCombinationId,
                                isDelete: 0
                            }).select('finishDate finsishByUserId').then(function (checklistCombination) {
                                if (checklistCombination === null) {
                                    res.status(404).send({
                                        code: 404,
                                        message: _message2.default.errorMessage.dataNotFound,
                                        data: [],
                                        err: []
                                    });
                                } else if (!checklistCombination.finishDate) {
                                    _checklistCombination2.default.findByIdAndUpdate(checklistCombination._id, {
                                        finishDate: new Date(),
                                        finsishByUserId: decode._id
                                    }, {
                                        new: true,
                                        upsert: true
                                    })
                                    // checklistCollectionModel.findByIdAndUpdate(checklistCombination._id, { finishDate: momentTimeZone.tz(new Date(),admin.timeZone), finsishByUserId: decode._id }, { new: true, upsert: true })
                                    .then(function (checklistData) {
                                        res.status(200).send({
                                            code: 200,
                                            message: _message2.default.infoMessage.updateData,
                                            data: checklistData,
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
                                } else {
                                    res.status(409).send({
                                        code: 409,
                                        message: _message2.default.infoMessage.alreadySubmitted,
                                        data: [],
                                        err: []
                                    });
                                }
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
                        return _context27.stop();
                }
            }
        }, _callee26, undefined);
    }));

    return function (_x42, _x43) {
        return _ref26.apply(this, arguments);
    };
}();

exports.editOrder = function () {
    var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee27$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        _context28.prev = 0;
                        params = req.body.params;
                        _context28.next = 4;
                        return _orderDetail2.default.findOneAndUpdate({
                            _id: params.orderDetailsId,
                            statusIndex: 0
                        }, {
                            quantity: params.quantity,
                            packaging: params.packaging
                        }, {
                            new: true
                        }).then(function (updateOrder) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.updateData,
                                data: updateOrder,
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

                    case 4:
                        _context28.next = 9;
                        break;

                    case 6:
                        _context28.prev = 6;
                        _context28.t0 = _context28['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context28.t0
                        });

                    case 9:
                    case 'end':
                        return _context28.stop();
                }
            }
        }, _callee27, undefined, [[0, 6]]);
    }));

    return function (_x44, _x45) {
        return _ref27.apply(this, arguments);
    };
}();

exports.allOrderProductListing = function () {
    var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee28$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        _context29.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context29.next = 6;
                        return _orderDetail2.default.find({
                            productRangeId: params.productRangeId,
                            orderId: params.orderId,
                            quantity: {
                                $ne: 0
                            },
                            statusIndex: {
                                $ne: "4"
                            }
                        }).populate({
                            path: 'orderId',
                            model: _order2.default,
                            select: "status"
                        }).populate({
                            path: 'checklistCombinationId',
                            model: _checklistCombination2.default,
                            select: "name"
                        }).populate({
                            path: 'productRangeId',
                            model: _productRangeItems2.default
                        }).populate({
                            path: 'supplierId',
                            model: _companySuppliers2.default,
                            select: "supplierId",
                            "populate": {
                                path: 'supplierId',
                                model: _supplier2.default,
                                select: "name"
                            }
                        }).then(function (orderProductData) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderProductData,
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
                        _context29.next = 11;
                        break;

                    case 8:
                        _context29.prev = 8;
                        _context29.t0 = _context29['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context29.t0
                        });

                    case 11:
                    case 'end':
                        return _context29.stop();
                }
            }
        }, _callee28, undefined, [[0, 8]]);
    }));

    return function (_x46, _x47) {
        return _ref28.apply(this, arguments);
    };
}();

//**New Changes */
// exports.allOrderProductListing = async (req, res) => {
//     try {
//         const {
//             params
//         } = req.body;
//         const exe = req.headers.authorization.split(' ');
//         const decode = JWT.verify(exe[1], config.JWTSecret);
//         let tempArray = [];
//         const array = ['5e0dd21c2778cc210c294e45','5e0dd4982778cc210c294e48'];
//         const productRangeId = ['5e09dfac585b6b0d30c4153d','5e09dfac585b6b0d30c4153b'];
//         const arrayValue = array.values();
//         for (let singleValue  of arrayValue){
//             await orderDetailModel.find({
//                 productRangeId: productRangeId,
//                 orderId: singleValue,
//                 quantity: {
//                     $ne: 0
//                 },
//                 statusIndex: {
//                     $ne: "4"
//                 }
//             })
//             .populate({
//                 path: 'orderId',
//                 model: orderModel,
//                 select: "status"
//             })
//             .populate({
//                 path: 'checklistCombinationId',
//                 model: checklistCombination,
//                 select: "name"
//             })
//             .populate({
//                 path: 'productRangeId',
//                 model: productRangeModel
//             })
//             .populate({
//                 path: 'supplierId',
//                 model: comapnySupplierModel,
//                 select: "supplierId",
//                 "populate": {
//                     path: 'supplierId',
//                     model: supplierModel,
//                     select: "name"
//                 }
//             })
//             .then((orderProductData) => {
//                 tempArray = [ ...tempArray, ...orderProductData];
//             }).catch((err) => {
//                 res.status(400).send({
//                     code: 400,
//                     message: Message.errorMessage.genericError,
//                     data: [],
//                     error: err
//                 });
//             })
//         }
//         res.status(200).send({
//             code: 200,
//             message: Message.infoMessage.getDetails,
//             data: tempArray,
//             // data: tempArray,
//             error: []
//         })
//     } catch (err) {
//         console.log("err",err)
//         res.status(400).send({
//             code: 400,
//             message: Message.errorMessage.genericError,
//             data: [],
//             error: err
//         });
//     }
// }
exports.orderProduct = function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee30$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        _context31.prev = 0;
                        params = req.body.params;
                        _context31.next = 4;
                        return _orderDetail2.default.findById(params.orderDetailId).populate({
                            path: 'checklistCombinationId',
                            model: _checklistCombination2.default,
                            select: "name"
                        }).populate({
                            path: 'orderId',
                            model: _order2.default
                        }).populate({
                            path: 'productRangeId',
                            model: _productRangeItems2.default,
                            "populate": {
                                path: 'suppliersProduct.supplierProductId',
                                model: _supplierProducts2.default,
                                "select": "minOrder orderBy name packaging"
                            }
                        }).populate({
                            path: 'supplierId',
                            model: _companySuppliers2.default,
                            "populate": {
                                path: 'supplierId',
                                model: _supplier2.default
                            }
                        }).then(function () {
                            var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(orderProduct) {
                                return regeneratorRuntime.wrap(function _callee29$(_context30) {
                                    while (1) {
                                        switch (_context30.prev = _context30.next) {
                                            case 0:
                                                orderProduct.orderId.asap = orderProduct.asap;
                                                orderProduct.productRangeId.suppliersProduct.filter(function (supplierProducts) {
                                                    if (supplierProducts.supplierProductId !== undefined && String(supplierProducts.supplierProductId._id) == String(orderProduct.supplierProductId)) {
                                                        return orderProduct.productRangeId.suppliersProduct = supplierProducts;
                                                    }
                                                });
                                                res.status(200).send({
                                                    code: 200,
                                                    message: _message2.default.infoMessage.getDetails,
                                                    data: orderProduct,
                                                    error: []
                                                });

                                            case 3:
                                            case 'end':
                                                return _context30.stop();
                                        }
                                    }
                                }, _callee29, undefined);
                            }));

                            return function (_x50) {
                                return _ref30.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 4:
                        _context31.next = 9;
                        break;

                    case 6:
                        _context31.prev = 6;
                        _context31.t0 = _context31['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context31.t0
                        });

                    case 9:
                    case 'end':
                        return _context31.stop();
                }
            }
        }, _callee30, undefined, [[0, 6]]);
    }));

    return function (_x48, _x49) {
        return _ref29.apply(this, arguments);
    };
}();

exports.checklistProductAndDetail = function () {
    var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(req, res) {
        var params, checklistProductsList, productDetails;
        return regeneratorRuntime.wrap(function _callee31$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        _context32.prev = 0;
                        params = req.body.params;
                        _context32.next = 4;
                        return checklistProducts(params);

                    case 4:
                        checklistProductsList = _context32.sent;
                        _context32.next = 7;
                        return productDetail(checklistProductsList, params.id);

                    case 7:
                        productDetails = _context32.sent;

                        res.status(200).send({
                            code: 200,
                            message: _message2.default.infoMessage.getDetails,
                            data: {
                                checklistProductsList: checklistProductsList,
                                productDetails: productDetails
                            },
                            error: []
                        });
                        _context32.next = 14;
                        break;

                    case 11:
                        _context32.prev = 11;
                        _context32.t0 = _context32['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context32.t0
                        });

                    case 14:
                    case 'end':
                        return _context32.stop();
                }
            }
        }, _callee31, undefined, [[0, 11]]);
    }));

    return function (_x51, _x52) {
        return _ref31.apply(this, arguments);
    };
}();
var checklistProducts = function () {
    var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(params) {
        return regeneratorRuntime.wrap(function _callee32$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        _context33.next = 2;
                        return _checklistCombination2.default.aggregate([{
                            $match: {
                                _id: _mongoose2.default.Types.ObjectId(params.id)
                            }
                        }, {
                            $lookup: {
                                from: 'checklist',
                                localField: 'checklistId',
                                foreignField: '_id',
                                as: 'checklist'
                            }
                        }, {
                            $unwind: '$checklist'
                        },
                        /**  get only active Checklist  */
                        {
                            $match: {
                                "checklist.status": "1"
                            }
                        }, {
                            $lookup: {
                                from: 'productRangeItems',
                                localField: 'checklist.product',
                                foreignField: '_id',
                                as: 'checklistProduct'
                            }
                        }, {
                            $unwind: '$checklistProduct'
                        },

                        /**  get only active product  */
                        {
                            $match: {
                                'checklistProduct.status': "1"
                            }
                        }, {
                            $lookup: {
                                from: 'location',
                                localField: 'checklistProduct.locationId',
                                foreignField: '_id',
                                as: 'locationData'
                            }
                        }, {
                            $unwind: '$locationData'
                        }, {
                            $lookup: {
                                from: 'checkedChecklistProduct',
                                localField: '_id',
                                foreignField: 'checklistCombinationId',
                                as: 'checkedChecklistProduct'
                            }
                        }, {
                            $lookup: {
                                from: 'orderDetail',
                                localField: 'checklistProduct._id',
                                foreignField: 'productRangeId',
                                as: 'orderProduct'
                            }
                        }, {
                            $project: {
                                "checklistProduct": 1,
                                "locationData": 1,
                                "checkedChecklistProduct": {
                                    $filter: {
                                        "input": "$checkedChecklistProduct",
                                        "as": "checkedChecklistProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$checkedChecklistProduct.productId", "$checklistProduct._id"]
                                            }, {
                                                $eq: ["$$checkedChecklistProduct.isChecked", true]
                                            }]
                                        }
                                    }
                                },
                                "orderProduct": {
                                    $filter: {
                                        "input": "$orderProduct",
                                        "as": "orderProduct",
                                        "cond": {
                                            $and: [{
                                                $eq: ["$$orderProduct.statusIndex", "0"]
                                            }, {
                                                $ne: ["$$orderProduct.statusIndex", "4"]
                                            }, {
                                                $eq: ["$$orderProduct.checklistCombinationId", _mongoose2.default.Types.ObjectId(params.id)]
                                            }]
                                        }
                                    }
                                }
                            }
                        }, {
                            $group: {
                                _id: "$checklistProduct._id",
                                locationData: {
                                    "$push": "$locationData"
                                },
                                checklistProduct: {
                                    "$first": "$checklistProduct"
                                },
                                orderProduct: {
                                    "$first": "$orderProduct"
                                },
                                checkedChecklistProduct: {
                                    "$first": "$checkedChecklistProduct"
                                }
                            }
                        }, {
                            $sort: {
                                "locationData.preferredIndex": 1,
                                "checklistProduct.locationPreferredIndex": 1
                            }
                        }]);

                    case 2:
                        return _context33.abrupt('return', _context33.sent);

                    case 3:
                    case 'end':
                        return _context33.stop();
                }
            }
        }, _callee32, undefined);
    }));

    return function checklistProducts(_x53) {
        return _ref32.apply(this, arguments);
    };
}();

var productDetail = function () {
    var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(checklistProductsList, paramChecklistCombiantion) {
        var _ret2;

        return regeneratorRuntime.wrap(function _callee36$(_context38) {
            while (1) {
                switch (_context38.prev = _context38.next) {
                    case 0:
                        _context38.prev = 0;
                        return _context38.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee35() {
                            var productDetailsArray, i, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop2, _iterator3, _step3;

                            return regeneratorRuntime.wrap(function _callee35$(_context37) {
                                while (1) {
                                    switch (_context37.prev = _context37.next) {
                                        case 0:
                                            productDetailsArray = [];
                                            i = 0;
                                            _iteratorNormalCompletion3 = true;
                                            _didIteratorError3 = false;
                                            _iteratorError3 = undefined;
                                            _context37.prev = 5;
                                            _loop2 = /*#__PURE__*/regeneratorRuntime.mark(function _loop2() {
                                                var oneChecklistProducts;
                                                return regeneratorRuntime.wrap(function _loop2$(_context36) {
                                                    while (1) {
                                                        switch (_context36.prev = _context36.next) {
                                                            case 0:
                                                                oneChecklistProducts = _step3.value;
                                                                _context36.next = 3;
                                                                return _productRangeItems2.default.findById(oneChecklistProducts.checklistProduct._id).populate({
                                                                    path: 'suppliersProduct.id',
                                                                    model: _companySuppliers2.default,
                                                                    "select": "supplierId deliveryDaysStandard  placeOrderAhead placeOrderBeforeTime",
                                                                    "populate": {
                                                                        path: 'supplierId',
                                                                        model: _supplier2.default,
                                                                        "select": "name deliveryDaysAllowed logo"
                                                                    }
                                                                }).populate({
                                                                    path: 'suppliersProduct.supplierProductId',
                                                                    model: _supplierProducts2.default,
                                                                    "select": "minOrder orderBy name packaging"
                                                                }).populate({
                                                                    path: 'locationId',
                                                                    model: _location2.default
                                                                }).then(function (productData) {
                                                                    return _orderDetail2.default.find({
                                                                        checklistCombinationId: paramChecklistCombiantion,
                                                                        productRangeId: oneChecklistProducts.checklistProduct._id,
                                                                        statusIndex: {
                                                                            $in: [0, 1]
                                                                        },
                                                                        quantity: {
                                                                            $ne: 0
                                                                        }
                                                                    }).populate({
                                                                        path: 'checklistCombinationId',
                                                                        model: _checklistCombination2.default,
                                                                        "select": "name"
                                                                    }).then(function (order) {
                                                                        return {
                                                                            productData: productData,
                                                                            order: order
                                                                        };
                                                                    });
                                                                }).then(function () {
                                                                    var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(result) {
                                                                        return regeneratorRuntime.wrap(function _callee33$(_context34) {
                                                                            while (1) {
                                                                                switch (_context34.prev = _context34.next) {
                                                                                    case 0:
                                                                                        _context34.next = 2;
                                                                                        return _orderDetail2.default.find({
                                                                                            productRangeId: oneChecklistProducts.checklistProduct._id,
                                                                                            $nor: [{
                                                                                                checklistCombinationId: paramChecklistCombiantion
                                                                                            }],
                                                                                            statusIndex: {
                                                                                                $in: [0, 1]
                                                                                            },
                                                                                            quantity: {
                                                                                                $ne: 0
                                                                                            }
                                                                                        }).populate({
                                                                                            path: 'checklistCombinationId',
                                                                                            model: _checklistCombination2.default,
                                                                                            "select": "name"
                                                                                        }).populate({
                                                                                            path: 'orderByUserId',
                                                                                            model: _users2.default,
                                                                                            "select": "firstName lastName"
                                                                                        }).then(function (otherOrder) {
                                                                                            return {
                                                                                                product: result.productData,
                                                                                                order: result.order,
                                                                                                otherOrder: otherOrder
                                                                                            };
                                                                                        });

                                                                                    case 2:
                                                                                        return _context34.abrupt('return', _context34.sent);

                                                                                    case 3:
                                                                                    case 'end':
                                                                                        return _context34.stop();
                                                                                }
                                                                            }
                                                                        }, _callee33, undefined);
                                                                    }));

                                                                    return function (_x56) {
                                                                        return _ref34.apply(this, arguments);
                                                                    };
                                                                }()).then(function () {
                                                                    var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(productList) {
                                                                        return regeneratorRuntime.wrap(function _callee34$(_context35) {
                                                                            while (1) {
                                                                                switch (_context35.prev = _context35.next) {
                                                                                    case 0:
                                                                                        _context35.next = 2;
                                                                                        return _checkedChecklistProduct2.default.find({
                                                                                            checklistCombinationId: paramChecklistCombiantion,
                                                                                            productId: oneChecklistProducts.checklistProduct._id
                                                                                        }).populate({
                                                                                            path: 'checklistCombinationId',
                                                                                            model: _checklistCombination2.default,
                                                                                            "select": "name"
                                                                                        }).then(function (checkedChecklistCombination) {
                                                                                            productDetailsArray.push({
                                                                                                product: productList.product,
                                                                                                order: productList.order,
                                                                                                otherOrder: productList.otherOrder,
                                                                                                checkedChecklistCombination: checkedChecklistCombination
                                                                                            });
                                                                                        });

                                                                                    case 2:
                                                                                    case 'end':
                                                                                        return _context35.stop();
                                                                                }
                                                                            }
                                                                        }, _callee34, undefined);
                                                                    }));

                                                                    return function (_x57) {
                                                                        return _ref35.apply(this, arguments);
                                                                    };
                                                                }()).catch(function (err) {});

                                                            case 3:
                                                                i++;

                                                            case 4:
                                                            case 'end':
                                                                return _context36.stop();
                                                        }
                                                    }
                                                }, _loop2, undefined);
                                            });
                                            _iterator3 = checklistProductsList[Symbol.iterator]();

                                        case 8:
                                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                                _context37.next = 13;
                                                break;
                                            }

                                            return _context37.delegateYield(_loop2(), 't0', 10);

                                        case 10:
                                            _iteratorNormalCompletion3 = true;
                                            _context37.next = 8;
                                            break;

                                        case 13:
                                            _context37.next = 19;
                                            break;

                                        case 15:
                                            _context37.prev = 15;
                                            _context37.t1 = _context37['catch'](5);
                                            _didIteratorError3 = true;
                                            _iteratorError3 = _context37.t1;

                                        case 19:
                                            _context37.prev = 19;
                                            _context37.prev = 20;

                                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                _iterator3.return();
                                            }

                                        case 22:
                                            _context37.prev = 22;

                                            if (!_didIteratorError3) {
                                                _context37.next = 25;
                                                break;
                                            }

                                            throw _iteratorError3;

                                        case 25:
                                            return _context37.finish(22);

                                        case 26:
                                            return _context37.finish(19);

                                        case 27:
                                            return _context37.abrupt('return', {
                                                v: productDetailsArray
                                            });

                                        case 28:
                                        case 'end':
                                            return _context37.stop();
                                    }
                                }
                            }, _callee35, undefined, [[5, 15, 19, 27], [20,, 22, 26]]);
                        })(), 't0', 2);

                    case 2:
                        _ret2 = _context38.t0;

                        if (!((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object")) {
                            _context38.next = 5;
                            break;
                        }

                        return _context38.abrupt('return', _ret2.v);

                    case 5:
                        _context38.next = 9;
                        break;

                    case 7:
                        _context38.prev = 7;
                        _context38.t1 = _context38['catch'](0);

                    case 9:
                    case 'end':
                        return _context38.stop();
                }
            }
        }, _callee36, undefined, [[0, 7]]);
    }));

    return function productDetail(_x54, _x55) {
        return _ref33.apply(this, arguments);
    };
}();

exports.remarkUpdateOrder = function () {
    var _ref36 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee37$(_context39) {
            while (1) {
                switch (_context39.prev = _context39.next) {
                    case 0:
                        _context39.prev = 0;
                        params = req.body.params;
                        _context39.next = 4;
                        return _order2.default.findByIdAndUpdate(params.id, {
                            remark: params.remark
                        }, {
                            new: true
                        }).then(function (orderUpdate) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.updateData,
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

                    case 4:
                        _context39.next = 9;
                        break;

                    case 6:
                        _context39.prev = 6;
                        _context39.t0 = _context39['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context39.t0
                        });

                    case 9:
                    case 'end':
                        return _context39.stop();
                }
            }
        }, _callee37, undefined, [[0, 6]]);
    }));

    return function (_x58, _x59) {
        return _ref36.apply(this, arguments);
    };
}();