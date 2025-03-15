import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TaskDisplay = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editFile, setEditFile] = useState(null);

  const handleEdit = (id, taskName, description, dueDate, priority) => {
    setEditingId(id);
    setEditTaskName(taskName);
    setEditDescription(description);
    setEditDueDate(dueDate);
    setEditPriority(priority);
    setEditFile(null);
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append('name', editTaskName);
      formData.append('description', editDescription);
      formData.append('dueDate', editDueDate);
      formData.append('priority', editPriority);
      if (editFile) {
        formData.append('file', editFile);
      }
      await editTask(id, formData);
      setEditingId(null);
      setEditTaskName('');
      setEditDescription('');
      setEditDueDate('');
      setEditPriority('');
      setEditFile(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-3"
      >
        {tasks.map((task) => (
          <motion.li
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
          >
            {editingId === task._id ? (
              <div className='space-y-3'>
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Task Name"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Task Description"
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
                >
                  <option value="high">Urgent</option>
                  <option value="medium">Fastly</option>
                  <option value="low">Slowly</option>
                </select>
                <input
                  type="file"
                  onChange={(e) => setEditFile(e.target.files[0])}
                  className="w-full p-2 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <div className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                    <h3 className="text-lg font-semibold">{task.name}</h3>
                    <p className="text-sm mt-1">{task.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  {task.dueDate && (
                    <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                      Due: {formatDate(task.dueDate)}
                    </span>
                  )}
                  {task.completed && (
                    <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                      Completed
                    </span>
                  )}
                </div>
                {task.file && (
                  <div className="mt-3 p-2 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">Attached File:</p>
                    <a
                      href={`http://localhost:5000${task.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      View Attachment
                    </a>
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => handleEdit(task._id, task.taskName, task.description, task.dueDate, task.priority)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default TaskDisplay;
