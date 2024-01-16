const RatingAndReview = require("../models/rateingAndReview")
const Course = require("../models/course")
const { default: mongoose } = require("mongoose")


//createRating..
exports.creatingRating = async(req, res)=>{
    try {
        //get userId
        const userId = req.user.id
        //fetch data  from req body
        const {rating , review, courseId} = req.body
        //check user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId,
                                                studentsEnrolled:{$elemMatch:{$eq:userId}},
                                                })
        if(!courseDetails){
            return res.status(500).json({
                success: false,
                message: `Student is't enrolled this Course!`,
            });
        };
        //chck user already review or not
        const alreadyReview = await RatingAndReview.findOne({user:userId, 
                                                            course:courseId,
                                                            })
        //validation.
        if(alreadyReview){
            return res.status(500).json({
                success: false,
                message: `Course is already review by the User!!`,
            });
        }
        //create rateing review
        const ratingReview = await RatingAndReview.create({
                                                    rating,
                                                    review,
                                                    course:courseId, 
                                                    user:userId,
        })
        
        //update the the course with this rateing review
        const updatedCourseDetailsWithRatingReview = await Course.findByIdAndUpdate({_id:courseId}, {
            $push:{
                ratingAndReviews:ratingReview._id,
            }
        }, {new:true})
        console.log(updatedCourseDetailsWithRatingReview)
        //return res
        return res.status(200).json({
            success: true,
            message: `Rating and Review Successfully`,
            ratingReview
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message:err.message, 
        });
    }
}



//getAvg Rating..
exports.getAverageRating = async (req, res) => {
    try {
        //get Course Id.
        const courseId = req.body.courseId

        //cal avg rating 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId), //couser first String 6ilo ota k Obj te convert kore6i.
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg :"$rating"}
                }
            }
        ])
        //return rating
        //validation 
        if(result.length>0){
            return res.status(200).json({
                success:true, 
                averageRating:result[0].averageRating,
            })
        }
        //if not review rating exist
        return res.status(200).json({
            success:true, 
            message:"There is no rating and Review till Now!!",
            averageRating:0
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



//Get All ratingAnd Reviews..
exports.getAllRating = async (req, res) => {
    try {
        const allReview = await RatingAndReview.find({})
                                                .sort({rating:"descending"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",
                                                })
                                                .populate({
                                                    path:"courses", 
                                                    select:"courseName",
                                                })
                                                .exec()

        return res.status(200).json({
            success:true, 
            message:'All Review and Rating Fetch Successfully',
            allReview,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
