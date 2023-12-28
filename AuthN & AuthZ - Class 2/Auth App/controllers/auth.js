const bcrypt = require("bcrypt"); //this is use for hasing my password.
const userModel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config(); //dotenv is import for --> JWT_SECECT


  
//Sign Up handler.
exports.signup = async (req, res) =>{
    try{
        //fetch all info from req body( Req body theke sob data gulo bar kore nilam).
        const {name, email, password, role} = req.body;
        //CASE 1: check my user is already exist.
        const existingUser = await userModel.findOne({email}); //dekte hobe ey email er keu  database ache ki nei
        //jodi valid entry thake.
        if(existingUser){ 
            return res.status(400).json({
                success:false,
                message:"User Already Exists!"
            });
        }

        //make password Secure.
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10); 
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in Hashing Password!!",
            })
        }

        //Create a Entry for User..
        const users  = await userModel.create({
            name, email, password:hashedPassword, role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully.."
        })
         
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"User is not Created , Please try again leater!",
        });
    }
}


//Login Handler..

exports.login  = async(req, res) => {
    try{
        //prothome data gulo k body theke bae kore nubo.
        const {email, password} = req.body;
        //check korbo email r password ta vaild kina? .
        if(!email || !password){ //jodi amara db te email, password er data na thake.
            return res.status(400).json({
                success:false,
                message:"Please fill a the details then Login!!",
            });
        }

        //step 2: Check korbo  amader kono register user  db the ache ki nei.
        let user = await userModel.findOne({email});
        //jodi kono user db te register na thakto.
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is't Registered!",
            });
        }

        //Paylode for token.
        const paylode = {
            email:user.email,
            id:user._id,
            role:user.role,
        };

        //Step 3: Verify password and generate JWT tokens..
        if(await bcrypt.compare(password, user.password)){
            //password jodi match kore jai.

            //token create korte hobe.
            let token = jwt.sign(paylode,
                                 process.env.JWT_SECECT,
                                 {
                                    expiresIn:"2h",
                                 });

            user = user.toObject();
            //je token ta create holo ota k akhon cookies er vitor a add korbo..
            user.token = token; 
            //user er jodi obj k amara as a response send kori , thahole tar moddhay tho password 
            // r email id ache ..ota tho je keu paya jabe.
            user.password = undefined;

            //Akon ekhane akta cookie banabo.
            const options = {
                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                 httpOnly:true,
            }
            res.cookie("debucookie", token, options).status(200).json({
                success:true, 
                token, 
                user,
                message:"User login Successfully.."
            })

        }else{
            //password jodi match na hoi.
            return res.status(403).json({
                success:false,
                message:"Password Incorrect!",
            });
        }



    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        });
    }
}
