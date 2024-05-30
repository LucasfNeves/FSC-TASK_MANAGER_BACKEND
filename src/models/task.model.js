const {Schema, model} = require("mongoose");

const TaskShchema = Schema({
    description: {
        type: String,
        required: true,
    },

    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", TaskShchema);

module.exports = TaskModel;




