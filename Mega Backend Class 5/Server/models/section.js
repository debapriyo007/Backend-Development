const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionName:{
        type: String,

    }, 
    subSection:[
        {
         type: mongoose.Schema.Types.ObjectId,
         require:true, 
         ref:"SubSectionModel", 
        }
    ], 

});
module.exports = mongoose.model("SectionModel", SectionSchema);