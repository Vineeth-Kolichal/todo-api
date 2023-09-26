import express from "express";
import authentication from "./routes/auth-route.js"

const app=express();

app.use(express.json());

app.use("/",authentication);

app.listen(3000,()=>console.log('Server started'));