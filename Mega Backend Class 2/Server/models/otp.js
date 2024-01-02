const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5*60, // OTP expires after 5 minutes
    },
});

//fun likhbo jar intend hobe ---> To send Mail..
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification From StudyNotation", otp);
        console.log("Email Send Successfully" , mailResponse);
    }catch(err){
        console.log("There are some problem while verification!");
        console.error(err)
        throw err;
    }
}


otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next(); //go to next middleware
})
module.exports = mongoose.model('OtpModel', otpSchema);


