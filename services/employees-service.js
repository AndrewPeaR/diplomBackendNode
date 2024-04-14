const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployeesService {
  async getAllEmployees(req, res) {
    const professionEmployees = req.body.profession;
    const levelEmployees = req.body.level;
    const employees = await prisma.employees.findMany({
      // where: {
      //   employeesLevel: {
      //     level: levelEmployees,
      //   },
      //   employeesProfession: {
      //     profession: professionEmployees,
      //   },
      // },
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
    res.json(employees)
  }

  async createEmployees(req, res){
    const newEmployeer = await prisma.employees.create({ 
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        companyId: parseInt(req.body.companyId),
        employeesProfessionId: parseInt(req.body.employeesProfessionId),
        employeesLevelId: parseInt(req.body.employeesLevelId)
      }
    })

    res.json(newEmployeer)
  }
}

module.exports = new EmployeesService();