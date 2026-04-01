import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const iconMap = {
  booking_confirmed: "✅",
  booking_cancelled: "❌",
  route_delay: "⚠️",
  promo: "🎉",
  general: "🔔",
};

const badgeColor = {
  booking_confirmed: "bg-green-100 text-green-700",
  booking_cancelled: "bg-red-100 text-red-700",
  route_delay: "bg-yellow-100 text-yellow-700",
  promo: "bg-purple-100 text-purple-700",
  general: "bg-blue-100 text-blue-700",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/notifications", { headers });
      // Safety: fallback to empty array/zero if API response is weird
      setNotifications(data?.notifications || []);
      setUnreadCount(data?.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]); // Emergency fallback to prevent .map crashes
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`, {}, { headers });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put("/api/notifications/read-all", {}, { headers });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, { headers });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification");
    }
  };

  // Filter with safety check
  const filtered = filter === "unread"
    ? (notifications || []).filter((n) => !n.isRead)
    : (notifications || []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            ✦ Stay Updated
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                Your <span className="text-cyan-400">Notifications</span>
              </h1>
              <p className="text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="hidden md:block border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold px-5 py-2 rounded-xl transition-all text-sm"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex gap-3 mb-8">
          {["all", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl font-semibold text-sm capitalize transition-all ${
                filter === f
                  ? "bg-cyan-500 text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-cyan-300"
              }`}
            >
              {f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}
            </button>
          ))}
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="md:hidden ml-auto border border-cyan-400 text-cyan-500 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-cyan-50 transition-all"
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered?.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No notifications</h3>
            <p className="text-gray-400">You're all caught up. Check back later.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered?.map((n) => (
              <div
                key={n._id}
                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
                  !n.isRead ? "border-cyan-200 shadow-cyan-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">{iconMap[n.type] || "🔔"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className={`font-bold ${!n.isRead ? "text-gray-900" : "text-gray-600"}`}>
                        {n.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[n.type] || "bg-gray-100"}`}>
                        {n.type?.replace("_", " ") || "alert"}
                      </span>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 ml-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{n.message}</p>
                    <p className="text-xs text-gray-300">
                      {n.createdAt ? new Date(n.createdAt).toLocaleString() : "Just now"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {!n.isRead && (
                      <button
                        onClick={() => markRead(n._id)}
                        className="text-xs text-cyan-500 hover:text-cyan-700 font-semibold whitespace-nowrap"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n._id)}
                      className="text-xs text-gray-300 hover:text-red-400 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
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

export default Notifications;