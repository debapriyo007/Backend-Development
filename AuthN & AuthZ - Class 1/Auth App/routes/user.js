//For creating Router need express instance.
const express = require("express");
const router = express.Router(); //Create Router useing Express instance.

//import the Handlers..
const {login, signup} = require("../controllers/auth");


//Define Routes.
// router.post("/login", login);
router.post("/signup", signup);

module.exports = router;



