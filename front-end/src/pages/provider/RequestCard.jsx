import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaPhoneAlt
} from 'react-icons/fa';

const RequestCard = ({ request, onUpdateStatus }) => {
    console.log(request)
    const { status, _id, user, service, address, bookingDate, slot } = request;

    // Dynamic border logic
    const getBorderColor = () => {
        if (status === 'pending') return 'border-amber-100';
        if (status === 'accepted') return 'border-blue-100';
        return 'border-emerald-100';
    };

    const getBadgeColor = () => {
        if (status === 'pending') return 'bg-amber-500';
        if (status === 'accepted') return 'bg-blue-600';
        return 'bg-emerald-500';
    };
    return (
        <div className={`group bg-white rounded-3xl border-2 ${getBorderColor()} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
            <div className="flex flex-col lg:flex-row">

                {/* Left Side: User Info */}
                <div className="p-6 lg:w-64 bg-slate-50/50 flex flex-col items-center justify-center border-r border-slate-100">
                    <div className="relative">
                        <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-3xl object-cover shadow-md" />
                        <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm text-white ${getBadgeColor()}`}>
                            {status}
                        </div>
                    </div>
                    <h4 className="font-bold text-slate-800 mt-4">{user.name}</h4>
                    <a href={`tel:${user.phone}`} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                        <FaPhoneAlt className="text-[10px]" />  {user?.phone || "No Phone Provided"}
                    </a>
                </div>

                {/* Middle: Service Details */}
                <div className="p-8 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <div>
                            <h3 className="text-xl font-black text-slate-800">{service.title}</h3>
                            <p className="text-slate-500 text-sm italic">{service.category}</p>
                        </div>

                        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <FaCalendarAlt />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Requested For</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {/* This converts "2026-04-12T10:30:00Z" to "12/4/2026" or similar */}
                                    {new Date(bookingDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })} @ {slot}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-slate-400" />
                            <span className="text-sm text-slate-600 font-medium">{address}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-slate-400">Rate: </span>
                            <span className="text-lg font-black text-slate-900">Rs. {service.price.amount}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="p-6 lg:w-52 bg-slate-50/30 flex flex-col items-center justify-center gap-3 border-l border-slate-50">

                    {status === 'pending' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(_id, 'accepted')}
                                className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                            >
                                Accept Request
                            </button>
                            <button
                                onClick={() => onUpdateStatus(_id, 'declined')}
                                className="w-full py-3 bg-white text-red-500 border border-red-100 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all"
                            >
                                Decline
                            </button>
                        </>
                    )}

                    {status === 'accepted' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(_id, 'completed')}
                                className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all"
                            >
                                Mark as Completed
                            </button>
                            <p className="text-[10px] text-slate-400 text-center font-medium mt-2 animate-pulse">In Progress...</p>
                        </>
                    )}

                    {status === 'completed' && (
                        <div className="flex flex-col items-center text-emerald-600">
                            <FaCheckCircle className="text-4xl mb-2" />
                            <span className="text-xs font-black uppercase tracking-widest">Finished</span>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default RequestCard;