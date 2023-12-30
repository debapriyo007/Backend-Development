const express = require("express");
const route = express.Router();

//import all Handlers.
const {localFileUploade, imageUploade, videoUploade, imageSizeReducer} =  require("../controllers/fileUploade");

//Define my api routes.
route.post('/localFileUploade', localFileUploade);
route.post('/imageUploade', imageUploade); 
route.post('/videoUploade', videoUploade);
route.post('/imageSizeReducer', imageSizeReducer);

//exports.
module.exports = route; 


