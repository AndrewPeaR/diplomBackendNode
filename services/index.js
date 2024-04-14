// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function get(){
    const employees = await prisma.employees.findMany({
        where: {
            firstname: { contains: 'maksim' }
            // include: {
            //     employeesPortfolio: {
            //         title: { contains: 'mobileprog' }
            //     }
            // }
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
    // employees.then(result => {
    //     return result
    // })
    return employees
}

module.exports = get