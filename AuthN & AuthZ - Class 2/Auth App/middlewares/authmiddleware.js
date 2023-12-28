//Required jwt instance.

const jwt = require("jsonwebtoken");
require("dotenv").config();

//First Middlewre.
exports.auth = (req, res, next) =>{
    try{
        //extract JWT tokens.
        //Pending : Others ways to fetch tokens.
        const token = req.body.token;
        //jodi token na present thake.
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing.',
            });
        }

        //Verify the token.
        try{
            const paylode = jwt.verify(token, process.env.JWT_SECECT);
            console.log(paylode);
            req.user = paylode;

        }catch(err){
            return res.status(401).json({
                success:false,
                message:'Token is Invaild!',
            });
        }
        next();

    }catch(err){
        console.error(err);
        return res.status(401).json({
            success:false,
            message:'Something went Wrong! While verfiy the token!',
        });
    }
};

//Second middlewre.
exports.isStudent = (req, res, next) =>{
    try{
        if(req.user.role !="Student"){
            return res.status(401).json({
                success:false,
                message:'This is Protected Route for Student..',
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false, 
            message:"User Role is't matching.",
        })
    }
}
//isAdmin middlewre.
exports.isAdmin = (req, res, next) =>{
    try{
        if(req.user.role !="Admin"){
            return res.status(401).json({
                success:false,
                message:'This is Protected Route for Admin..',
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false, 
            message:"User Role is't matching.",
        })
    }
}