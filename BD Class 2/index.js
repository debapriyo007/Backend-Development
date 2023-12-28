const express = require('express');
const app = express();


/*app.listen(3000, () =>{
    console.log("App is running...")
})*/

//I wamt my server is listen some port.
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Need Middleware to parse json req body.
app.use(express.json());

//Import Routes for TODO Api.
const todoRoutes = require("./routes/todos");

//mount my todo api's.
app.use('/api/v1' , todoRoutes);

//Connect to DB
//import
const dbConnect = require("./config/database");
//call
dbConnect();


//Default Route..
app.get('/', (req , res) =>{
    res.send(`<h1>This is HomePage Let's Go...</h1>`)
})



//Now start my server.
app.listen(PORT, () =>{
    console.log(`Server is running successsfuly at ${PORT}`)
})

