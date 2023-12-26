const studentModel = require('../model/model')
require("dotenv").config()

const jwt = require("jsonwebtoken")

const authenticate = async (req,res,next) => {
    try{
        
    const hasAuthorization = req.headers.authorization
    if(!hasAuthorization){
        return res.status(401).json({
            message: 'Invalid authorization',
        })
    }


const token = hasAuthorization.split(' ')[1]
if(!token){
    return res.status(404).json({
        message:"Invalid token",
    })
}

const decodeToken = jwt.verify(token,process.env.secret);
if(!decodeToken){
    return res.status(401).json({
        message:"Not authorized ",
    })
}

const user = await studentModel.findById(decodeToken.userId)
if(!user){
    return res.status(401).json({
        message:"Authorization failed: user not found"
    })
}

if(user.blacklist.includes(token)){
    return res.status(401).json({
        message:"Authorization failed: Please Login to continue"
    })
}


req.user = decodeToken

next()

    }catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(501).json({
                message: "session timedout, please login to continue"
            })
    }
         return res.status(500).json({  
            message: error.message
        })
    }
  } 

//authorization for admin
const admin = async(req, res, next) => {
    authenticate(req,res, async()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(401).json({
                message:"User not authorized"
            })
        }
    })
}



module.exports = {
    authenticate, 
    admin
}
