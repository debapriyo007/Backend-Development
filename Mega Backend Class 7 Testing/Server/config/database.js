const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        //define some flags.
    })
    .then(()=>{
        console.log("DB connection is Successfully!");
    })
    .catch((err)=>{
        console.error(err);
        console.log("There are some issue to connect with DB..")
        process.exit(1);
    })
    
};
module.exports = dbConnection;