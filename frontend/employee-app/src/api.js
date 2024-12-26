// src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getEmployees = () => API.get('/employees');
export const createEmployee = (employeeData) => API.post('/employees', employeeData);
export const updateEmployee = (id, employeeData) => API.put(`/employees/${id}`, employeeData);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const getDepartments = () => API.get('/departments');
export const createDepartment = (departmentData) => API.post('/departments', departmentData);
export const updateDepartment = (id, departmentData) => API.put(`/departments/${id}`, departmentData);
export const deleteDepartment = (id) => API.delete(`/departments/${id}`);
export const getActivities = () => API.get('/activities');