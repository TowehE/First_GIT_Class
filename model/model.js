const mongoose = require("mongoose")

//create schema
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stack:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    score:{
        html:{
            type: Number
        },
    javaScript:{
        type: Number
    },
    css:{
        type: Number
    },
    node:{
        type: Number
    }

    }
},{timestamps:true}
)

const studentModel = mongoose.model("Student", studentSchema)


module.exports = studentModel