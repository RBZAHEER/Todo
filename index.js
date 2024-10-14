import express from "express";
import mongoose from "mongoose";
const app = express();
import todoRoute from "./route/todo.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";
//Dotenv Files
import "dotenv/config";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
//Cookie Parser
app.use(cookieParser());
//MONGODB Connection
const MongoDB = async () => {
  try {
    mongoose.connect(MONGO_URI).then(console.log("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
};
MongoDB();
//middlewares
app.use(
  cors({
    origin: "http://localhost:5173" || process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Routes
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(PORT, () => {
  console.log("connected to port 3000");
});
