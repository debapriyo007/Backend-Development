const express = require("express")
const router = express.Router()


const { auth } = require("../middleware/auth")
const { deleteAcc, updateProfile, getAllUserDetails, getEnrolledCourses, updateDisplayPicture } = require("../controllers/Profile")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAcc)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)



// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router