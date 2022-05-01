'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var businessSupplierSchema = _mongoose2.default.Schema({
    name: String,
    supplierId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'suppliers' },
    sortOrder: Number,
    status: { type: String, enum: [0, 1, 2], default: 1 }
}, { Collection: 'supplierCategory' });

businessSupplierSchema.plugin(_mongooseTimestamp2.default);
var businessSupplierModel = _mongoose2.default.model('supplierCategory', businessSupplierSchema);

exports.default = businessSupplierModel;