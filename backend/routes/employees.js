// routes/employees.js
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { 
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes that don't require specific role
router.route('/')
    .get(getAllEmployees)
    .post(createEmployee);

// Routes that require specific role
router.route('/:id')
    .get(getEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;