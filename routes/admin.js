const express = require('express');
// const path = require('path');
// const rootDir = require('../util/path');
const adminController = require('../controllers/admin');
const router = express.Router();

//
router.get('/add-product',adminController.addProduct);

// //
router.get('/products',adminController.getProducts);

// //
router.post('/add-product',adminController.addProductPost);

// //
router.get('/edit-product/:id',adminController.editProduct);

router.post('/edit-product',adminController.editProductPost);

router.post('/delete-product',adminController.deleteProductPost);


module.exports = router;
// module.exports.products = products;