// controllers/sellerController.js
const { Product, Category, ProductCategory } = require('../models');

class SellerController {
    static async getHome(req, res) {
        try {
            const products = await Product.findAll({
                where: { UserId: req.session.user.id },
                include: Category
            });
            res.render('seller/home', { products });
        } catch (error) {
            req.session.flash = { error: [error.message] };
            res.redirect('/');
        }
    }

    static async getAddProduct(req, res) {
        try {
            const categories = await Category.findAll();
            res.render('seller/addProduct', { categories });
        } catch (error) {
            req.session.flash = { error: [error.message] };
            res.redirect('/seller');
        }
    }

    static async postAddProduct(req, res) {
    try {
        const { name, price, stock, categoryIds } = req.body;
        console.log('req.body:', req.body); // Debug
        const product = await Product.create({
            name,
            price: Number(price) || 0, 
            stock: Number(stock) || 0, 
            UserId: req.session.user.id
        });
        if (categoryIds) {
            const productCategories = categoryIds.map(id => ({
                ProductId: product.id,
                CategoryId: id
            }));
            await ProductCategory.bulkCreate(productCategories);
        }
        req.session.flash = { success: 'Product added successfully!' };
        res.redirect('/seller');
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            req.session.flash = { error: error.errors.map(err => err.message) };
        } else {
            req.session.flash = { error: [error.message] };
        }
        res.redirect('/seller/add');
    }
}

    static async getEditProduct(req, res) {
        try {
            const [product, categories] = await Promise.all([
                Product.findByPk(req.params.id, { include: Category }),
                Category.findAll()
            ]);
            if (!product || product.UserId !== req.session.user.id) {
                throw new Error('Product not found');
            }
            res.render('seller/editProduct', { product, categories });
        } catch (error) {
            req.session.flash = { error: [error.message] };
            res.redirect('/seller');
        }
    }

    static async postEditProduct(req, res) {
        try {
            const { name, price, stock, categoryIds } = req.body;
            const product = await Product.findByPk(req.params.id);
            if (!product || product.UserId !== req.session.user.id) {
                throw new Error('Product not found');
            }
            await product.update({ name, price, stock });
            await ProductCategory.destroy({ where: { ProductId: product.id } });
            if (categoryIds) {
                const productCategories = categoryIds.map(id => ({
                    ProductId: product.id,
                    CategoryId: id
                }));
                await ProductCategory.bulkCreate(productCategories);
            }
            req.session.flash = { success: 'Product updated successfully!' };
            res.redirect('/seller');
        } catch (error) {
            req.session.flash = { error: [error.message] };
            res.redirect(`/seller/edit/${req.params.id}`);
        }
    }

    static async getDeleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product || product.UserId !== req.session.user.id) {
                throw new Error('Product not found');
            }
            await product.destroy();
            req.session.flash = { success: 'Product deleted successfully!' };
            res.redirect('/seller');
        } catch (error) {
            req.session.flash = { error: [error.message] };
            res.redirect('/seller');
        }
    }
}

module.exports = SellerController;