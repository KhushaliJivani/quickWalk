'use strict';

var _environment = require('../../environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envConfig = _environment2.default[process.env.NODE_ENV];

module.exports = {
    JWTSecret: 'QuickWalk',
    JWTExpireTime: 604800,
    resetPasswordTokenExpireTime: Date.now() + 3600000,
    emailVerifyTokenExpireTime: Date.now() + 3600000,
    frontendUrl: envConfig.userUri,
    adminUrl: envConfig.adminUri,
    masterAdmin: envConfig.masterAdminUri,
    uploadFilePath: envConfig.uploadFilePath,
    base64FilePath: envConfig.base64FilePath,
    mailUrl: envConfig.mailUrl,
    logoUrl: envConfig.logoUrl,
    clientMail: envConfig.clientMail,
    // envPort: envConfig.port
    envPort: "3000"

};