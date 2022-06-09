import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hasDone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("Task", TaskSchema, "Task");
