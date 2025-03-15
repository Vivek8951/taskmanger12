import React from 'react';
import TaskDisplay from './TaskDisplay';

const CompletedTasks = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className='w-full'>
      <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
      <TaskDisplay tasks={completedTasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};

export default CompletedTasks;
