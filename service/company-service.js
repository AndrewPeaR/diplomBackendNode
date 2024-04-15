const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CompanyService {
    async getOneCompany(companyId){
        const companies = await prisma.company.findUnique({where: {id: Number(companyId)} })
        return companies
    }

    async createCompany(companyInfo){
        const createdCompany = await prisma.company.create({
            data: {
                name: companyInfo.name,
                description: companyInfo.description,
                imageUrl: companyInfo.imageUrl,
                address: companyInfo.address,
                created_at: new Date(companyInfo.created_at),
                managerId: Number(companyInfo.managerId)
            }
        })
        return createdCompany
    }

    async updateCompany(companyInfo){
        const updatedCompany = await prisma.company.update({
            where: {
                id: Number(companyInfo.id)
            },
            data: {
                name: companyInfo.name,
                description: companyInfo.description,
                imageUrl: companyInfo.imageUrl,
                address: companyInfo.address,
                created_at: new Date(companyInfo.created_at),
                managerId: Number(companyInfo.managerId)
            }
        })
        return updatedCompany
    }

    async deleteCompany(companyInfo){
        const deletedCompany = await prisma.company.delete({
            where: {
                id: Number(companyInfo.id)
            }
        })

        return deletedCompany
    }
}

module.exports = new CompanyService()