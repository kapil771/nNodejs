const express = require('express');
const isAuth = require('../middleware/is-auth');

// const path = require('path');
// const rootDir = require('../util/path');
const router = express.Router();
// const adminData = require('./admin.js');
const shopsController = require('../controllers/shop');

// //
router.get('/',shopsController.getIndex);

// //
router.get('/products',shopsController.getProducts);

// //
router.get('/products/:id',shopsController.getProduct);

// // //
router.post('/create-order', isAuth, shopsController.postOrder)

// // //
router.get('/orders', isAuth, shopsController.getOrders);

// // //
router.get('/cart', isAuth, shopsController.getCart);
 
// // //
router.post('/cart', isAuth, shopsController.postCart);

// // //
// // // router.get('/checkout',shopsController.getCheckout);

// // //
router.post('/cart-delete-item', isAuth, shopsController.deleteProductFromCart);


// module.exports = path.dirname(require.main.filename);
module.exports = router;