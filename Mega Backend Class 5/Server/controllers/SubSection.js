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
        res.status(500).json({
            success:false, 
            message:"Issue while creating the Sub-Section!"
        }) 
    }
};



//Hw: Update subsection.
exports.updateSubSection = async(req, res) => {
    try {
        // Get the subsection ID from the request parameters
        const { id } = req.user.id;

        // Get the updated data from the request body
        const { title, timeDuration, description } = req.body;

        // Find the subsection by ID and update its details
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            id,
            { title, timeDuration, description },
            { new: true }
        );

        // Check if the subsection exists
        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // Return the updated subsection
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubSection
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Issue while updating the Sub-Section"
        });
    }
};


//Hw: Delete subsection.
exports.deleteSubSection = async (req, res) => {
    try {
        // Get the subsection ID from the request parameters
        const { id } = req.user.id;

        // Find the subsection by ID and delete it
        const deletedSubSection = await SubSection.findByIdAndDelete(id);

        // Check if the subsection exists
        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // Return success message
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Issue while deleting the Sub-Section"
        });
    }
};
