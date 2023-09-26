import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userSchema from "../models/user-model.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

const db = mongoose.connection;
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10).then(async (password) => {
            const userModel = new userSchema({
                name,
                email,
                password
            });
            const user = await userModel.save();
            res.status(201).json({ message: "Account created successfully", data: { name: user.name, email: user.email, createdAt: user.createdAt } });
        })
    } catch (error) {
        res.status(500).json({ message: "error while signup", error: error });
    }
}

export const signin = async (req, res) => {
    try {
        const user=await db.collection('users').findOne({email:req.body.email});
        if(user){
            
            
        }else{
            res.status(404).json({message:"user not found"});
        }

        
    } catch (error) {
        
    }

}

