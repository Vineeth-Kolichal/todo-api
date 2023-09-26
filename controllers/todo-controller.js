import TodoSchema from '../models/todo-model.js'
import mongoose from 'mongoose';

const db=mongoose.connection

export const getAllTodos = async (req, res) => {

    try {
        const todolist= await db.collection('todos').find({ userId: req.userId }).toArray();
        res.status(200).json({message:"Success",count:todolist.length,todos:todolist });
        
    } catch (error) {
        res.status(500).json({message:"Error while geting todos",error:error });
    }
}
export const addTodo = async (req, res) => {
    try {
        if(req.body.title){
            const isCompleted=false;
            const userId=req.userId;
            const {title, description}=req.body;
            const todoModel=new TodoSchema({
                userId,
                title,
                description,
                isCompleted
            });
        const todo=await todoModel.save();
        res.status(201).json({message:"Todo successfully added",createdAt:todo.createdAt});
        }else{
            res.status(400).json({message:"Title is required"});
        }
    } catch (error) {
        res.status(500).json({message:"Error while adding todo",error:error});
    }

}

export const updateStatus = async (req, res) => {

}

export const deleteTodo = async (req, res) => {

    try {
        db.collection('todos').deleteOne({_id:req.params.id}).then((error,status)=>{
            if(status){
                res.status(200).json({message:"Todo deleted"});
            }
            if(error){
                res.status(400).json({message:"Error while deleting todo",error:error});
            }
        })
        
    } catch (error) {
        res.status(500).json({message:"Error while adding todo",error:error});
    }
}