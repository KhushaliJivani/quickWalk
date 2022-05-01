'use strict';

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = require('../validation/auth');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('../controllers/admin/auth.controller');

var _auth4 = _interopRequireDefault(_auth3);

var _profile = require('../controllers/admin/profile.controller');

var _profile2 = _interopRequireDefault(_profile);

var _supplier = require('../controllers/admin/supplier.contoller');

var _supplier2 = _interopRequireDefault(_supplier);

var _product = require('../controllers/admin/product.contoller');

var _product2 = _interopRequireDefault(_product);

var _location = require('../controllers/admin/location.controller');

var _location2 = _interopRequireDefault(_location);

var _checklist = require('../controllers/admin/checklist.controller');

var _checklist2 = _interopRequireDefault(_checklist);

var _supplierProduct = require('../controllers/admin/supplierProduct.controller');

var _supplierProduct2 = _interopRequireDefault(_supplierProduct);

var _user = require('../controllers/admin/user.contoller');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../validation/user');

var _user4 = _interopRequireDefault(_user3);

var _supplier3 = require('../validation/supplier');

var _supplier4 = _interopRequireDefault(_supplier3);

var _product3 = require('../validation/product');

var _product4 = _interopRequireDefault(_product3);

var _message = require('../../config/message');

var _message2 = _interopRequireDefault(_message);

var _language = require('../controllers/admin/language.controller');

var _language2 = _interopRequireDefault(_language);

var _report = require('../controllers/admin/report.controller');

var _report2 = _interopRequireDefault(_report);

var _store = require('../controllers/admin/store.controller');

var _store2 = _interopRequireDefault(_store);

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
router.post('/login', (0, _expressValidation2.default)(_auth2.default.login), _auth4.default.login);

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
router.post('/signup', (0, _expressValidation2.default)(_auth2.default.signup), _auth4.default.singup);

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
router.post('/forgotPassword', (0, _expressValidation2.default)(_auth2.default.forgotPassword), _auth4.default.forgotPassword);

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
router.post('/resetPassword', (0, _expressValidation2.default)(_auth2.default.resetPassword), _auth4.default.resetPassword);

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
router.post('/updateProfile', _passport2.default.authenticate('Admin', { session: false }), (0, _expressValidation2.default)(_auth2.default.signup), _profile2.default.updateProfile);

/**
 * @api {post} verify
 * @apiDescription admin verify
 * @apiVersion 1.0.0
 * @apiName verify
 * @apiGroup Admin verify
 * 
 * @apiParam  {String}  token    User verification token
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/verify', (0, _expressValidation2.default)(_auth2.default.verify), _auth4.default.verify);

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
router.post('/changePassword', _passport2.default.authenticate('Admin', { session: false }), _profile2.default.changePassword);

/**
 * @api {POST} Add Supplier
 * @apiDescription  Add Supplier 
 * @apiVersion 1.0.0
 * @apiName add
 * @apiGroup supplier
 * 
 * @apiParam  {String}  email       Supplier Email
 * @apiParam  {String}  name        Supplier Name
 * @apiParam  {String}  address     Supplier Address
 * @apiParam  {String}  type        Supplier Type
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Supplier data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/supplier/add', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.add);

/**
 * @api {POST} Update Supplier
 * @apiDescription  Update Supplier
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup supplier
 * 
 * @apiParam  {String}  email       Admin Email
 * @apiParam  {String}  name        Supplier Name 
 * @apiParam  {String}  address     Supplier Address
 * @apiParam  {String}  type        Supplier Type
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Supplier data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/supplier/edit', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.edit);

/**
 * @api {GET} Supplier get
 * @apiDescription  Supplier Details get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup supplier
 * 
 * @apiParam  {String}  jwt token in headers
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     All Supplier data  
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/supplier/get', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.get);

/**
 * @api {GET} Supplier Single get
 * @apiDescription  Supplier Single Details get
 * @apiVersion 1.0.0
 * @apiName singleGet
 * @apiGroup supplier
 * 
 * @apiParam  {String}  Supplier Id
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Single Supplier data 
 *
 * 
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/supplier/detail', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.detail);

/**
 * @api {POST} suplier delete
 * @apiDescription  suplier  delete
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiGroup supplier
 * 
 * @apiParam  {String}  Supplier Id
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/supplier/delete', (0, _expressValidation2.default)(_supplier4.default.delete), _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.delete);

/**
 * @api {POST} suggestion of supliers
 * @apiDescription  suggestion of supliers
 * @apiVersion 1.0.0
 * @apiName suggestion
 * @apiGroup supplier
 * @apiSuccess (200) {String}      message
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/supplier/suggestion', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.suggestion);

/**
 * @api {POST} Add Product
 * @apiDescription  Add Product 
 * @apiVersion 1.0.0
 * @apiName add
 * @apiGroup product
 * 
 * @apiParam  {String}  prductName       Product Name
 * @apiParam  {String}  standerStoke     Standard Stoke
 * @apiParam  {String}  miniOrder        Mini Order
 * @apiParam  {String}  image            Product Image
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Product data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/product/add', (0, _expressValidation2.default)(_product4.default.add), _passport2.default.authenticate('Admin', { session: false }), _product2.default.add);

/**
 * @api {POST} Update Product
 * @apiDescription  Update Product
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup product
 * 
 * @apiParam  {String}  prductName       Product Name
 * @apiParam  {String}  standerStoke     Standard Stoke
 * @apiParam  {String}  miniOrder        Mini Order
 * @apiParam  {String}  image            Product Image
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Product data 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/product/edit', (0, _expressValidation2.default)(_product4.default.edit), _passport2.default.authenticate('Admin', { session: false }), _product2.default.edit);

/**
 * @api {GET} Product get
 * @apiDescription  Product Details get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup product
 * 
 * @apiParam  {String}  jwt token in headers
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     All Product data  
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/product/get', _passport2.default.authenticate('Admin', { session: false }), _product2.default.get);

/**
 * @api {GET} Product Single get
 * @apiDescription  Product Single Details get
 * @apiVersion 1.0.0
 * @apiName detail
 * @apiGroup product
 * 
 * @apiParam  {String}  Product Id
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Single Product data 
 *
 * 
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/product/detail', _passport2.default.authenticate('Admin', { session: false }), _product2.default.detail);
/**
 * @api {POST} Product delete
 * @apiDescription  Product delete
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiGroup product
 * 
 * @apiParam  {String}  Product Id
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/product/delete', (0, _expressValidation2.default)(_product4.default.delete), _passport2.default.authenticate('Admin', { session: false }), _product2.default.delete);

/**
 * @api {POST} Admin Add location
 * @apiDescription  add location
 * @apiVersion 1.0.0
 * @apiName addLocation
 * @apiGroup location
 * 
 * @apiParam  {String}  businessID, name, image, locationColor, position
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/location/addLocation', _passport2.default.authenticate('Admin', { session: false }), _location2.default.addLocation);

/**
 * @api {POST} Admin edit location
 * @apiDescription  edit location
 * @apiVersion 1.0.0
 * @apiName editLocation
 * @apiGroup location
 * 
 * @apiParam  {String}  businessID, name, image, locationColor, position
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/location/editLocation', _passport2.default.authenticate('Admin', { session: false }), _location2.default.editLocation);

/**
 * @api {POST} Admin delete location
 * @apiDescription  delete location
 * @apiVersion 1.0.0
 * @apiName deleteLocation
 * @apiGroup location
 * 
 * @apiParam  {String}  location id
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/location/deleteLocation', _passport2.default.authenticate('Admin', { session: false }), _location2.default.deleteLocation);
router.post('/location/getSubLocation', _passport2.default.authenticate('Admin', { session: false }), _location2.default.getSubLocation);

/**
 * @api {POST} Admin get all location
 * @apiDescription  get all location
 * @apiVersion 1.0.0
 * @apiName getLocation
 * @apiGroup location
 * 
 * @apiParam  {String}  null
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/location/getLocation', _passport2.default.authenticate('Admin', { session: false }), _location2.default.getLocation);

/**
 * @api {POST} Admin get  location 
 * @apiDescription  get  location
 * @apiVersion 1.0.0
 * @apiName singleLocationGet
 * @apiGroup location
 * 
 * @apiParam  {String}  location id
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/location/detailsLocationGet', _passport2.default.authenticate('Admin', { session: false }), _location2.default.detailsLocationGet);

/**
 * @api {POST} Admin add  checklist 
 * @apiDescription  admin add the checklist of product
 * @apiVersion 1.0.0
 * @apiName addChecklist
 * @apiGroup checklist
 * 
 * @apiParam  {String}  name product businessID  status
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/checklist/addChecklist', _passport2.default.authenticate('Admin', { session: false }), _checklist2.default.addChecklist);

/**
 * @api {POST} Admin edit checklist 
 * @apiDescription  admin edit the checklist of product
 * @apiVersion 1.0.0
 * @apiName editChecklist
 * @apiGroup checklist
 * 
 * @apiParam  {String}  name product businessID  status
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/checklist/editChecklist', _passport2.default.authenticate('Admin', { session: false }), _checklist2.default.editChecklist);

/**
 * @api {POST} Admin delete checklist 
 * @apiDescription  admin delete the checklist of product
 * @apiVersion 1.0.0
 * @apiName deleteChecklist
 * @apiGroup checklist
 * 
 * @apiParam  {String}  id of checklist
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/checklist/deleteChecklist', _passport2.default.authenticate('Admin', { session: false }), _checklist2.default.deleteChecklist);

/**
 * @api {POST} Admin get all checklist 
 * @apiDescription  admin get all  the checklist of product
 * @apiVersion 1.0.0
 * @apiName getChecklist
 * @apiGroup checklist
 * 
 * @apiParam  {String}  null
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/checklist/getChecklist', _passport2.default.authenticate('Admin', { session: false }), _checklist2.default.getChecklist);

/**
 * @api {POST} Admin get details of  checklist 
 * @apiDescription  admin get all  the checklist of product
 * @apiVersion 1.0.0
 * @apiName detailsChecklistGet
 * @apiGroup checklist
 * 
 * @apiParam  {String}  id of checklist
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/checklist/detailsChecklistGet', _passport2.default.authenticate('Admin', { session: false }), _checklist2.default.detailsChecklistGet);

/**
 * @api {POST} Add user 
 * @apiDescription  User add
 * @apiVersion 1.0.0
 * @apiName add
 * @apiGroup User
 * 
 * @apiParam  {String}  firstName
 * @apiParam  {String}  lastName
 * @apiParam  {String}  userName
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/user/add', _passport2.default.authenticate('Admin', { session: false }), (0, _expressValidation2.default)(_user4.default.update), _user2.default.add);

/**
 * @api {post} verify
 * @apiDescription user verify
 * @apiVersion 1.0.0
 * @apiName verify
 * @apiGroup user verify
 * 
 * @apiParam  {String}  token    User verification token
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/user/verify', _passport2.default.authenticate('Admin', { session: false }), _user2.default.verify);

/**
 * @api {POST} User get all data
 * @apiDescription  User get all data
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup user 
 * 
 * @apiParam  {String}  null
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     Users data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/user/get', _passport2.default.authenticate('Admin', { session: false }), _user2.default.get);

/**
 * @api {POST} User single data
 * @apiDescription  User single data
 * @apiVersion 1.0.0
 * @apiName detail
 * @apiGroup user 
 * 
 * @apiParam  {String}  id  User Id
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {array}     User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/user/detail', _passport2.default.authenticate('Admin', { session: false }), _user2.default.detail);

/**
 * @api {POST} User delete  
 * @apiDescription  Single User delete
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiGroup user
 * 
 * @apiParam  {String}  id of User
 *
 * @apiSuccess (200) {String}    message
 * @apiSuccess (200) {String}    Deleted User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/user/delete', _passport2.default.authenticate('Admin', { session: false }), _user2.default.delete);

/**
 * @api {POST} Update user 
 * @apiDescription  UPdate user data
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup User
 * 
 * @apiParam  {String}  firstName
 * @apiParam  {String}  lastName
 * @apiParam  {String}  userName
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Update User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/user/edit', _passport2.default.authenticate('Admin', { session: false }), (0, _expressValidation2.default)(_user4.default.update), _user2.default.edit);

/**
 * @api {GET} language data  get 
 * @apiDescription  language status is active data get
 * @apiVersion 1.0.0
 * @apiName get
 * @apiGroup language
 * 
 * @apiParam  null
 *
 * @apiSuccess (200) {String}    message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/getLanguage', _passport2.default.authenticate('Admin', { session: false }), _language2.default.get);
/**
 * @api {POST} Update user 
 * @apiDescription  UPdate user data
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup User
 * 
 * @apiParam  {String}  firstName
 * @apiParam  {String}  lastName
 * @apiParam  {String}  userName
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Update User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * router.post('/supplier/productDetail', passport.authenticate('Admin', { session: false }), supplierController.productDetail);
 */

/**
 * @api {POST} Update user 
 * @apiDescription  UPdate user data
 * @apiVersion 1.0.0
 * @apiName edit
 * @apiGroup User
 * 
 * @apiParam  {String}  firstName
 * @apiParam  {String}  lastName
 * @apiParam  {String}  userName
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Update User data
 *
* @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
router.post('/supplier/suggestedProduct', passport.authenticate('Admin', { session: false }), supplierController.suggestedProduct);
 */

/**
 * @api {POST} Delete Product 
 * @apiDescription  Delete Supplier Product
 * @apiVersion 1.0.0
 * @apiName deleteProduct
 * @apiGroup Suppplier
 * 
 * @apiParam  {String}  productId
 * @apiParam  {String}  supplierId
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Supplier data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 *  router.post('/supplier/deleteProduct', passport.authenticate('Admin', { session: false }), supplierController.deleteProduct);
 */

/**
 * @api {POST} Update user
 * @apiDescription  UPdate user data
 * @apiVersion 1.0.0
 * @apiName assignSupplier
 * @apiGroup Suppplier
 *
 * @apiParam  {String}  firstName
 * @apiParam  {String}  lastName
 * @apiParam  {String}  userName
 *
 *  @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}        Update User data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * router.post('/supplier/assignSupplier', passport.authenticate('Admin', { session: false }), supplierController.assignSupplier);
 */

/**
 * @api {POST} Supplier Product
 * @apiDescription  Get Particular Supplier Product Data
 * @apiVersion 1.0.0
 * @apiName supplierProduct
 * @apiGroup Suppplier
 *
 * @apiParam  {String}  supplierId
 *
 * @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}       Perticular Supplier Product data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
// router.post('/supplier/supplierProduct', passport.authenticate('Admin', { session: false }), productController.supplierProduct);

/**
 * @api {POST} Supplier Product
 * @apiDescription  Get Particular Supplier Product Data
 * @apiVersion 1.0.0
 * @apiName supplierProduct
 * @apiGroup Suppplier
 *
 * @apiParam  {String}  supplierId
 *
 * @apiSuccess (200) {String}      message
 * @apiSuccess (200) {array}       Perticular Supplier Product data
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/supplier/createProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.add);
router.post('/supplier/editProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.edit);
router.post('/supplier/deleteProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.delete);
router.get('/supplier/getProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.get);
router.post('/supplier/category', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.category);
router.post('/supplier/detailProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.detail);
router.post('/supplier/productRange', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.productRange);
router.post('/supplier/linkProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.linkProduct);
router.post('/supplier/delinkProduct', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.delinkProduct);
router.post('/supplier/deleteCategory', _passport2.default.authenticate('Admin', { session: false }), _supplier2.default.deleteCategory);
router.post('/product/supplierProduct', _passport2.default.authenticate('Admin', { session: false }), _product2.default.linkedProductWithSupplierProduct);
router.post('/product/order', _passport2.default.authenticate('Admin', { session: false }), _product2.default.order);
router.post('/product/calculation', _passport2.default.authenticate('Admin', { session: false }), _product2.default.calculation);
router.post('/product/linkProducts', _passport2.default.authenticate('Admin', { session: false }), _product2.default.linkProducts);
router.post('/product/delinkProducts', _passport2.default.authenticate('Admin', { session: false }), _product2.default.delinkProducts);
router.post('/store/add', _passport2.default.authenticate('Admin', { session: false }), _store2.default.add);
router.get('/store/get', _passport2.default.authenticate('Admin', { session: false }), _store2.default.get);
router.post('/store/delete', _passport2.default.authenticate('Admin', { session: false }), _store2.default.delete);
router.post('/store/edit', _passport2.default.authenticate('Admin', { session: false }), _store2.default.edit);
router.get('/store/suggestion', _passport2.default.authenticate('Admin', { session: false }), _store2.default.suggestion);
router.post('/store/detail', _passport2.default.authenticate('Admin', { session: false }), _store2.default.detail);
router.get('/supplier/getSupplier', _passport2.default.authenticate('Admin', { session: false }), _supplierProduct2.default.getSupplier);
router.get('/product/locationDetails', _passport2.default.authenticate('Admin', { session: false }), _product2.default.locationDetails);
router.get('/report/orderList', _passport2.default.authenticate('Admin', { session: false }), _report2.default.orderList);
router.post('/report/orderListProductWise', _passport2.default.authenticate('Admin', { session: false }), _report2.default.orderListProductWise);
router.post('/location/product', _passport2.default.authenticate('Admin', { session: false }), _location2.default.locationHaveProduct);
router.post('/location/locationProductOrder', _passport2.default.authenticate('Admin', { session: false }), _location2.default.locationProductOrder);
router.post('/location/locationOrder', _passport2.default.authenticate('Admin', { session: false }), _location2.default.locationOrder);
router.post('/location/updateLocationArea', _passport2.default.authenticate('Admin', { session: false }), _location2.default.updateLocationArea);

module.exports = router;