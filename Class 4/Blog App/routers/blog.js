const express = require("express");
const router = express.Router();


//Import Controllers.

const {dummyLink} = require('../controllers/LikeController');
const {createComment} = require("../controllers/CommentController");






//Mapping..
router.get('/dummyroute' , dummyLink);
router.post('/comments/create' , createComment);


//export
module.exports = router;