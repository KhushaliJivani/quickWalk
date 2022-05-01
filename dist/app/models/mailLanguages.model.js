'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailLanguagesSchema = _mongoose2.default.Schema({
    languageId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'language' },
    label: { type: String },
    languageType: { type: String },
    content: {
        content0: { type: String },
        content1: { type: String },
        content2: { type: String },
        content3: { type: String },
        content4: { type: String },
        content5: { type: String },
        content6: { type: String },
        content7: { type: String },
        content8: { type: String },
        content9: { type: String },
        content10: { type: String },
        content11: { type: String },
        content12: { type: String },
        content13: { type: String },
        content14: { type: String }
    }
}, { collection: 'mailLanguages' });
mailLanguagesSchema.plugin(_mongooseTimestamp2.default);
var mailLanguagesModel = _mongoose2.default.model('mailLanguages', mailLanguagesSchema);
exports.default = mailLanguagesModel;