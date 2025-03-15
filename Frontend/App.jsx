import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import InProgressTasks from './components/InProgressTasks';
import CompletedTasks from './components/CompletedTasks';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { getTasks, createTask, updateTask, deleteTask as deleteTaskAPI, toggleTask as toggleTaskAPI } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      loadTasks();
    }
  }, [loggedIn]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async (formData) => {
    try {
      const response = await createTask(formData);
      if (response.data) {
        await loadTasks(); // Reload tasks to ensure we have the latest data
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error; // Propagate error to handle it in the component
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await toggleTaskAPI(id);
      setTasks(
        tasks.map((task) =>
          task._id === id ? response.data : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const editTask = async (id, formData) => {
    try {
      const response = await updateTask(id, formData);
      setTasks(
        tasks.map(task =>
          task._id === id ? response.data : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      throw error; // Propagate error to handle it in the component
    }
  };



  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
              <Link to="/" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
              <Link to="/tasks" className="text-blue-600 hover:text-blue-800">All Tasks</Link>
              <Link to="/in-progress" className="text-blue-600 hover:text-blue-800">In Progress</Link>
              <Link to="/completed" className="text-blue-600 hover:text-blue-800">Completed</Link>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
      <div className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={loggedIn ? <Dashboard tasks={tasks} /> : <LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/tasks"
            element={
              loggedIn ? (
                <TaskList
                  tasks={tasks}
                  addTask={addTask}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/in-progress"
            element={
              loggedIn ? (
                <InProgressTasks
                  tasks={tasks}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/completed"
            element={
              loggedIn ? (
                <CompletedTasks
                  tasks={tasks}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
