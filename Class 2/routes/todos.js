//Create a instance of Express .
const express = require('express');
//Create a router Instance 
const router = express.Router();

//Import the Controlers.
const {createTodo} = require('../controllers/createTodo');


//Define my API routes.
router.post("/createTodo" , createTodo);





//Export .
module.exports = router;