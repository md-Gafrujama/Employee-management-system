// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['HR', 'Development', 'Finance', 'Marketing', 'Operations', 'Sales']
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
