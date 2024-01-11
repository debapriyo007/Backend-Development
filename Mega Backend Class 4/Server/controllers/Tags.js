const Tag = require("../models/tags")

//create tag controller
exports.createTag = async(req, res) =>{
    try {
        //data berkore nubo req body theke.
        const {name, description} = req.body;

        //check the validation.
        if(!name || !description){
            return res.status(400).json({
                success:false, 
                message:"All fields are required!"
            })
        }

        //db te entry create korbo.
        const tagDetails = await Tag.create(
            {name:name, 
            description:description}
        );
        console.log(tagDetails)
        
        //res return .
        return res.status(200).json({
            success:true, 
            message:"Tag Created Successfully.",
        })

    } catch (err) {
        res.status(500).json({
            success:false, 
            message:message.err,
        })
    }
};


//Get all Tags.
exports.showallTags = async(req, res) =>{
    try {
        //amara db theke sey sob data gulo tule niya6i jey gulor name r description ache 
        //sei jonno name r description true mark kore6i.
        const alltags  = await Tag.find({}, {name:true, description:true})
        return res.status(200).json({
            success:true, 
            message:"Get all Tags Successfully..",
            alltags,
        })
    } catch (err) {
        res.status(500).json({
            success:false, 
            message:message.err,
        })
    }
}