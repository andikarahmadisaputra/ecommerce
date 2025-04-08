function isAuth() {
    return function (req, res, next) {
        if (!req.session.user) {
            req.flash('error', 'Unauthorized access');
            return res.redirect('/');
        }
        next();
    }
}

function isAdmin(req, res, next) {
    if (req.session.user.role !== 'admin') {
        req.flash('error', 'Unauthorized access');
        return res.redirect('/');
    }
    next();
}

function isSeller(req, res, next) {
    if (req.session.user.role !== 'seller') {
        req.flash('error', 'Unauthorized access');
        return res.redirect('/');
    }
    next();
}

function checkPermission(permission) {
    return function (req, res, next) {
        const user = req.session.user
    
        if (!req.session.user || !req.session.user.permissions) {
            req.flash('error', 'Unauthorized access');
            return res.redirect('/');
        }
    
        if (!user.permissions.includes(permission)) {
            req.flash('error', 'Unauthorized access');
            return res.redirect('/');
        }
        next()
    }
}

module.exports = {isAuth, isAdmin, isSeller, checkPermission}