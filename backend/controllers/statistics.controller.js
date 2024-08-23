// controllers/statisticsController.js

import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";

// Get site statistics
export const getSiteStatistics = async (req, res, next) => {
  try {
    const onlineUsers = await User.countDocuments({ status: "online" });
    const totalApplications = await Application.countDocuments();
    const reviewedApplications = await Application.countDocuments({
      status: "reviewed",
    });

    res.status(200).json({
      success: true,
      onlineUsers,
      totalApplications,
      reviewedApplications,
    });
  } catch (error) {
    next(error);
  }
};
