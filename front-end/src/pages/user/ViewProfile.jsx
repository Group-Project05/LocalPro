import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import InProfileServiceCard from "./InProfileServiceCard";
import ReviewCard from "./ReviewCard";
import { FaStar, FaPhoneAlt, FaEnvelope, FaChevronLeft, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

const ViewProfile = () => {
  const navigate = useNavigate();
  const  providerId  = useParams(); 

  const [provider, setProvider] = useState(null);
  const [providerService, setProviderService] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(providerId.id)
        const [profRes, serviceRes, reviewRes] = await Promise.all([
          api.get(`/profile/${providerId.id}`),
          api.get(`/service/ofprovider/${providerId.id}`),
          api.get(`/review/provider/${providerId.id}`)
        ]);
        setProvider(profRes.data);
        setProviderService(serviceRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Error fetching profile data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [providerId]);

  console.log(provider)
  console.log(providerService)
  console.log(reviews)
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest animate-pulse">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* Dynamic Navigation */}
      {/* <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-3 transition-all">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 group-hover:border-blue-500 group-hover:text-blue-600 transition-all">
              <FaChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900">Return</span>
          </button>
          <div className="px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-nowrap">Service Provider Active</span>
          </div>
        </div>
      </nav> */}

      {/* Hero Header */}
      <div className="relative bg-slate-900 pt-10 pb-23 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={`https://ui-avatars.com/api/?name=${provider?.name}&background=0D8ABC&color=fff&size=256`} 
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-[3.2rem] object-cover border-4 border-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              alt="Provider" 
            />
            <div className="absolute bottom-4 right-4 p-2 bg-blue-600 rounded-2xl border-4 border-slate-950 text-white shadow-xl">
              <FaCheckCircle className="w-5 h-5" />
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-5xl md:text-5xl font-black text-white  ">
                {provider?.name}
              </h1>
              <p className="text-blue-400 font-bold tracking-widest uppercase text-xs">{provider?.email}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-5 py-2 bg-white/5 backdrop-blur-md rounded-2xl text-blue-100 text-[10px] font-black uppercase tracking-[0.15em] border border-white/10">Expert Professional</span>
              <span className="px-5 py-2 bg-emerald-500/10 backdrop-blur-md rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-[0.15em] border border-emerald-500/20">Identity Verified</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Column: Bio & Services */}
        <div className="xl:col-span-7 space-y-12">
          
          {/* About Section */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <FaQuoteLeft className="text-9xl" />
             </div>
            <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-blue-600"></span> Professional Background
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
              "{provider?.bio || "This professional prefers to let their work speak for itself. No bio provided yet."}"
            </p>
          </div>

          {/* Services Grid */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Catalog</h3>
               <span className="h-px flex-1 bg-slate-200 mx-6"></span>
               <span className="text-[10px] font-bold text-slate-400 italic">{providerService.length} Items</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {providerService.map((s) => <InProfileServiceCard key={s._id} service={s} />)}
            </div>
          </section>

          {/* Feedback Section */}
          <section className="space-y-8">
             <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 text-center">Recent Client Experiences</h3>
             <div className="grid grid-cols-1 gap-6">
                {reviews.length > 0 ? reviews.map((r) => (
                  <ReviewCard key={r._id} review={r}/>
                )) : (
                  <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Feedback Yet</p>
                  </div>
                )}
             </div>
          </section>
        </div>

        {/* Right Sidebar: Stats & Contact */}
        <div className="xl:col-span-5 space-y-8">
          
          {/* Rating Card */}
          <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 relative z-10">Overall Performance</p>
            <div className="text-8xl font-black text-slate-900 leading-none tracking-tighter relative z-10">{averageRating}</div>
            <div className="flex justify-center gap-1 my-6 relative z-10 text-amber-400">
               <FaStar className="w-5 h-5" /> <FaStar className="w-5 h-5" /> <FaStar className="w-5 h-5" /> <FaStar className="w-5 h-5" /> <FaStar className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest relative z-10">Trusted by {reviews.length} Clients</p>
          </div>

          {/* Contact Card */}
          <div className="bg-slate-950 px-5 py-10  rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Reach Out</h3>
            <div className="space-y-6">
              <a href={`tel:${provider?.phone}`} className="flex items-center gap-5 group">
                <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <FaPhoneAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mobile</p>
                  <p className="text-sm font-bold tracking-tight text-white">{provider?.phone || "+91 XXXXX XXXXX"}</p>
                </div>
              </a>
              <a href={`mailto:${provider?.email}`} className="flex items-center gap-5 group">
                <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-bold tracking-tight text-white truncate ">{provider?.email}</p>
                </div>
              </a>
            </div>
            <button className=" mt-10 py-5 w-full bg-white text-slate-950 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all duration-500">
                Book Consultation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewProfile;