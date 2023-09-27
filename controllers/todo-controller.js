import TodoSchema from '../models/todo-model.js'
import mongoose from 'mongoose';

const db = mongoose.connection

export const getAllTodos = async (req, res) => {

    try {
        const todolist = await db.collection('todos').find({ userId: req.userId }).toArray();
        res.status(200).json({ message: "Success",user:req.name, count: todolist.length, todos: todolist });

    } catch (error) {
        res.status(500).json({ message: "Error while geting todos", error: error });
    }
}
export const addTodo = async (req, res) => {
    try {
        if (req.body.title) {
            const isCompleted = false;
            const userId = req.userId;
            const { title, description } = req.body;
            const todoModel = new TodoSchema({
                userId,
                title,
                description,
                isCompleted
            });
            const todo = await todoModel.save();
            res.status(201).json({ message: "Todo successfully added", createdAt: todo.createdAt });
        } else {
            res.status(400).json({ message: "Title is required" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error while adding todo", error: error });
    }

}

export const updateStatus = async (req, res) => {
    try {
        const id=req.params.id;
        const filter={_id:id};
        const update={$set:{isCompleted:req.body.isCompleted}}
        const result= await TodoSchema.updateOne(filter,update)
        if(result){
            res.status(201).json({message:"Todo status updated",updated:result});
        }
        
    } catch (error) {
        res.status(500).json({ message: "Error while updating todo", error: error });
    }

}

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
      
        await TodoSchema.deleteOne({ _id: id });
        res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting todo", error: error });
    }
}