const Router = require('express').Router
const router = new Router()
const EmployeesService = require('../services/employees-service')
// const userController = require('../controllers/user-controller')

router.get('/', EmployeesService.getAllEmployees)

module.exports = router