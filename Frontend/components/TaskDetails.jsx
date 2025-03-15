import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TaskDetails = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return (
      <div>
        <p>Task not found!</p>
        <Link to="/">Back to Task List</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Task Details</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Task:</strong> {task.text}</p>
      <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Go Back
      </button>
    </div>
  );
};

export default TaskDetails;
