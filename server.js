import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import apiRoute from "./routes/api.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Connect DB
mongoose.connect(process.env.MONGO_URI, () => {
  try {
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log(error);
  }
});

// Route
app.use("/api", apiRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
