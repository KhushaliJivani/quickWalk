'use strict';

var _passportJwt = require('passport-jwt');

var _admin = require('../app/models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../config/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = _config2.default.JWTSecret;
    console.log("the Admin passport called....");
    passport.use('Admin', new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _admin2.default.findOne({ _id: jwt_payload._id, applicationStatus: { $in: [1, 2] } }, function (err, admin) {
            if (err) {
                return done(err, false);
            }
            if (admin) {
                if (admin.adminType == 1) {
                    done(null, admin);
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        });
    }));
};