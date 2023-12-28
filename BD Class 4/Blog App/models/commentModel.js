//Step 1: Instance Mongoose instance.
const mongoose = require('mongoose');


//Step 2: Route Handelers.
const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post" //referance to the post Model.
    },
    user:{
        type:String,
        require:true,
    },
    body:{
        type: String,
        require:true,
    }
});



//Step 3: Export..
 module.exports = mongoose.model("Comment" , commentSchema);


