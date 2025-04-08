const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
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
app.use(flash())

// Middleware untuk pass flash message ke view
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success')
    res.locals.error_msg = req.flash('error')
    next()
})

// Body parser
app.use(express.urlencoded({extended: false}))

// Router
app.use('/', router)

app.listen(port, () => {
    console.log(`Ecommerce running on port ${port}`)
})