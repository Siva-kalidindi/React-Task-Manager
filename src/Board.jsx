import React,{useState,useEffect} from "react";
import './output.css';
import List from "./List.jsx";
import { Link } from "react-router-dom";
import { set } from "mongoose";



export default function Board() {

  const [tasks, setLists] = useState([]); 
  const [hcol,sethcol] = useState(null);

  useEffect(() => {
  fetch("http://localhost:5001/gettasks")
      .then(response => response.json())
      .then(data => {
        setLists(data.tasks);
      })
      .catch(err => console.log("Error fetching tasks", err));
    },[]);
    

     const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

   const [dtask,setdtask] = useState(null);
   const [Dragging, setDragging] = useState(false);

    function handleChange(e , taskId) {
      console.log(taskId,"dragging");
        setdtask(taskId);
        setDragging(true);
    }

    function handleDrop(e, cstatus) {
      e.preventDefault();
      setLists(prev =>{
        return prev.map(task => (task.id === dtask ? {...task, status: cstatus} : task))
      });
      fetch(`http://localhost:5001/update/${dtask}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({status: cstatus})
      })
      .then(response => response.json())
      .then(data => {
        console.log("Task updated", data);
      }).catch(err => {
        console.log("Error updating task", err);
      });
      setdtask(null);
      sethcol(null);
      setDragging(false);
    }
    function allowDrop(event,status) {
        event.preventDefault();
        sethcol(status);
    };
    function handleDelete(e) {
      e.preventDefault();
      setLists(prev => prev.filter(task => task.id !== dtask));
      fetch(`http://localhost:5001/delete/${dtask}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Task deleted", data);
      }).catch(err => {
        console.log("Error deleting task", err);
      });
      setdtask(null);
      sethcol(null);
      setDragging(false);
    }
      
     return (
  <>
  {Dragging && (
  <div   onDragOver={(e) => allowDrop(e,"delete")}  onDrop={e => handleDelete(e)} className={`w-full fixed top-0 left-0 z-50 border-2 border-dotted ${hcol === "delete" ? "border-red-500 shadow-inner": ""}   text-white text-center py-4 rounded-xl h-19 font-bold flex items-center justify-center`}>
    <img src="/delete.png" alt="Delete" className="h-10" />
  </div>
)}

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4  text-white font-sans">
      <div className="w-full max-w-screen-lg mt-10">
        <div className="flex gap-4 p-4">
          {columns.map((column) => (
            <div
              key={column.status}
              className={`backdrop-blur-sm bg-gray-800/60 border border-gray-700 rounded-xl shadow-md w-1/3 p-4  transition-all duration-300 ${
                hcol === column.status ? "bg-blue-900/40 ring-2 ring-blue-500 shadow-xl" : ""
              }`}
              onDragOver={(e) => allowDrop(e, column.status)}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <h2 className="text-2xl font-bold mb-3 border-b border-gray-600 pb-2">{column.title}</h2>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.status)
                  .map((task) => (
                    <List
                      item={task}
                      key={task.id}
                      handleChange={handleChange}
                      isDragging={dtask === task.id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link to='/addTask'>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
            Add a Task
          </button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

   
    }