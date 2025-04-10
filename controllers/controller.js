const {Category, Permission, Product, Role, User, UserDetail} = require('../models/index')
const {formatRupiah} = require('../helpers/helper')
const bcrypt = require('bcryptjs')
const {Op} = require('sequelize')

class Controller {
    static async home(req, res) {
        try {
            const {category, search} = req.query

            const categories = await Category.findAllCategory()

            let options = {
                include: [{
                    model: User,
                    include: {
                        model: UserDetail
                    }
                }]
            }

            if (category) {
                options.include.push({
                    model: Category,
                    where: {
                        id: category
                    }
                })
            }

            if (search) {
                options.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            const products = await Product.findAll(options)

            res.render('home', {categories, products, formatRupiah})
        } catch (error) {
            res.send(error)
        }
    }

    static async getRegister(req, res) {
        try {
            const categories = await Category.findAll()

            res.render('register', {categories})
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
            const categories = await Category.findAll()

            res.render('login', {categories})
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

            if (req.session.user.roles.includes('Admin')) {
                res.redirect('/admin')
            } else if (req.session.user.roles.includes('Seller')) {
                res.redirect('/seller')
            } else {
                res.redirect('/');
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogout(req, res) {
        try {
            delete req.session.user
            req.session.flash = {success: 'Logout successful'}
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

    static async addToCart(req, res) {
        try {
            const {id} = req.params

            const product = await Product.findByPk(id)

            if (!product) {
                req.session.flash = {error: ['Product not found!']}
                return res.redirect('/')
            }

            if (!req.session.cart) req.session.cart = []

            const cart = req.session.cart
            const index = cart.findIndex(i => i.id == id)

            if (index !== -1) {
                cart[index].qty += 1
                cart[index].subtotal = cart[index].qty * cart[index].price
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    qty: 1,
                    subtotal: product.price
                })
            }

            req.session.cart = cart

            req.session.flash = {success: `${product.name} successfully added to cart`}
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static async getCart(req, res) {
        try {
            const categories = await Category.findAllCategory()
            const cart = req.session.cart || []

            res.render('cart', {cart, categories})
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