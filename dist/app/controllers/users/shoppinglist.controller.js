'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.shoppingList = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var exe, decode, date;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        date = (0, _moment2.default)(new Date()).subtract('days', 1);
                        // let admin = await adminDetails(decode.businessId);

                        _context2.next = 6;
                        return _orderDetail2.default.aggregate([{
                            "$match": {
                                'businessId': _mongoose2.default.Types.ObjectId(decode.businessId)
                            }
                        }, {
                            $match: {
                                'quantity': { "$ne": 0 }
                            }
                        }, { $match: { "statusIndex": { $ne: "4" } } }, {
                            "$lookup": {
                                "from": 'order',
                                "localField": 'orderId',
                                "foreignField": '_id',
                                "as": 'orderData'
                            }
                        }, {
                            "$unwind": "$orderData"
                        }, {
                            "$lookup": {
                                "from": 'productRangeItems',
                                "localField": 'productRangeId',
                                "foreignField": '_id',
                                "as": 'productDetails'
                            }
                        }, {
                            "$lookup": {
                                "from": 'companysuppliers',
                                "localField": 'supplierId',
                                "foreignField": '_id',
                                "as": 'companySupplierDetails'
                            }
                        }, {
                            "$unwind": {
                                "path": "$companySupplierDetails",
                                "preserveNullAndEmptyArrays": true
                            }
                        }, {
                            "$lookup": {
                                "from": 'suppliers',
                                "localField": 'companySupplierDetails.supplierId',
                                "foreignField": '_id',
                                "as": 'supplierDetails'
                            }

                        }, {
                            "$unwind": {
                                "path": "$supplierDetails",
                                "preserveNullAndEmptyArrays": true
                            }
                        }, {
                            "$match": {
                                $or: [{
                                    "supplierDetails.type": "2"
                                }, {
                                    "supplierDetails": null
                                }]
                            }
                        }, {
                            $group: {
                                _id: null,
                                sendShoppingList: {
                                    $push: {
                                        "$cond": [{
                                            "$eq": ["$orderData.status", "1"]
                                        }, {
                                            "orderDetailsId": "$_id",
                                            "productName": "$productDetails.name",
                                            "orderDetailStatus": "$statusIndex",
                                            "orderStatus": "$orderData.status",
                                            "asap": "$asap",
                                            "packaging": "$productDetails.packaging",
                                            "orderBy": decode.firstName,
                                            "date": "$createdAt",
                                            "reason": "$orderComment",
                                            "stock": "$quantity",
                                            "shopName": "$supplierDetails.name",
                                            "openingDays": "$supplierDetails.openingDays",
                                            "image": {
                                                "$arrayElemAt": ["$productDetails.image", 0]
                                            },
                                            "orderComment": "$orderComment",
                                            "statusIndex": "$statusIndex",
                                            "ASAP": "$asap",
                                            "deliveryComment": "$deliveryComment",
                                            "expectedDeliveryDate": "$orderData.expectedDeliveryDate"
                                        }, 0]
                                    }
                                },
                                receivedShoppingList: {
                                    $push: {
                                        "$cond": [{
                                            "$eq": ["$orderData.status", "2"]
                                        }, {
                                            "orderDetailsId": "$_id",
                                            "productName": "$productDetails.name",
                                            "orderDetailStatus": "$statusIndex",
                                            "orderStatus": "$orderData.status",
                                            "asap": "$asap",
                                            "packaging": "$productDetails.packaging",
                                            "orderBy": decode.firstName,
                                            "date": "$createdAt",
                                            "reason": "$orderComment",
                                            "isFlush": "$isFlush",
                                            "stock": "$quantity",
                                            "shopName": "$supplierDetails.name",
                                            "openingDays": "$supplierDetails.openingDays",
                                            // "image": "$productDetails.image",
                                            "image": {
                                                "$arrayElemAt": ["$productDetails.image", 0]
                                            },
                                            "orderComment": "$orderComment",
                                            "statusIndex": "$statusIndex",
                                            "ASAP": "$asap",
                                            "deliveryComment": "$deliveryComment",
                                            "expectedDeliveryDate": "$orderData.expectedDeliveryDate",
                                            "actualDeliveryDate": "$orderData.actualDeliveryDate"
                                        }, 0]
                                    }
                                }
                            }
                        }, {
                            "$project": {
                                "sendShoppingList": {
                                    "$filter": {
                                        "input": '$sendShoppingList',
                                        "as": 'item',
                                        "cond": {
                                            "$ne": ['$$item', 0]
                                        }
                                    }
                                },
                                "receivedShoppingList": {
                                    "$filter": {
                                        "input": '$receivedShoppingList',
                                        "as": 'item',
                                        "cond": {
                                            $and: [{
                                                "$ne": ['$$item', 0]
                                            }, {
                                                $gt: ["$$item.actualDeliveryDate", new Date(date)]
                                                // $gt: ["$$item.actualDeliveryDate", momentTimeZone.tz(new Date(),admin.timeZone).subtract('days', 1);]
                                            }]
                                        }

                                    }
                                }
                            }
                        }, { "$sort": { "expectedDeliveryDate": 1 } }]).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(shoppingList) {
                                var tempReceivedShoppingList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, receivedShoppingListSingle;

                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                tempReceivedShoppingList = [];

                                                if (!(shoppingList.length > 0 && shoppingList[0].receivedShoppingList.length > 0)) {
                                                    _context.next = 22;
                                                    break;
                                                }

                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context.prev = 5;

                                                for (_iterator = shoppingList[0].receivedShoppingList[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                    receivedShoppingListSingle = _step.value;

                                                    if (receivedShoppingListSingle.isFlush === undefined && receivedShoppingListSingle.isFlush !== true) {
                                                        tempReceivedShoppingList.push(receivedShoppingListSingle);
                                                    }
                                                }
                                                _context.next = 13;
                                                break;

                                            case 9:
                                                _context.prev = 9;
                                                _context.t0 = _context['catch'](5);
                                                _didIteratorError = true;
                                                _iteratorError = _context.t0;

                                            case 13:
                                                _context.prev = 13;
                                                _context.prev = 14;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 16:
                                                _context.prev = 16;

                                                if (!_didIteratorError) {
                                                    _context.next = 19;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 19:
                                                return _context.finish(16);

                                            case 20:
                                                return _context.finish(13);

                                            case 21:
                                                shoppingList[0].receivedShoppingList = tempReceivedShoppingList;

                                            case 22:
                                                res.status(200).send({
                                                    code: 200,
                                                    Message: _message2.default.infoMessage.getDetails,
                                                    data: shoppingList,
                                                    err: []
                                                });

                                            case 23:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined, [[5, 9, 13, 21], [14,, 16, 20]]);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
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
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context2.t0
                        });

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

exports.adminDetails = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(adminId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', _admin2.default.findById(adminId).exec());

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4) {
        return _ref3.apply(this, arguments);
    };
}();

exports.shoppingListProductUpdate = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                            // let admin = await adminDetails(decode.businessId);

                            _orderDetail2.default.findByIdAndUpdate(params.id, {
                                // deliveryComment: params.orderComment,
                                statusIndex: params.statusIndex,
                                actualDeliveryDate: new Date()
                                // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone)
                            }, {
                                upsert: true,
                                new: true
                            }).then(function (data) {
                                _order2.default.findByIdAndUpdate(data.orderId, {
                                    deliveryDateTime: Date.now(),
                                    // deliveryDateTime: momentTimeZone.tz(new Date(),admin.timeZone),
                                    status: params.statusIndex == '1' ? 1 : 2,
                                    actualDeliveryDate: new Date()
                                    // actualDeliveryDate: momentTimeZone.tz(new Date(),admin.timeZone)
                                }, {
                                    new: true
                                }).then(function (updateOrder) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.getDetails,
                                        data: data,
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
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();

exports.flushShoppingList = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        params = req.body.params;

                        if (!(params.flushIds.length > 0)) {
                            _context5.next = 7;
                            break;
                        }

                        _context5.next = 5;
                        return _orderDetail2.default.updateMany({ _id: { $in: params.flushIds } }, { isFlush: true }).then(function (orderData) {
                            res.status(200).send({ code: 200, message: _message2.default.infoMessage.flushShoppingList, data: [], err: [] });
                        }).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 5:
                        _context5.next = 8;
                        break;

                    case 7:
                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.flushShoppingList, data: [], error: [] });

                    case 8:
                        _context5.next = 13;
                        break;

                    case 10:
                        _context5.prev = 10;
                        _context5.t0 = _context5['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context5.t0
                        });

                    case 13:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 10]]);
    }));

    return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();