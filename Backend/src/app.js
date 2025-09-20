const express = require('express')
const connectToDB = require('./db/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes') 



const app = express()
connectToDB()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())



app.use('/api/auth' , authRoutes)

module.exports = app