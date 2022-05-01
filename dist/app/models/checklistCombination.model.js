'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checklistCollectionSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    },
    checklistId: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'checklist'
    }],
    businessId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'admin'
    },
    userId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Users'
    },
    isDelete: {
        type: String,
        enum: [0, 1],
        default: 0
    },
    isPause: {
        type: String,
        enum: [0, 1]
    },
    pauseData: {
        checklistCombinationId: {
            type: _mongoose2.default.Schema.Types.ObjectId,
            ref: 'checklistCombination'
        },
        productId: {
            type: _mongoose2.default.Schema.Types.ObjectId,
            ref: 'productRangeItems'
        },
        productIndex: {
            type: Number
        },
        userId: {
            type: _mongoose2.default.Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    finishDate: Date,
    finsishByUserId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    collection: 'checklistCombination'
});
checklistCollectionSchema.plugin(_mongooseTimestamp2.default, {
    createdAt: true,
    updatedAt: { path: 'updatedAt', setOnInsert: false }
});
var checklistCollectionModel = _mongoose2.default.model('checklistCombination', checklistCollectionSchema);
exports.default = checklistCollectionModel;