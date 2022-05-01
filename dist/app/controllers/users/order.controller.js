'use strict';

var createOrderDetails = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(orderId, params, decode, res) {
        var orderDetailForSave;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        params.businessId = decode.businessId;
                        params.orderId = orderId;
                        params.orderByUserId = decode._id;
                        params.orderOnDateTime = Date.now();
                        params.statusIndex = params.statusIndex;
                        orderDetailForSave = (0, _orderDetail2.default)(params);
                        _context8.next = 8;
                        return orderDetailForSave.save().then(function (orderDetail) {
                            res.status(201).send({
                                code: 201,
                                message: _message2.default.infoMessage.orderSave,
                                data: orderDetail,
                                error: []
                            });
                        });

                    case 8:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function createOrderDetails(_x13, _x14, _x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();
// function updateOrderDetails(orderId, params, decode, res){
//     // orderDetailModel.findOne({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.productRangeId, orderByUserId: decode._id })
//     orderDetailModel.findOne({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.productRangeId,"statusIndex" : {$ne:4} })
//     .then(orderDetailsList => {
//         if(orderDetailsList){
//             // orderDetailModel.findByIdAndUpdate(orderDetailsList._id,{statusIndex:4})
//             orderDetailModel.findByIdAndUpdate(orderDetailsList._id,{statusIndex:4},{new:true})
//             .then(() => {
//                 createOrderDetails(orderId,params,decode,res);
//             })
//         }else{
//             createOrderDetails(orderId,params,decode,res);
//         }
//     })
// }


/**Mulitiple order create that's here created */


var updateOrderDetails = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(orderId, params, decode, res) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _orderDetail2.default.find({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.productRangeId, statusIndex: { $in: [0, 1] }, quantity: { $ne: 0 } }).populate({ path: 'supplierId', model: _companySuppliers2.default, "select": "type" }).then(function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(orderDetailsList) {
                                var supplier, store;
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                        switch (_context9.prev = _context9.next) {
                                            case 0:
                                                if (!(orderDetailsList.length > 0)) {
                                                    _context9.next = 22;
                                                    break;
                                                }

                                                supplier = [];
                                                store = [];
                                                _context9.next = 5;
                                                return orderDetailsList.filter(function (orderData) {
                                                    return String(orderData.statusIndex) == "0" && orderData.supplierId != undefined && String(orderData.supplierId.type) == "1";
                                                });

                                            case 5:
                                                supplier = _context9.sent;
                                                _context9.next = 8;
                                                return orderDetailsList.filter(function (orderData) {
                                                    return String(orderData.statusIndex) == "1" && (orderData.supplierId == undefined || String(orderData.supplierId.type) == "2");
                                                });

                                            case 8:
                                                store = _context9.sent;

                                                if (!(supplier.length > 0)) {
                                                    _context9.next = 14;
                                                    break;
                                                }

                                                _context9.next = 12;
                                                return _orderDetail2.default.findByIdAndUpdate(supplier[0]._id, { statusIndex: 4 }, { new: true }).then(function () {
                                                    createOrderDetails(orderId, params, decode, res);
                                                });

                                            case 12:
                                                _context9.next = 20;
                                                break;

                                            case 14:
                                                if (!(store.length > 0)) {
                                                    _context9.next = 19;
                                                    break;
                                                }

                                                _context9.next = 17;
                                                return _orderDetail2.default.findByIdAndUpdate(store[0]._id, { statusIndex: 4 }, { new: true }).then(function () {
                                                    createOrderDetails(orderId, params, decode, res);
                                                });

                                            case 17:
                                                _context9.next = 20;
                                                break;

                                            case 19:
                                                createOrderDetails(orderId, params, decode, res);

                                            case 20:
                                                _context9.next = 23;
                                                break;

                                            case 22:
                                                createOrderDetails(orderId, params, decode, res);

                                            case 23:
                                            case 'end':
                                                return _context9.stop();
                                        }
                                    }
                                }, _callee9, _this);
                            }));

                            return function (_x21) {
                                return _ref10.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function updateOrderDetails(_x17, _x18, _x19, _x20) {
        return _ref9.apply(this, arguments);
    };
}();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _mailLanguages = require('../../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.createOrder = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                        if (params.expectedDeliveryDate) {
                            params.expectedDeliveryDate = new Date(params.expectedDeliveryDate);
                        }
                        _context3.next = 7;
                        return _order2.default.find({ supplierId: params.supplierId, status: !params.expectedDeliveryDate ? 0 : params.statusIndex, expectedDeliveryDate: params.expectedDeliveryDate }).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(order) {
                                var orderForSave, createdNewOrder;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (!(order.length == 0 && params.supplierId && params.expectedDeliveryDate)) {
                                                    _context2.next = 5;
                                                    break;
                                                }

                                                orderForSave = (0, _order2.default)({
                                                    businessId: decode.businessId,
                                                    expectedDeliveryDate: params.expectedDeliveryDate,
                                                    status: params.statusIndex == "1" ? 1 : 0,
                                                    supplierId: params.supplierId,
                                                    asap: params.asap
                                                });
                                                return _context2.abrupt('return', orderForSave.save());

                                            case 5:
                                                if (!(!params.supplierId && !params.expectedDeliveryDate)) {
                                                    _context2.next = 18;
                                                    break;
                                                }

                                                if (!params.checklistCombinationId) {
                                                    _context2.next = 12;
                                                    break;
                                                }

                                                _context2.next = 9;
                                                return _orderDetail2.default.findOne({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.productRangeId, statusIndex: 1 }).then(function () {
                                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(orderDetailData) {
                                                        var data, createdNewOrder;
                                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        if (!orderDetailData) {
                                                                            _context.next = 5;
                                                                            break;
                                                                        }

                                                                        data = { _id: orderDetailData.orderId };
                                                                        return _context.abrupt('return', data);

                                                                    case 5:
                                                                        _context.next = 7;
                                                                        return createNewOrder(decode, params);

                                                                    case 7:
                                                                        createdNewOrder = _context.sent;
                                                                        return _context.abrupt('return', createdNewOrder);

                                                                    case 9:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, undefined);
                                                    }));

                                                    return function (_x4) {
                                                        return _ref3.apply(this, arguments);
                                                    };
                                                }());

                                            case 9:
                                                return _context2.abrupt('return', _context2.sent);

                                            case 12:
                                                _context2.next = 14;
                                                return createNewOrder(decode, params);

                                            case 14:
                                                createdNewOrder = _context2.sent;
                                                return _context2.abrupt('return', createdNewOrder);

                                            case 16:
                                                _context2.next = 19;
                                                break;

                                            case 18:
                                                return _context2.abrupt('return', order[0]);

                                            case 19:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()).then(function (order) {
                            if (params.checklistCombinationId !== undefined) {
                                updateOrderDetails(order._id, params, decode, res);
                            } else {
                                createOrderDetails(order._id, params, decode, res);
                            }
                        }).catch(function (err) {
                            res.status(401).send({
                                code: 401,
                                message: _message2.default.errorMessage.genericError,
                                data: [],
                                error: err
                            });
                        });

                    case 7:
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);

                        res.status(401).send({
                            code: 401,
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

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var createNewOrder = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(decode, params) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return (0, _order2.default)({
                            businessId: decode.businessId,
                            expectedDeliveryDate: params.expectedDeliveryDate,
                            status: params.statusIndex == "1" ? 1 : 0,
                            supplierId: params.supplierId,
                            asap: params.asap
                        }).save().then(function (orderData) {
                            return orderData;
                        });

                    case 2:
                        return _context4.abrupt('return', _context4.sent);

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function createNewOrder(_x5, _x6) {
        return _ref4.apply(this, arguments);
    };
}();

exports.supplierMail = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            _order2.default.find({ "status": "0" }).populate({
                                path: 'supplierId',
                                model: _companySuppliers2.default,
                                populate: {
                                    path: 'supplierId',
                                    model: _supplier2.default
                                }
                            }).then(function (order) {
                                var days = ['Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                order.forEach(function (rowOrder) {
                                    if (rowOrder.supplierId !== null && rowOrder.supplierId.deliveryDaysStandard !== undefined && rowOrder.supplierId.deliveryDaysStandard !== null) {
                                        var orderDate = (0, _moment2.default)(rowOrder.expectedDeliveryDate).subtract(rowOrder.supplierId.placeOrderAhead, "days").format("DD-MM-YYYY");
                                        var currentDate = (0, _moment2.default)().format("DD-MM-YYYY");
                                        var currentTime = (0, _moment2.default)().format("HH:ss");
                                        if (1 == 1) {
                                            _order2.default.aggregate([{ $match: { _id: _mongoose2.default.Types.ObjectId(rowOrder._id) } }, { $lookup: { from: 'orderDetail', localField: '_id', foreignField: 'orderId', as: 'orderDetail' } }, { $unwind: "$orderDetail" }, { $match: { "orderDetail.statusIndex": "1" } }, { $lookup: { from: 'productRangeItems', localField: 'orderDetail.productRangeId', foreignField: '_id', as: 'productRangeItems' } }, { $unwind: "$productRangeItems" }, { $lookup: { from: 'supplierProducts', localField: 'orderDetail.supplierProductId', foreignField: '_id', as: 'supplierProduct' } }, { $unwind: "$supplierProduct" }, { $lookup: { from: 'suppliercategories', localField: 'supplierProduct.categoryId', foreignField: '_id', as: 'category' } }, { "$unwind": { "path": "$category", "preserveNullAndEmptyArrays": true } }, {
                                                $group: {
                                                    _id: {
                                                        id: "$orderDetail.supplierProductId",
                                                        name: "$supplierProduct.name",
                                                        packaging: "$supplierProduct.packaging",
                                                        categoryId: "$category._id",
                                                        productRangeItems: "$productRangeItems._id",
                                                        supplierId: "$supplierProduct.supplierId",
                                                        supplierProduct: "$productRangeItems.suppliersProduct",
                                                        categoryName: "$category.name",
                                                        orderDetailId: "$orderDetail._id",
                                                        data: {
                                                            $filter: {
                                                                input: '$productRangeItems.suppliersProduct',
                                                                as: 'prodata',
                                                                cond: { $eq: ['$$prodata.id', '$supplierProduct.supplierId'] }
                                                            }
                                                        }
                                                    },
                                                    items: { $sum: "$orderDetail.quantity" }
                                                }
                                            }, {
                                                $group: {
                                                    _id: "$_id.categoryId",
                                                    name: { $first: "$_id.categoryName" },
                                                    products: {
                                                        $push: {
                                                            _id: "$_id.id",
                                                            name: "$_id.name",
                                                            packaging: "$_id.packaging",
                                                            productRangeItems: "$_id.productRangeItems",
                                                            items: "$items",
                                                            supplierId: "$_id.supplierId",
                                                            orderDetailId: "$_id.orderDetailId",
                                                            data: "$_id.data"
                                                        }
                                                    }
                                                }
                                            }]).then(function (orderProduct) {
                                                _ejs2.default.renderFile("src/views/email/sendOrder.ejs", { orderProduct: orderProduct, supplierName: rowOrder.supplierId.name }).then(function (content) {
                                                    var mailOptions = { to: rowOrder.orderEmail, subject: "[Quick-Walk] New order", html: content };
                                                    _email2.default.email(mailOptions).then(function (info) {
                                                        orderProduct.forEach(function (category) {
                                                            category.products.forEach(function (product) {
                                                                _orderDetail2.default.findByIdAndUpdate(product.orderDetailId, { "statusIndex": "2" }).then(function (orderDetailUpdate) {}).catch(function (err) {});
                                                            });
                                                        });
                                                        _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }).then(function (orderUpdate) {}).catch(function (err) {});
                                                    }).catch(function (err) {});
                                                });
                                            }).catch(function (err) {});
                                        } else {}
                                    }
                                });
                            }).catch(function (err) {});
                        } catch (err) {}

                    case 1:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();
exports.categoryProduct = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _order2.default.find({ "status": 0 }).then(function (order) {
                            if (order.length > 0) {
                                var orderReturn = [];
                                order.forEach(function (rowOrder) {
                                    _order2.default.aggregate([{ $match: { _id: _mongoose2.default.Types.ObjectId(rowOrder._id) } }, {
                                        $lookup: {
                                            from: 'companysuppliers',
                                            localField: 'supplierId',
                                            foreignField: '_id',
                                            as: 'companySupplier'
                                        }
                                    }]).then(function (cumpanySupplier) {
                                        orderReturn.push(cumpanySupplier);
                                        res.send(orderReturn);
                                    });
                                });
                            }
                        }).catch(function (err) {});

                    case 3:
                        _context6.next = 8;
                        break;

                    case 5:
                        _context6.prev = 5;
                        _context6.t0 = _context6['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context6.t0
                        });

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 5]]);
    }));

    return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();
exports.pdfGeneratar = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var compiled, options, category, html;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            compiled = _ejs2.default.compile(_fs2.default.readFileSync('./src/public/template/testpdf.ejs', 'utf8'));
                            options = {
                                format: 'A4',
                                orientation: 'portrait',
                                border: '10mm'
                            };
                            category = 'Hello World';
                            html = compiled({
                                category: category
                            });

                            _htmlPdf2.default.create(html, options).toFile('./src/public/template/testpdf.pdf', function (err, result) {
                                if (err) {
                                    res.send({
                                        code: 400,
                                        message: _message2.default.errorMessage.genericError,
                                        data: [],
                                        error: err
                                    });
                                } else {
                                    res.send({
                                        code: 200,
                                        message: _message2.default.infoMessage.pdfGenerated,
                                        error: [],
                                        data: {
                                            filName: 'testpdf.pdf'
                                        }
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
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x11, _x12) {
        return _ref7.apply(this, arguments);
    };
}();


exports.sentOrder = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        try {
                            params = req.body.params;


                            _order2.default.findById(params.orderId).populate({
                                path: 'supplierId', model: _companySuppliers2.default,
                                populate: { path: 'supplierId', model: _supplier2.default }
                            }).populate({ path: 'businessId', model: _admin2.default }).then(function (rowOrder) {
                                var _$group;

                                _order2.default.aggregate([{ $match: { _id: _mongoose2.default.Types.ObjectId(params.orderId) } }, { $lookup: { from: 'admin', localField: 'businessId', foreignField: '_id', as: 'adminDetail' } }, { $lookup: { from: 'orderDetail', localField: '_id', foreignField: 'orderId', as: 'orderDetail' } }, { $unwind: "$orderDetail" }, { $match: { "orderDetail.statusIndex": "0" } }, { $match: { "orderDetail.quantity": { "$ne": 0 } } }, { $match: { "orderDetail.statusIndex": { $ne: "4" } } }, { $lookup: { from: 'productRangeItems', localField: 'orderDetail.productRangeId', foreignField: '_id', as: 'productRangeItems' } }, { $unwind: "$productRangeItems" }, { $lookup: { from: 'supplierProducts', localField: 'orderDetail.supplierProductId', foreignField: '_id', as: 'supplierProduct' } }, { $unwind: "$supplierProduct" }, { $lookup: { from: 'suppliercategories', localField: 'supplierProduct.categoryId', foreignField: '_id', as: 'category' } }, { "$unwind": { "path": "$category", "preserveNullAndEmptyArrays": true } }, {
                                    $group: {
                                        _id: {
                                            id: "$orderDetail.supplierProductId",
                                            name: "$supplierProduct.name",
                                            packaging: "$supplierProduct.packaging",
                                            categoryId: "$category._id",
                                            // productRangeItems: "$productRangeItems._id",
                                            // supplierId: "$supplierProduct.supplierId",
                                            // supplierProduct: "$productRangeItems.suppliersProduct",
                                            categoryName: "$category.name"
                                            // orderDetailId: "$orderDetail._id",
                                            // adminId:"$adminDetail",
                                            // data: {
                                            //     $filter: {
                                            //         input: '$productRangeItems.suppliersProduct',
                                            //         as: 'prodata',
                                            //         cond: { $eq: ['$$prodata.id', '$supplierProduct.supplierId'] }
                                            //     }
                                            // }
                                        },
                                        uniqueProductKeyNew: { $first: "$supplierProduct.uniqueProductKey" },
                                        orderDetailId: { $push: "$orderDetail._id" },
                                        adminId: { $first: "$adminDetail" },
                                        expectedDeliveryDate: { $first: "$expectedDeliveryDate" },
                                        remark: { $first: "$remark" },
                                        data: { $first: {
                                                $filter: {
                                                    input: '$productRangeItems.suppliersProduct',
                                                    as: 'prodata',
                                                    cond: { $eq: ['$$prodata.id', '$supplierProduct.supplierId'] }
                                                }
                                            } },
                                        items: { $sum: "$orderDetail.packaging" }
                                    }
                                }, {
                                    $group: (_$group = {
                                        _id: null
                                    }, _defineProperty(_$group, '_id', "$_id.categoryId"), _defineProperty(_$group, 'name', { $first: "$_id.categoryName" }), _defineProperty(_$group, 'adminData', { $first: "$adminId" }), _defineProperty(_$group, 'expectedDeliveryDate', { $first: "$expectedDeliveryDate" }), _defineProperty(_$group, 'remark', { $first: "$remark" }), _defineProperty(_$group, 'products', {
                                        $push: {
                                            _id: "$_id.id",
                                            name: "$_id.name",
                                            uniqueProductKey: "$uniqueProductKeyNew",
                                            packaging: "$_id.packaging",
                                            // productRangeItems: "$_id.productRangeItems",
                                            items: "$items",
                                            // supplierId: "$_id.supplierId",
                                            orderDetailId: "$orderDetailId",
                                            data: "$data"
                                        }
                                    }), _$group)
                                }]).then(function () {
                                    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(orderProduct) {
                                        var expectedDeliveryDate, mailContent, mailOptions;
                                        return regeneratorRuntime.wrap(function _callee15$(_context15) {
                                            while (1) {
                                                switch (_context15.prev = _context15.next) {
                                                    case 0:
                                                        if (!(orderProduct.length > 0)) {
                                                            _context15.next = 9;
                                                            break;
                                                        }

                                                        expectedDeliveryDate = (0, _moment2.default)(orderProduct[0].expectedDeliveryDate).format("DD-MM-YYYY");
                                                        _context15.next = 4;
                                                        return findMailLanguage(orderProduct[0].adminData[0].language, "order");

                                                    case 4:
                                                        mailContent = _context15.sent;

                                                        // await ejs.renderFile(config.mailUrl+"email/sendOrder.ejs", { remark: orderProduct[0].remark, expectedDeliveryDate: expectedDeliveryDate,orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort, businessAdmin: orderProduct[0].adminData[0].name}).then((content) => {
                                                        // const mailOptions = { to:rowOrder.supplierId.orderEmail, from : { email : orderProduct[0].adminData[0].email , name: orderProduct[0].adminData[0].name }, subject: rowOrder.supplierId.supplierId.name+" has to Deliver the order to "+orderProduct[0].adminData[0].name+" on "+expectedDeliveryDate, html: content };
                                                        // const mailOptions = { envelope:{from:'verification@quick-walk.com',to:rowOrder.supplierId.orderEmail} ,from:'"'+orderProduct[0].adminData[0].name+'" '+orderProduct[0].adminData[0].email, subject: "[Quick-Walk] New order", html: content };
                                                        mailOptions = { envelope: { from: 'verification@quick-walk.com', to: rowOrder.supplierId.orderEmail },
                                                            from: '"' + orderProduct[0].adminData[0].name + '" ' + orderProduct[0].adminData[0].email,
                                                            subject: orderProduct[0].adminData[0].name + " " + rowOrder.supplierId.supplierId.name + " " + mailContent.content.content13 + " " + expectedDeliveryDate,
                                                            template: 'sendOrder.ejs',
                                                            to: rowOrder.supplierId.orderEmail,
                                                            type: 'business',
                                                            id: orderProduct[0].adminData[0]._id,
                                                            data: { remark: orderProduct[0].remark, expectedDeliveryDate: expectedDeliveryDate, orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort, businessAdmin: orderProduct[0].adminData[0].name, supplierProductUniqueCode: rowOrder.supplierId.supplierId.productHaveUniqueCode }
                                                        };

                                                        _email2.default.email(mailOptions).then(function () {
                                                            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(info) {
                                                                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                                                    while (1) {
                                                                        switch (_context12.prev = _context12.next) {
                                                                            case 0:
                                                                                orderProduct.forEach(function (category) {
                                                                                    category.products.forEach(function () {
                                                                                        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(product) {
                                                                                            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                                                                                while (1) {
                                                                                                    switch (_context11.prev = _context11.next) {
                                                                                                        case 0:
                                                                                                            _context11.next = 2;
                                                                                                            return _orderDetail2.default.updateMany({ _id: { $in: product.orderDetailId } }, { "statusIndex": "1" }, { new: true }).then(function (orderDetailUpdate) {}).catch(function (err) {

                                                                                                                res.status(400).send({
                                                                                                                    code: 400,
                                                                                                                    message: _message2.default.errorMessage.genericError,
                                                                                                                    data: [],
                                                                                                                    error: err
                                                                                                                });
                                                                                                            });

                                                                                                        case 2:
                                                                                                        case 'end':
                                                                                                            return _context11.stop();
                                                                                                    }
                                                                                                }
                                                                                            }, _callee11, undefined);
                                                                                        }));

                                                                                        return function (_x26) {
                                                                                            return _ref14.apply(this, arguments);
                                                                                        };
                                                                                    }());
                                                                                });
                                                                                _context12.next = 3;
                                                                                return _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }, { new: true }).then(function (orderUpdate) {
                                                                                    res.status(200).send({
                                                                                        code: 200,
                                                                                        message: _message2.default.infoMessage.updateOrder,
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

                                                                            case 3:
                                                                            case 'end':
                                                                                return _context12.stop();
                                                                        }
                                                                    }
                                                                }, _callee12, undefined);
                                                            }));

                                                            return function (_x25) {
                                                                return _ref13.apply(this, arguments);
                                                            };
                                                        }()).catch(function (err) {
                                                            res.status(400).send({
                                                                code: 400,
                                                                message: _message2.default.errorMessage.genericError,
                                                                data: [],
                                                                error: err
                                                            });
                                                        });
                                                        // })
                                                        _context15.next = 12;
                                                        break;

                                                    case 9:
                                                        orderProduct.forEach(function () {
                                                            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(category) {
                                                                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                                                                    while (1) {
                                                                        switch (_context14.prev = _context14.next) {
                                                                            case 0:
                                                                                category.products.forEach(function () {
                                                                                    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(product) {
                                                                                        return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                                                                            while (1) {
                                                                                                switch (_context13.prev = _context13.next) {
                                                                                                    case 0:
                                                                                                        _context13.next = 2;
                                                                                                        return _orderDetail2.default.updateMany({ _id: { $in: product.orderDetailId } }, { "statusIndex": "1" }, { new: true }).then(function (orderDetailUpdate) {}).catch(function (err) {
                                                                                                            res.status(400).send({
                                                                                                                code: 400,
                                                                                                                message: _message2.default.errorMessage.genericError,
                                                                                                                data: [],
                                                                                                                error: err
                                                                                                            });
                                                                                                        });

                                                                                                    case 2:
                                                                                                    case 'end':
                                                                                                        return _context13.stop();
                                                                                                }
                                                                                            }
                                                                                        }, _callee13, undefined);
                                                                                    }));

                                                                                    return function (_x28) {
                                                                                        return _ref16.apply(this, arguments);
                                                                                    };
                                                                                }());

                                                                            case 1:
                                                                            case 'end':
                                                                                return _context14.stop();
                                                                        }
                                                                    }
                                                                }, _callee14, undefined);
                                                            }));

                                                            return function (_x27) {
                                                                return _ref15.apply(this, arguments);
                                                            };
                                                        }());
                                                        _context15.next = 12;
                                                        return _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }, { new: true }).then(function (orderUpdate) {
                                                            res.status(200).send({
                                                                code: 200,
                                                                message: _message2.default.infoMessage.updateOrder,
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

                                                    case 12:
                                                    case 'end':
                                                        return _context15.stop();
                                                }
                                            }
                                        }, _callee15, undefined);
                                    }));

                                    return function (_x24) {
                                        return _ref12.apply(this, arguments);
                                    };
                                }()).catch(function (err) {
                                    res.status(400).send({
                                        code: 400,
                                        message: _message2.default.errorMessage.genericError,
                                        data: [],
                                        error: err
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
                        return _context16.stop();
                }
            }
        }, _callee16, undefined);
    }));

    return function (_x22, _x23) {
        return _ref11.apply(this, arguments);
    };
}();

var findMailLanguage = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(languageId, label) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        return _context17.abrupt('return', _mailLanguages2.default.findOne({ languageId: languageId, label: label }));

                    case 1:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, undefined);
    }));

    return function findMailLanguage(_x29, _x30) {
        return _ref17.apply(this, arguments);
    };
}();

exports.deleteOrder = function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
        var params, orderData, orderDetailData;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.prev = 0;
                        params = req.body.params;
                        _context18.next = 4;
                        return _order2.default.findByIdAndUpdate(params.orderId, { status: "3" }, { new: true }).exec();

                    case 4:
                        orderData = _context18.sent;
                        _context18.next = 7;
                        return _orderDetail2.default.updateMany({ orderId: params.orderId }, { statusIndex: "4" }, { new: true }).exec();

                    case 7:
                        orderDetailData = _context18.sent;

                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.deleteOrder, data: [], err: [] });
                        _context18.next = 14;
                        break;

                    case 11:
                        _context18.prev = 11;
                        _context18.t0 = _context18['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context18.t0
                        });

                    case 14:
                    case 'end':
                        return _context18.stop();
                }
            }
        }, _callee18, undefined, [[0, 11]]);
    }));

    return function (_x31, _x32) {
        return _ref18.apply(this, arguments);
    };
}();