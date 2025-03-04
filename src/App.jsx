import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import InProgressTasks from './components/InProgressTasks';
import CompletedTasks from './components/CompletedTasks';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const addTask = (text) => {
    const newTask = { id: nextId, text: text.text, completed: false };
    if (text.file) {
      newTask.file = text.file;
      newTask.fileName = text.fileName;
    }
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/login');
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {loggedIn && (
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">Dashboard</Link>
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">Add Task</Link>
              <Link to="/in-progress" className="text-indigo-600 hover:text-indigo-800 font-semibold">In Progress</Link>
              <Link to="/completed" className="text-indigo-600 hover:text-indigo-800 font-semibold">Completed</Link>
            </div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Logout</button>
          </div>
        </nav>
      )}
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-8 my-6">
        <Routes>
          <Route path="/" element={loggedIn ? <TaskList tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} /> : <LandingPage />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={() => navigate('/login')} />} />
          <Route path="/in-progress" element={<InProgressTasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />} />
          <Route path="/completed" element={<CompletedTasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
