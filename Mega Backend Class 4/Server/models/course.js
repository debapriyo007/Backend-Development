const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require: true,
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SectionModel",
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviewModel", 
        }
    ], 
    price:{
        type:Number, 
    }, 
    thumbnail:{
        type:String, 
    }, 
    tag:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TagModel"
    }, 
    studentsEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require:true,
    }]

});
module.exports = mongoose.model("CourseModel", CourseSchema);