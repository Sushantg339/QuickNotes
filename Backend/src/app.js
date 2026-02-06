require('dotenv').config()
const express = require('express')
const connectToDB = require('./db/db')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes') 
const noteRoutes = require('./routes/note.routes')
const cors = require('cors')
const path = require('path')
const app = express()
connectToDB()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
    origin: true, 
    credentials: true
}));



app.use('/api/auth' , authRoutes)
app.use('/api/note', noteRoutes)

app.use(express.static(path.join(__dirname , "../dist")))

app.use("/*splat" , (req,res)=>{
    res.sendFile(path.join(__dirname , "../dist" , "index.html"))
})

module.exports = app