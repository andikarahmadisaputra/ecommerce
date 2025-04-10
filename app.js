const express = require('express')
const session = require('express-session')
const router = require('./routes/index')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(session({
    secret: 'masandiganteng',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

// Middleware untuk pass flash message ke view
app.use((req, res, next) => {
    res.locals.success_msg = req.session.flash?.success
    res.locals.error_msg = req.session.flash?.error
    delete req.session.flash
    res.locals.user = req.session.user
    next()
})

// Body parser
app.use(express.urlencoded({extended: false}))

// Router
app.use('/', router)

app.listen(port, () => {
    console.log(`Ecommerce running on port ${port}`)
})