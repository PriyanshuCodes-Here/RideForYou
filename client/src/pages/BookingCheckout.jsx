import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Clock, Calendar, 
  Users, Tag, ShieldCheck, CreditCard, 
  Smartphone, Building, Info, CheckCircle2 
} from 'lucide-react';

// --- MOCK DATA FOR CHECKOUT ---
const tripDetails = {
  routeId: "R-104",
  busType: "Volvo AC Sleeper",
  from: "Connaught Place (Gate 3)",
  to: "Anand Vihar ISBT",
  date: "Monday, 30 March 2026",
  departure: "10:00 AM",
  arrival: "11:15 AM",
  seats: ["12A", "12B"],
  basePricePerSeat: 150
};

export default function BookingCheckout() {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fare Calculations
  const totalBasePrice = tripDetails.seats.length * tripDetails.basePricePerSeat;
  const taxes = totalBasePrice * 0.05; // 5% GST
  const platformFee = 15;
  const discount = promoApplied ? 50 : 0;
  const finalTotal = totalBasePrice + taxes + platformFee - discount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'RIDE50') {
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful! Generating Ticket...');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-3xl font-black text-slate-900">Secure Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Trip Details & Payment */}
          <div className="flex-1 space-y-6">
            
            {/* Trip Summary Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{tripDetails.busType}</h2>
                  <p className="text-sm font-medium text-slate-500">Route ID: {tripDetails.routeId}</p>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wider">Selected Seats</span>
                  <p className="text-lg font-bold text-blue-900 text-right">{tripDetails.seats.join(', ')}</p>
                </div>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-slate-200">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white bg-blue-500 shadow-sm"></div>
                  <p className="text-lg font-bold text-slate-800">{tripDetails.from}</p>
                  <p className="text-sm font-medium text-slate-500">{tripDetails.departure} • {tripDetails.date}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white bg-cyan-500 shadow-sm"></div>
                  <p className="text-lg font-bold text-slate-800">{tripDetails.to}</p>
                  <p className="text-sm font-medium text-slate-500">{tripDetails.arrival} • {tripDetails.date}</p>
                </div>
              </div>
            </div>

            {/* Passenger Details Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-400" /> Passenger Details
              </h3>
              
              <div className="space-y-4">
                {tripDetails.seats.map((seat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Seat</span>
                      <span className="text-sm font-black text-blue-600">{seat}</span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder={`Passenger ${idx + 1} Name`} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none" />
                      <div className="flex gap-2">
                        <input type="number" placeholder="Age" className="w-20 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none" />
                        <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Accordion */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" /> Payment Method
              </h3>
              
              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                      <Smartphone className={`w-5 h-5 ${paymentMethod === 'upi' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className={`font-bold ${paymentMethod === 'upi' ? 'text-blue-900' : 'text-slate-700'}`}>UPI / QR Code</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200">GPay</span>
                      <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200">Paytm</span>
                    </div>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className={`font-bold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-700'}`}>Credit / Debit Card</span>
                  </div>
                </label>

                {/* Net Banking Option */}
                <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <Building className={`w-5 h-5 ${paymentMethod === 'netbanking' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className={`font-bold ${paymentMethod === 'netbanking' ? 'text-blue-900' : 'text-slate-700'}`}>Net Banking</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Fare Breakdown & Pay Button */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Promo Code Box */}
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      disabled={promoApplied}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm uppercase font-bold text-slate-700 focus:border-blue-500 outline-none disabled:opacity-50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={promoApplied || !promoCode}
                    className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>
                {promoApplied && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Code 'RIDE50' applied successfully!
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Fare Details</h3>
                
                <div className="space-y-3 text-sm font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>Base Fare ({tripDetails.seats.length} seats)</span>
                    <span className="font-bold text-slate-800">₹{totalBasePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & GST (5%)</span>
                    <span className="font-bold text-slate-800">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">Platform Fee <Info className="w-3 h-3 text-slate-400" /></span>
                    <span className="font-bold text-slate-800">₹{platformFee}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span className="font-bold">-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-slate-200 my-4"></div>

                <div className="flex justify-between items-end mb-6">
                  <span className="text-slate-500 font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-blue-600">₹{finalTotal}</span>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    `Pay ₹${finalTotal}`
                  )}
                </button>
                <p className="text-center text-xs font-medium text-slate-400 mt-4 flex justify-center items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Safe and secure payments
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}