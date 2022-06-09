import express from "express";
import taskRoute from "./tasks.js";

const app = express();

app.use("/task", taskRoute);

export default app;
