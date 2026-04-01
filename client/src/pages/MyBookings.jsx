import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const statusStyle = {
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
};

const paymentStyle = {
  paid: "text-green-600",
  pending: "text-yellow-500",
  refunded: "text-blue-500",
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("/api/bookings", { headers });
        setBookings(data?.bookings || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage({ text: "Failed to load bookings", type: "error" });
        setBookings([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(id);
    try {
      await axios.put(`/api/bookings/${id}/cancel`, {}, { headers });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "cancelled", paymentStatus: "refunded" } : b
        )
      );
      setMessage({ text: "Booking cancelled. Refund will be processed.", type: "success" });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Cancellation failed", type: "error" });
    } finally {
      setCancellingId(null);
    }
  };

  // --- SAFE LOGIC SECTION ---
  // We use (bookings || []) to ensure we never call .filter on undefined
  const safeBookings = bookings || [];

  const filtered = filter === "all" 
    ? safeBookings 
    : safeBookings.filter((b) => b?.status === filter);

  const stats = {
    total: safeBookings.length,
    confirmed: safeBookings.filter((b) => b?.status === "confirmed").length,
    cancelled: safeBookings.filter((b) => b?.status === "cancelled").length,
    completed: safeBookings.filter((b) => b?.status === "completed").length,
  };
  // ---------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ Travel History
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            My <span className="text-cyan-400">Bookings</span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Total", value: stats.total, color: "text-white" },
              { label: "Confirmed", value: stats.confirmed, color: "text-green-400" },
              { label: "Completed", value: stats.completed, color: "text-cyan-400" },
              { label: "Cancelled", value: stats.cancelled, color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="bg-white bg-opacity-5 rounded-xl p-4 text-center border border-white border-opacity-10">
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
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

        <div className="flex gap-3 mb-8 flex-wrap">
          {["all", "confirmed", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl font-semibold text-sm capitalize transition-all ${
                filter === f
                  ? "bg-cyan-500 text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-cyan-300"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={() => navigate("/booking")}
            className="ml-auto bg-gray-900 text-white font-bold px-5 py-2 rounded-xl hover:bg-gray-800 transition-all text-sm"
          >
            + New Booking
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered?.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-400 mb-6">You haven't made any bookings yet.</p>
            <button
              onClick={() => navigate("/booking")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-xl transition-all"
            >
              Book Your First Ride →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered?.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-bold text-gray-900 text-lg">
                        {booking.busRoute?.routeNumber || "N/A"}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold border capitalize ${statusStyle[booking.status] || "bg-gray-100"}`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{booking.bookingRef}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                      <span>{booking.busRoute?.origin || "Unknown"}</span>
                      <span className="text-cyan-400">→</span>
                      <span>{booking.busRoute?.destination || "Unknown"}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3">
                      <div>
                        <p className="text-gray-400 text-xs">Journey Date</p>
                        <p className="font-semibold text-gray-700">
                          {booking.journeyDate ? new Date(booking.journeyDate).toDateString() : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Seat</p>
                        <p className="font-bold text-cyan-600">#{booking.seatNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Fare</p>
                        <p className="font-semibold text-gray-700">₹{booking.fare}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Payment</p>
                        <p className={`font-semibold capitalize ${paymentStyle[booking.paymentStatus] || "text-gray-500"}`}>
                          {booking.paymentStatus}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      {booking.boardingStop} → {booking.droppingStop}
                    </div>
                  </div>

                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="shrink-0 border border-red-200 text-red-500 hover:bg-red-50 font-semibold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
                    >
                      {cancellingId === booking._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;