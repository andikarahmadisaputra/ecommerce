class SellerController {
    static async home(req, res) {
        try {
            res.render('/seller/home')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = SellerController