import express from "express";
import Task from "../models/taskModel.js";

//  Create a task
const CreateTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    if (!title || !description || !assignedTo || !status) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existTask = await Task.findOne({ title });
    if (existTask) {
      return res.status(400).json({ error: "Similar task already exists" });
    }

    const newTask = new Task({ title, description, assignedTo, status });

    await newTask.save();
    res.status(201).json({ msg: "Task created", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};



//  Get all tasks
const ListAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({ msg: "Fetched all tasks", tasks: allTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};




//  Update task status
const UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["To Do", "In Progress", "Done"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ msg: "Status updated", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};



//  Delete a task
const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export { CreateTask, UpdateStatus, ListAllTasks, DeleteTask };
