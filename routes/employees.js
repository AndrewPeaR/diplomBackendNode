const Router = require("express").Router;
const router = new Router();
const employeesController = require("../controllers/employees-controller");

router.get('/', employeesController.getAllEmployees)
router.post('/', employeesController.getFilteredEmployees)
router.get('/:id', employeesController.getOneEmployeer)
router.post('/add', employeesController.addEmployeesToCompany)
router.delete('/delete', employeesController.deleteEmployeer)
router.patch('/update', employeesController.updateEmployeer)

module.exports = router;