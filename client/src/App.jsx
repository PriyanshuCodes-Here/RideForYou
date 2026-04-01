import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TrackBus from "./pages/TrackBus";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Verify from "./pages/Verify";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <div className="app-container pt-28">
      {" "}
      {}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trackbus" element={<TrackBus />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}
