//Step 1: Create an mongoose instance ..
const mongoose = require('mongoose');


//Step 2: Route Handelers..

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        require: true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]

});


//Step 3: EXPORT..
module.exports = mongoose.model("Post" , postSchema);