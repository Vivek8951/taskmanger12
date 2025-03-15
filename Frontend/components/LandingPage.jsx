import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 -mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to Zidio Task Manager</h1>
        <p className="text-lg text-gray-600 mb-8">Organize your tasks efficiently and boost your productivity</p>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-lg border-2 border-indigo-600 transition-colors duration-200"
          >
            Login
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="text-indigo-600 text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Task Organization</h3>
            <p className="text-gray-600">Create, edit, and organize your tasks with an intuitive interface</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="text-indigo-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your progress with separate views for completed and in-progress tasks</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="text-indigo-600 text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Stay Focused</h3>
            <p className="text-gray-600">Keep track of your goals and maintain productivity</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;