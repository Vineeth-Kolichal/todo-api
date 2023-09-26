import bcrypt from "bcrypt";
import mongoose from "mongoose";

const db=mongoose.connection;

export const signup= async(req,res)=>{
    res.status(200).json({message:"test"});

}

export const signin=async(req,res)=>{

}

