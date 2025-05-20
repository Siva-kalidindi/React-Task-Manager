import './App.css';
import React from 'react';
import './output.css';
import { Link } from 'react-router-dom';

function App() {

  const [loading,setLoading] = React.useState(false);
  
  const [inputData, setInputData] = React.useState({
    title: '',
    description: '',
    status: 'todo',
  });

  function handleChange(e) {
    const {name,value} = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:5001/addtask", {
      method  : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body  : JSON.stringify({ id : Math.floor(Math.random() * 1000), ...inputData})})
      .then(response => response.json())
      .then(data =>{
        console.log("Task added", data);
      })
      .catch(err => console.log("Error adding task", err))
      .finally(() => {
        setLoading(false);
        setInputData({
      title: '',
      description: '',
      status: 'todo',
    });
      });
  }




  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 text-white font-sans">

      <h1 className="text-4xl font-bold text-center mt-6 text-purple drop-shadow-md">Task Management Dashboard</h1>
      
      <form 
        className="flex flex-col gap-4 p-6 mt-6 rounded-xl bg-gray-800/70 backdrop-blur-sm shadow-2xl w-full max-w-md mx-auto border border-gray-700"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          value={inputData.title}
          onChange={handleChange}
          required
          placeholder="Task Title"
          className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="description"
          value={inputData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="status"
          value={inputData.status}
          onChange={handleChange}
          className="bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          type="submit"
          className={`py-2 rounded transition-all font-medium ${
            loading
              ? "bg-blue-800 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
      <Link to='/'>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 mt-4">
        Go to Dashboard
      </button>
      </Link>
    </div>
  );
}

export default App;
