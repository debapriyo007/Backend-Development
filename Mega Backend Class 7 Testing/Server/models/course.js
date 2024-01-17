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
        type: [String],
        require:true,
    }, 
    studentsEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require:true,
    }], 
    category:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
		ref: "CategoryModel",
    }, 
    instruction:{
        type:[String],
    },
    status:{
        type:String, 
        enum:["Draft", "Published"]
    }

});
module.exports = mongoose.model("CourseModel", CourseSchema);