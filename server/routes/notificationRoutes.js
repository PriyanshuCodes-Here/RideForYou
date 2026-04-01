import express from 'express';
import { getUserNotifications, markAsRead, markAllAsRead, deleteNotification, sendRouteDelayAlert } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getUserNotifications);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);
router.post('/delay-alert', sendRouteDelayAlert);

export default router;