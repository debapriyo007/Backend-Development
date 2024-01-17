// Import the required modules
const express = require("express")
const { auth, isInstructor, isAdmin, isStudent } = require("../middleware/auth")
const { createCourse, getAllCourser, getAllCourseDetails } = require("../controllers/Course")
const { createSection, updateSection, deleteSection } = require("../controllers/Section")
const { updateSubSection, deleteSubSection, createSubSection } = require("../controllers/SubSection")
const { createCategory, showallCategorys, categoryPageDetails } = require("../controllers/Category")
const { creatingRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview")
const router = express.Router()


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth , isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourser)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getAllCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showallCategorys)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, creatingRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router