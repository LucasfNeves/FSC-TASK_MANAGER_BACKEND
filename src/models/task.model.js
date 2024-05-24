const mongoose = require("mongoose");

const TaskShchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },

    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = mongoose.model("Task", TaskShchema);

module.exports = TaskModel;
