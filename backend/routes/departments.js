// routes/departments.js
const express = require('express');
const {
    getAllDepartments,
    getDepartment
} = require('../controllers/departmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getAllDepartments);
router.get('/:id', getDepartment);

module.exports = router;