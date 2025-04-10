const multer = require('multer');
const path = require('path');

function isAuth(req, res, next) {
    if (!req.session.user) {
        req.session.flash = {error: ['Unauthorized access']}
        return res.redirect('/');
    }
    next();
}

function isNotAuth(req, res, next) {
    if (req.session.user) {
        req.session.flash = {error: ['You are already logged in. Please log out first to switch accounts.']}
        return res.redirect('/');
    }
    next();
}

function isAdmin(req, res, next) {
    if (!req.session.user.roles.includes('Admin')) {
        req.session.flash = {error: ['Unauthorized access']}
        return res.redirect('/');
    }
    next();
}

function isSeller(req, res, next) {
    if (!req.session.user.roles.includes('Seller')) {
        req.session.flash = {error: ['Unauthorized access']}
        return res.redirect('/');
    }
    next();
}

function checkPermission(permission) {
    return function (req, res, next) {
        const user = req.session.user
    
        if (!req.session.user || !req.session.user.permissions) {
            req.session.flash = {error: ['Unauthorized access']}
            return res.redirect('/');
        }
    
        if (!user.permissions.includes(permission)) {
            req.session.flash = {error: ['Unauthorized access']}
            return res.redirect('/');
        }
        next()
    }
}

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', {
        types: 'currency',
        currency: 'IDR'
    }).format(price)
}

function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {isAuth, isNotAuth, isAdmin, isSeller, checkPermission, formatRupiah, formatDate, upload}