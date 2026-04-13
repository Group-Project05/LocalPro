import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuMessageSquare, LuCheck, LuX } from "react-icons/lu";
import api from "../../api"; // Make sure path and export name are correct

const MyBookingCard = ({ item }) => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(item.status);

  if (!item || !item._id) return null;

  const isRejected = currentStatus === 'rejected';
  const isCancelled = currentStatus === 'cancelled';
  const isInactive = isRejected || isCancelled;

  const onCancel = async (bookingId) => {
    try {
      if (!window.confirm("Cancel this request?")) return;
      
      await api.put(`/booking/status/${bookingId}`, { status: "cancelled" });
      setCurrentStatus("cancelled"); 
    } catch (error) {
      console.error("Cancel Error:", error);
      alert("Failed to cancel");
    }
  };

  // Helper function to handle status colors based on currentStatus
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-400';
      case 'confirmed': return 'bg-blue-500';
      case 'completed': return 'bg-emerald-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className={`bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all mb-6 ${isInactive ? 'opacity-80' : ''}`}>
      
      {/* Top Section */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={Array.isArray(item.service?.images) ? item.service.images[0] : (item.service?.images || "https://via.placeholder.com/150")} 
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover ${isInactive ? 'grayscale opacity-50' : ''}`} 
              alt="service"
            />
            {/* UPDATED: item.status changed to currentStatus */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${getStatusColor(currentStatus)}`} />
          </div>
          <div>
            <h3 className={`font-black text-base md:text-lg leading-tight uppercase ${isInactive ? 'text-slate-500' : 'text-slate-900'}`}>
              {item.service?.category || "Service"}
              {isRejected && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full lowercase font-bold tracking-normal">rejected</span>}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {item.provider?.name || "Provider Name"}
            </p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col justify-between md:items-end">
          <p className="text-[10px] font-black text-slate-400 uppercase">Scheduled For</p>
          <p className={`text-xs md:text-sm font-black ${isInactive ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'N/A'} • {item.slot || 'TBD'}
          </p>
        </div>
      </div>

      {/* Progress or Status Message */}
      <div className="px-6 md:px-8 pb-8">
        {isInactive ? (
          <div className={`rounded-[1.5rem] p-4 flex items-center gap-3 border ${isRejected ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
            <LuX className={`w-5 h-5 ${isRejected ? 'text-red-500' : 'text-slate-400'}`} />
            <div>
              <p className={`text-[10px] font-black uppercase ${isRejected ? 'text-red-600' : 'text-slate-500'}`}>
                {isRejected ? "Request Rejected by Provider" : "Request Cancelled"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-[1.5rem] p-5">
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2"></div>
              
              {/* Step 1 - UPDATED to currentStatus */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${currentStatus !== 'pending' ? 'bg-blue-600 text-white' : 'bg-amber-400 text-white shadow-lg shadow-amber-200'}`}>
                  {currentStatus !== 'pending' ? <LuCheck /> : "1"}
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase">Pending</span>
              </div>

              {/* Step 2 - UPDATED to currentStatus */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${currentStatus === 'confirmed' ? 'bg-blue-600 text-white shadow-lg' : currentStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {currentStatus === 'completed' ? <LuCheck /> : "2"}
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase">Confirmed</span>
              </div>

              {/* Step 3 - UPDATED to currentStatus */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${currentStatus === 'completed' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                  3
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase">Completed</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 md:px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-tighter">
          Request ID: #{String(item._id).toUpperCase().slice(-8)}
        </p>

        <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">
          {currentStatus === 'pending' && (
            <button 
              onClick={() => onCancel(item._id)}
              className="px-4 md:px-6 py-2 bg-white border border-slate-200 text-red-500 text-[9px] md:text-[10px] font-black uppercase rounded-xl hover:bg-red-50 transition-colors"
            >
              Cancel Request
            </button>
          )}

          {currentStatus === 'completed' && (
            <button onClick={()=> navigate(`/user/booking/review/${item._id}`)} className="px-4 md:px-6 py-2 bg-blue-600 text-white text-[9px] md:text-[10px] font-black uppercase rounded-xl shadow-lg">
              Give Review
            </button>
          )}

          <button className={`p-2 bg-white border border-slate-200 rounded-xl transition-colors ${isInactive ? 'text-slate-300' : 'text-slate-400 hover:text-blue-600'}`}>
            <LuMessageSquare className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;