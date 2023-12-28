//Create Mongoose Instance.
const mongoose = require('mongoose');

require("dotenv").config(); //what ever i will write in .env file that will be render in "Process" obj

//create a function that make connection with database and express js.
const dbConnection =  () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        //Here are the required 2 config.
        useNewUrlParser:true, 
        useUnifiedTopology: true,
    })
    //I connection is successful.
    .then(() =>{console.log("DB connection is Successful")})
    //If there are some error.
    .catch((error) =>{
        console.log("Recived Error!!!");
        console.error(error.message);
        process.exit(1);

    });
}

module.exports = dbConnection; //Export.