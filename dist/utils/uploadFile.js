'use strict';

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.uploadFile = function (params, req, res) {
    return new Promise(function (resolve, reject) {
        try {
            var imageName = "";
            var storage = _multer2.default.diskStorage({
                destination: function destination(req, file, callback) {
                    callback(null, _config2.default.uploadFilePath + params.destination);
                },
                filename: function filename(req, file, callback) {
                    var exe = file.originalname.split('.');
                    imageName = Date.now() + '.' + exe[exe.length - 1];
                    callback(null, imageName);
                }
            });
            var upload = (0, _multer2.default)({
                storage: storage
            }).single(params.fieldName);
            upload(req, res, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(imageName);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

// module.exports.uploadFile = (params, req, res, callback) => {
//     try {
//         return new Promise((resolve, reject) => {
//             let imageName = "";
//             const storage = multer.diskStorage({
//                 destination: (req, file, callback) => {
//                     callback(null, './src/public/upload/' + params.destination);
//                 },
//                 filename: (req, file, callback) => {
//                     const exe = file.originalname.split('.');
//                     imageName = Date.now() + '.' + exe[exe.length - 1];
//                     callback(null, imageName);
//                 }
//             });
//             const upload = multer({ storage: storage }).single(params.fieldName)
//             upload(req, res, (err, result) => {
//                 if (err) {
//                     callback(err, undefined)
//                 } else {
//                     callback(undefined, imageName)
//                 }
//             })
//         });
//     } catch (err) {
//         callback(err, undefined);
//     }
// }


/*
module.exports.base64Upload = (params) => {
    try {
        console.log('params....................................................................', params);
        const splite = params.decodeImage.split(',');
        const binaryData = new Buffer(splite[1], 'base64').toString('binary');
        const exe = params.imageOrignalName.split('.');
        const imageName = exe[0] + '-' + Date.now() + '.' + exe[exe.length - 1];
        FS.writeFile("src/public/upload/" + params.destination + '/' + imageName, binaryData, "binary", (err, data) => {
            if (err) {
                console.log('err', err)
                return err;
            } else {
                console.log('imageName', imageName)
                return imageName;
            }
        });
    } catch (err) {
        console.log('err', err)
        return err;
    }
}
*/
module.exports.base64Upload = function (params) {
    return new Promise(function (resolve, reject) {
        try {
            var splite = params.decodeImage.split(',');
            var binaryData = new Buffer(splite[1], 'base64').toString('binary');
            var exe = params.imageOrignalName.split('.');
            var imageName = exe[0] + '-' + Date.now() + '.' + exe[exe.length - 1];
            // FS.writeFile("public/upload/" + params.destination + '/' + imageName, binaryData, "binary", (err, data) => {
            _fs2.default.writeFile(_config2.default.base64FilePath + params.destination + '/' + imageName, binaryData, "binary", function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(imageName);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};