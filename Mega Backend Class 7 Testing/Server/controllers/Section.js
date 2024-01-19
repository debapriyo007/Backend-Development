const Section = require("../models/section")
const Course = require("../models/course")

exports.createSection = async(req, res) =>{
    try {
        //data fetch
        const {sectionName, courseId} = req.body;

        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false, 
                message:"This filled are need to required!"
            })
        }
        //create section.
        const newSection = await Section.create({sectionName})
        //update the course with section objId..
        const updatedCourseDetails =  await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                      $push:{
                                                        courseContent:newSection._id
                                                            }
                                                    }, {new:true}
        ).populate('courseContent')
         .exec()
        //send response.
        return res.status(200).json({
            success:true, 
            message:"Section created Successfuly", 
            updatedCourseDetails, 
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:"There are some isuue while creating subsection! Try after sometime."
        })
    }
};


//Update Handler Section.
exports.updateSection = async(req, res) =>{
    try {
        //data input.
        const {sectionName,sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false, 
                message:"This filled are need to required!"
            })
        }
        //update the data.
        const updateSection = await Section.findByIdAndUpdate(sectionId, 
            {sectionName}, 
            {new:true} //this is for updated data.
        )
        //return res
        return res.status(200).json({
            success:true, 
            message:"Section Updated Successfully."
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:"Issue while Update the section!"
        })
    }
};


//delete Section.

// ...

//delete Section.
exports.deleteSection = async(req, res) =>{
    try {
        //data input.
        const {sectionId} = req.body;
        //data validation
        if(!sectionId){
            return res.status(400).json({
                success:false, 
                message:"Section ID is required!"
            })
        }
        //delete the section.
        await Section.findByIdAndDelete(sectionId);
        //return res
        return res.status(200).json({
            success:true, 
            message:"Section Deleted Successfully."
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:"Issue while deleting the section!"
        })
    }
};

