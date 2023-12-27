//Impots my models.
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//Like a post .
exports.likePost = async(req, res) => {
    try{
        const{post, user} =req.body;
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();

        //Update my post collection..
        const updatedPost = await Post.findByIdAndUpdate(post,{$push :{likes:savedLike._id}}, {new :true})
        .populate("likes").exec(); 
        res.json({
            post:updatedPost,
        });

    }
    catch(err){
        return res.status(400).json({
            error:"EROOR WHILE LIKEING POST!",
        });
    }
}

exports.unlikePost = async(req, res) => { 
    try{
        const{post, like} = req.body;
        //Find a delete the like for my coll id.
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        //Update the post collection.
        const updatedPost  = await Post.findByIdAndUpdate(post,
                                                                {$pull: {likes: deletedLike._id}}, 
                                                                {new:true});

        res.json({
            post:updatedPost,
        });

    }
    catch(err){
        return res.status(400).json({
            error:"EROOR WHILE UNLIKEING POST!",
        });
    }
}






exports.dummyLink = (req, res) =>{
    res.send("This is Dummy Link!")
}