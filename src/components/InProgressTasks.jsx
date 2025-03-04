import React from 'react';
import TaskDisplay from './TaskDisplay';

const InProgressTasks = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const inProgressTasks = tasks.filter(task => !task.completed);

  return (
    <div className='w-full'>
      <h2 className="text-xl font-bold mb-4">In Progress Tasks</h2>
      <TaskDisplay tasks={inProgressTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default InProgressTasks;
