const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require:true, 
        
    }, 
    description:{
        type:String, 
        require:true, 
    }, 
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CourseModel"
    },

});
module.exports = mongoose.model("CategoryModel",categorySchema );