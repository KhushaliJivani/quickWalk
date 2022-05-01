'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkedChecklistCombinationSchema = _mongoose2.default.Schema({
    checklistCombinationId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'checklistCombination' },
    productId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'productRangeItems' },
    checkedByUserId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Users' },
    isChecked: { type: Boolean }
}, { collection: 'checkedChecklistProduct' });
checkedChecklistCombinationSchema.plugin(_mongooseTimestamp2.default);
var checkedChecklistCombinationModel = _mongoose2.default.model('checkedChecklistProduct', checkedChecklistCombinationSchema);
exports.default = checkedChecklistCombinationModel;