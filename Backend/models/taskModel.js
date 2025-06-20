import mongoose from "mongoose";

// Schema of Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  assignedTo: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
