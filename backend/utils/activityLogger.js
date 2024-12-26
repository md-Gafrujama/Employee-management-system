// utils/activityLogger.js
const ActivityLog = require('../models/ActivityLog');

const logActivity = async (action, entityId, description, userId) => {
  try {
    await ActivityLog.create({
      action,
      entityId,
      description,
      performedBy: userId,
      entityType: 'EMPLOYEE'
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;