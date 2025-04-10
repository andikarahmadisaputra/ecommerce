const {User, Category, Role, Permission} = require('../models/index')
const bcrypt = require('bcryptjs')

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
                message.push('Invalid email format. Please enter a valid email address.')
            } else {
                const user = await User.findOne({
                    where: { email }
                  })
    
                if (user) {
                    message.push('Email is already registered. Please use a different email or log in instead.')
                }
            }

            if (password.length < 8 || confirmPassword.length < 8) {
                message.push('Password and confirm password must be at least 8 characters.')
            }

            if (password !== confirmPassword) {
                message.push('Password and confirm password must match.')
            }

            if (message.length) {
                req.session.flash = {error: message}
                res.redirect('/register')
            }

            await User.create({email, password})

            req.session.flash = {success: 'User registered successfully' }
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            res.render('login')
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const {email, password} = req.body

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
                req.session.flash = {error: [ 'Invalid email format. Please enter a valid email address.' ]}
                return res.redirect('/login')
            }

            const user = await User.findOne({
                where: {
                    email
                },
                include: {
                    model: Role,
                    as: 'Roles',
                    through: { attributes: [] },
                    include: {
                        model: Permission,
                        as: 'Permissions',
                        through: { attributes: [] }
                    }
                }
            })
            
            if (!user) {
                req.session.flash = {error: [ 'Email is not registered. Please check your email or sign up.' ]}
                return res.redirect('/login')
            }
            
            if (bcrypt.compareSync(password, user.password) === false) {
                req.session.flash = {error: [ 'Incorrect password. Please try again.']}
                return res.redirect('/login')
            }

            req.session.user = { //ngambil untuk id email 
                id: user.id,
                email: user.email,
                roles: user.Roles?.flatMap(el => el.name || []),
                permissions: user.Roles?.flatMap(role => role.Permissions?.map(el => el.name) || [])
            }
              
            req.session.flash = {success: 'Login successful'}
            res.redirect('/');
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