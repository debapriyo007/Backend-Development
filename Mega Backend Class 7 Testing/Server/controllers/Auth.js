const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//send otp handler.
exports.sendOTP = async (req, res) => {
    try {
        // 1st Step: Fetch email from req body.
        const { email } = req.body;

        // 2nd Step: Check if user already exists based on email.
        const userExist = await User.findOne({ email });

        // If user exists, return error response.
        if (userExist) {
            return res.status(401).json({
                success: false,
                message: `This ${email} email is already registered.`
            });
        }

        // 3rd Step: Generate OTP.
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("My OTP IS ->", otp);

        // 4th Step: Make sure the generated OTP is unique.
        let checkUniqueOtp = await OTP.findOne({ otp });

        // Generate a new OTP until it is unique.
        while (checkUniqueOtp) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            checkUniqueOtp = await OTP.findOne({ otp });
        }

        // 5th Step: Save OTP entry in the database.
        const otpEntry = await OTP.create({ email, otp });
        console.log(otpEntry);

        // 6th Step: Send successful response.
        res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
            otp,
        });

    } catch (err) {
        console.log(err);
        console.log("There are some internal issues while sending OTP.");
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

//signUp Handler.
exports.signUp = async (req, res) => {
    try {
        //step 1: Fetch all the data from req body.
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;


        //Step 2: Validate perform.

        if (!firstName || !lastName || !email || !password ||
            !confirmPassword || !contactNumber ||
            !otp) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // Special case --2 password are match or not..
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password doe't match ! Please Enter the same password!",
            });
        }

        //Step 3: Check user is already exist or not.
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already exist!"
            });
        }


        //Step 4: Find the most recent store otp. 
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
        //Now  Validate otp.
        if (!recentOtp || otp != recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!"
            })
        }

        //Step 5: Hashed the password.
        const hashedPassword = await bcrypt.hash(password, 10);
        //Step 6:Entey create in DB.

        //profile entey create on db.
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })


        // Step 7 : Return response.

        return res.status(200).json({
            success:true, 
            message:"User Registered Successfully!",
            user, 
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false, 
            message:"User can't Register right now Please try again!!"
        })
    }
}




//Login

exports.login = async(req, res) =>{
    try{
        //1st Step : fetch all data from req body.
        const {email, password} = req.body;
        //check the data is valid or not.
        if(!email || !password){
            return res.status(403).json({
                success:false, 
                message:"All feilds are required pleas enter the all fields!"
            });
        }
        //2nd Step: User exist or not.
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false, 
                message:"Please go and Register then you are able to Login."
            });
        }


        //3rd Step: generate JWT token and matching the password.

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email, 
                id:user._id, 
                accountType:user.accountType,
            }
             //if password is matched then create token.
             const token = jwt.sign(payload, process.env.JWT_SECRECT, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;
            //4th Step : create cookies and send response.
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000), 
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true, 
                user, 
                token, 
                message:"Log in Successfully.."
            })
        }else{
            return res.status(401).json({
                success:false, 
                meassage:"PassWord is Incorrect!"
            });
        }




    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false, 
            message:"Login Fail , Please try again later.",
        });
    }
}



//changePassword
exports.changePassword  = async(req, res) =>{
    //getdata from res body.
    //get oldpass , newPassword, confirm password
    //validition.


    //update pwd in db.
    //send mail and password updated.
    //return response.
}
