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
    type: { type: String, enum: [1, 2] },
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    orderEmail: { type: String },
    deliveryDaysStandard: [],
    logo: { type: String },
    minOrderProduct: { type: Number },
    placeOrderAhead: Number,
    placeOrderBeforeTime: String,
    supplierId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'suppliers' },
    status: { type: String, enum: [0, 1, 2], default: 1 }
}, { Collection: 'companySuppliers' });

businessSupplierSchema.plugin(_mongooseTimestamp2.default);
var businessSupplierModel = _mongoose2.default.model('companySuppliers', businessSupplierSchema);

exports.default = businessSupplierModel;