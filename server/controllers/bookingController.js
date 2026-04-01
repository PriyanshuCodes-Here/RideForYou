import Booking from '../models/Booking.js';
import BusRoute from '../models/BusRoute.js';
import Notification from '../models/Notification.js';

export const createBooking = async (req, res) => {
  try {
    const { busRouteId, seatNumber, journeyDate, boardingStop, droppingStop } = req.body;
    const route = await BusRoute.findById(busRouteId);
    if (!route) return res.status(404).json({ message: 'Bus route not found' });

    const existingBooking = await Booking.findOne({
      busRoute: busRouteId,
      seatNumber,
      journeyDate: new Date(journeyDate),
      status: 'confirmed',
    });
    if (existingBooking) return res.status(400).json({ message: 'Seat already booked for this date' });

    const booking = await Booking.create({
      user: req.user._id,
      busRoute: busRouteId,
      seatNumber,
      journeyDate,
      boardingStop,
      droppingStop,
      fare: route.fare,
    });

    await Notification.create({
      user: req.user._id,
      title: 'Booking Confirmed!',
      message: `Your seat ${seatNumber} on ${route.routeName} (${route.routeNumber}) is confirmed for ${new Date(journeyDate).toDateString()}.`,
      type: 'booking_confirmed',
      relatedBooking: booking._id,
    });

    const populatedBooking = await booking.populate('busRoute');
    res.status(201).json({ message: 'Booking successful', booking: populatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('busRoute')
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status === 'cancelled') return res.status(400).json({ message: 'Already cancelled' });

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    await Notification.create({
      user: req.user._id,
      title: 'Booking Cancelled',
      message: `Your booking ${booking.bookingRef} has been cancelled. Refund will be processed shortly.`,
      type: 'booking_cancelled',
      relatedBooking: booking._id,
    });

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Cancellation failed', error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('busRoute');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
};

export const getAvailableSeats = async (req, res) => {
  try {
    const { busRouteId, journeyDate } = req.query;
    const route = await BusRoute.findById(busRouteId);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    const bookedSeats = await Booking.find({
      busRoute: busRouteId,
      journeyDate: new Date(journeyDate),
      status: 'confirmed',
    }).select('seatNumber');

    const bookedSeatNumbers = bookedSeats.map((b) => b.seatNumber);
    const allSeats = Array.from({ length: route.totalSeats }, (_, i) => i + 1);
    const availableSeats = allSeats.filter((s) => !bookedSeatNumbers.includes(s));

    res.status(200).json({ availableSeats, bookedSeats: bookedSeatNumbers, totalSeats: route.totalSeats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch seats', error: error.message });
  }
};  