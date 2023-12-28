const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

//MiddleWare.
app.use(express.json());

//Import Routes.
const blog = require("./routers/blog");
//Mount
app.use("/api/v1", blog);


//Connect with DB..
const connectWithDB = require("./config/database");
connectWithDB();

//start the server.
app.listen(PORT, () =>{
     console.log(`App is stated at Port number ${PORT}`);
})


//Default route for ui.
app.get('/' , (req, res) =>{
    res.send(`<h1>This is HomePage Baby!</h1>`);
})

