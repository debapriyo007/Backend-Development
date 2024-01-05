const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>{
    console.log(`My app is Listing at ${PORT}`);
})

const dbConnection = require("./config/database");
dbConnection();