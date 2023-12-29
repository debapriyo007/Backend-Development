const express = require("express");
const route = express.Router();

//import all Handlers.
const {localFileUploade} =  require("../controllers/fileUploade");

//Define my api routes.
route.post('/localFileUploade', localFileUploade);

//exports.
module.exports = route; 


