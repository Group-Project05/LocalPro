import "./auth.css";
import { Link } from "react-router-dom";
import { FaUserPlus, FaArrowRight, FaSignInAlt } from "react-icons/fa";

const Main = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Branding Section */}
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              Reliable Local Experts
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none mb-4">
            LocalPro<span className="text-blue-600 text-7xl">.</span>
          </h1>
          <p className="text-slate-500 max-w-md mx-auto text-lg font-medium leading-relaxed">
            Connecting you with premium local help in just a few clicks. Your neighborhood service hub.
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          
          {/* Login Card */}
          <Link 
            to="/login" 
            className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-10 w-full sm:w-[340px] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-all group-hover:bg-blue-600 group-hover:opacity-10 opacity-50"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl mb-8 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <FaSignInAlt />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Welcome Back</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Access your dashboard and manage your current service requests.
              </p>
              <div className="flex items-center gap-2 text-slate-900 font-black uppercase text-[11px] tracking-widest group-hover:gap-4 transition-all">
                Login Now <FaArrowRight className="text-blue-600" />
              </div>
            </div>
          </Link>

          {/* Register Card */}
          <Link 
            to="/register" 
            className="group relative bg-slate-900 rounded-[2.5rem] p-10 w-full sm:w-[340px] shadow-2xl shadow-slate-900/20 hover:shadow-blue-900/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16 opacity-20"></div>
            
            <div className="relative z-10 flex flex-col items-center text-white">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-8 transform group-hover:-rotate-12 transition-transform duration-500 shadow-xl shadow-blue-600/30">
                <FaUserPlus />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Join LocalPro</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Create a new account as a Customer or a Service Professional.
              </p>
              <div className="flex items-center gap-2 text-white font-black uppercase text-[11px] tracking-widest group-hover:gap-4 transition-all">
                Get Started <FaArrowRight className="text-blue-500" />
              </div>
            </div>
          </Link>

        </div>

        {/* Footer */}
        <footer className="mt-20">
          <div className="h-[1px] w-24 bg-slate-200 mx-auto mb-6"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 LocalPro — The Gold Standard for Services
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Main;