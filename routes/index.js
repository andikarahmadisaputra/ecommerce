const router = require('express').Router()
const routerSeller = require('./seller')
const routerAdmin = require('./admin')
const Controller = require('../controllers/controller')
const {isAdmin, isSeller} = require('../helpers/helper')

router.get('/', Controller.home)

// Auth
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)

// Buyer harus sudah login
router.use(function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Please login first!')
        return res.redirect('/login')
    } else {
        next()
    }
})

router.use('/admin', isAdmin, routerAdmin)
router.use('/seller', isSeller, routerSeller)

router.get('/profile', Controller.getProfile)
router.get('/cart', Controller.getCart)

module.exports = router