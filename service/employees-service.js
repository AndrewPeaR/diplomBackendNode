const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EmployeesService {
  async getOneEmployeer(employerId) {
    const employer = await prisma.employees.findUnique({
      where: {
        id: Number(employerId),
      },
      include: {
        employeesProfession: {
          select: {
            profession: true,
          },
        },
        employeesLevel: {
          select: {
            level: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
        employeesPortfolio: true,
      },
    });
    // console.log(employer)
    return employer;
  }

  async addEmployeesToCompany(employeerInfo) {
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
        employeesLevelId: parseInt(employeerInfo.employeesLevelId),
      },
    });
    return newEmployeer;
  }

  async updateEmployeer(employeerInfo) {
    const updatedEmployeer = await prisma.employees.update({
      where: {
        id: Number(employeerInfo.id),
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
        employeesLevelId: parseInt(employeerInfo.employeesLevelId),
      },
    });
    return updatedEmployeer;
  }

  async deleteEmployeer(employeerId) {
    const deletedEmployeer = await prisma.employees.delete({
      where: { id: Number(employeerId.id) },
    });
    return deletedEmployeer;
  }

  async getAllEmployees() {
    const employees = await prisma.employees.findMany({
      include: {
        employeesProfession: {
          select: {
            profession: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
      },
    });
    // console.log(employees);
    return employees;
  }

  async getFilteredEmployees(employeesProfession){
    const employees = await prisma.employees.findMany({
      where: {
          employeesProfession: {
              profession: {
                  contains: employeesProfession
              }
          }
      },
      include: {
          employeesProfession: {
              select: {
                  profession: true
              }
          },
          company: {
              select: {
                  name: true
              }
          }
      }
  })
  // console.log(employees)
  // res.render('employees.ejs', {employees: employees})
  return employees
  }
}

module.exports = new EmployeesService();
