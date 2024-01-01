const mongoose = require("mongoose");

const rateingAndReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true, 
        ref:"UserModel",
    }, 
    rating:{
        type:Number, 
        require:true, 
    }, 
    review:{
        type:String, 
        require:true, 
    },

});
module.exports = mongoose.model("RatingAndReviewModel",rateingAndReviewSchema );