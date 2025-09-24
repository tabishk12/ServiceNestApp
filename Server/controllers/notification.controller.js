import Notification from "../models/notification.model.js";


// ✅ Create new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, type, bookingId } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({ message: "userId, title, and message are required" });
    }

    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      bookingId,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
};

// ✅ Get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// ✅ Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error marking notification as read", error });
  }
};

// ✅ Mark all notifications as read for a user
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
};
