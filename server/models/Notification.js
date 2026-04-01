import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['booking_confirmed', 'booking_cancelled', 'route_delay', 'general', 'promo'],
      default: 'general',
    },
    isRead: { type: Boolean, default: false },
    relatedBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);