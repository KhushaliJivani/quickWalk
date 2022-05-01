'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // POST /create
    update: {
        body: {
            params: {
                userName: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
                firstName: _joi2.default.string().required(),
                lastName: _joi2.default.string().required()
            }
        }
    }
};