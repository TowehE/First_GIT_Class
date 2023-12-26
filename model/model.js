const mongoose = require("mongoose")

//create schema
const studentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    stack:{
        type:String,
        enum: ["backend", "frontend"],
        required:true
    },
    isAdmin:{
        type:Boolean,
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ["teacher", "student"],
        required: true
    },
    password:{
        type:String,
        required:true
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

    },
    blacklist:{
        type: Array,
        default:[],
    }
},{timestamps:true}
)

const studentModel = mongoose.model("Student", studentSchema)


module.exports = studentModel