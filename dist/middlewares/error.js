'use strict';

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../utils/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _environment = require('../../environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV;

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
var handler = function handler(err, req, res, next) {
    var response = {
        code: err.status,
        message: err.message || _httpStatus2.default[err.status],
        errors: err.errors,
        stack: err.stack
    };

    if (env !== 'development') {
        delete response.stack;
    }
    res.status(err.status);
    res.json(response);
    res.end();
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = function (err, req, res, next) {

    var convertedError = new _APIError2.default({
        message: err.message || 'Something went wrong',
        status: err.status,
        stack: err.stack,
        errors: err.errors || []
    });

    return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = function (req, res, next) {
    var err = new _APIError2.default({
        message: 'Not found @',
        status: _httpStatus2.default.NOT_FOUND
    });
    return handler(err, req, res);
};