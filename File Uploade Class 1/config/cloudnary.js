const cloudinary = require("cloudinary").v2;

//Function to connect cloudinary .
exports.cloudinaryConnect = () =>{
     try{
        cloudinary.config({ //Akhane 3 te parameter lagbe.
            cloud_name:process.env.CLOUD_NAME,    //1st Parameter
            api_key:process.env.API_KEY,         //2nd Parameter
            api_secret:process.env.API_SECRECT,   //3rd Parameter
        })
     }catch(err){
        console.log(err);
     }
}
