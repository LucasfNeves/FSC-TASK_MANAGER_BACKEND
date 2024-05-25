const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

// chamamos a conexão do dataBase depois do dotenv pois ele usa as variáveis de ambiente do arquivo
connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

app.get("/tasks/:id", async (req, res) => {
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

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.mensage);
    }
});

app.delete("/tasks/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
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

app.listen(8000, () => console.log("Listening on port 8000!"));
