const mongoose = require('mongoose')

const connectToDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('connected to db')
    }).catch((error)=>{
        console.log('error connecting to db' , error)
    })
}

module.exports = connectToDB