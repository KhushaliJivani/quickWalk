'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationSchema = _mongoose2.default.Schema({
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    parentId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'location' },
    name: { type: String },
    image: { type: String },
    imageManipulation: { type: String },
    locationColor: [{ range: { type: String }, color: { type: String } }],
    area: {},
    settings: {},
    status: { type: String, enum: [0, 1], default: 1 },
    isChild: { type: String, enum: [0, 1] },
    parentPosition: { type: String },
    svgSetting: {},
    preferredIndex: { type: String }
}, { collection: 'location' });
locationSchema.plugin(_mongooseTimestamp2.default);
var locationModel = _mongoose2.default.model('location', locationSchema);
exports.default = locationModel;