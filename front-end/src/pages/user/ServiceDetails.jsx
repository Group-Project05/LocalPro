import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateFav } from "../../store/slice/favReducer";
import ReviewCard from "./ReviewCard";
import api from "../../api";
import {
    FiCalendar,
    FiMail,
    FiPhone,
    FiArrowLeft,
    FiHeart,
    FiCheckCircle,
    FiStar,
    FiChevronDown
} from "react-icons/fi"; // Imported missing icons


const ServiceDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serviceId = useParams();
    const [service, setService] = useState({});
    const [reviews, setReview] = useState([]);
    const fvrt = useSelector(state => state.favorites.items) || [];

    useEffect(() => {
        api.get(`service/detail/${serviceId.id}`).then((res) => setService(res.data))
    }, [])

    const isFavorite = fvrt.some(id => String(id) === String(service._id));

    const addFavourite = async (data) => {
        try {
            const res = await api.post('/user/favorites', { serviceId: data });
            if (res.data && res.data.fvrtArray) {
                dispatch(updateFav(res.data.fvrtArray));
            }
        } catch (err) {
            console.error("Error adding favorite:", err);
        }
    }

    useEffect(() => {
        api.get('/user/favorites').then((res) => dispatch(updateFav(res.data.fvrtArray)));
    }, [])

     useEffect(() => {
        api.get(`/review/service/${serviceId.id}`).then((res) => (setReview(res.data)));
    }, [])

    const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

    return (
        <>
            <div className="bg-[#F8FaFC] text-slate-900 min-h-screen">
                {/* Navigation */}
                <nav className=" bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 h-20 flex items-center justify-between">
                    {/* FIXED: Changed onclick to onClick and used navigate(-1) */}
                    <div
                        className=" font-bold text-slate-500 hover:text-blue-600 uppercase"
                    >
                         {service.category}
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-red-50 text-red-500 font-bold text-sm border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            onClick={() => addFavourite(service._id)}>

                            <FiHeart className={`w-4 h-4 ${isFavorite ? "fill-current" : "fill-none"}`} /> <span className="max-md: hidden">{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                        </button>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">

                        {/* Left Column: Content */}
                        <div className="xl:col-span-7">
                            <div className="rounded-[3rem] overflow-hidden bg-slate-200 aspect-auto mb-10 shadow-2xl">
                                <img
                                    src={service.images}
                                    className="w-full h-full object-cover object-top"
                                    alt="Service"
                                />
                            </div>

                            <div className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <FiCheckCircle className="w-3 h-3" /> Verified Expert
                                    </span>
                                    <span className="text-slate-400 font-bold text-sm">{service?.location?.street},{service?.location?.city}
                                    </span>
                                </div>
                                <h1 className="text-5xl font-black text-slate-900 leading-tight mb-8">
                                    {service.title}
                                </h1>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Experience</p>
                                        <p className="font-bold text-slate-800">8+ Years</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Jobs Done</p>
                                        <p className="font-bold text-slate-800">248</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rating</p>
                                        <p className="font-bold text-slate-800 flex items-center gap-1">
                                            <FiStar className="w-4 h-4 text-amber-500 fill-current" /> {averageRating}/5
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Address</p>
                                        <p className="font-bold text-slate-800 truncate">{service.location?.city},{service?.location?.state}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="mb-12">
                                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                    Client Reviews <span className="text-slate-300 text-lg font-medium">{reviews.length || "0"}</span>
                                </h3>

                                <div id="reviews-container" className="space-y-4">
                                    {reviews.map((r) => (
                                        <ReviewCard key={r._id} review={r} />
                                    ))}
                                </div>

                                <button className="mt-8 w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                                    View all Reviews <FiChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="xl:col-span-5">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-white rounded-[2.5rem] px-5 py-10 xl:px-5 xl:py-10 border border-slate-100 shadow-2xl shadow-blue-100/50">
                                    <div className="mb-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Fee</p>
                                        <h2 className="text-5xl font-black text-slate-900">Rs.{service.price?.amount} <span className="text-lg font-bold text-slate-300">{service.price?.chargeType}</span></h2>
                                    </div>

                                    <Link to="/user/book/service" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 mb-6 flex items-center justify-center gap-3">
                                        Book This Service <FiCalendar className="text-2xl" />
                                    </Link>

                                    <div className="space-y-4 pt-6 border-t border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Contact</p>

                                        <a href="tel:+919876543210" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <FiPhone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Mobile</p>
                                                <p className="font-bold text-slate-800">+91 {service.provider?.phone}</p>
                                            </div>
                                        </a>

                                        <a href="mailto:sahilrao1597@gmail.com" className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <FiMail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Gmail</p>
                                                <p className="font-bold text-slate-800 text-sm break-all">{service.provider?.email}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[2.5rem] px-5 py-10 xl:px-5 xl:py-10 border border-slate-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-3xl shadow-lg overflow-hidden">
                                            <img src={`https://ui-avatars.com/api/?name=${service.provider?.name || "User"}`} className="w-full h-full object-cover " />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900">{service.provider?.name}</h4>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Professional Pro</p>
                                        </div>
                                    </div>
                                    <Link to={`/user/provider/profile/${service.provider?._id}`} className="block text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                                        View Full Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ServiceDetails;