const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
//localFileUploade Handler.

exports.localFileUploade = async (req, res) =>{
    try{
        //Fetch file request.
        const file = req.files.file;
        console.log("FILE AYGYA JEE-->",file);

        // apni apna server er kon path a file k store korte chay6en 
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -->", path);
        file.mv(path, (err)=>{ //path to move function.
            console.log(err);
        });

        //Create Successfull response.
        res.json({
            success:true,
            message:"Local File Uploaded Successfully!"
        });
        
    }catch(err){
        console.log("Not able to uploade the file in Server");
        console.log(err);
    }
};

//Check file Type Supported or not Function,,
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//File Uplode in Cloudinary Function..
async function fileUplodeCloudinary(file, folder){
    const options ={folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//Image uplode Handler.
exports.imageUploade = async(req, res) =>{
    try{
        //Data Fetch .
        const {name, tags, email} = req.body;
        console.log(name, tags, email);


        //fatch File.
        const file = req.files.imageFile;
        console.log(file);

        //Now Validation.
        const supportedTypes = ["jpg", "png", "jpeg", "svg"];
        //Find my file type.
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FILE TYPE --->", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false, 
                message:"File Format Not Supported!"
            })
        }

        //File fortmat Supported hai.

        console.log("Uplodeing to Debu Folder..");
        const response = await fileUplodeCloudinary(file, "Debu");
        console.log(response);

        //Entry Save in DB.
        const fileData = await File.create({
            name, 
            tags, 
            email, 
            imageUrl:response.secure_url, 
        })

        res.json({
            success:true, 
            imageUrl:response.secure_url,
            message:"Image Successfully Uploade.."
        })


    }catch(err){
        
        console.log(err);
        res.status(400).json({
            success:false, 
            message:"Something went Wrong!"
        });
    }
}