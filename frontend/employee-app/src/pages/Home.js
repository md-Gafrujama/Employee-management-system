// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Users, ChartBar, Calendar, Bell } from 'lucide-react';
import { getEmployees, getDepartments, getActivities } from '../api';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeDepartments: 0,
    activeEmployees: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setRecentActivities(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, departmentsRes] = await Promise.all([
          getEmployees(),
          getDepartments()
        ]);
        
        setStats({
          totalEmployees: employeesRes.data.data.length,
          activeDepartments: departmentsRes.data.data.length,
          activeEmployees: employeesRes.data.data.filter(emp => emp.status === 'Active').length
        });

        await fetchActivities();
      } catch (error) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const pollInterval = setInterval(fetchActivities, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Employee Management System
            </h1>
            <p className="text-xl text-blue-100">
              Hello, {user?.name || user?.email}! Your workforce management hub.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Employees</h3>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEmployees}</p>
            <p className="text-sm text-gray-500 mt-2">Across all departments</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Departments</h3>
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.activeDepartments}</p>
            <p className="text-sm text-gray-500 mt-2">Operational units</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Employees</h3>
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.activeEmployees}</p>
            <p className="text-sm text-gray-500 mt-2">Currently working</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
              <ChartBar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Go to Dashboard
              </Link>
              <button className="block w-full text-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium">
                View Reports
              </button>
              <button className="block w-full text-center bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium">
                Team Calendar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Updates</h3>
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No recent activities
                </div>
              ) : (
                recentActivities.map((activity) => (
                  <div key={activity._id} className="border-l-4 border-blue-600 pl-4 py-2">
                    <h4 className="font-semibold text-gray-800">
                      {activity.action === 'CREATE' && 'New Employee Added'}
                      {activity.action === 'UPDATE' && 'Employee Updated'}
                      {activity.action === 'DELETE' && 'Employee Removed'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">
                        by {activity.performedBy?.name || activity.performedBy?.email}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;