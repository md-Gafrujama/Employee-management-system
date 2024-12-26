// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true,
    enum: ['HR', 'Development', 'Finance', 'Marketing', 'Operations', 'Sales']
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  salary: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);