const File = require("../models/file");

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

    }
}