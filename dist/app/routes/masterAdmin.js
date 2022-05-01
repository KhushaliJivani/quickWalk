'use strict';

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _admin = require('../controllers/masterAdmin/admin.controller');

var _admin2 = _interopRequireDefault(_admin);

var _auth = require('../controllers/masterAdmin/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _profile = require('../controllers/masterAdmin/profile.controller');

var _profile2 = _interopRequireDefault(_profile);

var _language = require('../controllers/masterAdmin/language.controller');

var _language2 = _interopRequireDefault(_language);

var _auth3 = require('../validation/auth');

var _auth4 = _interopRequireDefault(_auth3);

var _adminMaster = require('../validation/adminMaster');

var _adminMaster2 = _interopRequireDefault(_adminMaster);

var _import = require('../controllers/masterAdmin/import.controller');

var _import2 = _interopRequireDefault(_import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/**
 * @api {post} /login login admin
 * @apiDescription Login admin
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup Admin Authenticate
 * 
 * @apiParam  {String}  email     Admin Email
 * @apiParam  {String}  password  Admin Password
 *
 * @apiSuccess (Created 200) {String}  token  Token For Authenticate
 *
 * @apiError (Bad Request 400) ValidationError  Some parameters may contain invalid values
 */
router.post('/login', (0, _expressValidation2.default)(_auth4.default.login), _auth2.default.login);

/**
 * @api {post} /signup register Admin
 * @apiDescription signup Admin
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup Admin Authenticate
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  username    Username
 * @apiParam  {String}  password    Admin Password
 * @apiParam  {String}  company     Admin Company
 * @apiParam  {String}  firstName   Admin firstName
 * @apiParam  {String}  lastName    Admin lastName
 *
 * @apiSuccess (Created 200) {String}  id       Admin's id
 * @apiSuccess (Created 200) {String}  email    Admin's email
 * @apiSuccess (Created 200) {String}  company  Admin's company
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/signup', (0, _expressValidation2.default)(_auth4.default.signup), _auth2.default.singup);

/**
 * @api {post} /forgotPassword 
 * @apiDescription Forgot Password Admin
 * @apiVersion 1.0.0
 * @apiName forgotPassword
 * @apiGroup Admin Authenticate
 * 
 * @apiParam  {String}  email  Email
 *
 * @apiSuccess (200) {String}  message  email sent
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/forgotPassword', (0, _expressValidation2.default)(_auth4.default.forgotPassword), _auth2.default.forgotPassword);

/**
 * @api {post} /resetPassword 
 * @apiDescription Reset Password Admin
 * @apiVersion 1.0.0
 * @apiName resetPassword
 * @apiGroup Admin Authenticate
 * 
 * @apiParam  {String}  token  Token from forgot password email link
 *
 * @apiSuccess (200) {String}  message  reset password 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/resetPassword', (0, _expressValidation2.default)(_auth4.default.resetPassword), _auth2.default.resetPassword);

/**
 * @api {post} updateProfile
 * @apiDescription Update Profile
 * @apiVersion 1.0.0
 * @apiName Update Profile
 * @apiGroup profile
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  username    Username
 * @apiParam  {String}  password    Admin Password
 * @apiParam  {String}  firstName   Admin firstName
 * @apiParam  {String}  lastName    Admin lastName
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     admin data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/updateProfile', _passport2.default.authenticate('masterAdmin', { session: false }), _profile2.default.updateProfile);

/**
 * @api {post} changePassword
 * @apiDescription  Change admin password
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiGroup Admin profile
 * 
 * @apiParam  {String}  password  New Password
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
// router.post('/changePassword', passport.authenticate('masterAdmin', { session: false }), profileController.changePassword);

/**
 * @api {GET} language data  get 
 * @apiDescription  language status is active data get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup master language
 * 
 * @apiParam  null
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/getLanguage', _passport2.default.authenticate('masterAdmin', { session: false }), _language2.default.get);

/**
 * @api {GET} Admin get
 * @apiDescription  Admin Details get
 * @apiVersion 1.0.0
 * @apiName adminGet
 * @apiGroup Admin profile
 * 
 * @apiParam  {String}  jwt token in headers
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/admin/adminGet', _passport2.default.authenticate('masterAdmin', { session: false }), _admin2.default.adminGet);

/**
 * @api {POST} Admin delete
 * @apiDescription  Admin delete
 * @apiVersion 1.0.0
 * @apiName adminDelete
 * @apiGroup Admin profile
 * 
 * @apiParam  {String}  jwt token in headers
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/admin/adminDelete', _passport2.default.authenticate('masterAdmin', { session: false }), _admin2.default.adminDelete);

/**
 * @api {POST} signup register MasterAdmin
 * @apiDescription  Signup Master Admin 
 * @apiVersion 1.0.0
 * @apiName add
 * @apiGroup master language
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  firstName   Admin firstName
 * @apiParam  {String}  lastName    Admin lastName
 *
 * @apiSuccess (200) {String}  message  email sent
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/admin/add', (0, _expressValidation2.default)(_adminMaster2.default.add), _passport2.default.authenticate('masterAdmin', { session: false }), _admin2.default.add);

/**
 * @api {POST} Update MasterAdmin
 * @apiDescription  Update Master Admin 
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup master language
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  firstName   Admin firstName
 * @apiParam  {String}  lastName    Admin lastName
 * @apiParam  {String}  language    Admin language
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Admin data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/admin/edit', _passport2.default.authenticate('masterAdmin', { session: false }), _admin2.default.edit);

/**
 * @api {POST} Update MasterAdmin
 * @apiDescription  Update Master Admin 
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup master language
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  firstName   Admin firstName
 * @apiParam  {String}  lastName    Admin lastName
 * @apiParam  {String}  language    Admin language
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Admin data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/admin/detail', _passport2.default.authenticate('masterAdmin', { session: false }), _admin2.default.detail);
router.post('/importExcel', _passport2.default.authenticate('masterAdmin', { session: false }), _import2.default.importExcel);
router.post('/powerPassword', _passport2.default.authenticate('masterAdmin', { session: false }), _profile2.default.powerPassword);
router.get('/getProfile', _passport2.default.authenticate('masterAdmin', { session: false }), _profile2.default.getProfile);
router.post('/saveCutomMail', _passport2.default.authenticate('masterAdmin', { session: false }), _profile2.default.saveCutomMail);
module.exports = router;