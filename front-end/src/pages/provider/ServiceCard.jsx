import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaMapMarkerAlt, FaStar, FaHistory } from "react-icons/fa";

const ServiceCard = ({ service, dltService }) => {
  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.images || "https://via.placeholder.com/400x300?text=Service+Image"}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Category Badge - Glassmorphism */}
        <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-teal-700 border border-white/50 shadow-sm">
          {service.category}
        </div>

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-md text-teal-600 rounded-2xl shadow-lg border border-white">
            <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse"></div>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            <h3 className="font-black text-slate-800 text-xl leading-tight group-hover:text-teal-600 transition-colors line-clamp-2 italic">
              {service.title}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-slate-900 tracking-tighter">
              ₹{service.price?.amount || "0"}
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              {service.price?.chargeType || "/ Visit"}
            </p>
          </div>
        </div>

        <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-5 leading-relaxed">
          {service.description}
        </p>

        {/* Location Info */}
        <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <FaMapMarkerAlt className="text-teal-500 mr-2" size={14} />
          <span className="truncate">
            {service.location?.city}, {service.location?.state}
          </span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
              <FaStar size={12} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Rating</p>
              <p className="font-black text-slate-800 text-sm">4.9</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <FaHistory size={12} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Jobs</p>
              <p className="font-black text-slate-800 text-sm">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-slate-50/50 flex gap-3">
        <Link
          to={`/provider/edit/${service._id}`}
          className="flex-grow flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-black uppercase tracking-widest hover:border-teal-500 hover:text-teal-600 transition-all active:scale-95 shadow-sm"
        >
          <FaEdit size={14} /> Edit
        </Link>

        <button
          onClick={() => dltService(service._id)}
          type="button"
          className="px-5 py-3 bg-white border border-slate-200 text-red-500 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95 shadow-sm"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;