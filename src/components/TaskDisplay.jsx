import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TaskDisplay = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    editTask(id, editText);
    setEditingId(null);
    setEditText('');
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
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${task.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
          >
            {editingId === task.id ? (
              <div className='flex-grow'>
                <motion.input
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border-2 border-blue-300 p-2 rounded-md mr-2 w-full focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex-grow">
                <motion.span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer text-lg block mb-2 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                  whileTap={{ scale: 0.98 }}
                >
                  {task.text}
                </motion.span>
                {task.file && (
                  <div className="mt-2">
                    {task.fileName && (
                      <a
                        href={task.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {task.fileName}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center space-x-2">
              {editingId === task.id ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUpdate(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Update
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(task.id, task.text)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Edit
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Delete
              </motion.button>
              <Link
                to={`/task/${task.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Details
              </Link>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default TaskDisplay;
