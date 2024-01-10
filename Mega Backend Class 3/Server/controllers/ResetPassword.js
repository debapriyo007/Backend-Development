
const User = require("../models/user")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")



//reset password token .
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body.
        const email = req.body.email
        //check vaildation on that email.
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(500).json({
                success: false,
                message: "This email there is not user!Go and register.",
            })
        }
        //generate token.
        const token = crypto.randomUUID()
        //update the user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        }, { new: true });

        //create url
        const url = `https://localhost:3000/update-password/${token}`
        //send mail containing url
        await mailSender(email, "Password Reset Link", `Password Reset Link ${url}`)
        //return res
        return res.status(200).json({
            success: true,
            message: "Email Send Successfully . Check your email and change password."
        })
    } catch (err) {
        console.error();(err)
        res.status(502).json({
            success: false,
            message:"Something went wrong while reset password!",
        })
    }
};

//reset Password..

exports.resetPassword = async(req , res) =>{
    try{
        //data fetch
        const {password, confirmPassword, token} = req.body

        //validation.
        if(password!=confirmPassword){
            return res.json({
                success:false, 
                message:"Your password must be same. Your Password are not matching"
            })
        }
        //get user details form db using tokens
        const userInfo = await User.findOne({token:token})
        //if no entry found means invalid token.
        if(!userInfo){
            return res.json({
                success:false, 
                message:"Token is not matching.",
            })
        }
        //toekn time check
        if(userInfo.resetPasswordExpires < Date.now()){
            return res.json({
                success:false, 
                message:"Token is expired Please regenerate your token.",
            })
        }
        //hash password
        const hasedPassword  = await bcrypt.hash(password, 10)

        //update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hasedPassword}, 
            {new:true},
        )
        //res return
        return res.status(200).json({
            success:true, 
            message:"Password reset successful."
        })
    }catch(err){
        console.error();(err)
        res.status(502).json({
            success: false,
            message:"Something went wrong while send Reset password in mail !",
        })
    }
}