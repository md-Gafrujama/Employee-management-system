// controllers/employeeController.js
const Employee = require('../models/Employee');
const logActivity = require('../utils/activityLogger');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort('-createdAt');
        res.json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single employee
exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.createEmployee = async (req, res) => {
    try {
      const employee = await Employee.create(req.body);
      
      await logActivity(
        'CREATE',
        employee._id,
        `New employee ${employee.name} was added to ${employee.department}`,
        req.user._id
      );
  
      res.status(201).json({
        success: true,
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
  
  exports.updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
  
      await logActivity(
        'UPDATE',
        employee._id,
        `Employee ${employee.name}'s information was updated`,
        req.user._id
      );
  
      res.json({
        success: true,
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
  
  exports.deleteEmployee = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
  
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
  
      await logActivity(
        'DELETE',
        employee._id,
        `Employee ${employee.name} was removed from the system`,
        req.user._id
      );
  
      await employee.deleteOne();
  
      res.json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };