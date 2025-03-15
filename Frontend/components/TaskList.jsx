import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDisplay from './TaskDisplay';

const TaskList = ({ tasks, addTask, toggleTask, deleteTask, editTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [priority, setPriority] = useState('medium');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim() || !dueDate) {
      alert('Please fill in all required fields (task name, description, and due date).');
      return;
    }

    const formData = new FormData();
    formData.append('name', taskName.trim());
    formData.append('description', taskDescription.trim());
    formData.append('dueDate', dueDate);
    formData.append('priority', priority);
    
    // Validate file size and type before appending
    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSize) {
        alert('File size should not exceed 5MB');
        return;
      }
      formData.append('file', selectedFile);
    }
    
    try {
      await addTask(formData);
      // Reset form after successful submission
      setTaskName('');
      setTaskDescription('');
      setDueDate('');
      setSelectedFile(null);
      setPriority('medium');
    } catch (error) {
      console.error('Error adding task:', error);
      alert(error.response?.data?.message || 'Failed to add task. Please try again.');
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
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Add Task
          </button>
        </form>
      </div>
      <TaskDisplay tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default TaskList;
