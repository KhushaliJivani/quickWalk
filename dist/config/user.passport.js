'use strict';

var _passportJwt = require('passport-jwt');

var _users = require('../app/models/users.model');

var _users2 = _interopRequireDefault(_users);

var _admin = require('../app/models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = _config2.default.JWTSecret;
    console.log("the user  passport called....");
    passport.use('User', new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _users2.default.findOne({ _id: jwt_payload._id, status: 1 }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                _admin2.default.findById(user.businessId, function (err, admin) {
                    if (err) {
                        return done(err, false);
                    }
                    if (admin.applicationStatus == "2" || admin.applicationStatus == "1") {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            } else {
                return done(null, false);
            }
        });
    }));
};