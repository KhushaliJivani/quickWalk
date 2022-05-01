'use strict';

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _supplier = require('../../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _companySuppliers = require('../../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _location = require('../../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _supplierCategory = require('../../models/supplierCategory.model');

var _supplierCategory2 = _interopRequireDefault(_supplierCategory);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.importExcel = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var param;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        param = {
                            'destination': 'excel',
                            'decodeImage': "",
                            fieldName: 'file',
                            imageOrignalName: ''
                        };
                        _context2.next = 4;
                        return _uploadFile2.default.uploadFile(param, req, res).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName) {
                                var params;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                params = req.body;

                                                if (!(fileName != '' && fileName != null && fileName !== undefined)) {
                                                    _context.next = 6;
                                                    break;
                                                }

                                                _context.next = 4;
                                                return uploadExcel(res, params.businessAdminId, fileName);

                                            case 4:
                                                _context.next = 7;
                                                break;

                                            case 6:
                                                res.status(200).send({ code: 200, Message: _message2.default.errorMessage.fileNotFound, data: [], err: [] });

                                            case 7:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 4:
                        _context2.next = 10;
                        break;

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);

                        console.log('error', _context2.t0);
                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context2.t0 });

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 6]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var uploadExcel = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(res, businessAdminId, fileName) {
        var usersSheet, supplier, supplierIdArray, categoryIdArray, supplierProductIdArray, locationIdArray, companySupplierIdArray, globalLocationIdArray, i;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        usersSheet = _nodeXlsx2.default.parse(_config2.default.uploadFilePath + 'excel/' + fileName);
                        supplier = [];
                        supplierIdArray = [];
                        categoryIdArray = [];
                        supplierProductIdArray = [];
                        locationIdArray = [];
                        companySupplierIdArray = [];
                        globalLocationIdArray = [];

                        for (i = 1; i < usersSheet[0].data.length; i++) {
                            if (usersSheet[0].data[i][1]) {
                                supplier.push({
                                    name: usersSheet[0].data[i][1],
                                    productHaveUniqueCode: usersSheet[0].data[i][3],
                                    productHaveCategory: usersSheet[0].data[i][2],
                                    orderEmail: usersSheet[0].data[i][4],
                                    openingDays: usersSheet[0].data[i][9],
                                    deliveryDaysAllowed: usersSheet[0].data[i][10].split(','),
                                    businessId: businessAdminId,
                                    logo: usersSheet[0].data[i][12] ? usersSheet[0].data[i][12] : "",
                                    type: usersSheet[0].data[i][11],
                                    updatedAt: new Date(),
                                    createdAt: new Date()
                                });
                            }
                        };
                        _supplier2.default.insertMany(supplier).then(function (suppliers) {
                            return suppliers;
                        }).then(function (suppliers) {
                            var companySupplierArray = [];
                            for (var _i = 1; _i < suppliers.length + 1; _i++) {
                                companySupplierArray.push({
                                    supplierId: suppliers[_i - 1]._id,
                                    orderEmail: usersSheet[0].data[_i][4],
                                    minOrderProduct: usersSheet[0].data[_i][5],
                                    placeOrderAhead: usersSheet[0].data[_i][6],
                                    placeOrderBeforeTime: usersSheet[0].data[_i][7],
                                    deliveryDaysStandard: usersSheet[0].data[_i][8].split(','),
                                    logo: usersSheet[0].data[_i][12] ? usersSheet[0].data[_i][12] : "",
                                    businessId: businessAdminId,
                                    type: usersSheet[0].data[_i][11],
                                    updatedAt: new Date(),
                                    createdAt: new Date()
                                });
                            }
                            return _companySuppliers2.default.insertMany(companySupplierArray).then(function (companySuppliers) {
                                for (var _i2 = 1; _i2 < usersSheet[0].data.length; _i2++) {
                                    if (usersSheet[0].data[_i2][0]) {
                                        companySupplierIdArray[Number(usersSheet[0].data[_i2][0])] = companySuppliers[_i2 - 1]._id;
                                    }
                                }
                                return companySuppliers;
                            });
                        }).then(function (companySuppliers) {
                            for (var _i3 = 1; _i3 < usersSheet[0].data.length; _i3++) {

                                if (usersSheet[0].data[_i3][0]) {
                                    supplierIdArray[Number(usersSheet[0].data[_i3][0])] = companySuppliers[_i3 - 1]._id;
                                }
                            }
                            return supplierIdArray;
                        }).then(function (supplierIdArray) {
                            var catagoryArray = [];
                            for (var _i4 = 1; _i4 < usersSheet[1].data.length; _i4++) {
                                if (usersSheet[1].data[_i4][0]) {
                                    catagoryArray.push({
                                        name: usersSheet[1].data[_i4][1],
                                        supplierId: supplierIdArray[usersSheet[1].data[_i4][2]],
                                        updatedAt: new Date(),
                                        createdAt: new Date()
                                    });
                                }
                            }
                            return _supplierCategory2.default.insertMany(catagoryArray).then(function (category) {
                                return category;
                            });
                        }).then(function (categories) {
                            for (var _i5 = 1; _i5 < usersSheet[1].data.length; _i5++) {
                                if (usersSheet[1].data[_i5][0]) {
                                    categoryIdArray[Number(usersSheet[1].data[_i5][0])] = categories[_i5 - 1]._id;
                                }
                            }
                            return categoryIdArray;
                        }).then(function (categoryIdArray) {
                            var supplierProduct = [];
                            for (var _i6 = 1; _i6 < usersSheet[2].data.length; _i6++) {
                                if (usersSheet[2].data[_i6][0]) {
                                    supplierProduct.push({
                                        supplierId: supplierIdArray[Number(usersSheet[2].data[_i6][1])],
                                        packaging: usersSheet[2].data[_i6][2],
                                        name: usersSheet[2].data[_i6][3],
                                        uniqueProductKey: usersSheet[2].data[_i6][4],
                                        categoryId: categoryIdArray[Number(usersSheet[2].data[_i6][5])],
                                        minOrder: usersSheet[2].data[_i6][6],
                                        orderBy: usersSheet[2].data[_i6][7],
                                        businessId: businessAdminId,
                                        image: usersSheet[2].data[_i6][8] ? usersSheet[2].data[_i6][8] : "",
                                        updatedAt: new Date(),
                                        createdAt: new Date()
                                    });
                                }
                            }
                            return _supplierProducts2.default.insertMany(supplierProduct).then(function (supplierProducts) {
                                return supplierProducts;
                            });
                        }).then(function (supplierProducts) {
                            for (var _i7 = 1; _i7 < usersSheet[2].data.length; _i7++) {
                                if (usersSheet[2].data[_i7][0]) {
                                    supplierProductIdArray[Number(usersSheet[2].data[_i7][0])] = supplierProducts[_i7 - 1]._id;
                                }
                            }
                            return supplierProductIdArray;
                        }).then(function (supplierProductIdArray) {
                            var locationArray = [];
                            for (var _i8 = 1; _i8 < usersSheet[3].data.length; _i8++) {
                                if (usersSheet[3].data[_i8][0]) {
                                    locationArray.push({
                                        name: usersSheet[3].data[_i8][2],
                                        preferredIndex: usersSheet[3].data[_i8][3],
                                        businessId: businessAdminId,
                                        updatedAt: new Date(),
                                        createdAt: new Date()
                                    });
                                }
                            }
                            return _location2.default.insertMany(locationArray).then(function (locations) {
                                for (var _i9 = 1; _i9 < usersSheet[3].data.length; _i9++) {
                                    if (usersSheet[3].data[_i9][0]) {
                                        globalLocationIdArray.push(locations[_i9 - 1]._id);
                                        locationIdArray[Number(usersSheet[3].data[_i9][0])] = locations[_i9 - 1]._id;
                                    }
                                }
                                return locations;
                            });
                        }).then(function (locations) {
                            for (var _i10 = 1; _i10 < usersSheet[3].data.length; _i10++) {
                                if (usersSheet[3].data[_i10][0]) {
                                    if (Number(usersSheet[3].data[_i10][1]) !== 0) {
                                        _location2.default.findByIdAndUpdate(locations[_i10 - 1], {
                                            parentId: locationIdArray[Number(usersSheet[3].data[_i10][1])]
                                        }).then(function (updateLocation) {});
                                    }
                                }
                            }
                            return locationIdArray;
                        }).then(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(locationIdArray) {
                                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, locationData;

                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context5.prev = 3;
                                                _iterator = globalLocationIdArray[Symbol.iterator]();

                                            case 5:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context5.next = 12;
                                                    break;
                                                }

                                                locationData = _step.value;
                                                _context5.next = 9;
                                                return _location2.default.findById(locationData._id).then(function () {
                                                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(oneLocation) {
                                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                            while (1) {
                                                                switch (_context4.prev = _context4.next) {
                                                                    case 0:
                                                                        _context4.next = 2;
                                                                        return _location2.default.find({ parentId: oneLocation._id }).then(function () {
                                                                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(locationList) {
                                                                                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, location, preferredIndex;

                                                                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                                                    while (1) {
                                                                                        switch (_context3.prev = _context3.next) {
                                                                                            case 0:
                                                                                                _iteratorNormalCompletion2 = true;
                                                                                                _didIteratorError2 = false;
                                                                                                _iteratorError2 = undefined;
                                                                                                _context3.prev = 3;
                                                                                                _iterator2 = locationList[Symbol.iterator]();

                                                                                            case 5:
                                                                                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                                                                                    _context3.next = 13;
                                                                                                    break;
                                                                                                }

                                                                                                location = _step2.value;
                                                                                                preferredIndex = oneLocation.preferredIndex + "-" + location.preferredIndex;
                                                                                                _context3.next = 10;
                                                                                                return _location2.default.findByIdAndUpdate(location._id, { preferredIndex: preferredIndex }, { new: true }).exec();

                                                                                            case 10:
                                                                                                _iteratorNormalCompletion2 = true;
                                                                                                _context3.next = 5;
                                                                                                break;

                                                                                            case 13:
                                                                                                _context3.next = 19;
                                                                                                break;

                                                                                            case 15:
                                                                                                _context3.prev = 15;
                                                                                                _context3.t0 = _context3['catch'](3);
                                                                                                _didIteratorError2 = true;
                                                                                                _iteratorError2 = _context3.t0;

                                                                                            case 19:
                                                                                                _context3.prev = 19;
                                                                                                _context3.prev = 20;

                                                                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                                                                    _iterator2.return();
                                                                                                }

                                                                                            case 22:
                                                                                                _context3.prev = 22;

                                                                                                if (!_didIteratorError2) {
                                                                                                    _context3.next = 25;
                                                                                                    break;
                                                                                                }

                                                                                                throw _iteratorError2;

                                                                                            case 25:
                                                                                                return _context3.finish(22);

                                                                                            case 26:
                                                                                                return _context3.finish(19);

                                                                                            case 27:
                                                                                            case 'end':
                                                                                                return _context3.stop();
                                                                                        }
                                                                                    }
                                                                                }, _callee3, undefined, [[3, 15, 19, 27], [20,, 22, 26]]);
                                                                            }));

                                                                            return function (_x9) {
                                                                                return _ref6.apply(this, arguments);
                                                                            };
                                                                        }());

                                                                    case 2:
                                                                    case 'end':
                                                                        return _context4.stop();
                                                                }
                                                            }
                                                        }, _callee4, undefined);
                                                    }));

                                                    return function (_x8) {
                                                        return _ref5.apply(this, arguments);
                                                    };
                                                }());

                                            case 9:
                                                _iteratorNormalCompletion = true;
                                                _context5.next = 5;
                                                break;

                                            case 12:
                                                _context5.next = 18;
                                                break;

                                            case 14:
                                                _context5.prev = 14;
                                                _context5.t0 = _context5['catch'](3);
                                                _didIteratorError = true;
                                                _iteratorError = _context5.t0;

                                            case 18:
                                                _context5.prev = 18;
                                                _context5.prev = 19;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 21:
                                                _context5.prev = 21;

                                                if (!_didIteratorError) {
                                                    _context5.next = 24;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 24:
                                                return _context5.finish(21);

                                            case 25:
                                                return _context5.finish(18);

                                            case 26:
                                                return _context5.abrupt('return', locationIdArray);

                                            case 27:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
                            }));

                            return function (_x7) {
                                return _ref4.apply(this, arguments);
                            };
                        }()).then(function () {
                            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locationIdArray) {
                                var productRangeItemArray, _i11, tempSupplierProduct, supplierProductSplit, calculationSplit, sortOrderSplit, supplierTypeSplit, supplierSplit, j;

                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                productRangeItemArray = [];

                                                for (_i11 = 1; _i11 < usersSheet[4].data.length; _i11++) {
                                                    if (usersSheet[4].data[_i11][0] !== undefined && Number(usersSheet[4].data[_i11][0]) !== null) {
                                                        tempSupplierProduct = [];
                                                        supplierProductSplit = String(usersSheet[4].data[_i11][5]).split(',');
                                                        calculationSplit = String(usersSheet[4].data[_i11][6]).split(',');
                                                        sortOrderSplit = String(usersSheet[4].data[_i11][7]).split(',');
                                                        supplierTypeSplit = String(usersSheet[4].data[_i11][10]).split(',');
                                                        supplierSplit = String(usersSheet[4].data[_i11][9]).split(',');

                                                        for (j = 0; j < supplierProductSplit.length; j++) {
                                                            tempSupplierProduct.push({
                                                                supplierProductId: supplierProductIdArray[Number(supplierProductSplit[j])],
                                                                preferredIndex: sortOrderSplit[j] !== 0 ? Number(sortOrderSplit[j]) : 0,
                                                                calculation: calculationSplit[j],
                                                                isSoldInStore: supplierTypeSplit[j] == "0" ? 1 : 0,
                                                                id: companySupplierIdArray[Number(supplierSplit[j])]
                                                            });
                                                        }
                                                        productRangeItemArray.push({
                                                            name: usersSheet[4].data[_i11][2],
                                                            packaging: usersSheet[4].data[_i11][1],
                                                            suppliersProduct: tempSupplierProduct,
                                                            locationId: locationIdArray[Number(usersSheet[4].data[_i11][3])],
                                                            locationPreferredIndex: usersSheet[4].data[_i11][4],
                                                            standardQuantity: usersSheet[4].data[_i11][8],
                                                            image: usersSheet[4].data[_i11][11] !== undefined && usersSheet[4].data[_i11][11] ? usersSheet[4].data[_i11][11] : undefined,
                                                            businessId: businessAdminId,
                                                            updatedAt: new Date(),
                                                            createdAt: new Date()
                                                        });
                                                    }
                                                }
                                                _context6.next = 4;
                                                return _productRangeItems2.default.insertMany(productRangeItemArray).then(function (productRange) {
                                                    res.status(200).send({ code: 200, Message: _message2.default.infoMessage.excelFileUploaded, data: [], err: [] });
                                                });

                                            case 4:
                                            case 'end':
                                                return _context6.stop();
                                        }
                                    }
                                }, _callee6, undefined);
                            }));

                            return function (_x10) {
                                return _ref7.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            console.log('error', err);
                            res.status(400).send({ code: 400, Message: _message2.default.errorMessage.genericError, data: [], err: err });
                        });

                    case 11:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function uploadExcel(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();