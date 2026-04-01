import express from 'express';
import { createBooking, getUserBookings, cancelBooking, getBookingById, getAvailableSeats } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/seats', getAvailableSeats);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

export default router;