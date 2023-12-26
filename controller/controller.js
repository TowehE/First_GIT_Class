const studentModel = require("../model/model")

const bcrypt = require("bcrypt");
const { response } = require("express");

const jwt = require("jsonwebtoken")



exports.signUp = async(req,res)=>{
    try{
        const {fullName, email, password, stack, role} = req.body;

        //make sure all field are provided
        if(!fullName || !email || !password || !stack || !role){
            return res.status(400).json({
                message: "Please provide all necessary information"
            })
        }
        
        //check if the user is already existing in the database
        const checkEmail = await studentModel.findOne({email:email.toLowerCase()})
        if(checkEmail){
            return res.status(409).json({
                message:"email already exists"
            })
        }

        //encrypt the password
        const salt = bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);

        //use the role to determine an admin
        let admin ;

        if(role ==="teacher"){
            admin = true;
        }else{
            admin = false;
        }


        //craeate a new user 
    const user = new studentModel({
        fullName,
        email,
        password: hashPassword,
        stack,
        role, 
        isAdmin: admin
    })

    //make sure to save the user details
    await user.save()

    res.status(201).json({
        message: " student created successfully",
        data: user
    })


    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}

//funtion to login
exports. login = async(req,res)=>{
    try{

        //get the user login details
        const {email,password}= req.body;

        //make sure both fiels are provided
        if(!email || !password){
            return res.status(400).json({
                message: "please provide your email and password"
            })
        }
     //find the user in the database
     const user= await studentModel.findOne({ email:email.toLowerCase()});

     //check if user is not exisiting in the darabase 
     if(!user){
        return res.status(404).json({
            message :"user does not exist"
        })
     }

//check for user password
    const checkPassword = bcrypt.compareSync(password, user.password)
     if(!checkPassword){
        return res.status(400).json({
            mesage: "Password is not correct",
        })
     }

    const token = jwt.sign({
    userId: user._id,
    email: user.email,
    isAdmin: user.isAdmin
    },process.env.secret,{expiresIn: "2d"})

res.status(200).json({
    message: "login successfully",
    token
})

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}
//get one
exports.getOne = async (req ,res) =>{
    try{
        const user = req.user.userId;
       
 const  aUser= await studentModel.findById(user);
 if(!aUser){
   return  res.status(404).json({
        message: "User not found",
    })
 }else{
    return res.status(200).json({
        message:"This is your scores",
        data: aUser
    })
 }


    }catch (err) {
        res.status(500).json({
            message: "internal server error: " +err.message
        })
}}


//Get all user in the database
exports. getAllUsers = async (req,res) =>{
    try{
        const users = await studentModel.find().sort({createdAt: -1})
        if(users.length ==0){
            return res.status(200).json({
                message:`No user in the database`
            })
        }
        //return a success message
        
        res.status(200).json({
            message: `There are ${users.length} in this database`,
            users
        })


    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}


//to update an admin
exports.scoreUpdate = async (req,res) => {
    try{
        //get the student id to be updated
        const id = req.params.id


    //get the score from body
    const {html, node, javaScript, css} = req.body.score
        //find the student with rhe id
        const student = await studentModel.findById(id);

        //(check if the student is found
        if(!student) {
            return res.status(404).json({
                message: `Student with Id:${id} not found`,
            })
        }

        //update the student's score sheet
        const data= {
            score:{
                html,
                node,
                javaScript,
                css
            }
        }


        //update the database with the entered sheet
        const updatedData = await studentModel.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )

        // return a response
        return res.status(200).json({
            message: "Score updated successfully",
            data: updatedData

        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
}
}

//sign out function
exports.signOut = async(req,res) =>{
    try{
        //get the user's id from the request user payload
const {userId} = req.user

        const hasAuthorization = req.headers.authorization
    if(!hasAuthorization){
        return res.status(401).json({
            message: 'Invalid authorization',
        })
    }


const token = hasAuthorization.split(' ')[1]

const user = await studentModel.findById(userId)

//check if theuser is not exisiting
if(!hasAuthorization){
    return res.status(401).json({
        message:"User not found",
    })
}

//Blacklist the token
 user.blacklist.push(token)

 await user.save()

 //return a respponse
 res.status(200).json({
    message:"User logged out successfully"
 })


    }catch(error){
        res.status(404).json({
            message: error.message
        })
}
}