const {User, Role, Permission, UserDetail} = require('../models/index')
const csv = require('csv-express')

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

    static async getUserDetail(req, res) {
        try {
            const {id} = req.params
            const user = await User.findOne({
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
                where: {
                    id
                }
            })

            res.render('admin/userDetail', {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddUser(req, res) {
        try {
            res.render('getAddUser')
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddUser(req, res) {
        try {
            const {id} = req.params
            const {name, phone, gender, birthdate} = req.body

            await UserDetail.create({
                name,
                phone,
                gender,
                birthDate: birthdate,
                UserId: id
            })

            req.session.flash = {success: 'User information created successfully'}
            res.redirect(`/admin/users/${id}/detail`)
        } catch (error) {
            res.send(error)
        }
    }

    static async getEditUser(req, res) {
        try {
            const {id} = req.params

            const user = await User.findOne({
                include: [
                    {
                        model: Role,
                        as: 'Roles'
                    },
                    {
                        model: UserDetail
                    }
                ],
                where: {
                    id
                }
            })

            res.render('admin/editUser', {user})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditUser(req, res) {
        try {
            const {id} = req.params
            const {name, phone, gender, birthdate} = req.body

            await UserDetail.update({
                name,
                phone,
                gender,
                birthDate: birthdate
            }, {
                where: {
                    UserId: id
                }
            })

            req.session.flash = {success: 'User updated successful'}
            res.redirect(`/admin/users/${id}/detail`)
        } catch (error) {
            res.send(error)
        }
    }

    static async getDeleteUser(req, res) {
        try {
            const {id} = req.params

            const user = await UserDetail.findOne({
                where: {
                    UserId: id
                }
            })
            await user.destroy()

            req.session.flash = {success: `User information about ${user.name} deleted successfully.`}
            res.redirect(`/admin/users/${id}/detail`)
        } catch (error) {
            res.send(error)
        }
    }

    static async getChangeRole(req, res) {
        try {
            const {id} = req.params

            const roles = await Role.findAll()
            const user = await User.findByPk(id, {
                include: {
                    model: Role,
                    as: 'Roles'
                }
            })

            res.render('getChangeRole', {roles, user})
        } catch (error) {
            res.send(error)
        }
    }

    static async postChangeRole(req, res) {
        try {
            const {id} = req.params
            const {roleId} = req.body

            const user = await User.findByPk(id)
            const role = await Role.findByPk(roleId)
            user.addRole(role)

            req.session.flash = {success: `User role changed successfully.`}
            res.redirect(`/admin/users/${id}/detail`)
        } catch (error) {
            res.send(error)
        }
    }

    static async getExportUserCSV(req, res) {
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
                    ['id', 'ASC']
                ]
            })

            const formattedData = users.map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    status: user.status,
                    name: user.UserDetail && user.UserDetail.name ? user.UserDetail.name : '-',
                    gender: user.UserDetail && user.UserDetail.gender ? user.UserDetail.gender : '-',
                    birth_date: user.UserDetail && user.UserDetail.birthDate ? user.UserDetail.formatBirthDate : '-',
                    phone: user.UserDetail && user.UserDetail.phone ? user.UserDetail.phone : '-',
                    roles: user.Roles ? user.Roles.map(el => el.name).join(', ') : '-'
                }
            })

            res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
            res.csv(formattedData, true)
        } catch (error) {
            res.send(error)
        }
    }

    static async getRoles(req, res) {
        try {
            const roles = await Role.findAll()

            res.render('admin/roles', {roles})
        } catch (error) {
            res.send(error)
        }
    }

    static async getRolePermission(req, res) {
        try {
            const {id} = req.params
            const role = await Role.findOne({
                include: [
                    {
                        model: Permission,
                        as: 'Permissions'
                    },
                    {
                        model: User,
                        as: 'Users',
                        include: [
                            {
                                model: UserDetail
                            },
                            {
                                model: Role,
                                as: 'Roles'
                            }
                        ]
                    }
                ],
                where: {
                    id
                }
            })

            res.render('admin/rolePermission', {role})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AdminController