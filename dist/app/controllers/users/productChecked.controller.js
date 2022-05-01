'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../../config/config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

var _checkedChecklistProduct = require('../../models/checkedChecklistProduct.model');

var _checkedChecklistProduct2 = _interopRequireDefault(_checkedChecklistProduct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.checkedChecklistProduct = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var params, exe, decode;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            params = req.body.params;
                            exe = req.headers.authorization.split(' ');
                            decode = _jsonwebtoken2.default.verify(exe[1], _config2.default.JWTSecret);

                            _checkedChecklistProduct2.default.findOne({
                                checklistCombinationId: params.checklistCombinationId,
                                productId: params.productId
                            }).then(function (checkedProductData) {
                                if (checkedProductData) {
                                    _checkedChecklistProduct2.default.findByIdAndUpdate(checkedProductData._id, {
                                        isChecked: params.isChecked
                                    }, {
                                        new: true
                                    }).then(function (updateData) {
                                        res.status(200).send({
                                            code: 200,
                                            message: _message2.default.infoMessage.checkUpdate,
                                            data: updateData,
                                            err: []
                                        });
                                    }).catch(function (err) {
                                        res.status(400).send({
                                            code: 400,
                                            message: _message2.default.errorMessage.genericError,
                                            data: [],
                                            error: err
                                        });
                                    });
                                } else {
                                    params.checkedByUserId = decode._id;
                                    var productCheckedData = (0, _checkedChecklistProduct2.default)(params);
                                    productCheckedData.save().then(function (saveCheck) {
                                        res.status(200).send({
                                            code: 200,
                                            message: _message2.default.infoMessage.checkSave,
                                            data: saveCheck,
                                            err: []
                                        });
                                    }).catch(function (err) {
                                        res.status(400).send({
                                            code: 400,
                                            message: _message2.default.errorMessage.genericError,
                                            data: [],
                                            error: err
                                        });
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
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();