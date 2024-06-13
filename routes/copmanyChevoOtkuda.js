const Router = require("express").Router;
const router = new Router();
const companyController = require("../controllers/company-controller");
const employeesRouter = require('./employees')
const {body} = require('express-validator')

router.use('/employees', employeesRouter)
router.get("/:id", companyController.getOneCompany);
router.post('/create', companyController.createCompany)
router.patch('/update', companyController.updateCompany)
router.delete('/delete', companyController.deleteCompany)


module.exports = router;
