import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    status:{
        type : String,
        enum : ["todo", "in-progress", "done"],
        default : "todo"
    }
})

const Task = mongoose.model("Task", taskSchema);

export default Task;