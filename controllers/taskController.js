const { Task, User } = require("../models");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({
        message: "Title and userId are required"
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      userId
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task",
      error: error.message
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
        attributes: ["id", "title", "description", "status", "dueDate"],
        include: {
            model: User,
            attributes: ["id", "name", "email"]
        }
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: User
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch task",
      error: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.update({
      title,
      description,
      status,
      dueDate
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task",
      error: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.destroy();

    return res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};