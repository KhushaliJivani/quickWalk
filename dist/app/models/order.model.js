'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderSchema = _mongoose2.default.Schema({
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    supplierId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplier' },
    orderDate: Date,
    standardOrder: Number,
    expectedDeliveryDate: Date,
    deliveryDateTime: Date,
    actualDeliveryDate: Date,
    asap: Boolean,
    remark: String,
    status: { type: String, enum: [0, 1, 2, 3] //0 = crate order, 1 = mail sent (store then directly create status), 2 = received order, 3 = delete order
    } }, { collection: 'order' });
orderSchema.plugin(_mongooseTimestamp2.default);
var orderModel = _mongoose2.default.model('order', orderSchema);
exports.default = orderModel;