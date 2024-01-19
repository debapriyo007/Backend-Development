const SubSection = require("../models/subSection")
const Section = require("../models/section");
const { uploadImageToCloudinary } = require("../utils/imageUploade");


//create SubSection handelers.

exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }



//Ay duto hander a amake id Req er Paramas theke nite hobe
//Left Some Work.
  
//Hw: Update subsection.
exports.updateSubSection = async(req, res) => {
    try {
        // Get the subsection ID from the request parameters
        const { id } = req.body;

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
        const { id } = req.body;

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
