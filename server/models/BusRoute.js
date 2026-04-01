import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  arrivalTime: { type: String },
  distanceFromOrigin: { type: Number },
});

const busRouteSchema = new mongoose.Schema(
  {
    routeNumber: { type: String, required: true, unique: true },
    routeName: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    stops: [stopSchema],
    totalSeats: { type: Number, default: 40 },
    fare: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    frequency: { type: String, default: 'Every 30 mins' },
    isActive: { type: Boolean, default: true },
    busType: { type: String, enum: ['AC', 'Non-AC', 'Express', 'Local'], default: 'Local' },
    daysOperating: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('BusRoute', busRouteSchema);