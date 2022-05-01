'use strict';

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('./APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * Return new validation error
   *
   * @param {Error} errorData
   * @returns {Error|APIError}
   */
var generateError = function generateError(errorData) {
    var errorsArray = [];

    if (errorData.code === 11000) {
        // duplicate issue
        errorsArray.push({
            field: '',
            location: 'body',
            messages: ['Already Exists']
        });
    } else {
        var errors = errorData.errors;

        for (var err in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, err)) {
                var data = {
                    field: err,
                    location: 'body',
                    messages: [errors[err].message]
                };
                errorsArray.push(data);
            }
        }
    }

    return new _APIError2.default({
        message: errorData.message || 'Validation Error',
        errors: errorsArray,
        status: errorData.code === 11000 ? _httpStatus2.default.CONFLICT : _httpStatus2.default.BAD_REQUEST,
        isPublic: true,
        stack: errorData.stack
    });
};

exports.generateError = generateError;