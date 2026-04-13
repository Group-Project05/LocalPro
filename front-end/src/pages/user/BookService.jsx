import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuMapPin, LuCalendar, LuClock, LuArrowLeft } from "react-icons/lu";
import Api from "../../api";

const BookService = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const getDynamicDates = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        return [
            {
                day: today.toLocaleDateString('en-US', { weekday: 'short' }),
                num: today.toLocaleDateString('en-US', { day: '2-digit' }),
                display: today.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }),
                // Backend ke liye ISO format (YYYY-MM-DD)
                isoValue: today.toISOString().split('T')[0] 
            },
            {
                day: tomorrow.toLocaleDateString('en-US', { weekday: 'short' }),
                num: tomorrow.toLocaleDateString('en-US', { day: '2-digit' }),
                display: tomorrow.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }),
                isoValue: tomorrow.toISOString().split('T')[0]
            }
        ];
    };

    const dates = getDynamicDates();

    // States
    const [selectedDate, setSelectedDate] = useState(dates[0]); // Pura object store karenge
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("Flat 402, Skyline Towers, Sector 56, Gurugram");
    const [selectedSlot, setSelectedSlot] = useState("09:00 AM");

    const slots = ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"];

    const handleBooking = async () => {
        if (loading) return;

        setLoading(true);
        try {
            // Mongoose Date schema ke liye yahan isoValue bhej rahe hain
            const bookingData = {
                address,
                bookingDate: selectedDate.isoValue, // e.g., "2026-04-09"
                slot: selectedSlot,
            };

            const res = await Api.post(`/booking/create/${id}`, bookingData);

            if (res.status === 200 || res.status === 201) {
                alert("Booking Successful!");
                navigate("/user"); 
            }
        } catch (err) {
            console.error("Booking Error:", err);
            alert(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-slate-900 antialiased bg-slate-50/50 min-h-screen">
            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                    <div className="xl:col-span-7 space-y-10">
                        {/* Address Section */}
                        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black italic">Service address</h2>
                                <button onClick={() => setIsEditingAddress(!isEditingAddress)} className="text-sm font-bold text-blue-600">
                                    {isEditingAddress ? "Cancel" : "Edit"}
                                </button>
                            </div>
                            {!isEditingAddress ? (
                                <p className="text-slate-500 font-medium px-2">{address}</p>
                            ) : (
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none"
                                    rows="2"
                                />
                            )}
                        </section>

                        {/* Date Selection */}
                        <section>
                            <h2 className="text-xl font-black mb-6">Select Date</h2>
                            <div className="flex gap-4">
                                {dates.map((d) => (
                                    <button
                                        key={d.isoValue}
                                        onClick={() => setSelectedDate(d)}
                                        className={`w-28 p-6 rounded-[2rem] border-2 transition-all ${selectedDate.isoValue === d.isoValue ? "border-blue-600 bg-blue-50" : "border-white bg-white"}`}
                                    >
                                        <p className="text-[10px] font-bold uppercase">{d.day}</p>
                                        <p className="text-2xl font-black">{d.num}</p>
                                    </button>
                                ))}

                                {/* Other Date Input */}
                                <div className="w-32 p-4 rounded-[2rem] border-2 border-dashed border-slate-200 bg-white text-center relative">
                                    <p className="text-[9px] font-black text-slate-400">Other</p>
                                    <input
                                        type="date"
                                        onChange={(e) => setSelectedDate({
                                            display: e.target.value,
                                            isoValue: e.target.value
                                        })}
                                        className="w-full bg-transparent text-xs font-bold text-blue-600 outline-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Slot Selection */}
                        <section>
                            <h2 className="text-xl font-black mb-6">Available Slots</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {slots.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-4 rounded-2xl border-2 transition-all font-black text-sm ${selectedSlot === slot ? "border-blue-600 bg-blue-600 text-white" : "border-white bg-white text-slate-700"}`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Summary Panel */}
                    <div className="xl:col-span-5">
                        <div className="sticky top-28 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Summary</h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <LuCalendar className="text-blue-400" />
                                    <p className="font-bold">{selectedDate.display}</p>
                                </div>
                                <div className="flex gap-4">
                                    <LuClock className="text-blue-400" />
                                    <p className="font-bold text-blue-400">{selectedSlot}</p>
                                </div>
                                <div className="flex gap-4">
                                    <LuMapPin className="text-blue-400" />
                                    <p className="text-xs font-bold text-slate-300">{address}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={loading}
                                className={`w-full mt-12 py-5 text-white rounded-[2rem] font-black text-lg transition-all ${loading ? "bg-slate-700" : "bg-blue-600 hover:bg-blue-500"}`}
                            >
                                {loading ? "PROCESSING..." : "BOOK NOW"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookService;