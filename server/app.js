import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import busRoutes from './routes/busRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'RideForYou API is running smooth.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/bus-routes', busRoutes);
app.use('/api/notifications', notificationRoutes);

export default app;