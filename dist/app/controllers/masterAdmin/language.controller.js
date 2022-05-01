'use strict';

var _language = require('.././../models/language.model');

var _language2 = _interopRequireDefault(_language);

var _message = require('../../../config/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * get language 
 * @public
 * @param req
 * @param res
 * @returns {*}
 */
exports.get = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _language2.default.find({ "status": 1 }).then(function (result) {
                            res.status(200).send({ code: 200, message: _message2.default.infoMessage.languageGet, data: result, error: [] });
                        }).catch(function (err) {
                            res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: err.stack });
                        });

                    case 3:
                        _context.next = 8;
                        break;

                    case 5:
                        _context.prev = 5;
                        _context.t0 = _context['catch'](0);

                        res.status(400).send({ code: 400, message: _message2.default.errorMessage.genericError, data: [], error: _context.t0.stack });

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 5]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();