import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/auth/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTasks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/admin/users/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedUser(response.data.user);
      setUserTasks(response.data.tasks);
    } catch (error) {
      setError('Error fetching user tasks');
      console.error('Error:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/auth/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.filter(user => user._id !== userId));
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
        setUserTasks([]);
      }
    } catch (error) {
      setError('Error deleting user');
      console.error('Error:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className="cursor-pointer"
                      onClick={() => fetchUserTasks(user._id)}
                    >
                      <h3 className="font-medium text-indigo-600">{user.username}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">Joined: {formatDate(user.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {selectedUser ? `${selectedUser.username}'s Tasks` : 'Select a user to view their tasks'}
          </h2>
          {selectedUser && (
            <div className="space-y-4">
              {userTasks.length === 0 ? (
                <p className="text-gray-500">No tasks found for this user.</p>
              ) : (
                userTasks.map((task) => (
                  <div key={task._id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{task.name}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-sm ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {task.completed ? 'Completed' : 'In Progress'}
                          </span>
                          <span className="text-sm text-gray-500">
                            Due: {formatDate(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;