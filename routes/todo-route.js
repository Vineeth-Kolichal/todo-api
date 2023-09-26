import express from "express";
import { verifyToken } from "../middleware/verify-token.js";
import { addTodo, deleteTodo, getAllTodos, updateStatus } from "../controllers/todo-controller.js";

const router=express.Router();

router.get("/all-todos",verifyToken,getAllTodos);

router.post("/add-todo",verifyToken,addTodo);

router.delete("/delete/:id",verifyToken,deleteTodo);

router.patch("/update-status/:id",verifyToken,updateStatus);

export default router;