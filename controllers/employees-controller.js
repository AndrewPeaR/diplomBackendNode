const employeesService = require('../service/employees-service')
// const { validationResult } = require('express-validator')
const CustomError = require('../exceptions/customError')

class EmployeesController {
    async getAllEmployees(req, res, next){
        try{
            const employees = await employeesService.getAllEmployees()
            res.json(employees);
            // res.render("employees.ejs", {employees: employees});
        }catch(e){
            next(e)
        }
    }

    async getFilteredEmployees(req, res, next){
        try{
            const employeesProfession = Object.keys(req.body)[0]
            // console.log()
            const filteredEmployees = await employeesService.getFilteredEmployees(employeesProfession)
            res.json(filteredEmployees)
            // res.render('employees.ejs', {employees: filteredEmployees})
        }catch(e){
            next(e)
        }
    }
    
    async getOneEmployeer(req, res, next){
        try{
            const employerId = req.params.id
            const employer = await employeesService.getOneEmployeer(employerId)
            
            // res.render('person.ejs', {employer: employer})
            res.json(employer)
        } catch(e){
            next(e)
        }
    }

    async addEmployeesToCompany(req, res, next){
        try{
            const newEmployeer = await employeesService.addEmployeesToCompany(req.body)
            res.json(newEmployeer)
        } catch(e){
            next(e)
        }
    }

    async updateEmployeer(req, res, next){
        try{
            const updatedEmployeer = await employeesService.updateEmployeer(req.body)
            res.json(updatedEmployeer)
        } catch(e){
            next(e)
        }
    }
    
    async deleteEmployeer(req, res, next){
        try{
            const deletedEmployeer = await employeesService.deleteEmployeer(req.body)
            res.json(deletedEmployeer)
        } catch(e){
            next(e)
        }
    }


}

module.exports = new EmployeesController()