const express = require('express');
const SellerController = require('../controllers/sellerController');
const {upload}  = require('../helpers/helper')

const router = express.Router();

router.get('/', SellerController.getHome);                
router.get('/add', SellerController.getAddProduct);       
router.post('/add', upload.single('imgUrl'), SellerController.postAddProduct);     
router.get('/edit/:id', SellerController.getEditProduct); 
router.post('/edit/:id', SellerController.postEditProduct); 
router.get('/delete/:id', SellerController.getDeleteProduct); 

module.exports = router;