const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String
    }
} , {timestamps :true})

const noteModel = mongoose.model('Note' , noteSchema)

module.exports = noteModel