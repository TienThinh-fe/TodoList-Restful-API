import express from "express";
import {
  getAllTask,
  addNewTask,
  deleteTask,
  updateTask,
} from "../controllers/TaskController.js";

const router = express.Router();

// get all of tasks in DB
router.get("/", getAllTask);
router.post("/", addNewTask);
router.delete("/", deleteTask);
router.put("/", updateTask);

export default router;
