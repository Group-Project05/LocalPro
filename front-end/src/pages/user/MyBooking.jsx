import React, { useEffect, useState } from "react";
import { LuMessageSquare, LuCheck, LuArrowRight } from "react-icons/lu";

import Api from "../../api";
import MyBookingCard from "./MyBookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await Api.get("/booking/fetch");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="p-10 text-center font-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">My Bookings</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">
              {bookings.length} Total
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="space-y-6">
          {bookings.map((item) => ( <MyBookingCard key={item._id} item={item}/>
            
          ))}

          {bookings.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
               <p className="font-black text-slate-400 uppercase tracking-widest">No requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;