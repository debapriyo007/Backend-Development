//Import the model .
const Todo = require("../models/Todo");
//Define our Rout Handler.
exports.getTodo = async (req, res) => {
    try {
        //Fetch all todo items from DataBase.
        const todos = await Todo.find({});

        //response.
        res.status(200)
            .json({
                success: true,
                data: todos,
                message: "Entire Data is Fetched!",
            })
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: " Server Error!",
                message: err.message,
            })

    }
}

//get a Todo Only one by ID.
exports.getTodoById = async(req, res) => {
    try{
        //Fetch todo Item by Id.
        const id = req.params.id;
        const todo = await Todo.findById({_id:id})

        //data for given id is't found.
        if(!Todo){
            return res.status(400).json({
                success: false,
                message: "No Data Found Given Id!"
            })
        }
        //Data is found.
        return res.status(200).json({
            success:true,
            data:todo,
            message: `Todo ${id} data successfully fetched.`
        })

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: " Server Error!",
                message: err.message,
            }); 
    }
}