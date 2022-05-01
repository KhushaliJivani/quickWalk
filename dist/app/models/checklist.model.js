'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checklistSchema = _mongoose2.default.Schema({
    name: { type: String, required: true },
    product: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'product' }],
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin', required: true },
    status: { type: String, enum: [0, 1, 2] }
}, { collection: 'checklist' });
checklistSchema.plugin(_mongooseTimestamp2.default);
var checklistModel = _mongoose2.default.model('checklist', checklistSchema);
exports.default = checklistModel;