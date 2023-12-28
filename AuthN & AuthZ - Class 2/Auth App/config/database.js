const mongoose = require('mongoose');
//load my process obj.
require('dotenv').config();

//define methord..
exports.connectDB = () =>{ 
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true, 
    })
    .then(() =>{
        console.log("DB connect Successfully..")
    })
    .catch((err) =>{
        console.log("DB connection Issue!!");
        console.error(err);
        process.exit(1);
    });
};