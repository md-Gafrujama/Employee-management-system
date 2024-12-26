// routes/activity.js
const express = require('express');
const { getRecentActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', getRecentActivities);

module.exports = router;