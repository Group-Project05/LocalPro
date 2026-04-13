import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/authReducer";
import { useEffect, useState } from "react";
import api from "../../api";
import { 
  FaSuitcase, 
  FaClipboardList, 
  FaUserCog, 
  FaSignOutAlt, 
  FaChevronLeft, 
  FaChartLine 
} from "react-icons/fa";

const ProviderLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  
  const [activeRequests, setActiveRequests] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestRes, serviceRes] = await Promise.all([
          api.get("/booking/request"),
          api.get("/provider/myservice") // Adjust endpoint as per your API
        ]);
        
        // Filter for requests that need action
        const pending = requestRes.data.filter(r => r.status === "pending" || r.status === "accepted");
        setActiveRequests(pending.length);
        setTotalServices(serviceRes.data.length || 0);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const isNotDashboard = location.pathname !== "/provider";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased selection:bg-teal-100 selection:text-teal-700">
      
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 lg:hidden">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isNotDashboard && (
              <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600 hover:text-teal-600 transition-colors">
                <FaChevronLeft className="text-lg" />
              </button>
            )}
            <Link to="/provider" className="text-2xl font-black text-slate-900 tracking-tighter italic">LocalPro</Link>
          </div>
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D9488&color=fff`} 
            className="w-8 h-8 rounded-full border border-slate-200" 
            alt="provider" 
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-[300px] lg:sticky lg:top-10 lg:h-[calc(100vh-80px)] overflow-y-auto space-y-6 p-1 [scrollbar-width:none]">
            
            {/* Provider Branding Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500 rounded-full blur-[80px] opacity-20 transition-all group-hover:opacity-40"></div>
              <div className="relative z-10 space-y-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=0d9488&color=fff`} 
                  className="w-16 h-16 rounded-2xl border-2 border-white/10 object-cover shadow-xl" 
                  alt="avatar" 
                />
                <div>
                  <h2 className="text-xl font-black tracking-tight">{user?.name || "Provider"}</h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 opacity-80">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats (Provider Context) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Jobs</p>
                <p className="text-2xl font-black text-slate-900">{activeRequests}</p>
              </div>
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Listed</p>
                <p className="text-2xl font-black text-slate-900">{totalServices}</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-[2.5rem] border border-slate-100 p-3 shadow-sm space-y-1.5">
              <Link to="/provider/create" className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive('/provider') ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-all ${isActive('/provider') ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-slate-100 text-slate-600 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    <FaChartLine className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest ${isActive('/provider') ? 'text-teal-700' : 'text-slate-600'}`}>Dashboard</span>
                </div>
              </Link>

              <Link to="/provider/my-service" className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive('/provider/my-service') ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-all ${isActive('/provider/my-service') ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-slate-100 text-slate-600 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    <FaSuitcase className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest ${isActive('/provider/my-service') ? 'text-teal-700' : 'text-slate-600'}`}>My Services</span>
                </div>
              </Link>

              <Link to="/provider/service/request" className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive('/provider/service/request') ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-all ${isActive('/provider/service/request') ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-slate-100 text-slate-600 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    <FaClipboardList className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest ${isActive('/provider/service/request') ? 'text-teal-700' : 'text-slate-600'}`}>Requests</span>
                </div>
              </Link>

              <Link to="/provider/profile" className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive('/provider/profile') ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-all ${isActive('/provider/profile') ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'}`}>
                    <FaUserCog className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest ${isActive('/provider/profile') ? 'text-white' : 'text-slate-600'}`}>Settings</span>
                </div>
              </Link>

              <div className="pt-4 px-2 border-t border-slate-50">
                <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 hover:bg-red-500 hover:text-white transition-all text-red-600 group">
                  <FaSignOutAlt className="w-4 h-4" />
                  <span className="text-sm font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Sticky Hero Branding Header */}
            <div className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md pb-6 pt-2 max-lg:hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 group">
                  {/* Desktop Back Button */}
                  {isNotDashboard && (
                    <button 
                      onClick={() => navigate(-1)} 
                      className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-sm active:scale-95"
                    >
                      <FaChevronLeft />
                    </button>
                  )}
                  <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
                      LocalPro<span className="text-teal-600 text-6xl">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-3 ml-1">
                      {isNotDashboard ? "Manage Service" : "Professional Partner Dashboard"}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Business Live</span>
                </div>
              </div>
            </div>

            <div className="pb-24 lg:pb-0">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Floating Nav (Provider Context) */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl flex justify-around items-center px-4 z-[100]">
        <Link to="/provider/create" className={`p-4 transition-all flex flex-col items-center ${isActive('/provider') ? 'text-teal-400' : 'text-slate-400'}`}>
          <FaChartLine className="text-xl" />
        </Link>
        <Link to="/provider/my-service" className={`p-4 transition-all flex flex-col items-center ${isActive('/provider/my-service') ? 'text-teal-400' : 'text-slate-400'}`}>
          <FaSuitcase className="text-xl" />
        </Link>
        <Link to="/provider/service/request" className="p-4 text-white bg-teal-600 rounded-3xl shadow-lg shadow-teal-600/40 -mt-12 border-4 border-[#F8FAFC] flex flex-col items-center">
          <FaClipboardList className="text-xl" />
        </Link>
        <Link to="/provider/profile" className={`p-4 transition-all flex flex-col items-center ${isActive('/provider/profile') ? 'text-white' : 'text-slate-400'}`}>
          <FaUserCog className="text-xl" />
        </Link>
      </nav>
    </div>
  );
};

export default ProviderLayout;