const {User, Role, Permission, UserDetail} = require('../models/index')

class AdminController {
    static async home(req, res) {
        try {
            res.render('admin/home')
        } catch (error) {
            res.send(error)
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Role,
                        as: 'Roles',
                        include: {
                            model: Permission,
                            as: 'Permissions'
                        }
                    },
                    {
                        model: UserDetail
                    }
                ],
                order: [
                    [UserDetail, 'name', 'ASC']
                ]
            })

            res.render('admin/users', {users})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AdminController