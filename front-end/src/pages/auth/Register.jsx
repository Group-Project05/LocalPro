import { Link, Form, redirect, useNavigation } from "react-router-dom";
import toast from "react-hot-toast";
import api from '../../api';

// --- REACT ICONS (Font Awesome Category) ---
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaUserTag, 
  FaArrowRight, 
  FaChevronLeft,
  FaMapMarkerAlt // Added for the location section
} from "react-icons/fa";

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased flex flex-col items-center justify-center p-6 py-12 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-slate-200 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 hidden md:flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold uppercase text-[10px] tracking-widest transition-all z-20 group"
      >
        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to home
      </Link>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
            LocalPro<span className="text-blue-600 text-6xl">.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-3">
            Join the Professional Network
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>

          <Form method="post" id="registerForm" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <FaUser className="text-blue-500" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <FaEnvelope className="text-blue-500" /> Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" 
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] flex-1 bg-slate-100"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 flex items-center gap-2">
                   <FaMapMarkerAlt /> Location Details
                </span>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Street Address</label>
                  <input type="text" name="street" required placeholder="123 Street Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                    <input type="text" name="city" required placeholder="City" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
                    <input type="text" name="state" required placeholder="State" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Zip Code</label>
                    <input type="text" name="postalCode" required placeholder="000000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <FaLock className="text-blue-500" /> Password
                </label>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <FaLock className="text-blue-500" /> Confirm
                </label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  required 
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <FaUserTag className="text-blue-500" /> Account Type
              </label>
              <select name="role" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none font-bold text-slate-700">
                <option value="user">I am a Customer</option>
                <option value="provider">I am a Service Provider</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group active:scale-[0.98] disabled:bg-slate-400"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              {!isSubmitting && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </Form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-xs font-medium">
              Already have an account? 
              <Link to="/login" className="ml-2 text-blue-600 font-black uppercase tracking-tighter hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ACTION FUNCTION stays exactly the same ---
export const createAccountAction = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  if (rawData.password !== rawData.confirmPassword) {
    toast.error("Passwords do not match");
    return null;
  }

  const structuredData = {
    name: rawData.name,
    email: rawData.email,
    password: rawData.password,
    role: rawData.role,
    address: {
      street: rawData.street,
      city: rawData.city,
      state: rawData.state,
      postalCode: rawData.postalCode,
    }
  };

  try {
    await api.post("/register", structuredData);
    toast.success("Account created successfully!");
    return redirect('/login');
  } catch (err) {
    const errorMsg = err.response?.data?.msg || "Registration failed";
    toast.error(errorMsg);
    return null;
  }
};

export default Register;