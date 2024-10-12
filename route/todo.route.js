import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js"; // Import authentication middleware

const router = express.Router();

router.post("/createTodo", authenticate, createTodo); // Secure endpoint
router.get("/gettodos", authenticate, getTodo); // Secure endpoint
router.delete("/deleteTodo/:id", authenticate, deleteTodo); // Secure endpoint
router.put("/updateTodo/:id", authenticate, updateTodo); // Secure endpoint

export default router;
