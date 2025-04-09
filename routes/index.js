const router = require('express').Router()
const routerSeller = require('./seller')
const routerAdmin = require('./admin')
const Controller = require('../controllers/controller')
const {isAuth, isAdmin, isSeller} = require('../helpers/helper')

router.get('/', Controller.home)

// Auth
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)
router.get('/logout', isAuth, (req, res) => {
    delete req.session.user
    res.redirect('/login')
})

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
router.get('/cart', Controller.getCart)

module.exports = router