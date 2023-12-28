//Import the model .
const Todo = require("../models/Todo");

//Define our Rout Handler.
exports.createTodo = async(req,res) =>{
    try{
        //extract the title and des from reqest body.
        const{title, description} = req.body;
        //Create a new Todo object and insert into DB.
        const response = await Todo.create({title, description});
        //Send a JOSON  response with success  flag.
        res.status(200).json(
            {
                success:true,
                data:response,
                message:'Entry Created Successfuly!'
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success: false,
            data: "Internal Server Error!",
            message:err.message,
        })

    }
}