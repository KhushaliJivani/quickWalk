'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalProductSchema = _mongoose2.default.Schema({
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    supplierId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'companySuppliers' },
    userId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Users' },
    name: { type: String },
    packaging: { type: String },
    image: { type: String },
    uniqueProductKey: { type: String },
    categoryId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplierCategory' },
    minOrder: { type: Number },
    orderBy: { type: Number },
    status: { type: String, enum: [0, 1, 2], default: 1 },
    knownBySupplierIndex: { type: String, enum: [0, 1] }
}, { collection: 'supplierProducts' });

globalProductSchema.plugin(_mongooseTimestamp2.default);
var globalProductModel = _mongoose2.default.model('supplierProducts', globalProductSchema);
exports.default = globalProductModel;