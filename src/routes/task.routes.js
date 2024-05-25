const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Essa tarefa não foi encontrada");
        }

        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).send("Essa tarefa não foi encontrada");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            taskData,
            { new: true }
        );

        return res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

module.exports = router;
