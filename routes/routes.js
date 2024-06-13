const Router = require('express').Router
const router = new Router()
const companyRouter = require('./company')
const employeesRouter = require('./employees')
const authRouter = require('./auth')

router.use('/auth', authRouter)
router.use('/company', companyRouter)
router.use('/employees', employeesRouter)

module.exports = router