const express = require('express')
const router = express.Router()



const { signUp, login } = require('../controllers/auth.controllers')
const { auth, isStudent, isAdmin } = require('../middleware/auth.middleware')




router.post('/signUp', signUp)
router.post('/logIn', login)


//middleware.
router.get('/test', auth,(req, res)=>{
    return res.status(200).json({
        success:true, 
        message:`Well Come to the Protected Route!`
    })
})
router.get('/isStudent', auth, isStudent, (req, res)=>{
    return res.status(200).json({
        success:true,
        meassage:"Wellcome to the Protected Route For Student..",
    });
})
router.get('/isAdmin', auth, isAdmin, (req, res)=>{
    return res.status(200).json({
        success:true,
        meassage:"Wellcome to the Protected Route For Admin..",
    });
})

//export.
module.exports  = router