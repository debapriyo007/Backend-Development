const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signUp = async(req, res) =>{
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false, 
                message:`User already exist ${email} mail!!`
            })
        };
        let haspassword;
        haspassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name, 
            email, 
            password:haspassword, 
            role,
        });

        return res.status(200).json({
            success:true, 
            message:`User created Successfully!`,
            userInfo:createUser,
        })
        
    } catch (err) {
        return res.status(200).json({
            success:true, 
            message:`You can't create user now! Please try again later!`
        })
    }
}



exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).json({
                success:false, 
                message:`You require to Fill this!`
            })
        };
        //now the email which i will provide , if there is no user is register then i must have to register first.
        let checkUser = await User.findOne({email})
        if(!checkUser){
            //jodi ey email a user na thake
            return res.status(500).json({
                success:false, 
                message:`You have to Register first then you able to Login!`
            })
        };

        const payload = {
            email:checkUser.email, 
            id:checkUser._id,
            role:checkUser.role,
        }

        if(await bcrypt.compare(password, checkUser.password)){
            //jodi match kore tahole do something.

            //ey ek line tar maddhame token generrate korechi.
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2h'})
           
            
            checkUser.password = undefined //password ta ke disable korechi

            //bellow 2 line is for just insert token in userInfo
            checkUser = checkUser.toObject()
            checkUser.token = token


            //cookie er jonno obj lage seta create korechi 'Option' obj
            const option = {
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
                
            }

            //ay nicher line tar mane amara cookie theke Token extract korbo..
            res.cookie("Debu-Cookie", token, option).status(200).json({
                success:true,
                UserInfo:checkUser, 
                Token:token, 
                message:`Well Come Back ${checkUser.name} You Login Successfully.`
            }) 
            
        }else{
            return res.status(500).json({
                success:false, 
                message:`Wrong Password!!`
            })
        }
    } catch (err) {
        return res.status(200).json({
            success:false, 
            message:`Nigga You Unable to Login. Please try again later!!`
        })
    }
}