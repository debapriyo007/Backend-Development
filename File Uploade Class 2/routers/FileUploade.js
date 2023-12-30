const express = require("express");
const route = express.Router();

//import all Handlers.
const {localFileUploade, imageUploade} =  require("../controllers/fileUploade");

//Define my api routes.
route.post('/localFileUploade', localFileUploade);
route.post('/imageUploade', imageUploade); 

//exports.
module.exports = route; 


