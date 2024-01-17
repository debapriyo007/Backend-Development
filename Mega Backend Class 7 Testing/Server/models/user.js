const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        require: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "ProfileModel", //ata ProfileModel name a akata model k identify kor6e..
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseModel", //ata Course name akata model k identify kor6e.
        }
    ], 
    image:{
        type: String,
        require:true,
    }, 
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:String,
    },
    courseProgress:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"CourseProgressModel" //ata CourseProgressModel name akata model k identify kor6e.
           
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model("UserModel", UserSchema); 