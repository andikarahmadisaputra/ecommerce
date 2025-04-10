const express = require('express');
const SellerController = require('../controllers/sellerController');
const { isSeller } = require('../helpers/helper');

const router = express.Router();

router.get('/', isSeller, SellerController.getHome);                // Show seller's product list
router.get('/add', isSeller, SellerController.getAddProduct);       // Show add product form
router.post('/add', isSeller, SellerController.postAddProduct);     // Handle add product
router.get('/edit/:id', isSeller, SellerController.getEditProduct); // Show edit product form
router.post('/edit/:id', isSeller, SellerController.postEditProduct); // Handle edit product
router.get('/delete/:id', isSeller, SellerController.getDeleteProduct); // Handle delete product

module.exports = router;