import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDisplay from './TaskDisplay';

const TaskList = ({ tasks, addTask, toggleTask, deleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [priority, setPriority] = useState('medium');
  const navigate = useNavigate();

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      const taskData = {
        text: newTask,
        file: selectedFile ? URL.createObjectURL(selectedFile) : null,
        fileName: selectedFile ? selectedFile.name : null,
        priority: priority
      };
      addTask(taskData);
      setNewTask('');
      setSelectedFile(null);
      setPriority('medium');
      navigate('/in-progress');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className='w-full'>
      <div className="mb-6 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter your task"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">Urgent</option>
            <option value="medium">Fastly</option>
            <option value="low">Slowly</option>
          </select>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {selectedFile && (
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Add Task
          </button>
        </div>
      </div>
      <TaskDisplay tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default TaskList;
