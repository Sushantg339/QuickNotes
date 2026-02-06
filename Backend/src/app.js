require('dotenv').config()
const express = require('express')
const connectToDB = require('./db/db')
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes') 
const noteRoutes = require('./routes/note.routes')
const app = express()

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '../frontend/dist')))

connectToDB()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())



app.use('/api/auth' , authRoutes)
app.use('/api/note', noteRoutes)

app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/dist', 'index.html'))
})

module.exports = app