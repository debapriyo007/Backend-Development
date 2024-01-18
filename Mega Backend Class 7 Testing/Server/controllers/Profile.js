const Profile = require("../models/profile")
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploade");



exports.updateProfile = async(req, res) =>{
    try {
        //get data 
        const {dateOfBirth ="",about="", contactNumber, gender } = req.body;
        const id = req.user.id

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(500).json({
                success:false, 
                message:`All field are need to be required!`
            })
        }
        
        //find the profile
        const userDetails = await User.findById(id)
        //get the profile id.
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)
        //update profile.
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.about = about
        profileDetails.gender = gender
        profileDetails.contactNumber  = contactNumber
        //now save coz , obj is already create in db
        await  profileDetails.save()

        //return res
        return res.status(200).json({
            success:true, 
            message:`Profile Updated Successfully.`, 
            profileDetails:profileDetails,
        })
    } catch (err) {
        res.status(500).json({
            success:false, 
            message:"Issue while Update Profile!"
        })
    }
};


//Delete Account.
//Explore -> How can we  schudle this delete operation . Lets say after 5 days delete the a/c
// what is Crons-Job ?
exports.deleteAcc = async(req, res) =>{
    try {
        //get id
        const id = req.user.id
        //check id is valid or not.
        const userDetails = await User.findById(id)
        if(!id){
            return res.status(500).json({
                success:false, 
                message:"There is no valid user in this ID"
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        //HW: Unroll user form all enrolled course
        //delete user
        await User.findByIdAndDelete({_id:id})
        //return res
         return res.status(200).json({
            success:true, 
            message:`User Deleted Successfully.`
         })

    } catch (err) {
        res.status(500).json({
            success:false, 
            message:"Issue while Deleting Account!"
        }) 
    }
};



//Get all User details.

exports.getAllUserDetails = async(req, res) =>{
    try {
        const id = req.user.id
        const allUserDeatils = await User.findById(id).populate('additionalDetails').exec()
        res.status(200).json({
            success: true,
            message: 'Get all User Details Successfully',
            userDetails:allUserDeatils
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Issue while retrieving user details.'
        });
    }
}

//Update Display Pic
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      ) 
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
//Get Enrolled cCOURSES
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};