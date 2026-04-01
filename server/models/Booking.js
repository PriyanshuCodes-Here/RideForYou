import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    busRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute', required: true },
    seatNumber: { type: Number, required: true },
    journeyDate: { type: Date, required: true },
    boardingStop: { type: String, required: true },
    droppingStop: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    bookingRef: { type: String, unique: true },
  },
  { timestamps: true }
);

bookingSchema.pre('save', function (next) {
  if (!this.bookingRef) {
    this.bookingRef = 'RFY-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);