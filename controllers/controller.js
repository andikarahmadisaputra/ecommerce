const {User, Category} = require('../models/index')

class Controller {
    static async home(req, res) {
        try {
            const categories = await Category.findAll()

            res.render('home', {categories})
        } catch (error) {
            res.send(error)
        }
    }

    static async getRegister(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            const {email, password, confirmPassword} = req.body

            let message = []

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
                message.push('Email not valid')
            }

            if (password.length < 8 || confirmPassword.length < 8) {
                message.push('Password and confirm password must be at least 8 characters')
            }

            if (password !== confirmPassword) {
                message.push('Password and confirm password must match')
            }

            if (message.length) {
                req.flash('error', message)
                res.redirect('/register')
            }

            await User.create({email, password})

            req.flash('success', 'User registered successfully')
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            r
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async getCart(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async getProfile(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller