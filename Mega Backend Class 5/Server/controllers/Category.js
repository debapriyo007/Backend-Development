const Category = require("../models/category")

//create Category controller
exports.createCategory = async(req, res) =>{
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
        const CategoryDetails = await Category.create(
            {name:name, 
            description:description}
        );
        console.log(CategoryDetails)
        
        //res return .
        return res.status(200).json({
            success:true, 
            message:"Category Created Successfully.",
        })

    } catch (err) {
        res.status(500).json({
            success:false, 
            message:message.err,
        })
    }
};


//Get all Categorys.
exports.showallCategorys = async(req, res) =>{
    try {
        //amara db theke sey sob data gulo tule niya6i jey gulor name r description ache 
        //sei jonno name r description true mark kore6i.
        const allCategorys  = await Category.find({}, {name:true, description:true})
        return res.status(200).json({
            success:true, 
            message:"Get all Categorys Successfully..",
            allCategorys,
        })
    } catch (err) {
        res.status(500).json({
            success:false, 
            message:message.err,
        })
    }
}

//HW: left Catagory Page Details.