'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var languageSchema = _mongoose2.default.Schema({
    name: { type: String },
    shortCode: { type: String },
    status: { type: String, enum: [0, 1] },
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' }
}, { collection: 'language' });
languageSchema.plugin(_mongooseTimestamp2.default);
var languageModel = _mongoose2.default.model('language', languageSchema);
exports.default = languageModel;