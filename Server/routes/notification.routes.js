import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

// 📥 Create notification
router.post("/", createNotification);

// 📥 Get all notifications for a user
router.get("/:userId", getNotifications);

// ✅ Mark a single notification as read
router.patch("/:id/read", markAsRead);

// ✅ Mark all notifications as read for a user
router.patch("/:userId/read-all", markAllAsRead);

export default router;
