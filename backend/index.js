import express, { response } from 'express';
import cors from 'cors';    
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './Schemas.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
}
catch(err){
    console.log("Error connecting to MongoDB", err);
}

app.post("/addtask", async (req, res) => {
    const {id,title, description, status} = req.body;
    console.log(status);
    const task  = new Task({
        id,
        title,
        description,
        status
    });
    await task.save()
    .then(response => {console.log("Task added", response)
        res.status(200).json({
            message : "Task added",
            task : response
        })
    })
    .catch(err => console.log("Error adding task", err));
})


app.put("/update/:id",async (req, res) => {
    const id =parseInt(req.params.id);
    const{status} = req.body;
    console.log("Updating task", id, status);
    await Task.findOne({id})
    .then(task =>{
        if(!task){
            return res.status(404).json({
                message : "Task not found"
            })
        }
        task.status = status;
        task.save()
        .then(response => {
            console.log("Task updated", response);
            res.status(200).json({
                message : "Task updated",
                task : response
            })
        })
        .catch(err => {
            console.log("Error updating task", err);
            res.status(500).json({
                message : "Error updating task"
            })
        })
    })
})

app.get("/gettasks", async (req, res) => {
    const data =  await Task.find()
    .then(response =>{
        console.log("Tasks fetched", response);
        res.status(200).json({
            message : "Tasks fetched",
            tasks : response
        })
    })
    .catch(err => {
        console.log("Error fetching tasks", err);
        res.status(500).json({
            message : "Error fetching tasks"
        })
    })
})

app.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Deleting task", id);
    await Task.deleteOne({id})
    .then(resp =>{
        console.log("Task deleted", resp);
        res.status(200).json({
            message : "Task deleted"
        })
    })
    .catch(err => {
        console.log("Error deleting task", err);
        res.status(500).json({
            message : "Error deleting task"
        })
    })
})
app.listen(5001)