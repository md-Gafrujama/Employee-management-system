// controllers/departmentController.js
const departments = [
    { _id: 'HR', name: 'HR', description: 'Human Resources Department' },
    { _id: 'Development', name: 'Development', description: 'Software Development Department' },
    { _id: 'Finance', name: 'Finance', description: 'Finance and Accounting Department' },
    { _id: 'Marketing', name: 'Marketing', description: 'Marketing and Communications Department' },
    { _id: 'Operations', name: 'Operations', description: 'Operations Management Department' },
    { _id: 'Sales', name: 'Sales', description: 'Sales and Business Development Department' }
  ];
  
  exports.getAllDepartments = async (req, res) => {
    res.json({
      success: true,
      data: departments
    });
  };
  
  exports.getDepartment = async (req, res) => {
    const department = departments.find(d => d._id === req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
  
    res.json({
      success: true,
      data: department
    });
  };