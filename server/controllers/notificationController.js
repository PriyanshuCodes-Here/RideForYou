import Notification from '../models/Notification.js';

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true }
    );
    res.status(200).json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notification', error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notifications', error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error: error.message });
  }
};

export const sendRouteDelayAlert = async (req, res) => {
  try {
    const { delayMessage, affectedUsers } = req.body;
    const notifications = affectedUsers.map((userId) => ({
      user: userId,
      title: 'Route Delay Alert',
      message: delayMessage,
      type: 'route_delay',
    }));
    await Notification.insertMany(notifications);
    res.status(200).json({ message: `Alerts sent to ${affectedUsers.length} users` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send alerts', error: error.message });
  }
};