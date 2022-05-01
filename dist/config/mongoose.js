'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set mongoose Promise to Bluebird
_mongoose2.default.Promise = global.Promise;

// Exit application on error
_mongoose2.default.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = function (envConfig, env) {
    // print mongoose logs in dev env
    if (env === 'development') {
        _mongoose2.default.set('debug', true);
    }
    _mongoose2.default.connect(envConfig.mongoUri, { useNewUrlParser: true });
    return _mongoose2.default.connection;
};