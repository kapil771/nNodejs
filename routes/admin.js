const express = require('express');
const isAuth = require('../middleware/is-auth');
// const path = require('path');
// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');
const router = express.Router();

//
router.get('/add-product', isAuth, adminController.addProduct);

// //
router.get('/products',adminController.getProducts);

// //
router.post('/add-product', isAuth, adminController.addProductPost);

// //
router.get('/edit-product/:id', isAuth, adminController.editProduct);

router.post('/edit-product', isAuth, adminController.editProductPost);

router.post('/delete-product', isAuth, adminController.deleteProductPost);


module.exports = router;
// module.exports.products = products;