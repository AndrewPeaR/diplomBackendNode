// import express from 'express'
// import get from './index.js'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes.js')
const errorMiddleware = require('./middlewares/errorMiddleware.js')
const path = requiure('path')

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

app.use('/api/v1', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`>>> Server started on: ${PORT}`)
})