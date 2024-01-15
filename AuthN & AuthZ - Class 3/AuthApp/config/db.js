const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection = async(req, res) =>{
    mongoose.connect(process.env.MONGODB_URI, {
        //Define some flags..
    })
    .then(()=>{
        console.log(`DB Connected Successfully..`)
    })
    .catch((err)=>{
        console.log(`There are some issue while connection DB! ERROR : ${err}`)
        process.exit(1)
    })
}

//exports.
module.exports = dbConnection