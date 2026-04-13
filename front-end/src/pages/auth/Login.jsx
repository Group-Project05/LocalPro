import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/authReducer";
import toast from "react-hot-toast";
import api from '../../api'
import { useEffect } from "react";
import { FaEnvelope, FaLock, FaArrowRight, FaChevronLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useActionData();

  useEffect(() => {
    if (data && data.user) {
      dispatch(login(data));
      const role = data.user.role;
      if (role === "user") {
        navigate("/user");
      } else if (role === "provider") {
        navigate("/provider");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    }
  }, [data, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-slate-200 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-10 left-10 hidden md:flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase text-[10px] tracking-widest transition-all z-20 group"
      >
        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to home
      </Link>

      <div className="w-full max-w-[440px] relative z-10">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
            LocalPro<span className="text-blue-600 text-6xl">.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-3">
            Secure Member Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 md:p-12 relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <Form method="post" id="loginForm" className="space-y-6">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaEnvelope className="text-sm" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaLock className="text-sm" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pb-2">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 transition-all cursor-pointer"
                />
                <span className="ml-2 text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Keep me signed in</span>
              </label>
              <Link to="/forget-password" affiliation="true" className="text-xs font-black uppercase tracking-tighter text-blue-600 hover:text-indigo-700 transition-colors">
                Reset?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Sign In 
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-xs font-medium">
              New to LocalPro? 
              <Link to="/register" className="ml-2 text-blue-600 font-black uppercase tracking-tighter hover:underline">
                Register Account
              </Link>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          Protected by LocalPro Security
        </p>
      </div>
    </div>
  );
};

export const loginAccount = async (data) => {
  const formData = await data.request.formData();
  const loginUser = Object.fromEntries(formData);
  try {
    const user = await api.post("/login", loginUser);
    toast.success("Welcome back!");
    return user.data;
  } catch (err) {
    const errMsg = err.response?.data?.msg || "Login Failed";
    toast.error(errMsg);
    return { error: errMsg };
  }
};

export default Login;