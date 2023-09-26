import express from "express";
import authentication from "./routes/auth-route.js"
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const db=mongoose.connection;

db.on('error',(error)=>console.log(error));

db.once('open',()=>console.log("database connected"));

const app=express();

app.use(express.json());

app.use("/",authentication);

app.listen(3000,()=>console.log('Server started'));