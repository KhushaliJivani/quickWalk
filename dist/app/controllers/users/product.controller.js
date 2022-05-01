'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _supplierProducts = require('../../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _orderDetail = require('../../models/orderDetail.model');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _checklist = require('../../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.add = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var params, productId, i, photo, exe, decode, productRangeSave;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        params = req.body.params;
                        productId = [];
                        i = 0;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        productRangeSave = (0, _productRangeItems2.default)({
                            userId: decode._id,
                            name: params.name,
                            businessId: decode.businessId,
                            packaging: params.packaging,
                            standardQuantity: params.standardQuantity,
                            locationId: params.locationId,
                            locationPreferredIndex: params.locationPreferredIndex,
                            suppliersProduct: params.suppliersProduct
                        });
                        _context4.next = 9;
                        return productRangeSave.save().then(function (productRange) {
                            return productRange;
                        }).then(function (productRange) {
                            if (Boolean(params.imageName)) {
                                var param = {
                                    'destination': 'product',
                                    'decodeImage': params.imageName,
                                    fieldName: 'imageName',
                                    imageOrignalName: params.image
                                };
                                return _uploadFile2.default.base64Upload(param).then(function (image) {
                                    photo = image;
                                    productRange.image = photo;
                                    productRange.save();
                                    return productRange;
                                });
                            } else if (!Boolean(params.imageName) && Boolean(params.image)) {
                                photo = params.image;
                                productRange.image = params.image;
                                productRange.save();
                                return productRange;
                            } else {
                                return productRange;
                            }
                        }).then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(productRangeData) {
                                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, productSave, j, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _element;

                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context.prev = 3;
                                                _iterator = params.suppliersProduct[Symbol.iterator]();

                                            case 5:
                                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                    _context.next = 20;
                                                    break;
                                                }

                                                element = _step.value;

                                                if (i == params.suppliersProduct.length - 1) {}

                                                if (!(element.isSoldInStore == "0")) {
                                                    _context.next = 16;
                                                    break;
                                                }

                                                if (!element.supplierProductId) {
                                                    _context.next = 13;
                                                    break;
                                                }

                                                _supplierProducts2.default.findByIdAndUpdate(element.supplierProductId, {
                                                    name: element.name,
                                                    packaging: element.packaging,
                                                    minOrder: element.minOrder,
                                                    orderBy: element.orderBy
                                                }, { upsert: true, new: true }).then().catch();
                                                _context.next = 16;
                                                break;

                                            case 13:
                                                productSave = (0, _supplierProducts2.default)({
                                                    name: element.name,
                                                    businessId: decode.businessId,
                                                    packaging: element.packaging,
                                                    minOrder: element.minOrder,
                                                    orderBy: element.orderBy,
                                                    userId: decode._id,
                                                    image: photo,
                                                    supplierId: element.id
                                                });
                                                _context.next = 16;
                                                return productSave.save().then(function (result) {
                                                    productId.push(result._id);
                                                });

                                            case 16:
                                                i++;

                                            case 17:
                                                _iteratorNormalCompletion = true;
                                                _context.next = 5;
                                                break;

                                            case 20:
                                                _context.next = 26;
                                                break;

                                            case 22:
                                                _context.prev = 22;
                                                _context.t0 = _context['catch'](3);
                                                _didIteratorError = true;
                                                _iteratorError = _context.t0;

                                            case 26:
                                                _context.prev = 26;
                                                _context.prev = 27;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                    _iterator.return();
                                                }

                                            case 29:
                                                _context.prev = 29;

                                                if (!_didIteratorError) {
                                                    _context.next = 32;
                                                    break;
                                                }

                                                throw _iteratorError;

                                            case 32:
                                                return _context.finish(29);

                                            case 33:
                                                return _context.finish(26);

                                            case 34:
                                                j = 0;
                                                _iteratorNormalCompletion2 = true;
                                                _didIteratorError2 = false;
                                                _iteratorError2 = undefined;
                                                _context.prev = 38;

                                                for (_iterator2 = productRangeData.suppliersProduct[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                    _element = _step2.value;

                                                    if (_element.isSoldInStore == "0") {
                                                        if (!_element.supplierProductId) {
                                                            _element.supplierProductId = productId[j];
                                                            j++;
                                                        }
                                                    }
                                                }
                                                _context.next = 46;
                                                break;

                                            case 42:
                                                _context.prev = 42;
                                                _context.t1 = _context['catch'](38);
                                                _didIteratorError2 = true;
                                                _iteratorError2 = _context.t1;

                                            case 46:
                                                _context.prev = 46;
                                                _context.prev = 47;

                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                    _iterator2.return();
                                                }

                                            case 49:
                                                _context.prev = 49;

                                                if (!_didIteratorError2) {
                                                    _context.next = 52;
                                                    break;
                                                }

                                                throw _iteratorError2;

                                            case 52:
                                                return _context.finish(49);

                                            case 53:
                                                return _context.finish(46);

                                            case 54:
                                                _context.next = 56;
                                                return _productRangeItems2.default.findByIdAndUpdate(productRangeData._id, { suppliersProduct: productRangeData.suppliersProduct }, { new: true }).then(function (productRangeUpData) {
                                                    return productRangeUpData;
                                                });

                                            case 56:
                                                return _context.abrupt('return', _context.sent);

                                            case 57:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined, [[3, 22, 26, 34], [27,, 29, 33], [38, 42, 46, 54], [47,, 49, 53]]);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()).then(function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productRangeUpData) {
                                var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, product;

                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (!params.locationProduct) {
                                                    _context2.next = 27;
                                                    break;
                                                }

                                                _iteratorNormalCompletion3 = true;
                                                _didIteratorError3 = false;
                                                _iteratorError3 = undefined;
                                                _context2.prev = 4;
                                                _iterator3 = params.locationProduct[Symbol.iterator]();

                                            case 6:
                                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                                    _context2.next = 13;
                                                    break;
                                                }

                                                product = _step3.value;
                                                _context2.next = 10;
                                                return _productRangeItems2.default.findByIdAndUpdate(product._id, { locationPreferredIndex: product.locationPreferredIndex }, { new: true }).then(function (productRange) {}).catch(function (err) {
                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                });

                                            case 10:
                                                _iteratorNormalCompletion3 = true;
                                                _context2.next = 6;
                                                break;

                                            case 13:
                                                _context2.next = 19;
                                                break;

                                            case 15:
                                                _context2.prev = 15;
                                                _context2.t0 = _context2['catch'](4);
                                                _didIteratorError3 = true;
                                                _iteratorError3 = _context2.t0;

                                            case 19:
                                                _context2.prev = 19;
                                                _context2.prev = 20;

                                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                    _iterator3.return();
                                                }

                                            case 22:
                                                _context2.prev = 22;

                                                if (!_didIteratorError3) {
                                                    _context2.next = 25;
                                                    break;
                                                }

                                                throw _iteratorError3;

                                            case 25:
                                                return _context2.finish(22);

                                            case 26:
                                                return _context2.finish(19);

                                            case 27:
                                                return _context2.abrupt('return', productRangeUpData);

                                            case 28:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
                            }));

                            return function (_x4) {
                                return _ref3.apply(this, arguments);
                            };
                        }()).then(function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(productRange) {
                                var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, singleChecklist;

                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (!(params.checklist != undefined && params.checklist.length > 0)) {
                                                    _context3.next = 30;
                                                    break;
                                                }

                                                _iteratorNormalCompletion4 = true;
                                                _didIteratorError4 = false;
                                                _iteratorError4 = undefined;
                                                _context3.prev = 4;
                                                _iterator4 = params.checklist[Symbol.iterator]();

                                            case 6:
                                                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                                    _context3.next = 13;
                                                    break;
                                                }

                                                singleChecklist = _step4.value;
                                                _context3.next = 10;
                                                return _checklist2.default.findByIdAndUpdate(singleChecklist.checklistId, { $push: { product: productRange._id } }, { new: true }).then(function (checklistUpdate) {}).catch(function (err) {});

                                            case 10:
                                                _iteratorNormalCompletion4 = true;
                                                _context3.next = 6;
                                                break;

                                            case 13:
                                                _context3.next = 19;
                                                break;

                                            case 15:
                                                _context3.prev = 15;
                                                _context3.t0 = _context3['catch'](4);
                                                _didIteratorError4 = true;
                                                _iteratorError4 = _context3.t0;

                                            case 19:
                                                _context3.prev = 19;
                                                _context3.prev = 20;

                                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                    _iterator4.return();
                                                }

                                            case 22:
                                                _context3.prev = 22;

                                                if (!_didIteratorError4) {
                                                    _context3.next = 25;
                                                    break;
                                                }

                                                throw _iteratorError4;

                                            case 25:
                                                return _context3.finish(22);

                                            case 26:
                                                return _context3.finish(19);

                                            case 27:
                                                res.status(201).send({ code: 201, Message: _message2.default.infoMessage.saveProduct, data: productRange, err: [] });
                                                _context3.next = 31;
                                                break;

                                            case 30:
                                                res.status(201).send({ code: 201, Message: _message2.default.infoMessage.saveProduct, data: productRange, err: [] });

                                            case 31:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
                            }));

                            return function (_x5) {
                                return _ref4.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            res.status(400).send({
                                code: 400,
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        });

                    case 9:
                        _context4.next = 14;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](0);

                        res.status(400).send({
                            code: 400,
                            Message: _message2.default.errorMessage.genericError,
                            data: [],
                            err: _context4.t0
                        });

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 11]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.locationProduct = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _productRangeItems2.default.find({
                                "locationId": params.id,
                                "businessId": decode.businessId,
                                "status": 1
                            }).sort({
                                locationPreferredIndex: 1
                            }).sort({
                                "name": 1
                            }).then(function (locationProduct) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.getDetails,
                                    data: locationProduct,
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
                                Message: _message2.default.errorMessage.genericError,
                                data: [],
                                err: err
                            });
                        }

                    case 1:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
    };
}();
exports.unCheckedProduct = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _orderDetail2.default.findByIdAndRemove(params.id).then(function (unCheckedProduct) {
                                res.status(200).send({
                                    code: 200,
                                    message: _message2.default.infoMessage.unCheckedProduct,
                                    data: unCheckedProduct,
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
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x8, _x9) {
        return _ref6.apply(this, arguments);
    };
}();
exports.productPhoto = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var params, param;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            param = {
                                'destination': 'product',
                                'decodeImage': params.photo,
                                fieldName: 'imageName',
                                imageOrignalName: params.imageName
                            };

                            _uploadFile2.default.base64Upload(param).then(function (image) {
                                _productRangeItems2.default.findByIdAndUpdate(params.productId, { image: image }, { new: true }).then(function (updatePhoto) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.updateData,
                                        data: [],
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
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x10, _x11) {
        return _ref7.apply(this, arguments);
    };
}();