'use strict';

var _express = require('express');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _masterAdmin = require('./masterAdmin');

var _masterAdmin2 = _interopRequireDefault(_masterAdmin);

var _swagger = require('./../../public/doc/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _script = require('../script/script');

var _script2 = _interopRequireDefault(_script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use('/api', _users2.default);
router.use('/admin', _admin2.default);
router.use('/master-admin', _masterAdmin2.default);
router.get('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
router.get('/script', _script2.default.businessIdReplace);

module.exports = router;