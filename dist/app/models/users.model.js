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

var Schema = _mongoose2.default.Schema;

var UsersSchema = _mongoose2.default.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String,
        enum: [0, 1, 2],
        default: 2
    },
    isUserActive: {
        type: String,
        enum: [0, 1]
    },
    businessId: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'admin' },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpire: Date
}, {
    collection: 'Users'
});

UsersSchema.plugin(_mongooseTimestamp2.default);
UsersSchema.pre('save', function (next) {
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

UsersSchema.methods.comparePassword = function (passw, cb) {
    _bcryptNodejs2.default.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var UsersModel = _mongoose2.default.model('Users', UsersSchema);

UsersModel.saveUser = function (saveToUser) {
    return saveToUser.save();
};

UsersModel.filter = function (filterParam) {
    return UsersModel.find(filterParam);
};
exports.default = UsersModel;