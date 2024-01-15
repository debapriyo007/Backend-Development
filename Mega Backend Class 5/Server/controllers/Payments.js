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


//Verify segnature.
exports.verifySignature = async(req, res) =>{
    try {
        const webhookSecret = "12345678"

        const signature = req.headers["x-razorpay-signature"]
        const shasum = crypto.createHmac("sha256", webhookSecret)
        //ay Hmac obj ta ke String formate a convert korete hobe.
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.diagest("hex")

        //match the signature and digest.
        if(signature === digest){
            console.log("Payment is Authorized..")
            const {couserId, userId} = req.body.playload.payment.entity.notes;
             
            try {
                //full fill our actions.
                const enrolledCourse = await Course.findOneAndUpdate(
                                                                    {_id:couserId},
                                                                    {$push:{studentsEnrolled:userId}},
                                                                    {new:true}
                );
                if(!enrolledCourse){
                    return res.status(400).json({
                        success:false, 
                        message:'Course not Found!'
                    })
                };
                console.log(enrolledCourse)

                const enrolledStudents = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:couserId}},
                                                {new:true}
                )

                console.log(enrolledStudents)

                //Successfully purchase hoyagele mail send korbo.
                const emailResponse = mailSender(
                    enrolledStudents.email,
                    "Congratulation!",
                    "Go to your DashBoard to accss the Course!"
                );
                
                return res.status(200).json({
                    success:true, 
                    message:'Signature Added and Course Verified!'
                })
            } catch (err) {
                console.log(err)
                return res.status(500).json({
                    success:false, 
                    message:'There are Some issue while Verify Signature!'
                })
            }
        }else{
            return res.status(400).json({
                success:false, 
                message:'Invalid Request!'
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success:false, 
            message:err.message,
        })
    }
}
