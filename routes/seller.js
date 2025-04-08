const router = require('express').Router()
const SellerController = require('../controllers/sellerController')

router.get('/', SellerController.home)

module.exports = router