//For creating Router need express instance.
const express = require("express");
const router = express.Router(); //Create Router useing Express instance.
 
//import the Handlers..
const {login, signup} = require("../controllers/auth");
//Import Middlewares.
const{auth, isStudent, isAdmin} = require("../middlewares/authmiddleware");

//Define Routes.
router.post("/login", login);
router.post("/signup", signup);



//Testing Route
router.get('/test', auth, (req, res) =>{
    res.json({
        success:true,
        meassage:"Wellcome to the Protected Route For Test..",
    });
})


//define Protected Routes.
router.get("/student",auth, isStudent, (req, res) => {
    res.json({
        success:true,
        meassage:"Wellcome to the Protected Route For Student..",
    });
})
router.get("/admin",auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        meassage:"Wellcome to the Protected Route For Admin..",
    });
})

module.exports = router;



