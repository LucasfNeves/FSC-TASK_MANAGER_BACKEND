const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();
const TaskController = require("../controllers/task.controller");

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTasksById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).createPost();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deletePost();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).editPost();
});

module.exports = router;
