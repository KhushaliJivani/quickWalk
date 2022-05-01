'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _email = require('../../../utils/email');

var _email2 = _interopRequireDefault(_email);

var _order = require('../../models/order.model');

var _order2 = _interopRequireDefault(_order);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _checklistCombination = require('../../models/checklistCombination.model');

var _checklistCombination2 = _interopRequireDefault(_checklistCombination);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.croneJOb = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        try {
                            // console.log('*************************************** Send mail to supplier cronjob ***************************************')
                            _order2.default.find({ "status": "0" }).populate({
                                path: 'supplierId', model: _companySuppliers2.default,
                                populate: { path: 'supplierId', model: _supplier2.default }
                            }).then(function (order) {
                                var days = ['Monday', 'Tuesday', "Wednesday", 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                                order.forEach(function (rowOrder) {
                                    // console.log("order//////////",rowOrder)
                                    if (rowOrder.supplierId !== undefined && rowOrder.supplierId.deliveryDaysStandard !== undefined && rowOrder.supplierId.deliveryDaysStandard !== undefined) {
                                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaafter roworderId : ", rowOrder);
                                        var orderDate = (0, _moment2.default)(rowOrder.expectedDeliveryDate).subtract(rowOrder.supplierId.placeOrderAhead, "days").format("DD-MM-YYYY");
                                        var currentDate = (0, _moment2.default)().format("DD-MM-YYYY");
                                        var currentTime = (0, _moment2.default)().format("HH:ss");
                                        console.log("oooooooooooooooooooooooooooooooooooooooooooooooorderDate : ", orderDate);
                                        // console.log('currentTime .........', currentTime)
                                        // console.log('rowOrder.supplierId.placeOrderBeforeTime .........', rowOrder.supplierId.placeOrderBeforeTime)
                                        if (orderDate == currentDate && currentTime >= rowOrder.supplierId.placeOrderBeforeTime) {
                                            // if(1 == 1) {
                                            console.log("Enter..............................", rowOrder);
                                            _order2.default.aggregate([{ $match: { _id: _mongoose2.default.Types.ObjectId(rowOrder._id) } }, { $lookup: { from: 'orderDetail', localField: '_id', foreignField: 'orderId', as: 'orderDetail' } }, { $unwind: "$orderDetail" }, { $match: { "orderDetail.statusIndex": "0" } }, { $lookup: { from: 'productRangeItems', localField: 'orderDetail.productRangeId', foreignField: '_id', as: 'productRangeItems' } }, { $unwind: "$productRangeItems" }, { $lookup: { from: 'supplierProducts', localField: 'orderDetail.supplierProductId', foreignField: '_id', as: 'supplierProduct' } }, { $unwind: "$supplierProduct" }, { $lookup: { from: 'suppliercategories', localField: 'supplierProduct.categoryId', foreignField: '_id', as: 'category' } }, { "$unwind": { "path": "$category", "preserveNullAndEmptyArrays": true } }, {
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
                                                console.log("orderProduct : ", orderProduct);
                                                _ejs2.default.renderFile(_config2.default.mailUrl + "email/sendOrder.ejs", { orderProduct: orderProduct, supplierName: rowOrder.supplierId.supplierId.name }).then(function (content) {
                                                    console.log("supplier mail id: ", rowOrder.supplierId);
                                                    var mailOptions = { to: rowOrder.supplierId.orderEmail, subject: "[Quick-Walk] New order", html: content };
                                                    _email2.default.email(mailOptions).then(function (info) {
                                                        console.log("--------------------------------------------------------------  Mail Send Succssfully   -----------------------------------------------------------------------");
                                                        orderProduct.forEach(function (category) {
                                                            category.products.forEach(function (product) {
                                                                _orderDetail2.default.findByIdAndUpdate(product.orderDetailId, { "statusIndex": "1" }).then(function (orderDetailUpdate) {}).catch(function (err) {
                                                                    console.log("err", err);
                                                                });
                                                            });
                                                        });
                                                        _order2.default.findByIdAndUpdate(rowOrder._id, { "status": "1" }).then(function (orderUpdate) {}).catch(function (err) {
                                                            console.log("err", err);
                                                        });
                                                    }).catch(function (err) {
                                                        console.log("errrr", err);
                                                    });
                                                });
                                            }).catch(function (err) {
                                                console.log("err", err);
                                            });
                                        } else {}
                                        // res.send(rowOrder);

                                        // rowOrder.supplierId.deliveryDaysStandard.forEach((deliveryDaysStandard) => {
                                        // })
                                    }
                                });
                            }).catch(function (err) {
                                console.log("err", err);
                            });
                        } catch (err) {
                            console.log("err", err);
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