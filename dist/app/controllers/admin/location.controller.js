'use strict';

var deleteLocations = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(decode, locationData, res) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _location3.default.aggregate([{
                            "$match": { "status": "1", "_id": _mongoose2.default.Types.ObjectId(locationData._id) }
                        }, {
                            "$graphLookup": {
                                "from": "location",
                                "startWith": "$_id",
                                "connectFromField": "_id",
                                "connectToField": "parentId",
                                "depthField": "depth",
                                "as": "parent"
                            }
                        }]).then(function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(newLocationData) {
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                /*deleted location code with check when any product with connected not allow delete */
                                                newLocationData[0].parent.forEach(function (parentData) {
                                                    /* check when product has been not connected then and then location deleted */
                                                    // productRangeItemsModel.find({locationId:parentData._id,"status" : "1"})
                                                    // .then(productRangeData => {
                                                    //     if(productRangeData.length == 0){
                                                    _location3.default.findByIdAndUpdate(parentData._id, { status: 0 }, { new: true }).then(function (updateLocation) {}).catch();
                                                    //     }
                                                    // })
                                                });
                                                setTimeout(function () {
                                                    res.status(200).send({
                                                        code: 200,
                                                        Message: _message2.default.infoMessage.dataDelete,
                                                        data: newLocationData,
                                                        err: []
                                                    });
                                                }, 1000);

                                            case 2:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, _this);
                            }));

                            return function (_x10) {
                                return _ref5.apply(this, arguments);
                            };
                        }());

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function deleteLocations(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();
/**
 * location get by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _admin = require('../../models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _location2 = require('../../models/location.model');

var _location3 = _interopRequireDefault(_location2);

var _productRangeItems = require('../../models/productRangeItems.model');

var _productRangeItems2 = _interopRequireDefault(_productRangeItems);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _uploadFile = require('../../../utils/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * location add by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.addLocation = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var param;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            param = {
                                'destination': 'location',
                                'decodeImage': "",
                                fieldName: 'image',
                                imageOrignalName: ''
                            };

                            _uploadFile2.default.uploadFile(param, req, res).then(function (fileName) {
                                var params = req.body;
                                var exe = req.headers.authorization.split(' ');
                                var decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                                params.image = fileName;
                                params.businessId = decode._id;
                                var locationData = (0, _location3.default)(params);
                                locationData.save().then(function (locationdata) {
                                    res.status(200).send({
                                        code: 200,
                                        Message: _message2.default.infoMessage.saveLocation,
                                        data: locationdata,
                                        error: []
                                    });
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

/**
 * location edit by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.editLocation = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var param;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            param = {
                                'destination': 'location',
                                'decodeImage': "",
                                fieldName: 'image',
                                imageOrignalName: ''
                            };

                            _uploadFile2.default.uploadFile(param, req, res).then(function (fileName) {
                                var params = req.body;
                                if (fileName != '' && fileName != null && fileName !== undefined) {
                                    params.image = fileName;
                                }
                                return _location3.default.findByIdAndUpdate(params.id, params, {
                                    new: true
                                });
                            }).then(function (locationdata) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.updateData,
                                    data: locationdata,
                                    error: []
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
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * location delete by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.deleteLocation = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _location3.default.findById(params.id).then(function (locationData) {
                                if (locationData.status == "1") {
                                    locationData.status = 0;
                                    locationData.save();
                                    deleteLocations(decode, locationData, res);
                                } else {
                                    res.status(409).send({
                                        code: 409,
                                        Message: _message2.default.infoMessage.alreadyDelete,
                                        data: result,
                                        err: []
                                    });
                                }
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
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
exports.getLocation = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var exe, decode;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _location3.default.find({
                                businessId: decode._id,
                                status: "1",
                                parentId: null
                            }).sort({
                                preferredIndex: 1
                            }).then(function (locationData) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: locationData,
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
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

/**
 *single location get by business admin
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.detailsLocationGet = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _location3.default.findById(params.id).then(function (locationData) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.getDetails,
                                    data: locationData,
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
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

exports.getSubLocation = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        params = req.body.params;
                        exe = req.headers.authorization.split(' ');
                        decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);
                        _context8.next = 6;
                        return _location3.default.find({ parentId: params.id, status: "1", businessId: decode._id })
                        // .sort({ $natural: 1 })
                        .sort({
                            preferredIndex: 1
                        }).collation({ locale: "en_US", numericOrdering: true }).then(function (result) {
                            // result.sort((x,y) => {
                            //     let temp1 = x.preferredIndex.split('-');
                            //     let temp2 = y.preferredIndex.split('-');
                            //     var xInt = temp1[temp1.length-1];
                            //     var yInt = temp2[temp2.length-1]; 
                            //     return xInt - yInt;
                            // });
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

                    case 6:
                        _context8.next = 11;
                        break;

                    case 8:
                        _context8.prev = 8;
                        _context8.t0 = _context8['catch'](0);

                        res.status(400).send({
                            code: 400,
                            message: _message2.default.errorMessage.genericError,
                            data: [],
                            error: _context8.t0
                        });

                    case 11:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[0, 8]]);
    }));

    return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}();
exports.locationHaveProduct = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _productRangeItems2.default.find({ locationId: params.id,
                                status: {
                                    $ne: 0
                                } }).sort({ 'locationPreferredIndex': '1' }).then(function (product) {
                                res.status(200).send({
                                    code: 200,
                                    Message: _message2.default.infoMessage.locationProduct,
                                    data: product,
                                    err: []
                                });
                            }).catch(function (err) {
                                res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
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
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function (_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}();

exports.locationProductOrder = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.prev = 0;
                        params = req.body.params;
                        _context11.next = 4;
                        return params.locationProduct.forEach(function () {
                            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(product) {
                                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                    while (1) {
                                        switch (_context10.prev = _context10.next) {
                                            case 0:
                                                _context10.next = 2;
                                                return _productRangeItems2.default.findByIdAndUpdate(product._id, { locationPreferredIndex: product.locationPreferredIndex }, { new: true }).then(function (productRange) {}).catch(function (err) {
                                                    res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                                });

                                            case 2:
                                            case 'end':
                                                return _context10.stop();
                                        }
                                    }
                                }, _callee10, undefined);
                            }));

                            return function (_x21) {
                                return _ref11.apply(this, arguments);
                            };
                        }());

                    case 4:
                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.setProductOrder, data: [], error: [] });
                        _context11.next = 10;
                        break;

                    case 7:
                        _context11.prev = 7;
                        _context11.t0 = _context11['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context11.t0 });

                    case 10:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined, [[0, 7]]);
    }));

    return function (_x19, _x20) {
        return _ref10.apply(this, arguments);
    };
}();

exports.locationOrder = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var params, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _location, childLocation, parentLocation;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        params = req.body.params;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context12.prev = 5;
                        _iterator = params.location[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context12.next = 18;
                            break;
                        }

                        _location = _step.value;
                        _context12.next = 11;
                        return childLocationOrderUpdate(_location, params, res);

                    case 11:
                        childLocation = _context12.sent;
                        _context12.next = 14;
                        return parentLocationOrderUpdate(_location, params, res);

                    case 14:
                        parentLocation = _context12.sent;

                    case 15:
                        _iteratorNormalCompletion = true;
                        _context12.next = 7;
                        break;

                    case 18:
                        _context12.next = 24;
                        break;

                    case 20:
                        _context12.prev = 20;
                        _context12.t0 = _context12['catch'](5);
                        _didIteratorError = true;
                        _iteratorError = _context12.t0;

                    case 24:
                        _context12.prev = 24;
                        _context12.prev = 25;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 27:
                        _context12.prev = 27;

                        if (!_didIteratorError) {
                            _context12.next = 30;
                            break;
                        }

                        throw _iteratorError;

                    case 30:
                        return _context12.finish(27);

                    case 31:
                        return _context12.finish(24);

                    case 32:
                        res.status(200).send({ code: 200, message: _message2.default.infoMessage.setLocationOrder, data: [], error: [] });
                        _context12.next = 38;
                        break;

                    case 35:
                        _context12.prev = 35;
                        _context12.t1 = _context12['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context12.t1 });

                    case 38:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined, [[0, 35], [5, 20, 24, 32], [25,, 27, 31]]);
    }));

    return function (_x22, _x23) {
        return _ref12.apply(this, arguments);
    };
}();
var childLocationOrderUpdate = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(location, params, res) {
        var changeLocationLevel;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        changeLocationLevel = location.preferredIndex.split('-');
                        _context13.next = 3;
                        return _location3.default.aggregate([{
                            "$match": { "status": "1", "_id": _mongoose2.default.Types.ObjectId(location._id) }
                        }, {
                            "$graphLookup": {
                                "from": "location",
                                "startWith": "$_id",
                                "connectFromField": "_id",
                                "connectToField": "parentId",
                                "depthField": "depth",
                                "as": "parent"
                            }
                        }]).then(function (childLocation) {
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = childLocation[0].parent[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var childLocationDetail = _step2.value;

                                    var sepratedChildLocation = childLocationDetail.preferredIndex.split('-');
                                    sepratedChildLocation[params.locationLevel - 1] = changeLocationLevel[params.locationLevel - 1];
                                    _location3.default.findByIdAndUpdate(childLocationDetail._id, { preferredIndex: sepratedChildLocation.join('-') }, { new: true }).then(function (locationResult) {}).catch(function (err) {
                                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                                    });
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 3:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined);
    }));

    return function childLocationOrderUpdate(_x24, _x25, _x26) {
        return _ref13.apply(this, arguments);
    };
}();
var parentLocationOrderUpdate = function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(location, params, res) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        _context14.next = 2;
                        return _location3.default.findByIdAndUpdate(location._id, { preferredIndex: location.preferredIndex }, { new: true }).then(function (locationRange) {}).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        });

                    case 2:
                        return _context14.abrupt('return', _context14.sent);

                    case 3:
                    case 'end':
                        return _context14.stop();
                }
            }
        }, _callee14, undefined);
    }));

    return function parentLocationOrderUpdate(_x27, _x28, _x29) {
        return _ref14.apply(this, arguments);
    };
}();

exports.updateLocationArea = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
        var params;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        try {
                            params = req.body.params;

                            _location3.default.findByIdAndUpdate(params.id, { area: params.area }, { new: true }).then(function (locationUpdate) {
                                res.status(200).send({ code: 200, message: _message2.default.infoMessage.updateData, data: locationUpdate, error: [] });
                            }).catch(function (err) {
                                res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                            });
                        } catch (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err });
                        }

                    case 1:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, undefined);
    }));

    return function (_x30, _x31) {
        return _ref15.apply(this, arguments);
    };
}();