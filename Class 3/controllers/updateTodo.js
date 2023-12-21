//Import the model .
const Todo = require("../models/Todo");
//Define our Rout Handler.
exports.updateTodo = async (req, res) => {
    try {
        //get the id .
        const { id } = req.params;
        //Get title and description.
        const { title, description } = req.body;

        //Now change.
        const todo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updatedAt: Date.now() },

        )

        //Data is found.
        return res.status(200).json({
            success: true,
            data: todo,
            message: `Updated successfully.`
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