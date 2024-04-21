// import express from 'express'
// import get from './index.js'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./routes/routes.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')
const path = require('path')

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001
const app = new express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api/v1', router)

app.get('/', async (req, res) => {
    const employees = await prisma.employees.findMany({
        where: {
            isFree: true
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
    res.render('index.ejs', {employees: employees})
})

app.get('/employees', async (req, res) => {
    const employees = await prisma.employees.findMany({
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
    console.log(employees)
    res.render('employees.ejs', {employees: employees})
})

app.post('/employees', async (req, res) => {
    const employeesProfession = req.body.employeesProfession
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
    console.log(employees)
    res.render('employees.ejs', {employees: employees})
})

app.get('/company/:id', async (req, res) => {
    const companyId = req.params.id
    const company = await prisma.company.findUnique({
        where: {
            id: Number(companyId)
        }
    })

    const companyEmployees = await prisma.employees.findMany({
        where: {
            companyId: Number(companyId)
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
    console.log(company, '\n', companyEmployees)
    res.render('company.ejs', {company: company, companyEmployees: companyEmployees})
})

app.get('/employer/:id', async (req, res) => {
    const employerId = req.params.id
    const employer = await prisma.employees.findUnique({
        where: {
            id: Number(employerId)
        },
        include: {
            employeesProfession: {
                select: {
                    profession: true
                }
            },
            employeesLevel: {
                select: {
                    level: true
                }
            },
            company: {
                select: {
                    name: true
                }
            },
            employeesPortfolio: true
        }
    })
    console.log(employer)
    res.render('person.ejs', {employer: employer})
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`>>> Server started on: ${PORT}`)
})