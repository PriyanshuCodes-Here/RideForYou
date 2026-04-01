import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [journeyDate, setJourneyDate] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [boardingStop, setBoardingStop] = useState("");
  const [droppingStop, setDroppingStop] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingSeats, setFetchingSeats] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await axios.get("/api/bus-routes");
        setRoutes(data.routes);
      } catch {
        setMessage({ text: "Failed to load routes", type: "error" });
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (selectedRoute && journeyDate) {
      const fetchSeats = async () => {
        setFetchingSeats(true);
        try {
          const { data } = await axios.get(
            `/api/bookings/seats?busRouteId=${selectedRoute._id}&journeyDate=${journeyDate}`
          );
          setAvailableSeats(data.availableSeats);
          setBookedSeats(data.bookedSeats);
        } catch {
          setMessage({ text: "Failed to load seats", type: "error" });
        } finally {
          setFetchingSeats(false);
        }
      };
      fetchSeats();
    }
  }, [selectedRoute, journeyDate]);

  const handleBooking = async () => {
    if (!selectedSeat || !boardingStop || !droppingStop) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/bookings",
        {
          busRouteId: selectedRoute._id,
          seatNumber: selectedSeat,
          journeyDate,
          boardingStop,
          droppingStop,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: "Booking confirmed! Check My Bookings.", type: "success" });
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Booking failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ Book Your Ride
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Reserve Your <span className="text-cyan-400">Seat Now</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Select your route, pick a date and grab your seat in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-10 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-1 rounded ${step > s ? "bg-cyan-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Route & Date</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Bus Route</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  onChange={(e) => {
                    const r = routes.find((r) => r._id === e.target.value);
                    setSelectedRoute(r || null);
                    setSelectedSeat(null);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Choose a route...</option>
                  {routes?.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.routeNumber} — {r.origin} → {r.destination}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Journey Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            {selectedRoute && (
              <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Type</p>
                    <p className="font-bold text-gray-800">{selectedRoute.busType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Fare</p>
                    <p className="font-bold text-cyan-600">₹{selectedRoute.fare}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Departure</p>
                    <p className="font-bold text-gray-800">{selectedRoute.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Frequency</p>
                    <p className="font-bold text-gray-800">{selectedRoute.frequency}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!selectedRoute || !journeyDate}
              className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-all"
            >
              Continue to Seat Selection →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Select Your Seat</h2>
            <p className="text-gray-400 text-sm mb-6">
              {selectedRoute?.routeNumber} — {selectedRoute?.origin} → {selectedRoute?.destination} |{" "}
              {new Date(journeyDate).toDateString()}
            </p>

            {fetchingSeats ? (
              <div className="text-center py-12 text-gray-400">Loading seat map...</div>
            ) : (
              <>
                <div className="flex gap-5 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-green-100 border border-green-300" /> Available
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-red-100 border border-red-300" /> Booked
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-cyan-500" /> Selected
                  </div>
                </div>

                <div className="grid grid-cols-8 gap-2 mb-8">
                  {Array.from({ length: selectedRoute?.totalSeats || 40 }, (_, i) => i + 1).map((seat) => {
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeat === seat;
                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        onClick={() => setSelectedSeat(seat)}
                        className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                          isBooked
                            ? "bg-red-100 text-red-300 cursor-not-allowed border border-red-200"
                            : isSelected
                            ? "bg-cyan-500 text-white shadow-md"
                            : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedSeat}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Confirm Your Booking</h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Route</span>
                <span className="font-semibold text-gray-800">
                  {selectedRoute?.routeNumber} — {selectedRoute?.origin} → {selectedRoute?.destination}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-gray-800">{new Date(journeyDate).toDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seat</span>
                <span className="font-bold text-cyan-600">#{selectedSeat}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fare</span>
                <span className="font-bold text-gray-800">₹{selectedRoute?.fare}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Boarding Stop</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={boardingStop}
                  onChange={(e) => setBoardingStop(e.target.value)}
                >
                  <option value="">Select boarding stop</option>
                  {selectedRoute?.stops?.map((stop) => (
                    <option key={stop.name} value={stop.name}>{stop.name}</option>
                  ))}
                  <option value={selectedRoute?.origin}>{selectedRoute?.origin} (Origin)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Dropping Stop</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={droppingStop}
                  onChange={(e) => setDroppingStop(e.target.value)}
                >
                  <option value="">Select dropping stop</option>
                  {selectedRoute?.stops?.map((stop) => (
                    <option key={stop.name} value={stop.name}>{stop.name}</option>
                  ))}
                  <option value={selectedRoute?.destination}>{selectedRoute?.destination} (Destination)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-all"
              >
                {loading ? "Confirming..." : "Confirm Booking ✓"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;