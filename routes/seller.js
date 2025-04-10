// routes/seller.js
const express = require('express')
const SellerController = require('../controllers/sellerController')
const { isSeller } = require('../helpers/helper')

const router = express.Router()

router.get('/', isSeller, SellerController.getHome)
router.get('/add', isSeller, SellerController.getAddProduct)
router.post('/add', isSeller, SellerController.postAddProduct)
router.get('/edit/:id', isSeller, SellerController.getEditProduct)
router.post('/edit/:id', isSeller, SellerController.postEditProduct)
router.get('/delete/:id', isSeller, SellerController.getDeleteProduct)

module.exports = router;