//Step 1 : Mongoose Instance.
const mongoose = require('mongoose');

//Step 2: Create Function that connect with DM
require("dotenv").config();
const connectWithDB = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(console.log("DB connect successfully :)"))
    .catch((err) => {
        console.log("DB faceing Connection error!");
        console.log(err);
        process.exit(1);
    })
};

module.exports = connectWithDB;