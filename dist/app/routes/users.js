'use strict';

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = require('../controllers/users/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _profile = require('../controllers/users/profile.controller');

var _profile2 = _interopRequireDefault(_profile);

var _quickOrder = require('../controllers/users/quickOrder.contoller');

var _quickOrder2 = _interopRequireDefault(_quickOrder);

var _auth3 = require('../validation/auth');

var _auth4 = _interopRequireDefault(_auth3);

var _user = require('../validation/user');

var _user2 = _interopRequireDefault(_user);

var _checklist = require('../controllers/users/checklist.controller');

var _checklist2 = _interopRequireDefault(_checklist);

var _product = require('../controllers/users/product.controller');

var _product2 = _interopRequireDefault(_product);

var _order = require('../controllers/users/order.controller');

var _order2 = _interopRequireDefault(_order);

var _checkListDetails = require('../controllers/users/checkListDetails.controller');

var _checkListDetails2 = _interopRequireDefault(_checkListDetails);

var _shoppinglist = require('../controllers/users/shoppinglist.controller');

var _shoppinglist2 = _interopRequireDefault(_shoppinglist);

var _productChecked = require('../controllers/users/productChecked.controller');

var _productChecked2 = _interopRequireDefault(_productChecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
/**
 * GET v1/status
 */
router.get('/status', _passport2.default.authenticate('User', {
  session: false
}), function (req, res) {
  return res.send('OK');
});
/**
 * @api {post} /signup register user
 * @apiDescription signup user
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup Post
 * 
 * @apiParam  {String}  email     User Email
 * @apiParam  {String}  username  Username
 * @apiParam  {String}  password  User Password
 * @apiParam  {String}  company   User Company
 *
 * @apiSuccess (Created 200) {String}  id       User's id
 * @apiSuccess (Created 200) {String}  email    User's email
 * @apiSuccess (Created 200) {String}  company  User's company
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/signup', (0, _expressValidation2.default)(_auth4.default.signup), _auth2.default.singup);

/**
 * @api {post} /login login user
 * @apiDescription Login user
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup Post
 * 
 * @apiParam  {String}  email     User Email
 * @apiParam  {String}  password  User Password
 *
 * @apiSuccess (Created 200) {String}  token  Token For Authenticate
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/login', _auth2.default.login);

/**
 * @api {post} /forgotPassword 
 * @apiDescription Forgot Password user
 * @apiVersion 1.0.0
 * @apiName forgotPassword
 * @apiGroup Post
 * 
 * @apiParam  {String}  email     Email
 *
 * @apiSuccess (200) {String}  message  email sent
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/forgotPassword', _auth2.default.forgotPassword);

/**
 * @api {post} /resetPassword 
 * @apiDescription Reset Password user
 * @apiVersion 1.0.0
 * @apiName resetPassword
 * @apiGroup Post
 * 
 * @apiParam  {String}  token  Token from forgot password email link
 *
 * @apiSuccess (200) {String}  message  reset password 
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/resetPassword', (0, _expressValidation2.default)(_auth4.default.resetPassword), _auth2.default.resetPassword);

/**
 * @api {post} /verify 
 * @apiDescription Verify Account
 * @apiVersion 1.0.0
 * @apiName verify
 * @apiGroup User Authenticate
 * 
 * @apiParam  {String}  token  Token from Active account email link
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/verify', (0, _expressValidation2.default)(_auth4.default.verify), _auth2.default.verify);

/**
 * @api {post} /updateProfile
 * @apiDescription Update User profile
 * @apiVersion 1.0.0
 * @apiName updateProfile
 * @apiGroup Users Profile
 *
 * @apiSuccess (200) {String}  message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/updateProfile', _passport2.default.authenticate('User', { session: false }), (0, _expressValidation2.default)(_user2.default.update), _profile2.default.updateProfile);
/**
 * @api {post} /changePassword
 * @apiDescription Update User password
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiGroup Users Profile
 *
 * @apiParam  {String}  password     User password
 *
 * @apiSuccess (200) {String}  message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/changePassword', _passport2.default.authenticate('User', { session: false }), _profile2.default.changePassword);
/**
 * @api {post} /getProfile
 * @apiDescription Get User profile
 * @apiVersion 1.0.0
 * @apiName getProfile
 * @apiGroup Users Profile
 *
 * @apiSuccess (200) {String}  message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/getProfile', _passport2.default.authenticate('User', { session: false }), _profile2.default.get);

/**
 * @api {get} /getChecklist
 * @apiDescription Get all checklist
 * @apiVersion 1.0.0
 * @apiName getChecklist
 * @apiGroup Users checklist
 *
 * @apiSuccess (200) {String}  message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.get('/getChecklist', _passport2.default.authenticate('User', { session: false }), _checklist2.default.getChecklist);

/**
 * @api {get} /checklistCollection
 * @apiDescription user checklist collection save
 * @apiVersion 1.0.0
 * @apiGroup Users checklistCollection
 * @apiName checklistCollection
 *
 * @apiSuccess (200) {String}  message
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 */
router.post('/checklistCombination', _passport2.default.authenticate('User', { session: false }), _checklist2.default.checklistCombination);
router.post('/productDetails', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.productDetails);
router.post('/supplierDetails', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.supplierDetails);
router.post('/locationAndSubLocationProduct', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.locationAndSubLocationProduct);
router.post('/locationProduct', _passport2.default.authenticate('User', { session: false }), _product2.default.locationProduct);
router.get('/getChecklistCombination', _passport2.default.authenticate('User', { session: false }), _checklist2.default.getChecklistCombination);
router.post('/getCombinationProducts', _passport2.default.authenticate('User', { session: false }), _checklist2.default.checklistProductDetail);
router.post('/product/add', _passport2.default.authenticate('User', { session: false }), _product2.default.add);
router.post('/checkList/productDetails', _passport2.default.authenticate('User', { session: false }), _checkListDetails2.default.productDetails);
router.post('/checkList/otherChecklistOrderProduct', _passport2.default.authenticate('User', { session: false }), _checkListDetails2.default.otherChecklistOrderProduct);
router.post('/order/create', _passport2.default.authenticate('User', { session: false }), _order2.default.createOrder);
router.get('/getSupplier', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getSupplier);
router.get('/getStore', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getStore);
router.get('/getLocation', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getLocation);
router.post('/getSubLocation', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getSubLocation);
router.post('/getSubLocationDetails', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getSubLocationDetails);
router.get('/getSupplierAndShop', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.getSupplierAndShop);
router.post('/unCheckedProduct', _passport2.default.authenticate('User', { session: false }), _product2.default.unCheckedProduct);
router.get('/pdfGeneratar', _passport2.default.authenticate('User', { session: false }), _order2.default.pdfGeneratar);
router.post('/checklist/orderSuppplierProduct', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderSuppplierProduct);
router.post('/checklist/finalOrder', _passport2.default.authenticate('User', { session: false }), _checklist2.default.finalOrder);
router.post('/checklist/asap', _passport2.default.authenticate('User', { session: false }), _checklist2.default.asap);
router.post('/checklist/orderList', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderList);
router.post('/order/orderListSend', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderListSend);
router.post('/order/orderListReceived', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderListReceived);
router.post('/checklist/orderListProductWise', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderListProductWise);
router.post('/checklist/orderProductComment', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderProductComment);
router.post('/supplierProduct', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.supplierProduct);

router.post('/supplierMail', _order2.default.supplierMail);
router.post('/categoryProduct', _passport2.default.authenticate('User', { session: false }), _order2.default.categoryProduct);
router.post('/shoppingList', _passport2.default.authenticate('User', { session: false }), _shoppinglist2.default.shoppingList);
router.post('/shoppingListProductUpdate', _passport2.default.authenticate('User', { session: false }), _shoppinglist2.default.shoppingListProductUpdate);

router.post('/supplierProductToProductRangeItem', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.supplierProductToProductRangeItem);
router.post('/checklist/getChecklistCombinationName', _passport2.default.authenticate('User', { session: false }), _checklist2.default.getChecklistCombinationName);
router.post('/checklist/checklistCombinationPause', _passport2.default.authenticate('User', { session: false }), _checklist2.default.checklistCombinationPause);
router.post('/checklist/resumeChecklistCombination', _passport2.default.authenticate('User', { session: false }), _checklist2.default.resumeChecklistCombination);
router.post('/checkedChecklistProduct', _passport2.default.authenticate('User', { session: false }), _productChecked2.default.checkedChecklistProduct);
router.post('/checklist/submitOrder', _passport2.default.authenticate('User', { session: false }), _checklist2.default.submitOrder);
router.post('/order/editOrder', _passport2.default.authenticate('User', { session: false }), _checklist2.default.editOrder);
router.post('/quickShop/productList', _passport2.default.authenticate('User', { session: false }), _quickOrder2.default.productList);
router.post('/order/allOrderProductListing', _passport2.default.authenticate('User', { session: false }), _checklist2.default.allOrderProductListing);
router.post('/order/orderProduct', _passport2.default.authenticate('User', { session: false }), _checklist2.default.orderProduct);
router.post('/checklistProductAndDetail', _passport2.default.authenticate('User', { session: false }), _checklist2.default.checklistProductAndDetail);
router.post('/order/remarkUpdateOrder', _passport2.default.authenticate('User', { session: false }), _checklist2.default.remarkUpdateOrder);
router.post('/order/sentOrder', _passport2.default.authenticate('User', { session: false }), _order2.default.sentOrder);
router.post('/order/deleteOrder', _passport2.default.authenticate('User', { session: false }), _order2.default.deleteOrder);
router.post('/flushShoppingList', _passport2.default.authenticate('User', { session: false }), _shoppinglist2.default.flushShoppingList);
router.post('/productPhoto', _passport2.default.authenticate('User', { session: false }), _product2.default.productPhoto);
module.exports = router;