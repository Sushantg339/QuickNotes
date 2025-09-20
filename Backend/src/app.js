const express = require('express')
const connectToDB = require('./db/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes') 
const noteRoutes = require('./routes/note.routes')
const cors = require('cors')

const app = express()
connectToDB()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));



app.use('/api/auth' , authRoutes)
app.use('/api/note', noteRoutes)

module.exports = app