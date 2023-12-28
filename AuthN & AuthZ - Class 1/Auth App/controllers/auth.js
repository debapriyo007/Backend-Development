const bcrypt = require("bcrypt"); //this is use for hasing my password.
const userModel = require("../model/usermodel");


//Sign Up handler.
exports.signup = async (req, res) =>{
    try{
        //fetch all info from req body( Req body theke sob data gulo bar kore nilam).
        const {name, email, password, role} = req.body;
        //CASE 1: check my user is already exist.
        const existingUser = await userModel.findOne({email}); //dekte hobe ey email er keu  database ache ki nei
        //jodi valid entry thake.
        if(existingUser){ 
            return res.status(400).json({
                success:false,
                message:"User Already Exists!"
            });
        }

        //make password Secure.
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10); 
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in Hashing Password!!",
            })
        }

        //Create a Entry for User..
        const users  = await userModel.create({
            name, email, password:hashedPassword, role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully.."
        })
         
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"User is not Created , Please try again leater!",
        });
    }
}
