'use strict';

var _passportJwt = require('passport-jwt');

var _admin = require('../app/models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../config/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (passport, req, res) {
    var opts = {};
    opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = _config2.default.JWTSecret;
    console.log("the master  Admin passport called....");
    passport.use('masterAdmin', new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _admin2.default.findOne({ _id: jwt_payload._id }, function (err, admin) {
            if (err) {
                console.log('Error', err);
                console.log("err>>>>>>>>>>>>>>>>>>>>>>>>>>>", err);
                return done(err, false);
            }
            if (admin) {
                // console.log('admin', admin)
                if (admin.adminType === "0") {
                    done(null, admin);
                } else {
                    return done(null, false);
                }
            } else {
                console.log('Else Call original');
                return done(null, false);
            }
        });
    }));
};