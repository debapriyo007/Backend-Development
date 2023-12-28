//Intance of Mongoose.
const mongoose = require('mongoose');

//Create a Schema of Todo.
const todoSchema = new mongoose.Schema(
    {
         title:{
            type:String,
            require:true,
            maxLength:50,

        },
        description:{
            type:String,
            require:true,
            maxLength:50,
        },
        createdAt:{
            type:Date,
            require:true,
            default:Date.now(),
        },
        updatedAt:{
            type:Date,
            require:true,
            default:Date.now(),
        }
    }
);
module.exports = mongoose.model("Todo" ,todoSchema);


//What is a schema?
//In computer programming, a schema (pronounced SKEE-mah) is the organization or structure for a database.