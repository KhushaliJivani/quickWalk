'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    add: {
        body: {
            params: {
                email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
                name: _joi2.default.string().required()
            }
        }
    }
};