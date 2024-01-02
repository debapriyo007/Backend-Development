const User = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/profile");
//send otp handler.
exports.sendOTP = async (req, res) => {
    try {
        //1st Step : fetch  email from req body.
        const { email } = req.body;
        //2nd step : j user already exist kor6e kina "email" er upor base kore.
        const UserExist = await User.findOne({ email });
        //jodi user exist kore.
        if (UserExist) {
            return res.status(401).json({
                success: false,
                message: `This ${email} Email a user is already registered.`
            })
        }

        //3rd Step : OTP generate korte hobe.
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("My OTP IS ->", otp);

        // 4th Step Make sure my otp is Unique or not.
        let checkUniqueOtp = await OTP.findOne({ otp: otp });
        //joto khon na amar unique otp pachhi generate korte thakbo.
        while (checkUniqueOtp) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            checkUniqueOtp = await OTP.findOne({ otp: otp });
        }

        //5th Step: Otp entry in dataBase.
        const OtpPayload = { email, otp };
        const otpBody = await OTP.create({ OtpPayload });
        console.log(otpBody);


        //6th Step : Send Successfull response.

        res.status(200).json({
            success: true,
            message: "OTP send successfully!",
            otp,
        })

    } catch (err) {
        console.log(err);
        console.log("There are some internal issue while Send OTP.");
        return res.status(500).json({
            success: false,
            message: err.message,
        })
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
            conformPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;


        //Step 2: Validate perform.

        if (!firstName || !lastName || !email || !password ||
            !conformPassword || !contactNumber ||
            !otp) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // Special case --2 password are match or not..
        if (password != conformPassword) {
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
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not Found!",
            })
        } else if (otp != recentOtp.otp) {
            res.status(400).json({
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



//changePassword
