'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SystemSettingSchema = _mongoose2.default.Schema({
    powerPassword: {
        type: String
    },
    masterEmail: {
        type: String
    },
    powerPasswordStatus: { type: String, enum: [0, 1], default: 0 }
}, {
    collection: 'system_settings'
});

SystemSettingSchema.plugin(_mongooseTimestamp2.default);

exports.savePowerPassword = function (powerPassword, cb) {
    console.log('Enterrrrrrrrrrrrrrrr');
    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        _bcryptNodejs2.default.hash(powerPassword, salt, null, function (err, hash) {
            if (err) {
                return cb(err);
            }
            console.log("hash : ", hash);
            cb(null, hash);
        });
    });
};

exports.comparePowerPassword = function (passw1, passw2, cb) {
    _bcryptNodejs2.default.compare(passw1, passw2, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
var SystemSettingModel = _mongoose2.default.model('system_settings', SystemSettingSchema);

exports.default = SystemSettingModel;