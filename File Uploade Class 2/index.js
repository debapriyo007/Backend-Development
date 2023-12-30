const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

//midleware.
app.use(express.json());

//File upolade middleware.
const fileUplaode = require("express-fileupload");
app.use(fileUplaode({
    useTempFiles :true,
    tempFileDir : '/tmp/'
}));

//Connect with db.
const db = require("./config/database");
db.connectdb();

//Connet with Cloudinary..
const cloudinary = require("./config/cloudnary");
cloudinary.cloudinaryConnect();

//api route moute korte hobe.
const Upload = require("./routers/FileUploade");
//moute.
app.use('/api/v1/uploade', Upload);


//Active Server.
app.listen(PORT, ()=>{
    console.log(`App is Running at ${PORT}`);
})
