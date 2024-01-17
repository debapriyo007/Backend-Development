const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUploade = require('express-fileupload')
require("dotenv").config();
const {cloudinaryConnect} = require('./config/cloudinary') //import cloudinary.
const dbConnection = require("./config/database"); //import db connection.


const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`My app is Listing at ${PORT}`);
})


//Imports all Routes.
const userRouter  = require("./routes/User.router")
const paymentRouter  = require("./routes/Payment.router")
const profileRouter  = require("./routes/Profile.router")
const courseRouter  = require("./routes/Course.router")

dbConnection(); //call db Connection.
cloudinaryConnect(); //cloudinary connections.

//use middleware
app.use(express.json()) 
app.use(cookieParser())
app.use(
    cors({
        origin:"https://localhost:3000", //this url came from clint
        credentials:true
    })
)
app.use(
    fileUploade({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//routes moutes
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/payment', paymentRouter)



//default route just for show something in homepage ui.
app.get("/", (req, res)=>{
    res.send(`<H1>This is HomePage!</H1>`)
})





