class AdminController {
    static async home(req, res) {
        try {
            res.render('/admin/home')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AdminController