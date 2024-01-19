const Category = require("../models/category")
const Course = require('../models/course')
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

//HW:  Catagory Page Details.
exports.categoryPageDetails = async (req, res) => {
    try {
        // get categoryId
        const { categoryId } = req.body;

        // get courses for particular Id
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        // validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Course Data Not Found!"
            });
        }

        // get courses for different categories
        const differentCategories = await Category.find({
            _id: { $ne: categoryId } // ne --> not equal
        })
            .populate("courses")
            .exec();

        // get top 10 selling courses
        // HW: base on selling, give priority to the courses to be shown

        const topSellingCourses = await Course.find()
            .sort({ sales: -1 })
            .limit(10)
            .exec();

        // return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses
            }
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Something error occurred while getting all Category Details!!!"
        });
    }
};
