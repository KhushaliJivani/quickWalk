'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalSupplierSchema = _mongoose2.default.Schema({
    type: { type: String, enum: [1, 2] },
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    name: { type: String },
    logo: { type: String },
    address: { type: String },
    infoEmail: { type: String },
    orderEmail: { type: String },
    openingDays: [{
        day: String,
        openingTime: String,
        closingTime: String
    }],
    deliveryDaysAllowed: [],
    productHaveUniqueCode: { type: String, enum: [0, 1] },
    productHaveCategory: { type: String, enum: [0, 1] },
    formatCode: { type: String },
    status: { type: String, enum: [0, 1, 2], default: 1 }
}, { Collection: 'suppliers' });

globalSupplierSchema.plugin(_mongooseTimestamp2.default);
var globalSupplierModel = _mongoose2.default.model('globalSuppliers', globalSupplierSchema);

exports.default = globalSupplierModel;