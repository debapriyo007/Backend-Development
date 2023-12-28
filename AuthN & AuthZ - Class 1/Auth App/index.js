//Step 1: create instance of Expresss..
const express = require("express");
const app = express();
//Step 2: Load the env file.
require('dotenv').config();
//Step 3: Define the port number.
const PORT = process.env.PORT || 4000;

//Step 4: Body perser.
app.use(express.json());

//Step 5: Connect with DB ..
require("./config/database").connectDB();
//Step 6: Create Route and moute.
const user = require('./routes/user');
//moute.
app.use("/api/v1", user);


//Step 5: Listen the app 
app.listen(PORT , () =>{
    console.log(`App is listing at ${PORT}`)
})