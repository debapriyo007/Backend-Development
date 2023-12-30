const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
});


//Post Middleware.
fileSchema.post("save", async function(doc){
    try{
        //i want to see what is my doc file.
        console.log("DOC -->" , doc);

        //create our own Transporter.
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });


        //Send mail..
        let info = await transporter.sendMail({
            from:`Debu-Official`,
            to: doc.email,
            subject:"New File Uploaded Cloudinary.",
            html:`<h2>Hello Jee</h2> <p>File Uploaded.</p> view here : <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
        });
        console.log("INFO", info);
    }catch(err){
        console.error(err);
        
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;