const Router = require('express').Router
const router = new Router()
// const EmployeesService = require('../services/employees-service')
const userRouter = require('./user')
const companyRouter = require('./company')
// const userController = require('../controllers/user-controller')

router.use('/user', userRouter)
router.use('/company', companyRouter)


// router.get('/', EmployeesService.getAllEmployees)
// router.post('/', EmployeesService.createEmployees)

module.exports = router