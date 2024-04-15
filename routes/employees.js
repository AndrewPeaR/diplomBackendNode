const Router = require("express").Router;
const router = new Router();
const employeesController = require("../controllers/employees-controller");

router.get('/:id', employeesController.getOneCompanyEmployees)
router.post('/add', employeesController.addEmployeesToCompany)
router.delete('/delete', employeesController.deleteEmployeer)
router.patch('/update', employeesController.updateEmployeer)

module.exports = router;