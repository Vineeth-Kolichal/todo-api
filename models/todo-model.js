import mongoose from "mongoose";

const {Schema}=mongoose;

const todoSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    isCompleted:{
        type:Boolean,
        required:true
    }
},
{
    timestamps:true
});

export default mongoose.model("todo",todoSchema);