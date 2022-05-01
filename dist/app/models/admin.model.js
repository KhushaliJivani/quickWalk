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

var AdminSchema = _mongoose2.default.Schema({
    name: { type: String },
    language: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'language' },
    contactName: { type: String },
    contactNumber: { type: String },
    email: { type: String, required: true },
    customMail: { type: String },
    comment: { type: String },
    companyStatus: { type: String, enum: [0, 1, 2, 3] },
    applicationStatus: { type: String, enum: [0, 1, 2, 3], default: 1 },
    password: { type: String },
    powerPassword: { type: String },
    powerPasswordStatus: { type: String, enum: [0, 1], default: 0 },
    adminType: { type: String, enum: [0, 1] },
    isAdminActive: { type: String, enum: [0, 1] },
    resetPasswordToken: String,
    // timeZone: String,
    resetPasswordExpires: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpire: Date,
    adminId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' }
}, { collection: 'admin' });

AdminSchema.plugin(_mongooseTimestamp2.default);
AdminSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        _bcryptNodejs2.default.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

AdminSchema.methods.comparePassword = function (passw, cb) {
    _bcryptNodejs2.default.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var AdminModel = _mongoose2.default.model('admin', AdminSchema);

exports.savePowerPassword = function (powerPassword, cb) {
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

AdminModel.saveUser = function (saveToUser) {
    return saveToUser.save();
};

AdminModel.filter = function (filterParam) {
    return AdminModel.find(filterParam);
};
exports.default = AdminModel;