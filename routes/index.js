const router = require('express').Router()
const routerSeller = require('./seller')
const routerAdmin = require('./admin')
const Controller = require('../controllers/controller')
const {isAuth, isNotAuth, isAdmin, isSeller} = require('../helpers/helper')

router.get('/', Controller.home)
router.get('/add-to-cart/:id', Controller.addToCart)
router.get('/cart', Controller.getCart)

// Auth
router.get('/register', isNotAuth, Controller.getRegister)
router.post('/register', isNotAuth, Controller.postRegister)
router.get('/login', isNotAuth, Controller.getLogin)
router.post('/login', isNotAuth, Controller.postLogin)
router.get('/logout', isAuth, Controller.getLogout)

router.get('/favicon.ico', (req, res) => res.status(204).end())

// Buyer harus sudah login
router.use(function (req, res, next) {
    console.log('Checking auth middleware at:', req.originalUrl)
    if (!req.session.user) {
        req.session.flash = {error: ['Please login first!']}
        res.redirect('/login')
    } else {
        next()
    }
})

router.use('/admin', isAdmin, routerAdmin)
router.use('/seller', isSeller, routerSeller)

router.get('/profile', Controller.getProfile)

module.exports = router