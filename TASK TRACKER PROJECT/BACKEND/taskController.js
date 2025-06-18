const Task = require('../models/Task');

// ✅ Added `async`
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task); // return the created task
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Added `async`
const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markDone = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndUpdate(taskId, { completed: true });
    res.status(200).json({ message: 'Task marked as done' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export all properly
module.exports = {
  createTask,
  getTasks,
  markDone,
  deleteTask
};
