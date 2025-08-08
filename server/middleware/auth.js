const User = require('../models/User')
require('dotenv').config();
const jwt = require('jsonwebtoken')




// auth 

exports.auth = async(req,res,next) =>
{
    try{
      
        
        const token = req.cookies.token || req.body.token ||   (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        
        

        if(!token)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"token not found"
                }
            )
        }

       try{
        const decode =  jwt.verify(token,process.env.JWT_SECRET)
       
        req.user = decode
       }
        
       catch(err)
       {
        return res.status(401).json(
            {
                success:false,
                message:"token invalid"
            }
        )
       }
       next();

    }
    catch(error){
        return res.status(401).json(
            {
                success:false,
                message:"somethung went wrong while verifying "
            }
        )

    }
}



exports.isStudent = async (req, res, next) => {
    try {
        // Check if the account type is 'student'
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Access denied: Protected route for students only",
            });
        }
    
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying student access",
            error: err.message,
        });
    }
};




exports.isInstructor = async (req, res, next) => {
    try {
        // Check if the account type is 'Instructor'
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Access denied: Protected route for instructors only",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying instructor access",
            error: err.message,
        });
    }
};


    

exports.isAdmin = async(req,res,next) =>
    {
       try
       {
        console.log("type",req.user.accountType)
        if(req.user.accountType != "Admin")
            {
                return res.status(401).json(
                    {
                        success:false,
                        message:"Access denied: Protected route for Admin only"
                    }
                )
            }        next();
       }
       catch(err)
       {
        return res.status(401).json(
            {
                success:false,
                message:"Error while verifying instructor access"
            }
        )
       }
    }