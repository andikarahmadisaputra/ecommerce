const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.home)
router.get('/users', AdminController.getUsers)
// router.get('/users/:id/detail', AdminController.getUserDetail)
// router.get('/users/:id/edit', AdminController.getEditUser)
// router.post('/users/:id/edit', AdminController.postEditUser)

module.exports = router