import { notificationModel } from "../models/notification.model.js";

const getNotification = async (req, res) => {
  try {
    const { id } = req.user;
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while exploring post",
    });
  }
};
