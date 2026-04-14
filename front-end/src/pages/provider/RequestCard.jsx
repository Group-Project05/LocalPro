import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaPhoneAlt,
    FaTimesCircle,
    FaBan,
    FaClock,
    FaChevronRight,
    FaExternalLinkAlt
} from 'react-icons/fa';

const RequestCard = ({ request, onUpdateStatus }) => {
    const { status, _id, user, service, address, bookingDate, slot } = request;

    const getStatusConfig = () => {
        switch (status) {
            case 'pending':
                return { accent: 'from-amber-400 to-orange-500', light: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-amber-100' };
            case 'accepted':
                return { accent: 'from-blue-500 to-indigo-600', light: 'bg-blue-50', text: 'text-blue-700', shadow: 'shadow-blue-100' };
            case 'completed':
                return { accent: 'from-emerald-400 to-teal-600', light: 'bg-emerald-50', text: 'text-emerald-700', shadow: 'shadow-emerald-100' };
            case 'cancelled':
                return { accent: 'from-rose-400 to-red-600', light: 'bg-rose-50', text: 'text-rose-700', shadow: 'shadow-rose-100' };
            default:
                return { accent: 'from-slate-400 to-slate-600', light: 'bg-slate-50', text: 'text-slate-700', shadow: 'shadow-slate-100' };
        }
    };

    const config = getStatusConfig();

    return (
        <div className={`group relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden mb-6 w-full max-w-full mx-auto`}>
            
            {/* Top Status Border */}
            <div className={`h-1 w-full bg-gradient-to-r ${config.accent}`} />

            <div className="flex flex-col lg:grid lg:grid-cols-12">
                
                {/* 1. Profile Section: Col-span-3 */}
                <div className="p-6 lg:col-span-3 bg-slate-50/50 flex flex-row lg:flex-col items-center gap-4 lg:justify-center border-b lg:border-b-0 lg:border-r border-dashed border-slate-200">
                    <div className="relative shrink-0">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&bold=true`} 
                            alt={user.name} 
                            className="w-14 h-14 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl object-cover ring-2 ring-white shadow-md" 
                        />
                        <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase text-white ${config.badge} bg-gradient-to-r ${config.accent}`}>
                            {status}
                        </div>
                    </div>
                    
                    <div className="text-left lg:text-center overflow-hidden">
                        <h4 className="font-bold text-slate-800 text-sm lg:text-base truncate">{user.name}</h4>
                        <a href={`tel:${user.phone}`} className="inline-flex items-center gap-1.5 mt-1 text-indigo-600 text-[11px] font-bold hover:underline">
                            <FaPhoneAlt size={10} /> Contact
                        </a>
                    </div>
                </div>

                {/* 2. Details Section: Col-span-6 */}
                <div className="p-6 lg:col-span-6 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md ${config.light} ${config.text} text-[9px] font-black uppercase tracking-wider`}>
                                {service.category}
                            </span>
                        </div>
                        <h3 className="text-lg lg:text-xl font-black text-slate-900 leading-tight">
                            {service.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 text-slate-500">
                                <FaCalendarAlt className="text-indigo-400" size={14} />
                                <span className="text-xs font-semibold">{new Date(bookingDate).toLocaleDateString('en-GB')} • {slot}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <FaMapMarkerAlt className="text-rose-400" size={14} />
                                <span className="text-xs font-semibold truncate max-w-[150px] md:max-w-xs">{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Service Fee</span>
                            <span className="text-base font-black text-slate-900">₹{service.price.amount}</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <FaExternalLinkAlt size={12} />
                        </button>
                    </div>
                </div>

                {/* 3. Action Section: Col-span-3 */}
                <div className="p-6 lg:col-span-3 bg-slate-50/20 flex flex-col justify-center items-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100">
                    
                    {status === 'pending' && (
                        <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-2">
                            <button
                                onClick={() => onUpdateStatus(_id, 'confirmed')}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md active:scale-95"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => onUpdateStatus(_id, 'rejected')}
                                className="w-full py-3 bg-white text-rose-500 border border-rose-100 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-rose-50 transition-all"
                            >
                                Decline
                            </button>
                        </div>
                    )}

                    {status === 'confirmed' && (
                        <div className="w-full space-y-3">
                            <button
                                onClick={() => onUpdateStatus(_id, 'completed')}
                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-50 hover:brightness-105 transition-all active:scale-95"
                            >
                                Mark Done
                            </button>
                            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter tracking-widest">Active Job</span>
                            </div>
                        </div>
                    )}

                    {['completed', 'cancelled', 'declined'].includes(status) && (
                        <div className={`flex flex-row lg:flex-col items-center gap-3 p-4 rounded-2xl w-full justify-center ${config.light}`}>
                            {status === 'completed' && <FaCheckCircle size={24} className="text-emerald-500" />}
                            {status === 'cancelled' && <FaTimesCircle size={24} className="text-rose-500" />}
                            {status === 'declined' && <FaBan size={24} className="text-slate-400" />}
                            <span className={`text-[10px] font-black uppercase tracking-widest ${config.text}`}>
                                {status}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestCard;