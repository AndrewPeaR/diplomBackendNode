// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function get(req){
    // console.log(req)
    const professionEmployees = req.body.profession
    const levelEmployees = req.body.level
    // const portfolioEmployees = req.body.Portfolio
    const employees = await prisma.employees.findMany({
        where: {
            employeesLevel:{
                level: levelEmployees
            },
            employeesProfession: {
                profession: professionEmployees
            }
        },
        include: {
            employeesLevel: {
                select: {
                    level: true
                }
            },
            employeesProfession: {
                select: {
                    profession: true
                }
            },
            employeesPortfolio: {
                select: {
                    title: true
                }
            }
        }
    })
    return employees
}

module.exports = get