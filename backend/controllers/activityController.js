// controllers/activityController.js
const ActivityLog = require('../models/ActivityLog');

exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate('performedBy', 'name email')
      .sort('-timestamp')
      .limit(10);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};