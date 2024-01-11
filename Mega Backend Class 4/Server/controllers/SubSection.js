const SubSection = require("../models/subSection")
const Section = require("../models/section");
const { uploadeImageToCloudinary } = require("../utils/imageUploade");

//create SubSection handelers.

exports.createSubSection = async(req, res) =>{
    try {
        //data fetch from req body
        const {sectionId, title,timeDuration, description } = req.body;
        //extract file/video
        const video = req.files.VideoFile
        //validations perform .
        if(!sectionId||!title || !timeDuration || !description){
            return res.status(400).json({
                success:false, 
                message:"All fields are required!"
            })
        }
        //uploade video in cloudinary.
        const uploadeDetails = await uploadeImageToCloudinary(video, 
        process.env.FOLDER_NAME)
        //create a subsection
        const subSectionDetails = await SubSection.create({
            title:title, 
            timeDuration:timeDuration, 
            description:description, 
            videoUrl:uploadeDetails.secure_url,
        })
        //update section with subsection.
        const upadtedSection = await Section.findByIdAndUpdate({_id:sectionId}, 
            {
                $push:{
                    subSection:subSectionDetails.id,
                }
            }, {new:true}
        )
            //HW : uSE Populate function here.
        //return res.
        return res.status(200).json({
            success:true, 
            message:"SubSection Created Successfully", 
            data:upadtedSection,
        })
    } catch (err) {
        
    }
};


//HW : Update subsection .


//Hw: Delete subsection.