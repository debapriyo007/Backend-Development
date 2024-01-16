const Course = require("../models/course")
const Category = require("../models/category")
const User = require("../models/user")

//import uploade cloudinary file.
const {uploadImageCloudinary} = require("../utils/imageUploade")
 
//write create Course handler function.
exports.createCourse  = async(req, res) =>{
    try {
        //get data.
        const {courseName,courseDescription, whatYouWillLearn, price, tag} = req.body;

        //get thumbnail.
        const thumbnail = req.files.thumbnailImage
        
        //validation.
        if(!courseName || !courseDescription || !whatYouWillLearn||!price || !tag || thumbnail){
            return res.status(401).json({
                success:false, 
                message:"All Field are need to be reqired!"
            });
        }

        //check Instructor or not.
        const userId = req.user.id
        const InstructorDetails = await User.findById(userId)
        console.log(`Instructor Details : ${InstructorDetails}`)

        if(!InstructorDetails){
            return res.status(402).json({
                success:false, 
                message:"Instructor Details not found!"
            });
        }

        //check give Category is valid or not.
        const CategoryDeatils = await Category.findById(Category)
        if(!CategoryDeatils){
            return res.status(402).json({
                success:false, 
                message:"No valid Category found!"
            })
        }

        //uploade image to Cloudinary.
        const thumbnailImage = await uploadImageCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create a entry for new Course.
        const newCourse = await Course.create({
            courseName, 
            courseDescription, 
            instructor:InstructorDetails._id, //jehetu instructor objectid tai InstructorDetails store kor6i.
            whatYouWillLearn:whatYouWillLearn, 
            price, 
            Category:CategoryDeatils._id, 
            thumbnail:thumbnailImage.secure_url,

             
        });

        //add this new couser in Instructor list
        await User.findByIdAndUpdate(
            {_id:InstructorDetails._id}, 
            {
                $push:{
                    courses:newCourse._id ,

                }
            }, 
            {new:true},
        );

        //update the Category ki schema.
        //HomeWork


        //return response.
        return res.status(200).json({
            success:true, 
            message:"Course Created Successfully.",
            data:newCourse,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:"There are some problem while creating Couserse!"
        })
    }
};



//Get all Cousers .
exports.getAllCourser = async(req, res) =>{
     try {
        const allCourses = await Course.find({}, {courseName:true, 
                                                 price:true, 
                                                 thumbnail:true, 
                                                 instructor:true, 
                                                 ratingAndReviews:true, 
                                                 studentsEnrolled:true,})
                                                 .populate("instructor")
                                                 .exec()
                                                
        return res.status(200).json({
        success:true, 
        message:"Get all Courses Succssfully",
        data:allCourses
        })

     } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:"There are some isssu to get all courses!!"
        })
     }
}



// Get all course details
exports.getAllCourseDetails = async (req, res) => {
    try {
        const {CourseId} = req.body;
        const courseDetails = await Course.findById(
                                                {_id:CourseId})
                                                .populate(
                                                    {
                                                        path:"instructor", 
                                                        populate:{
                                                            path:"additionalDetails"
                                                        },
                                                    }
                                                )
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                })
                                                .exec();

        
        if(!courseDetails){
            return res.status(500).json({
                success: false,
                message: `Could't Find the Couser in this CourseId ${CourseId}`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Get all course details successfully",
            couseInfo: courseDetails,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "There was an issue getting all course details",
        });
    }
};


