'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _environment = require('../environment');

var _environment2 = _interopRequireDefault(_environment);

var _mongoose = require('./config/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _error = require('./middlewares/error');

var _error2 = _interopRequireDefault(_error);

var _routes = require('./app/routes/');

var _routes2 = _interopRequireDefault(_routes);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _swagger = require('./public/doc/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _cronjob = require('./app/cronjob');

var _cronjob2 = _interopRequireDefault(_cronjob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./config/user.passport')(_passport2.default);
require('./config/masterAdmin.passport')(_passport2.default);
require('./config/bussnisAdmin.passport')(_passport2.default);

// getting application environment
var env = process.env.NODE_ENV;

// getting application config based on environment
var envConfig = _environment2.default[env];

// setting port value
var PORT = envConfig.port || 3000;

/**
* Express instance
* @public
*/
var app = (0, _express2.default)();

var swaggerDefinition = {
  info: {
    title: 'QuickWalk Swagger API',
    version: '0.0.1',
    description: 'Quick Walk'
  },
  host: 'localhost:4000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: "Authorization",
      scheme: 'bearer',
      in: 'header'
    }
  }
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['/app/routes/']
};
var swaggerSpec = (0, _swaggerJsdoc2.default)(options);
app.get('swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
// open mongoose connection
_mongoose2.default.connect(envConfig, env);

// request logging. dev: console | production: file
app.use((0, _morgan2.default)(envConfig.logs));

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.multipart());
app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());
app.set('view engine', 'ejs');

// mount api routes
app.use('/', _routes2.default);
// if error is not an instanceOf APIError, convert it.
app.use(_error2.default.converter);
// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJson));
// catch 404 and forward to error handler
app.use(_error2.default.notFound);

// error handler, send stacktrace only during development
app.use(_error2.default.handler);
//
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
// listen to requests

var privateKey = _fs2.default.readFileSync('/etc/letsencrypt/live/api.quick-walk.com/privkey.pem', 'utf8');
var certificate = _fs2.default.readFileSync('/etc/letsencrypt/live/api.quick-walk.com/fullchain.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
_https2.default.createServer(credentials, app).listen(PORT);
// app.listen(PORT);

module.exports = app;