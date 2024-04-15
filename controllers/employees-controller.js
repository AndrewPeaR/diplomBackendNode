const employeesService = require('../service/employees-service')
// const { validationResult } = require('express-validator')
const CustomError = require('../exceptions/customError')

class EmployeesController {
    async getOneCompanyEmployees(req, res, next){
        try{
            const companyId = req.params.id
            const companies = await employeesService.getOneCompanyEmployees(companyId)
            res.json(companies)
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