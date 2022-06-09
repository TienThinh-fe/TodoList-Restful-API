import mongoose from "mongoose";

import Task from "../models/TaskModel.js";
import {
  successResponse,
  successResponseWithData,
  errorResponse,
  notFoundResponse,
} from "../helpers/apiResponse.js";

// Task Schema
function TaskData(data) {
  // this.id = data._id;
  this.name = data.name;
  this.status = data.status;
  this.date = data.date;
  this.hasDone = data.hasDone;
}

// Get all Task
const getAllTask = (req, res) => {
  try {
    Task.find({}, (err, tasks) => {
      if (tasks.length > 0) {
        return successResponseWithData(res, "GET SUCCESSFULLY", tasks);
      } else {
        return successResponseWithData(res, "GET SUCCESSFULLY", []);
      }
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Add a new task
const addNewTask = (req, res) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const newTask = new Task({
    name: req.body.name,
    status: req.body.status,
    date: today,
    hasDone: false,
  });

  try {
    newTask.save((err) => {
      if (err) {
        throw err;
      } else {
        const taskData = new TaskData(newTask);
        successResponseWithData(res, "ADD SUCCESSFULLY", taskData);
      }
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Delete a task
const deleteTask = (req, res) => {
  try {
    Task.findById(req.body.id, (err, foundTask) => {
      if (foundTask === null) {
        return notFoundResponse(res, "TASK DOES NOT EXISTS WITH THAT ID");
      } else {
        Task.findByIdAndRemove(req.body.id, (err) => {
          if (err) {
            return errorResponse(res, err);
          } else {
            return successResponse(res, "DELETE SUCCESSFULLY");
          }
        });
      }
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// Update a task
const updateTask = (req, res) => {
  try {
    Task.findById(req.body.id, (err, foundTask) => {
      if (foundTask === null) {
        return notFoundResponse(res, "TASK DOES NOT EXISTS WITH THAT ID");
      } else {
        const currentState = foundTask.hasDone;
        Task.updateOne(
          { _id: req.body.id },
          {
            hasDone: !currentState,
          },
          (err, affected, resp) => {
            return successResponse(res, "UPDATE SUCCESSFULLY");
          }
        );
      }
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export { getAllTask, addNewTask, deleteTask, updateTask };
