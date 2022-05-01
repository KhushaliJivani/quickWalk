'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// exports.orderList = async (req, res) => {
//     try {
//         const exe = req.headers.authorization.split(' ');
//         const decode = JWT.verify(exe[1], config.JWTSecret);
//         await orderModel.aggregate([{
//             $match: {
//                 "businessId": mongoose.Types.ObjectId(decode._id)
//             }
//         },
//         {
//             $match: {
//                 "status": "2"
//             }
//         },
//         {
//             "$lookup": {
//                 "from": "companysuppliers",
//                 "localField": "supplierId",
//                 "foreignField": "_id",
//                 "as": "companySupplier"
//             }
//         },
//         {
//             $unwind: "$companySupplier"
//         },
//         {
//             $match: {
//                 "companySupplier.type": "1"
//             }
//         },
//         {
//             "$lookup": {
//                 "from": "suppliers",
//                 "localField": "companySupplier.supplierId",
//                 "foreignField": "_id",
//                 "as": "supplier"
//             }
//         },
//         {
//             $unwind: "$supplier"
//         },
//         {
//             "$lookup": {
//                 "from": "orderDetail",
//                 "localField": "_id",
//                 "foreignField": "orderId",
//                 "as": "orderList"
//             }
//         },
//         {
//             $unwind: "$orderList"
//         },
//         {
//             $match:{
//                 'orderList.quantity':{$ne:0}
//             }
//         },
//         {
//             $match:{
//                 'orderList.statusIndex': { $ne: "4" }
//             }
//         },
//         {
//             $sort: {
//                 "createdAt": -1
//             }
//         },
//         // {
//         //     "$lookup": {
//         //         "from": "productRangeItems",
//         //         "localField": "orderList.productRangeId",
//         //         "foreignField": "_id",
//         //         "as": "productRage"
//         //     }
//         // },
//         // {
//         //     $unwind: "$productRage"
//         // },
//         {
//             $group: {
//                 _id: {
//                     id: "$supplier._id",
//                     supplierName: "$supplier.name",
//                     orderId: "$_id",
//                 },
//                 expectedDeliveryDate: {
//                     "$first": {
//                         $dateToString: {
//                             format: "%Y-%m-%d",
//                             date: "$expectedDeliveryDate"
//                         }
//                     }
//                 },
//                 actualDeliveryDate: {
//                     "$first": {
//                         $dateToString: {
//                             format: "%Y-%m-%d",
//                             date: "$actualDeliveryDate"
//                         }
//                     }
//                 },
//                 status: {
//                     "$first": '$status'
//                 },
//                 orderSupplier: {
//                     "$push": "$orderList"
//                 },
//                 placeOrderAhead: {
//                     "$first": "$companySupplier.placeOrderAhead"
//                 },
//                 placeOrderBeforeTime: {
//                     "$first": "$companySupplier.placeOrderBeforeTime"
//                 },
//                 count: {
//                     $sum: {
//                         $cond: [{
//                             $eq: ["$orderList.statusIndex", "3"]
//                         }, 1, null]
//                     }
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: {
//                     expectedDeliveryDate: "$expectedDeliveryDate",
//                     id: "$_id.id"
//                 },
//                 actualDeliveryDate: {
//                     "$first": "$actualDeliveryDate"
//                 },
//                 supplierName: {
//                     "$first": "$_id.supplierName"
//                 },
//                 supplierId: {
//                     "$first": "$_id.id"
//                 },
//                 orderId: {
//                     "$first": "$_id.orderId"
//                 },
//                 status: {
//                     "$first": '$status'
//                 },
//                 orderDetails: {
//                     "$first": "$orderSupplier"
//                 },
//                 placeOrderAhead: {
//                     "$first": "$placeOrderAhead"
//                 },
//                 placeOrderBeforeTime: {
//                     "$first": "$placeOrderBeforeTime"
//                 },
//                 numberOfOrder: {
//                     "$first": "$numberOfOrder"
//                 },
//                 numberOfOrder: {
//                     "$first": "$count"
//                 }
//             }
//         }
//         ])
//             .then(async (orderList) => {
//                 if(orderList.length > 0){
//                     for (let singleOrderList of orderList){
//                         let test = [];
//                         let test2 = [];
//                         for(let singleOrderDetails of singleOrderList.orderDetails){
//                             if(String(singleOrderDetails.statusIndex) == "3"){
//                                 test.push(String(singleOrderDetails.productRangeId));
//                             }
//                         }
//                         // test.forEach((el) => {
//                         //     if (!test2.includes(el)) test2.push(el);
//                         // });
//                         // for(let el of test){
//                         //     if (!test2.includes(el)) test2.push(el);
//                         // }
//                         test2 = Array.from(new Set(test));
//                         singleOrderList.numberOfOrder = test2.length;
//                         // test2 = await test.filter(function(a){
//                         //     return test.indexOf(String(a)) !== test.lastIndexOf(String(a))
//                         // });
//                     }
//                 }
//                 return orderList;
//             })
//             .then(orderList => {
//                 res.status(200).send({
//                     code: 200,
//                     message: Message.infoMessage.getDetails,
//                     data: orderList,
//                     err: []
//                 })
//             })
//             .catch((err) => {
//                 res.status(400).send({
//                     code: 400,
//                     Message: Message.errorMessage.genericError,
//                     data: [],
//                     err: err
//                 });
//             });

//     } catch (err) {
//         res.status(400).send({
//             code: 400,
//             Message: Message.errorMessage.genericError,
//             data: [],
//             err: err
//         });
//     }
// }
exports.orderList = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context2.next = 5;
                        return _order2.default.aggregate([{
                            $match: {
                                "businessId": _mongoose2.default.Types.ObjectId(decode._id)
                            }
                        }, {
                            $match: {
                                "status": "2"
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
                                'orderList.quantity': { $ne: 0 }
                            }
                        }, {
                            $match: {
                                'orderList.statusIndex': { $ne: "4" }
                            }
                        }, {
                            $sort: {
                                "createdAt": -1
                            }
                        },
                        // {
                        //     "$lookup": {
                        //         "from": "productRangeItems",
                        //         "localField": "orderList.productRangeId",
                        //         "foreignField": "_id",
                        //         "as": "productRage"
                        //     }
                        // },
                        // {
                        //     $unwind: "$productRage"
                        // },
                        {
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
                                actualDeliveryDate: {
                                    "$first": {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$actualDeliveryDate"
                                        }
                                    }
                                },
                                status: {
                                    "$first": '$status'
                                },
                                orderSupplier: {
                                    "$push": "$orderList"
                                },
                                placeOrderAhead: {
                                    "$first": "$companySupplier.placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$companySupplier.placeOrderBeforeTime"
                                },
                                count: {
                                    $sum: {
                                        $cond: [{
                                            $eq: ["$orderList.statusIndex", "3"]
                                        }, 1, null]
                                    }
                                }
                            }
                        }, {
                            $group: _defineProperty({
                                _id: {
                                    expectedDeliveryDate: "$expectedDeliveryDate",
                                    id: "$_id.orderId"
                                },
                                actualDeliveryDate: {
                                    "$first": "$actualDeliveryDate"
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
                                orderDetails: {
                                    "$first": "$orderSupplier"
                                },
                                placeOrderAhead: {
                                    "$first": "$placeOrderAhead"
                                },
                                placeOrderBeforeTime: {
                                    "$first": "$placeOrderBeforeTime"
                                },
                                numberOfOrder: {
                                    "$first": "$numberOfOrder"
                                }
                            }, 'numberOfOrder', {
                                "$first": "$count"
                            })
                        }]).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(orderList) {
                                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleOrderList, test, test2, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, singleOrderDetails;

                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (!(orderList.length > 0)) {
                                                    _context.next = 48;
                                                    break;
                                                }

                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context.prev = 4;
                                                _iterator = orderList[Symbol.iterator]();

                                            case 6:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context.next = 34;
                                                    break;
                                                }

                                                singleOrderList = _step.value;
                                                test = [];
                                                test2 = [];
                                                _iteratorNormalCompletion2 = true;
                                                _didIteratorError2 = false;
                                                _iteratorError2 = undefined;
                                                _context.prev = 13;

                                                for (_iterator2 = singleOrderList.orderDetails[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                    singleOrderDetails = _step2.value;

                                                    if (String(singleOrderDetails.statusIndex) == "3") {
                                                        test.push(String(singleOrderDetails.productRangeId));
                                                    }
                                                }
                                                // test.forEach((el) => {
                                                //     if (!test2.includes(el)) test2.push(el);
                                                // });
                                                // for(let el of test){
                                                //     if (!test2.includes(el)) test2.push(el);
                                                // }
                                                _context.next = 21;
                                                break;

                                            case 17:
                                                _context.prev = 17;
                                                _context.t0 = _context['catch'](13);
                                                _didIteratorError2 = true;
                                                _iteratorError2 = _context.t0;

                                            case 21:
                                                _context.prev = 21;
                                                _context.prev = 22;

                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                    _iterator2.return();
                                                }

                                            case 24:
                                                _context.prev = 24;

                                                if (!_didIteratorError2) {
                                                    _context.next = 27;
                                                    break;
                                                }

                                                throw _iteratorError2;

                                            case 27:
                                                return _context.finish(24);

                                            case 28:
                                                return _context.finish(21);

                                            case 29:
                                                test2 = Array.from(new Set(test));
                                                singleOrderList.numberOfOrder = test2.length;
                                                // test2 = await test.filter(function(a){
                                                //     return test.indexOf(String(a)) !== test.lastIndexOf(String(a))
                                                // });

                                            case 31:
                                                _iteratorNormalCompletion = true;
                                                _context.next = 6;
                                                break;

                                            case 34:
                                                _context.next = 40;
                                                break;

                                            case 36:
                                                _context.prev = 36;
                                                _context.t1 = _context['catch'](4);
                                                _didIteratorError = true;
                                                _iteratorError = _context.t1;

                                            case 40:
                                                _context.prev = 40;
                                                _context.prev = 41;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 43:
                                                _context.prev = 43;

                                                if (!_didIteratorError) {
                                                    _context.next = 46;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 46:
                                                return _context.finish(43);

                                            case 47:
                                                return _context.finish(40);

                                            case 48:
                                                return _context.abrupt('return', orderList);

                                            case 49:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined, [[4, 36, 40, 48], [13, 17, 21, 29], [22,, 24, 28], [41,, 43, 47]]);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()).then(function (orderList) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: orderList,
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

                    case 5:
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context2.t0
                        });

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.orderListProductWise = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        params = req.body.params;
                        _context4.next = 4;
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
                                'orderDetailsData.quantity': { $ne: 0 }
                            }
                        }, {
                            $match: {
                                'orderDetailsData.statusIndex': { $ne: "4" }
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
                        },
                        // {
                        //     $group: {
                        //         "_id": {
                        //             "matchOrder": { $cond: [{ $eq: ["$orderDetailsData.statusIndex", "2"] }, '$orderDetailsData', 0] },
                        //             "notMatchOrder": { $cond: [{ $eq: ["$orderDetailsData.statusIndex", "3"] }, '$orderDetailsData', 0] },
                        //             "orderSupplierProduct": "$productRage"
                        //         }
                        //     }
                        // },
                        {
                            $group: {
                                "_id": {
                                    "id": "$productRage._id"
                                },
                                "orderSupplierProductTemp": { "$first": "$productRage" },
                                "orderDetailsTemp": { "$push": '$orderDetailsData' },
                                "orderStatus": { "$first": '$status' },
                                "quantity": {
                                    $sum: "$orderDetailsData.quantity"
                                }
                            }

                            // {
                            //     $group: {
                            //         "_id": {
                            //             "matchOrder": { $cond: [{ $eq: ["$orderDetailsTemp.statusIndex", "2"] }, '$orderDetailsTemp', 0] },
                            //             "notMatchOrder": { $cond: [{ $eq: ["$orderDetailsTemp.statusIndex", "3"] }, '$orderDetailsTemp', 0] },
                            //             "orderSupplierProduct": "$orderSupplierProductTemp"
                            //         }
                            //     }
                            // },
                            // {
                            //     $group: {
                            //         "_id": null,
                            //         "NewmatchOrder": {"$push":{$cond: [{ $eq: ["$_id.matchOrder", 0] },,{ "matchOrder": "$_id.matchOrder", "orderSupplierProduct": "$_id.orderSupplierProduct" } ]}},
                            //         "NewnotMatchOrder": {"$push":{$cond: [{ $eq: ["$_id.notMatchOrder", 0] },,{ "notMatchOrder": "$_id.notMatchOrder", "orderSupplierProduct": "$_id.orderSupplierProduct" } ]}}
                            //     }
                            // }
                        }]).then(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(supplierProduct) {
                                var NewmatchOrder, NewnotMatchOrder, test, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, singleSupplierProduct, length;

                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                NewmatchOrder = [];
                                                NewnotMatchOrder = [];
                                                test = [];

                                                if (!(supplierProduct.length > 0)) {
                                                    _context3.next = 23;
                                                    break;
                                                }

                                                _iteratorNormalCompletion3 = true;
                                                _didIteratorError3 = false;
                                                _iteratorError3 = undefined;
                                                _context3.prev = 7;

                                                for (_iterator3 = supplierProduct[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                                    singleSupplierProduct = _step3.value;
                                                    length = singleSupplierProduct.orderDetailsTemp.length;

                                                    if (String(singleSupplierProduct.orderDetailsTemp[length - 1].statusIndex) == "3") {
                                                        singleSupplierProduct.orderDetailsTemp[length - 1].quantity = singleSupplierProduct.quantity;
                                                        NewnotMatchOrder.push({ notMatchOrder: singleSupplierProduct.orderDetailsTemp[length - 1], orderSupplierProduct: singleSupplierProduct.orderSupplierProductTemp });
                                                    }
                                                    if (String(singleSupplierProduct.orderDetailsTemp[length - 1].statusIndex) == "2") {
                                                        singleSupplierProduct.orderDetailsTemp[length - 1].quantity = singleSupplierProduct.quantity;
                                                        NewmatchOrder.push({ matchOrder: singleSupplierProduct.orderDetailsTemp[length - 1], orderSupplierProduct: singleSupplierProduct.orderSupplierProductTemp });
                                                    }
                                                }
                                                _context3.next = 15;
                                                break;

                                            case 11:
                                                _context3.prev = 11;
                                                _context3.t0 = _context3['catch'](7);
                                                _didIteratorError3 = true;
                                                _iteratorError3 = _context3.t0;

                                            case 15:
                                                _context3.prev = 15;
                                                _context3.prev = 16;

                                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                    _iterator3.return();
                                                }

                                            case 18:
                                                _context3.prev = 18;

                                                if (!_didIteratorError3) {
                                                    _context3.next = 21;
                                                    break;
                                                }

                                                throw _iteratorError3;

                                            case 21:
                                                return _context3.finish(18);

                                            case 22:
                                                return _context3.finish(15);

                                            case 23:
                                                test.push({ NewmatchOrder: NewmatchOrder, NewnotMatchOrder: NewnotMatchOrder });
                                                // supplierProduct[0].NewmatchOrder = supplierProduct[0].NewmatchOrder.filter(matchData => {
                                                //     return matchData != null;
                                                // });
                                                // supplierProduct[0].NewnotMatchOrder = supplierProduct[0].NewnotMatchOrder.filter(matchData => {
                                                //     return matchData != null;
                                                // });
                                                // return supplierProduct;
                                                return _context3.abrupt('return', test);

                                            case 25:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined, [[7, 11, 15, 23], [16,, 18, 22]]);
                            }));

                            return function (_x6) {
                                return _ref4.apply(this, arguments);
                            };
                        }()).then(function (test1) {
                            res.status(200).send({
                                code: 200,
                                message: _message2.default.infoMessage.getDetails,
                                data: test1,
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

                    case 4:
                        _context4.next = 9;
                        break;

                    case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context4.t0
                        });

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();