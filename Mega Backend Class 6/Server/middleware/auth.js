
const jwt = require("jsonwebtoken")
require("dotenv").config()
const UserModel = require("../models/user")

//auth
exports.auth = async(req, res, next) =>{
    try{
        //authetication check korte gele jeson token k verify korte hobe.
        //extract token .
        const token = req.cookies.token || 
            req.body.token ||req.header("Authorisation").replace("Bearer ", "");

        //if token missing
        if(!token){
            return res.status(400).json({
                success:false, 
                message:"Token is missing!"
            })
        }

        // Verify the Token .
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRECT);
            console.log(decode)
            req.user = decode

        }catch(err){
            return res.status(402).json({
                success:false, 
                message:"Token is Invalid!"
            })
        }
        next();
    }catch(err){
        console.error(err);
        res.status(501).json({
            success:false, 
            messsage:"Internal Server Error!",
        })
    }
}

//isStudent Middle.
exports.isStudent = async(req, res, next) =>{
    try{
        if(req.user.accountType !="Student"){
            return res.status(401).json({
                success:false, 
                message:"This is a protected route for Student Only."
            })
        }
        next();
    }catch(err){
        console.error(err);
        res.status(501).json({
            success:false, 
            messsage:"User role can't be verified , Please try again later.",
        });
    }
};


//isInstructor.
exports.isInstructor = async(req, res, next) =>{
    try{
        if(req.user.accountType !="Instructor"){
            return res.status(401).json({
                success:false, 
                message:"This is a protected route for Instructor Only."
            })
        }
        next();
    }catch(err){
        console.error(err);
        res.status(501).json({
            success:false, 
            messsage:"User role can't be verified , Please try again later.",
        });
    }
};



//IsAdmin
exports.isAdmin = async(req, res, next) =>{
    try{
        if(req.user.accountType !="Admin"){
            return res.status(401).json({
                success:false, 
                message:"This is a protected route for Admin Only."
            })
        }
        next();
    }catch(err){
        console.error(err);
        res.status(501).json({
            success:false, 
            messsage:"User role can't be verified , Please try again later.",
        });
    }
};



