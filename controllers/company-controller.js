const companyService = require('../service/company-service')
// const { validationResult } = require('express-validator')
const CustomError = require('../exceptions/customError')

class CompanyController {
    async getOneCompany(req, res, next){
        try{
            const companyId = req.params.id
            const companies = await companyService.getOneCompany(companyId)
            res.json(companies)
        } catch(e){
            next(e)
        }
    }

    async createCompany(req, res, next){
        try{
            const createdCompany = await companyService.createCompany(req.body)
            res.json(createdCompany)
        }catch(e){
            next(e)
        }
    }

    async updateCompany(req, res, next){
        try{
            const updatedCompany = await companyService.updateCompany(req.body)
            res.json(updatedCompany)
        }catch(e){
            next(e)
        }
    }

    async deleteCompany(req, res, next){
        try{
            const deletedCompany = await companyService.deleteCompany(req.body)
            res.json(deletedCompany)
        }catch(e){
            next(e)
        }
    }
}

module.exports = new CompanyController()