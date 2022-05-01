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
    passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _users2.default.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                _admin2.default.findOne({ id: jwt_payload.id }, function (err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
            }
        });
    }));
};