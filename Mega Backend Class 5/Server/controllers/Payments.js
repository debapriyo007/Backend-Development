const {instance} = require('../config/razorpay')
const User = require('../models/user')
const Course = require('../models/course')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')


//capture the payment and inticiate razorpay order..

exports.capturePayment = async(req, res) =>{
    try {
        //get course ID and userId.
        const {courseId} = req.body
        const userId = req.user.id

        //validation
        if(!courseId){
            return res.status(400).json({
                success:false, 
               message:`Please provide CourseID!!` 
            })
        };
        // er por amara check korbo uporer couserID theke j 'course details' asche ota valid kina.
        
        let courseData
        try {
            courseData = await Course.findById({courseId})
            //validation.
            if(!courseData){
                return res.status(400).json({
                    success:true, 
                    message:`Could't find the course in this ID!`
                })
            };

        //user already  pay for the same course or not.
            const uid = new mongoose.Types.ObjectId(userId)
            if(courseData.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false, 
                    message:`Student is already enrolled!!`
                });
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success:false, 
                message:err.message
            });
        }

        //order create 
        const ammount = courseData.price
        const currency = 'INR'

        const options = {
            ammount:ammount*1000,
            currency, 
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId: courseId,
                userId,
            }
        }

        try {
            //Initiate the payment using razorpay.
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse)
            return res.status(200).json({
                success:true, 
                courseName:courseData.courseName,
                courseDescription:courseData.courseDescription,
                thumbnail:courseData.thumbnail, 
                orderId:paymentResponse.id,
                currency:paymentResponse.currency, 
                amount :paymentResponse.ammount,
                message:`You Order Successfully`
            });
        } catch (err) {
            return res.status(500).json({
                success:false, 
                message:`Could't inistite the Order!`
            });
        }
        //return res.

    } catch (err) {
        console.log(err)
        console.error(err)
        return res.status(500).json({
            success:false, 
            message:`There are some issue while makeing Payment!`
        })
    }
}

