import jwt from 'jsonwebtoken';
import Notification from '../models/Notification.js';

const connectedUsers = new Map();

export const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    connectedUsers.set(socket.userId, socket.id);

    socket.on('join_room', (userId) => {
      socket.join(userId);
    });

    socket.on('mark_read', async (notificationId) => {
      try {
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        socket.emit('notification_read', notificationId);
      } catch {}
    });

    socket.on('disconnect', () => {
      connectedUsers.delete(socket.userId);
    });
  });
};

export const sendNotificationToUser = (io, userId, notification) => {
  const socketId = connectedUsers.get(userId.toString());
  if (socketId) {
    io.to(socketId).emit('new_notification', notification);
  }
};