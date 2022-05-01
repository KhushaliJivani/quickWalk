'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _checklist = require('../models/checklist.model');

var _checklist2 = _interopRequireDefault(_checklist);

var _companySuppliers = require('../models/companySuppliers.model');

var _companySuppliers2 = _interopRequireDefault(_companySuppliers);

var _location = require('../models/location.model');

var _location2 = _interopRequireDefault(_location);

var _productRangeItems = require('../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _supplierProducts = require('../models/supplierProducts.model');

var _supplierProducts2 = _interopRequireDefault(_supplierProducts);

var _supplier = require('../models/supplier.model');

var _supplier2 = _interopRequireDefault(_supplier);

var _message = require('../../config/message');

var _message2 = _interopRequireDefault(_message);

var _supplierCategory = require('../models/supplierCategory.model');

var _supplierCategory2 = _interopRequireDefault(_supplierCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.businessIdReplace = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var params, to, from, supplierIdArray, supplierCategoryArray, supplierProductArray, locationArray, originalLocationArray, productRangArray, supplierData, i, tempIterator, newSupplierData, tempCompanySupplier, newCompanySupplier, createNewCompanySupplier, category, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleCategory, newSingleCategory, newSupplierCategory, supplierProduct, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, singleSupplierProduct, newSingleSupplierProduct, newSupplierProduct, parentLocation, _i, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, singleParentLocation, tempSingleParentLocation, newParentLoaction, parentLocation2, productRange, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, singleProductRange, tempSingleProductRange, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _supplierProduct, newProductRange, checklist, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, singleChecklist, tempSingleChecklist, _i2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        params = req.body.params;
                        to = params.to;
                        from = params.from;
                        supplierIdArray = [];
                        supplierCategoryArray = [];
                        supplierProductArray = [];
                        locationArray = [];
                        originalLocationArray = [];
                        productRangArray = [];
                        _context2.next = 12;
                        return _supplier2.default.find({ businessId: _mongoose2.default.Types.ObjectId(from) }).exec();

                    case 12:
                        supplierData = _context2.sent;
                        i = 0;

                    case 14:
                        if (!(i < supplierData.length)) {
                            _context2.next = 109;
                            break;
                        }

                        tempIterator = supplierData[i].toObject();

                        delete tempIterator._id;
                        tempIterator.businessId = _mongoose2.default.Types.ObjectId(to);
                        _context2.next = 20;
                        return _supplier2.default.create(tempIterator);

                    case 20:
                        newSupplierData = _context2.sent;
                        _context2.next = 23;
                        return _companySuppliers2.default.findOne({ supplierId: supplierData[i]._id }).exec();

                    case 23:
                        tempCompanySupplier = _context2.sent;
                        newCompanySupplier = tempCompanySupplier.toObject();

                        delete newCompanySupplier._id;
                        newCompanySupplier.businessId = _mongoose2.default.Types.ObjectId(to);
                        newCompanySupplier.supplierId = newSupplierData._id;
                        _context2.next = 30;
                        return _companySuppliers2.default.create(newCompanySupplier);

                    case 30:
                        createNewCompanySupplier = _context2.sent;

                        supplierIdArray[tempCompanySupplier._id] = createNewCompanySupplier._id;

                        //**Supplier Category*/
                        _context2.next = 34;
                        return _supplierCategory2.default.find({ supplierId: tempCompanySupplier._id }).exec();

                    case 34:
                        category = _context2.sent;

                        if (!(category.length > 0)) {
                            _context2.next = 69;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 39;
                        _iterator = category[Symbol.iterator]();

                    case 41:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 55;
                            break;
                        }

                        singleCategory = _step.value;
                        newSingleCategory = singleCategory.toObject();

                        delete newSingleCategory._id;
                        newSingleCategory.supplierId = supplierIdArray[singleCategory.supplierId];
                        _context2.next = 48;
                        return _supplierCategory2.default.create(newSingleCategory);

                    case 48:
                        newSupplierCategory = _context2.sent;
                        _context2.next = 51;
                        return newSupplierCategory;

                    case 51:
                        supplierCategoryArray[singleCategory._id] = _context2.sent._id;

                    case 52:
                        _iteratorNormalCompletion = true;
                        _context2.next = 41;
                        break;

                    case 55:
                        _context2.next = 61;
                        break;

                    case 57:
                        _context2.prev = 57;
                        _context2.t0 = _context2['catch'](39);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 61:
                        _context2.prev = 61;
                        _context2.prev = 62;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 64:
                        _context2.prev = 64;

                        if (!_didIteratorError) {
                            _context2.next = 67;
                            break;
                        }

                        throw _iteratorError;

                    case 67:
                        return _context2.finish(64);

                    case 68:
                        return _context2.finish(61);

                    case 69:
                        _context2.next = 71;
                        return _supplierProducts2.default.find({ supplierId: tempCompanySupplier._id }).exec();

                    case 71:
                        supplierProduct = _context2.sent;

                        if (!(supplierProduct.length > 0)) {
                            _context2.next = 106;
                            break;
                        }

                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 76;
                        _iterator2 = supplierProduct[Symbol.iterator]();

                    case 78:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context2.next = 92;
                            break;
                        }

                        singleSupplierProduct = _step2.value;
                        newSingleSupplierProduct = singleSupplierProduct.toObject();

                        delete newSingleSupplierProduct._id;
                        newSingleSupplierProduct.supplierId = supplierIdArray[singleSupplierProduct.supplierId];
                        newSingleSupplierProduct.businessId = _mongoose2.default.Types.ObjectId(to);
                        newSingleSupplierProduct.categoryId = supplierCategoryArray[singleSupplierProduct.categoryId];
                        _context2.next = 87;
                        return _supplierProducts2.default.create(newSingleSupplierProduct);

                    case 87:
                        newSupplierProduct = _context2.sent;

                        supplierProductArray[singleSupplierProduct._id] = newSupplierProduct._id;

                    case 89:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 78;
                        break;

                    case 92:
                        _context2.next = 98;
                        break;

                    case 94:
                        _context2.prev = 94;
                        _context2.t1 = _context2['catch'](76);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t1;

                    case 98:
                        _context2.prev = 98;
                        _context2.prev = 99;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 101:
                        _context2.prev = 101;

                        if (!_didIteratorError2) {
                            _context2.next = 104;
                            break;
                        }

                        throw _iteratorError2;

                    case 104:
                        return _context2.finish(101);

                    case 105:
                        return _context2.finish(98);

                    case 106:
                        i++;
                        _context2.next = 14;
                        break;

                    case 109:
                        _context2.next = 111;
                        return _location2.default.find({ businessId: _mongoose2.default.Types.ObjectId(from) }).exec();

                    case 111:
                        parentLocation = _context2.sent;

                        if (!(parentLocation.length > 0)) {
                            _context2.next = 147;
                            break;
                        }

                        _i = 0;
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context2.prev = 117;
                        _iterator3 = parentLocation[Symbol.iterator]();

                    case 119:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context2.next = 133;
                            break;
                        }

                        singleParentLocation = _step3.value;
                        tempSingleParentLocation = singleParentLocation.toObject();

                        delete tempSingleParentLocation._id;
                        tempSingleParentLocation.businessId = _mongoose2.default.Types.ObjectId(to);
                        _context2.next = 126;
                        return _location2.default.create(tempSingleParentLocation);

                    case 126:
                        newParentLoaction = _context2.sent;

                        locationArray[singleParentLocation._id] = newParentLoaction._id;
                        originalLocationArray[_i] = newParentLoaction._id;
                        _i++;

                    case 130:
                        _iteratorNormalCompletion3 = true;
                        _context2.next = 119;
                        break;

                    case 133:
                        _context2.next = 139;
                        break;

                    case 135:
                        _context2.prev = 135;
                        _context2.t2 = _context2['catch'](117);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context2.t2;

                    case 139:
                        _context2.prev = 139;
                        _context2.prev = 140;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 142:
                        _context2.prev = 142;

                        if (!_didIteratorError3) {
                            _context2.next = 145;
                            break;
                        }

                        throw _iteratorError3;

                    case 145:
                        return _context2.finish(142);

                    case 146:
                        return _context2.finish(139);

                    case 147:
                        _context2.next = 149;
                        return _location2.default.find({ businessId: _mongoose2.default.Types.ObjectId(from) }).exec();

                    case 149:
                        parentLocation2 = _context2.sent;

                        if (!(parentLocation2.length > 0)) {
                            _context2.next = 152;
                            break;
                        }

                        return _context2.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var i, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _singleParentLocation;

                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            i = 0;
                                            _iteratorNormalCompletion4 = true;
                                            _didIteratorError4 = false;
                                            _iteratorError4 = undefined;
                                            _context.prev = 4;
                                            _iterator4 = parentLocation2[Symbol.iterator]();

                                        case 6:
                                            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                                _context.next = 13;
                                                break;
                                            }

                                            _singleParentLocation = _step4.value;
                                            _context.next = 10;
                                            return _location2.default.findByIdAndUpdate(originalLocationArray[i], { parentId: locationArray[_singleParentLocation.parentId] }, { new: true }).then(function (result) {
                                                i++;
                                            });

                                        case 10:
                                            _iteratorNormalCompletion4 = true;
                                            _context.next = 6;
                                            break;

                                        case 13:
                                            _context.next = 19;
                                            break;

                                        case 15:
                                            _context.prev = 15;
                                            _context.t0 = _context['catch'](4);
                                            _didIteratorError4 = true;
                                            _iteratorError4 = _context.t0;

                                        case 19:
                                            _context.prev = 19;
                                            _context.prev = 20;

                                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                _iterator4.return();
                                            }

                                        case 22:
                                            _context.prev = 22;

                                            if (!_didIteratorError4) {
                                                _context.next = 25;
                                                break;
                                            }

                                            throw _iteratorError4;

                                        case 25:
                                            return _context.finish(22);

                                        case 26:
                                            return _context.finish(19);

                                        case 27:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
                        })(), 't3', 152);

                    case 152:
                        _context2.next = 154;
                        return _productRangeItems2.default.find({ businessId: _mongoose2.default.Types.ObjectId(from) }).exec();

                    case 154:
                        productRange = _context2.sent;

                        if (!(productRange.length > 0)) {
                            _context2.next = 209;
                            break;
                        }

                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context2.prev = 159;
                        _iterator5 = productRange[Symbol.iterator]();

                    case 161:
                        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                            _context2.next = 195;
                            break;
                        }

                        singleProductRange = _step5.value;
                        tempSingleProductRange = singleProductRange.toObject();

                        delete tempSingleProductRange._id;
                        tempSingleProductRange.suppliersProduct = [];
                        tempSingleProductRange.businessId = _mongoose2.default.Types.ObjectId(to);
                        tempSingleProductRange.locationId = locationArray[singleProductRange.locationId];

                        if (!(singleProductRange.suppliersProduct.length > 0)) {
                            _context2.next = 188;
                            break;
                        }

                        _iteratorNormalCompletion6 = true;
                        _didIteratorError6 = false;
                        _iteratorError6 = undefined;
                        _context2.prev = 172;

                        for (_iterator6 = singleProductRange.suppliersProduct[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            _supplierProduct = _step6.value;

                            if (_supplierProduct.id !== undefined) {
                                _supplierProduct.id = supplierIdArray[_supplierProduct.id];
                            }
                            if (_supplierProduct.supplierProductId !== undefined) {
                                _supplierProduct.supplierProductId = supplierProductArray[_supplierProduct.supplierProductId];
                            }
                            tempSingleProductRange.suppliersProduct.push(_supplierProduct);
                        }
                        _context2.next = 180;
                        break;

                    case 176:
                        _context2.prev = 176;
                        _context2.t4 = _context2['catch'](172);
                        _didIteratorError6 = true;
                        _iteratorError6 = _context2.t4;

                    case 180:
                        _context2.prev = 180;
                        _context2.prev = 181;

                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }

                    case 183:
                        _context2.prev = 183;

                        if (!_didIteratorError6) {
                            _context2.next = 186;
                            break;
                        }

                        throw _iteratorError6;

                    case 186:
                        return _context2.finish(183);

                    case 187:
                        return _context2.finish(180);

                    case 188:
                        _context2.next = 190;
                        return _productRangeItems2.default.create(tempSingleProductRange);

                    case 190:
                        newProductRange = _context2.sent;

                        productRangArray[singleProductRange._id] = newProductRange._id;

                    case 192:
                        _iteratorNormalCompletion5 = true;
                        _context2.next = 161;
                        break;

                    case 195:
                        _context2.next = 201;
                        break;

                    case 197:
                        _context2.prev = 197;
                        _context2.t5 = _context2['catch'](159);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context2.t5;

                    case 201:
                        _context2.prev = 201;
                        _context2.prev = 202;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 204:
                        _context2.prev = 204;

                        if (!_didIteratorError5) {
                            _context2.next = 207;
                            break;
                        }

                        throw _iteratorError5;

                    case 207:
                        return _context2.finish(204);

                    case 208:
                        return _context2.finish(201);

                    case 209:
                        _context2.next = 211;
                        return _checklist2.default.find({ businessId: _mongoose2.default.Types.ObjectId(from) }).exec();

                    case 211:
                        checklist = _context2.sent;

                        if (!(checklist.length > 0)) {
                            _context2.next = 243;
                            break;
                        }

                        _iteratorNormalCompletion7 = true;
                        _didIteratorError7 = false;
                        _iteratorError7 = undefined;
                        _context2.prev = 216;
                        _iterator7 = checklist[Symbol.iterator]();

                    case 218:
                        if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                            _context2.next = 229;
                            break;
                        }

                        singleChecklist = _step7.value;
                        tempSingleChecklist = singleChecklist.toObject();

                        delete tempSingleChecklist._id;
                        tempSingleChecklist.businessId = _mongoose2.default.Types.ObjectId(to);
                        for (_i2 = 0; _i2 < tempSingleChecklist.product.length; _i2++) {
                            tempSingleChecklist.product[_i2] = productRangArray[tempSingleChecklist.product[_i2]];
                        }
                        _context2.next = 226;
                        return _checklist2.default.create(tempSingleChecklist);

                    case 226:
                        _iteratorNormalCompletion7 = true;
                        _context2.next = 218;
                        break;

                    case 229:
                        _context2.next = 235;
                        break;

                    case 231:
                        _context2.prev = 231;
                        _context2.t6 = _context2['catch'](216);
                        _didIteratorError7 = true;
                        _iteratorError7 = _context2.t6;

                    case 235:
                        _context2.prev = 235;
                        _context2.prev = 236;

                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }

                    case 238:
                        _context2.prev = 238;

                        if (!_didIteratorError7) {
                            _context2.next = 241;
                            break;
                        }

                        throw _iteratorError7;

                    case 241:
                        return _context2.finish(238);

                    case 242:
                        return _context2.finish(235);

                    case 243:
                        res.status(200).send({
                            code: 200,
                            message: _message2.default.infoMessage.scriptRun,
                            data: [],
                            error: []
                        });
                        _context2.next = 249;
                        break;

                    case 246:
                        _context2.prev = 246;
                        _context2.t7 = _context2['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context2.t7
                        });

                    case 249:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 246], [39, 57, 61, 69], [62,, 64, 68], [76, 94, 98, 106], [99,, 101, 105], [117, 135, 139, 147], [140,, 142, 146], [159, 197, 201, 209], [172, 176, 180, 188], [181,, 183, 187], [202,, 204, 208], [216, 231, 235, 243], [236,, 238, 242]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();