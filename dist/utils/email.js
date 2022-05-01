'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _admin = require('../app/models/admin.model');

var _admin2 = _interopRequireDefault(_admin);

var _users = require('../app/models/users.model');

var _users2 = _interopRequireDefault(_users);

var _systemSetting = require('../app/models/systemSetting.model');

var _systemSetting2 = _interopRequireDefault(_systemSetting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SGmail = require('@sendgrid/mail');
SGmail.setApiKey('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');


module.exports.email = function (params) {
    return new Promise(function (resolve, reject) {
        try {
            getToEmail(params).then(function (result) {
                console.log('result...........................', result);
                params.data.applicationStatus = result.applicationStatus;
                params.data.originalToEMail = result.originalToEMail;
                _ejs2.default.renderFile(_config2.default.mailUrl + "email/" + params.template, params.data).then(function (content) {
                    params.html = content;
                    if (params.envelope !== undefined) {
                        params.envelope.to = result.to;
                    } else {
                        params.to = result.to;
                    }
                    console.log('params.to...............................................', params.to);
                    var smtpTransport = _nodemailer2.default.createTransport({
                        host: 'send.one.com',
                        port: 465,
                        // secure: true,
                        auth: {
                            user: 'verification@quick-walk.com',
                            pass: 'brownsugar'
                        }
                    });
                    if (params.from == undefined) {
                        params.from = 'verification@quick-walk.com';
                    }
                    smtpTransport.sendMail(params, function (err, info) {
                        if (err) reject(err, []);
                        if (info) resolve(info);
                    });
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

var getToEmail = function getToEmail(params) {
    console.log(params);
    return new Promise(function (resolve, reject) {
        if (params.type == 'user') {
            resolve({
                to: params.envelope !== undefined ? params.envelope.to : params.to,
                applicationStatus: '2',
                originalToEMail: params.envelope !== undefined ? params.envelope.to : params.to
            });
        } else if (params.type == 'business') {
            return _admin2.default.findById(params.id).then(function (admin) {
                console.log('Admin.............................', admin);
                if (admin.applicationStatus == 1) {
                    _systemSetting2.default.findOne().then(function (settings) {
                        resolve({
                            to: settings.masterEmail,
                            applicationStatus: admin.applicationStatus,
                            originalToEMail: params.envelope !== undefined ? params.envelope.to : params.to
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    resolve({
                        to: params.envelope !== undefined ? params.envelope.to : params.to,
                        applicationStatus: '2',
                        originalToEMail: params.envelope !== undefined ? params.envelope.to : params.to
                    });
                    // resolve(params.to);
                }
            });
        } else {
            resolve({
                to: params.envelope !== undefined ? params.envelope.to : params.to,
                applicationStatus: '2',
                originalToEMail: params.envelope !== undefined ? params.envelope.to : params.to
            });
        }
    });
};
// module.exports.email = (params) => {
//     return new Promise((resolve, reject) => {
//         try {
//             if(params.from == undefined) {
//                 params.from = 'verification@quick-walk.com';
//             }
//             SGmail.send(params,(err, info) => {
//                 if (err) reject(err, []);
//                 if (info) resolve(info);
//             });
//         } catch (err) {
//             console.log("------------------errr",errr)
//             reject(err);
//         }
//     });
// }


// module.exports.email = (params, callback) => {
//     try {
//         const smtpTransport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'ramsolanki.viitorcloud@gmail.com',
//                 pass: 'RAhir@123'
//             }
//         });
//         params.from = 'ramsolanki.viitorcloud@gmail.com';
//         smtpTransport.sendMail(params, (err, info) => {
//             if (err) callback(err, []);
//             if (info) callback(undefined, info);
//         })
//     } catch (err) {
//         callback(err, []);
//     }
// }