const mongoose = require("mongoose");
require("dotenv").config();

exports.connectdb = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
       
    })
    .then(
        console.log("DB Connect Successfully...")
    )
    .catch((err)=>{
        console.log("DB Connection Issue!!!!!!!");
        console.error(err);
        process.exit(1);
    })
};