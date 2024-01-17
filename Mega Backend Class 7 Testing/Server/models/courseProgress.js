const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseModel",

    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSectionModel",

        }
    ]
});
module.exports = mongoose.model("CourseProgressModel", courseProgressSchema);