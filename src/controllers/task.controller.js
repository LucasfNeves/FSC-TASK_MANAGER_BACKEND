const TaskModel = require("../models/task.model");
const {notFoundError} = require('../errors/mongodb.errors')

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find();
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTasksById() {
        try {
            const taskId =  this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return  notFoundError(this.res)
            }

            return  this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.mensage);
        }
    }

    async createPost() {
        try {
            const newTask = new TaskModel( this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.mensage);
        }
    }

    async deletePost() {
        try {
            const taskId =  this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res)
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.mensage);
        }
    }

    async editPost() {
        try {
            const taskId =  this.req.params.id;

            const taskData =  this.req.body;

            const updatedTask = await TaskModel.findByIdAndUpdate(
                taskId,
                taskData,
                { new: true }
            );

            return  this.res.status(200).send(updatedTask);
        } catch (error) {
            this.res.status(500).send(error.mensage);
        }
    }
}

module.exports = TaskController;
