'use strict';

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _checklistCombination = require('../../models/checklistCombination.model');

var _checklistCombination2 = _interopRequireDefault(_checklistCombination);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _checkedChecklistProduct = require('../../models/checkedChecklistProduct.model');

var _checkedChecklistProduct2 = _interopRequireDefault(_checkedChecklistProduct);

var _users = require('../../models/users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
                        return _productRangeItems2.default.findById(params.id).populate({ path: 'suppliersProduct.id', model: _companySuppliers2.default, "select": "supplierId deliveryDaysStandard  placeOrderAhead placeOrderBeforeTime",
                            "populate": { path: 'supplierId', model: _supplier2.default, "select": "name deliveryDaysAllowed logo" } }).populate({ path: 'suppliersProduct.supplierProductId', model: _supplierProducts2.default, "select": "minOrder orderBy name packaging" }).populate({ path: 'locationId', model: _location2.default }).then(function (productData) {
                            return _orderDetail2.default.find({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.id, statusIndex: { $in: [0, 1] }, quantity: { $ne: 0 } }).populate({ path: 'supplierId', model: _companySuppliers2.default, "select": "type" }).then(function (order) {
                                var tempData = [];
                                var tempData2 = [];
                                if (order.length > 0) {
                                    // if(order[0].supplierId.type != undefined){
                                    tempData = order.filter(function (orderData) {
                                        return String(orderData.statusIndex) == "0" && orderData.supplierId != undefined && String(orderData.supplierId.type) == "1";
                                    });
                                    tempData2 = order.filter(function (orderData) {
                                        return String(orderData.statusIndex) == "1" && (orderData.supplierId == undefined || String(orderData.supplierId.type) == "2");
                                    });
                                    var temp3 = [].concat(_toConsumableArray(tempData), _toConsumableArray(tempData2));
                                    if (temp3.length > 0) {
                                        return _orderDetail2.default.find({ _id: { $in: temp3 } }).populate({ path: 'checklistCombinationId', model: _checklistCombination2.default, "select": "name" }).then(function (order) {
                                            return { productData: productData, order: order };
                                        });
                                    } else {
                                        return { productData: productData, order: [] };
                                    }
                                    // }
                                    // else{
                                    //     let tempData3 = order.filter(orderData => {return (String(orderData.statusIndex) ==  "1")})
                                    //     if(tempData2.length > 0){
                                    //         return orderDetailModel.find({ _id:{ $in:tempData3} }).populate({path:'checklistCombinationId',model:checklistCombinationModel,"select":"name"})
                                    //         .then((order) => {
                                    //             return { productData: productData, order: order }
                                    //         })
                                    //     }
                                    // }
                                } else {
                                    return { productData: productData, order: [] };
                                }
                            });

                            // return orderDetailModel.find({ checklistCombinationId: params.checklistCombinationId, productRangeId: params.id, statusIndex: {$in:[0]}, quantity:{$ne:0} }).populate({path:'checklistCombinationId',model:checklistCombinationModel,"select":"name"})
                            // .then((order) => {
                            //     return { productData: productData, order: order }
                            // })
                        }).then(function (result) {
                            return _orderDetail2.default.find({ productRangeId: params.id, $nor: [{ checklistCombinationId: params.checklistCombinationId }], statusIndex: { $in: [0, 1] }, quantity: { $ne: 0 } }).populate({ path: 'checklistCombinationId', model: _checklistCombination2.default, "select": "name" }).populate({ path: 'orderByUserId', model: _users2.default, "select": "firstName lastName" }).then(function (otherOrder) {
                                return { product: result.productData, order: result.order, otherOrder: otherOrder };
                            });
                        }).then(function (productList) {
                            _checkedChecklistProduct2.default.find({ checklistCombinationId: params.checklistCombinationId, productId: params.id }).populate({ path: 'checklistCombinationId', model: _checklistCombination2.default, "select": "name" }).then(function (checkedChecklistCombination) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: { product: productList.product, order: productList.order, otherOrder: productList.otherOrder, checkedChecklistCombination: checkedChecklistCombination },
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

                    case 6:
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context.t0
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
function compare(a, b) {
    var genreA = a.preferredIndex;
    var genreB = b.preferredIndex;

    var comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}

exports.otherChecklistOrderProduct = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params, query;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        params = req.body.params;
                        query = {};

                        if (params.id !== undefined) {
                            query.productRangeId = params.id;
                        }
                        if (params.checklistCombinationId !== undefined) {
                            query.$nor = [{ checklistCombinationId: params.checklistCombinationId }];
                        }
                        if (params.expectedDeliveryDate !== undefined) {
                            query.expectedDeliveryDate = new Date(params.expectedDeliveryDate);
                        }
                        query.statusIndex = { $in: ["0", "1"] };
                        query.quantity = { $ne: 0 };
                        _context2.next = 10;
                        return _orderDetail2.default.find(query)
                        // await orderDetailModel.find({ productRangeId: params.id, $nor:[{checklistCombinationId:params.checklistCombinationId}], statusIndex : {$in:[0,1]}, expectedDeliveryDate: new Date(params.expectedDeliveryDate), quantity:{$ne:0} })
                        .populate({ path: 'checklistCombinationId', model: _checklistCombination2.default, "select": "name" }).populate({ path: 'orderByUserId', model: _users2.default, "select": "firstName lastName" }).then(function (otherOrder) {
                            res.status(200).send({
                                code: 200,
                                Message: _message2.default.infoMessage.getDetails,
                                data: otherOrder,
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

                    case 10:
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context2.t0
                        });

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 12]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();