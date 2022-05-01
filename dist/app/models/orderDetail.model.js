'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderDetailSchema = _mongoose2.default.Schema({
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    orderId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'order' },
    checklistCombinationId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'checklistCombination' },
    productRangeId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'productRangeItems' },
    supplierId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplier' },
    supplierProductId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'supplierProducts' },
    quantity: Number,
    packaging: Number,
    intentionIndex: Number,
    intentionDescription: String,
    orderByUserId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Users' },
    orderOnDateTime: String,
    orderComment: String,
    deliveryCheckByUserId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Users' },
    deliveryCheckOnDateTime: String,
    deliveryComment: String,
    isFlush: Boolean,
    deliveredQuantity: Number,
    expectedDeliveryDate: Date,
    actualDeliveryDate: Date,
    asap: Boolean,
    statusIndex: { type: String, enum: [0, 1, 2, 3, 4] //0 = crate order, 1 = mail sent, 2 = received proper quantity, 3 = received miss-match quantity, 4 = deleted order 
    } }, { collection: 'orderDetail' });
orderDetailSchema.plugin(_mongooseTimestamp2.default);
var orderDetailModel = _mongoose2.default.model('orderDetail', orderDetailSchema);
exports.default = orderDetailModel;