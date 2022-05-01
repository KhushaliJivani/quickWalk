'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const productSchema = mongoose.Schema({
//     adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
//     supplierId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
//     name: { type: String },
//     packaging: { type: String },
//     image: { type: String },
//     uniqueProductKey: { type: String },
//     supplierCatogoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
//     minOrder: { type: Number },
//     orderBy: { type: Number },
//     knownBySupplierIndex: { type: String, enum: [0, 1] },
//     status: { type: String, enum: [0, 1, 2], default: 1 },
//     GlobalProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'globalProduct' },
//     LocationId: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
// }, { collection: 'product' });
var productSchema = _mongoose2.default.Schema({
    name: { type: String },
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    userId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Users' },
    image: { type: String },
    packaging: { type: String },
    suppliersProduct: [{
        id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplier' },
        supplierProductId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplierProducts' },
        preferredIndex: { type: Number },
        calculation: { type: String },
        isSoldInStore: { type: String, enum: [0, 1], default: 0 }
    }],
    standardQuantity: { type: Number },
    locationId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'location' },
    locationPreferredIndex: { type: Number },
    locationOrder: { type: Number },
    status: { type: String, enum: [0, 1, 2], default: 1 }
}, { collection: 'productRangeItems' });

productSchema.plugin(_mongooseTimestamp2.default);
var productModel = _mongoose2.default.model('productRangeItems', productSchema);
exports.default = productModel;