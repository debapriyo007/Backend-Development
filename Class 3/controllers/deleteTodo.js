//Import the model .
const Todo = require("../models/Todo");
//Define our Rout Handler.
exports.deleteTodo = async (req, res) => {
    try {
        //get the id .
        const { id } = req.params;

        await Todo.findByIdAndDelete(id);
        //Send the response.
        res.json({
            success:true,
            message:"Todo is Deleted Successfully"
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