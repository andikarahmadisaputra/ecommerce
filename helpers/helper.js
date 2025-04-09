function isAuth(req, res, next) {
    if (!req.session.user) {
        req.session.flash = {error: ['Unauthorized access']}
        return res.redirect('/');
    }
    next();
}

function isAdmin(req, res, next) {
    console.log(req.session.user)
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

module.exports = {isAuth, isAdmin, isSeller, checkPermission}