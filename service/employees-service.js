const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployeesService {
  async getOneCompanyEmployees(companyId) {
    const employees = await prisma.employees.findMany({
      where: {
        companyId: Number(companyId),
      },
      include: {
        employeesLevel: {
          select: {
            level: true,
          },
        },
        employeesProfession: {
          select: {
            profession: true,
          },
        },
        employeesPortfolio: {
          select: {
            title: true,
          },
        },
      },
    });
    return employees
  }

  async addEmployeesToCompany(employeerInfo){
    const newEmployeer = await prisma.employees.create({ 
      data: {
        firstname: employeerInfo.firstname,
        lastname: employeerInfo.lastname,
        description: employeerInfo.description,
        contacts: employeerInfo.contacts,
        dateOfBirth: new Date(employeerInfo.dateOfBirth),
        imageUrl: employeerInfo.imageUrl,
        isFree: employeerInfo.isFree,
        companyId: parseInt(employeerInfo.companyId),
        employeesProfessionId: parseInt(employeerInfo.employeesProfessionId),
        employeesLevelId: parseInt(employeerInfo.employeesLevelId)
      }
    })
    return newEmployeer
  }

  async updateEmployeer(employeerInfo){
    const updatedEmployeer = await prisma.employees.update({
      where: {
        id: Number(employeerInfo.id)
      },
      data: {
        firstname: employeerInfo.firstname,
        lastname: employeerInfo.lastname,
        description: employeerInfo.description,
        contacts: employeerInfo.contacts,
        dateOfBirth: new Date(employeerInfo.dateOfBirth),
        imageUrl: employeerInfo.imageUrl,
        isFree: employeerInfo.isFree,
        companyId: parseInt(employeerInfo.companyId),
        employeesProfessionId: parseInt(employeerInfo.employeesProfessionId),
        employeesLevelId: parseInt(employeerInfo.employeesLevelId)
      }
    })
    return updatedEmployeer
  }

  async deleteEmployeer(employeerId){
    const deletedEmployeer = await prisma.employees.delete({where: {id: Number(employeerId.id)} })
    return deletedEmployeer
  }
}

module.exports = new EmployeesService();