import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const inProgressTasks = tasks.filter(task => !task.completed).length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statCards = [
    { title: 'Total Tasks', value: totalTasks, color: 'bg-blue-500' },
    { title: 'Completed', value: completedTasks, color: 'bg-green-500' },
    { title: 'In Progress', value: inProgressTasks, color: 'bg-yellow-500' },
    { title: 'Completion Rate', value: `${completionRate}%`, color: 'bg-purple-500' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Tasks</h3>
        <div className="space-y-4">
          {tasks.slice(-5).reverse().map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-yellow-100'} hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{task.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {task.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                  <span className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-200 text-red-800';
    case 'medium':
      return 'bg-blue-200 text-blue-800';
    case 'low':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Normal';
  }
};