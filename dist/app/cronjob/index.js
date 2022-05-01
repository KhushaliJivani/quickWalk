'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _email = require('../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _order = require('../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _companySuppliers = require('../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _orderDetail = require('../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _checklistCombination = require('../models/checklistCombination.model');

var _checklistCombination2 = _interopRequireDefault(_checklistCombination);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _admin = require('../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _mailLanguages = require('../models/mailLanguages.model');

var _mailLanguages2 = _interopRequireDefault(_mailLanguages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_nodeCron2.default.schedule('*/10 * * * * *', function () {
    try {
        _order2.default.find({ "status": "0" }).populate({
            path: 'supplierId', model: _companySuppliers2.default,
            populate: { path: 'supplierId', model: _supplier2.default }
        }).populate({ path: 'businessId', model: _admin2.default }).then(function (order) {
            var days = ['Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            order.forEach(function (rowOrder) {
                if (rowOrder.supplierId !== undefined && rowOrder.supplierId.deliveryDaysStandard !== undefined && rowOrder.supplierId.deliveryDaysStandard !== undefined) {
                    var orderDate = (0, _moment2.default)(rowOrder.expectedDeliveryDate).subtract(rowOrder.supplierId.placeOrderAhead, "days").format("DD-MM-YYYY");
                    var currentDate = (0, _moment2.default)().format("DD-MM-YYYY");
                    var currentTime = (0, _moment2.default)().format("HH:mm");
                    // const currentDate = momentTimeZone.tz("Asia/Kathmandu").format("DD-MM-YYYY");
                    // const currentTime = momentTimeZone.tz("Asia/Kathmandu").format("HH:mm");
                    // console.log("currentDate : ",currentDate)
                    // console.log("currentTime : ",currentTime)
                    // console.log("orderDate : ",rowOrder)
                    // if (orderDate == currentDate && currentTime >= rowOrder.supplierId.placeOrderBeforeTime) {
                    //     orderModel.aggregate([
                    //         { $match: { _id: mongoose.Types.ObjectId(rowOrder._id) } },
                    //         { $lookup: { from: 'admin', localField: 'businessId', foreignField: '_id', as: 'adminDetail' } },
                    //         { $lookup: { from: 'orderDetail', localField: '_id', foreignField: 'orderId', as: 'orderDetail' } },
                    //         { $unwind: "$orderDetail" },
                    //         { $match: { "orderDetail.statusIndex": "0" } },
                    //         { $match: { "orderDetail.quantity":{"$ne":0} } },
                    //         { $match: { "orderDetail.statusIndex": { $ne: "4"}} },
                    //         { $lookup: { from: 'productRangeItems', localField: 'orderDetail.productRangeId', foreignField: '_id', as: 'productRangeItems' } },
                    //         { $unwind: "$productRangeItems" },
                    //         { $lookup: { from: 'supplierProducts', localField: 'orderDetail.supplierProductId', foreignField: '_id', as: 'supplierProduct' } },
                    //         { $unwind: "$supplierProduct" },
                    //         { $lookup: { from: 'suppliercategories', localField: 'supplierProduct.categoryId', foreignField: '_id', as: 'category' } },
                    //         { "$unwind": { "path": "$category", "preserveNullAndEmptyArrays": true } },
                    //         {
                    //             $group: {
                    //                 _id: {
                    //                     id: "$orderDetail.supplierProductId",
                    //                     name: "$supplierProduct.name",
                    //                     packaging: "$supplierProduct.packaging",
                    //                     categoryId: "$category._id",
                    //                     // productRangeItems: "$productRangeItems._id",
                    //                     // supplierId: "$supplierProduct.supplierId",
                    //                     // supplierProduct: "$productRangeItems.suppliersProduct",
                    //                     categoryName: "$category.name",
                    //                     // orderDetailId: "$orderDetail._id",
                    //                     // adminId:"$adminDetail",
                    //                     // data: {
                    //                     //     $filter: {
                    //                     //         input: '$productRangeItems.suppliersProduct',
                    //                     //         as: 'prodata',
                    //                     //         cond: { $eq: ['$$prodata.id', '$supplierProduct.supplierId'] }
                    //                     //     }
                    //                     // }
                    //                 },
                    //                 orderDetailId:{$push: "$orderDetail._id"},
                    //                 adminId:{$first:"$adminDetail"},
                    //                 data: {$first:{
                    //                         $filter: {
                    //                             input: '$productRangeItems.suppliersProduct',
                    //                             as: 'prodata',
                    //                             cond: { $eq: ['$$prodata.id', '$supplierProduct.supplierId'] }
                    //                         }
                    //                     }},
                    //                 items: { $sum: "$orderDetail.packaging" }
                    //             }
                    //         },
                    //         {
                    //             $group: {
                    //                 _id: null,
                    //                 _id: "$_id.categoryId",
                    //                 name: { $first: "$_id.categoryName" },
                    //                 adminData:{$first: "$adminId"},
                    //                 products: { 
                    //                     $push: {
                    //                         _id: "$_id.id",
                    //                         name: "$_id.name",
                    //                         packaging: "$_id.packaging",
                    //                         // productRangeItems: "$_id.productRangeItems",
                    //                         items: "$items",
                    //                         // supplierId: "$_id.supplierId",
                    //                         orderDetailId: "$orderDetailId",
                    //                         data: "$data"
                    //                     }
                    //                 },
                    //             }
                    //         }
                    //     ])
                    //         .then(async (orderProduct) => {
                    //             if(orderProduct.length > 0){
                    //                 let mailContent = await findMailLanguage(orderProduct[0].adminData[0].language,"order")
                    //                 await ejs.renderFile(config.mailUrl+"email/sendOrder.ejs", { orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort, businessAdmin: orderProduct[0].adminData[0].name}).then((content) => {
                    //                     const mailOptions = { to:rowOrder.supplierId.orderEmail, from : { email : orderProduct[0].adminData[0].email , name: orderProduct[0].adminData[0].name }, subject: "[Quick-Walk] New order", html: content };
                    //                     // const mailOptions = { envelope:{from:'verification@quick-walk.com',to:rowOrder.supplierId.orderEmail} ,from:'"'+orderProduct[0].adminData[0].name+'" '+orderProduct[0].adminData[0].email, subject: "[Quick-Walk] New order", html: content };
                    //                     emailUtil.email(mailOptions).then((info) => {
                    //                         orderProduct.forEach((category) => {
                    //                             category.products.forEach((product) => {
                    //                                 orderDetailModel.findByIdAndUpdate({$in:product.orderDetailId}, { "statusIndex": "1" },{new:true}).then((orderDetailUpdate) => {
                    //                                 }).catch((err) => {
                    //                                     console.log("errr",err)

                    //                                 });
                    //                             })
                    //                         })
                    //                         orderModel.findByIdAndUpdate(rowOrder._id, { "status": "1" })
                    //                             .then((orderUpdate) => {
                    //                             }).catch((err) => {

                    //                             })
                    //                     }).catch((err) => {
                    //                         console.log("errrrr",err)
                    //                     })
                    //                 })
                    //             }
                    //             else{
                    //                 orderProduct.forEach((category) => {
                    //                     category.products.forEach((product) => {
                    //                         orderDetailModel.findByIdAndUpdate(product.orderDetailId, { "statusIndex": "1" },{new:true}).then((orderDetailUpdate) => {
                    //                         }).catch((err) => {

                    //                         });
                    //                     })
                    //                 })
                    //                 orderModel.findByIdAndUpdate(rowOrder._id, { "status": "1" })
                    //                     .then((orderUpdate) => {
                    //                     }).catch((err) => {

                    //                     })
                    //             }
                    //         })
                    //         .catch((err) => {
                    //             // sentMailToClient(err);
                    //         });
                    // } else {
                    // }

                    /**NEW MAIL TEMPLATE CHANGES */
                    if (orderDate == currentDate && currentTime >= rowOrder.supplierId.placeOrderBeforeTime) {
                        var _$group;

                        _order2.default.aggregate([{ $match: { _id: _mongoose2.default.Types.ObjectId(rowOrder._id) } }, { $lookup: { from: 'admin', localField: 'businessId', foreignField: '_id', as: 'adminDetail' } }, { $lookup: { from: 'orderDetail', localField: '_id', foreignField: 'orderId', as: 'orderDetail' } }, { $unwind: "$orderDetail" }, { $match: { "orderDetail.statusIndex": "0" } }, { $match: { "orderDetail.quantity": { "$ne": 0 } } }, { $match: { "orderDetail.statusIndex": { $ne: "4" } } }, { $lookup: { from: 'productRangeItems', localField: 'orderDetail.productRangeId', foreignField: '_id', as: 'productRangeItems' } }, { $unwind: "$productRangeItems" }, { $lookup: { from: 'supplierProducts', localField: 'orderDetail.supplierProductId', foreignField: '_id', as: 'supplierProduct' } }, { $unwind: "$supplierProduct" }, { $lookup: { from: 'suppliercategories', localField: 'supplierProduct.categoryId', foreignField: '_id', as: 'category' } }, { "$unwind": { "path": "$category", "preserveNullAndEmptyArrays": true } }, {
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
                            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(orderProduct) {
                                var expectedDeliveryDate, mailContent, mailOptions;
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                if (!(orderProduct.length > 0)) {
                                                    _context5.next = 9;
                                                    break;
                                                }

                                                // console.log(orderProduct[0].products)
                                                expectedDeliveryDate = (0, _moment2.default)(orderProduct[0].expectedDeliveryDate).format("DD-MM-YYYY");
                                                _context5.next = 4;
                                                return findMailLanguage(orderProduct[0].adminData[0].language, "order");

                                            case 4:
                                                mailContent = _context5.sent;

                                                // await ejs.renderFile(config.mailUrl+"email/sendOrder.ejs", { remark: orderProduct[0].remark, expectedDeliveryDate: expectedDeliveryDate,orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name, mailContent: mailContent.content, languageType:mailContent.languageType, logoUrl: config.logoUrl, envPort: config.envPort, businessAdmin: orderProduct[0].adminData[0].name}).then((content) => {
                                                mailOptions = { envelope: {
                                                        from: 'verification@quick-walk.com',
                                                        to: rowOrder.supplierId.orderEmail },
                                                    from: '"' + orderProduct[0].adminData[0].name + '" ' + orderProduct[0].adminData[0].email,
                                                    subject: orderProduct[0].adminData[0].name + " " + rowOrder.supplierId.supplierId.name + " " + mailContent.content.content13 + " " + expectedDeliveryDate,
                                                    template: 'sendOrder.ejs',
                                                    to: rowOrder.supplierId.orderEmail,
                                                    type: 'business',
                                                    id: orderProduct[0].adminData[0]._id,
                                                    data: { remark: orderProduct[0].remark, expectedDeliveryDate: expectedDeliveryDate, orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name, mailContent: mailContent.content, languageType: mailContent.languageType, logoUrl: _config2.default.logoUrl, envPort: _config2.default.envPort, businessAdmin: orderProduct[0].adminData[0].name, supplierProductUniqueCode: rowOrder.supplierId.supplierId.productHaveUniqueCode }
                                                };

                                                _email2.default.email(mailOptions).then(function () {
                                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info) {
                                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        orderProduct.forEach(function (category) {
                                                                            category.products.forEach(function () {
                                                                                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(product) {
                                                                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                        while (1) {
                                                                                            switch (_context.prev = _context.next) {
                                                                                                case 0:
                                                                                                    _context.next = 2;
                                                                                                    return _orderDetail2.default.updateMany({ _id: { $in: product.orderDetailId } }, { "statusIndex": "1" }, { new: true }).then(function (orderDetailUpdate) {}).catch(function (err) {
                                                                                                        // console.log("errr",err)

                                                                                                    });

                                                                                                case 2:
                                                                                                case 'end':
                                                                                                    return _context.stop();
                                                                                            }
                                                                                        }
                                                                                    }, _callee, undefined);
                                                                                }));

                                                                                return function (_x3) {
                                                                                    return _ref3.apply(this, arguments);
                                                                                };
                                                                            }());
                                                                        });
                                                                        _context2.next = 3;
                                                                        return _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }, { new: true }).then(function (orderUpdate) {}).catch(function (err) {});

                                                                    case 3:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, undefined);
                                                    }));

                                                    return function (_x2) {
                                                        return _ref2.apply(this, arguments);
                                                    };
                                                }()).catch(function (err) {
                                                    // console.log("errrrr",err)
                                                });
                                                // })
                                                _context5.next = 12;
                                                break;

                                            case 9:
                                                orderProduct.forEach(function () {
                                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(category) {
                                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                            while (1) {
                                                                switch (_context4.prev = _context4.next) {
                                                                    case 0:
                                                                        category.products.forEach(function () {
                                                                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(product) {
                                                                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                                                    while (1) {
                                                                                        switch (_context3.prev = _context3.next) {
                                                                                            case 0:
                                                                                                _context3.next = 2;
                                                                                                return _orderDetail2.default.updateMany({ _id: { $in: product.orderDetailId } }, { "statusIndex": "1" }, { new: true }).then(function (orderDetailUpdate) {}).catch(function (err) {});

                                                                                            case 2:
                                                                                            case 'end':
                                                                                                return _context3.stop();
                                                                                        }
                                                                                    }
                                                                                }, _callee3, undefined);
                                                                            }));

                                                                            return function (_x5) {
                                                                                return _ref5.apply(this, arguments);
                                                                            };
                                                                        }());

                                                                    case 1:
                                                                    case 'end':
                                                                        return _context4.stop();
                                                                }
                                                            }
                                                        }, _callee4, undefined);
                                                    }));

                                                    return function (_x4) {
                                                        return _ref4.apply(this, arguments);
                                                    };
                                                }());
                                                _context5.next = 12;
                                                return _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }, { new: true }).then(function (orderUpdate) {}).catch(function (err) {});

                                            case 12:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, undefined);
                            }));

                            return function (_x) {
                                return _ref.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            // console.log("errrrrrrrrrrrrrrrrrrr",err)
                            // sentMailToClient(err);
                        });
                    } else {}
                }
            });
        }).catch(function (err) {
            // console.log("errrrrrrrrrrrrrrrrrrr",err)
            // sentMailToClient(err);
        });
    } catch (err) {}
});

_nodeCron2.default.schedule('*/10 * * * * *', function () {
    try {
        _checklistCombination2.default.find({ "isDelete": 0 }).then(function (checklistCombination) {
            checklistCombination.forEach(function (checklistCombinationData) {
                if (new Date() > new Date((0, _moment2.default)(checklistCombinationData.createdAt).add(12, 'hours'))) {
                    checklistCombinationData.isDelete = 1;
                    checklistCombinationData.save();
                }
            });
        }).catch(function (err) {});
    } catch (err) {}
});

/**Checklist expire base on timeZone */
// nodeCron.schedule('*/10 * * * * *', () => {
//     try {
//         checklistCombinationModel.find({ "isDelete": 0 })
//             .then(checklistCombination => {
//                 checklistCombination.forEach(checklistCombinationData => {
//                         AdminModel.findById(checklistCombinationData.businessId)
//                         .then(adminDetail => {
//                             if (momentTimeZone.tz(adminDetail.timeZone) > momentTimeZone.tz(checklistCombinationData.createdAt,adminDetail.timeZone).add(12, 'hours')) {
//                                 checklistCombinationData.isDelete = 1;
//                                 checklistCombinationData.save();
//                             }
//                         })
//                         .catch(err=>{})
//                 })
//             })
//             .catch(err => {
//             })
//     } catch (err) {
//     }
// });


// nodeCron.schedule('0 0 * * *',() => {
//     try{
//         const mailOptions = { to: "darshan.patel@viitor.cloud", subject: "[Quick-Walk] server was running", html: "Quickwalk server was running" };
//         emailUtil.email(mailOptions).then(sentMail => {
//         }).catch(err => {
//         })
//     } catch (err){
//         console.log("conrone errr",err)
//     }
// })

var sentMailToClient = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(error) {
        var mailOptions;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        mailOptions = { to: "ram.solanki@viitor.cloud", subject: "[Quick-Walk] Error order", html: "some error generated which is timming of order sent" };

                        _email2.default.email(mailOptions).then(function (sentMail) {}).catch(function (err) {});

                    case 2:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function sentMailToClient(_x6) {
        return _ref6.apply(this, arguments);
    };
}();

var findMailLanguage = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(languageId, label) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        return _context7.abrupt('return', _mailLanguages2.default.findOne({ languageId: languageId, label: label }));

                    case 1:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function findMailLanguage(_x7, _x8) {
        return _ref7.apply(this, arguments);
    };
}();