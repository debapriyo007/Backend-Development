//Step 1 : Create the Mongoose instance.
const mongoose = require('mongoose');


//Step 2: Route Handelers.
const likeSchema = new mongoose.Schema({
    post :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },

    user:{
        type:String,
        require:true,
    }
});

//Step 3: EXPORT..

module.exports = mongoose.model("Like" , likeSchema);