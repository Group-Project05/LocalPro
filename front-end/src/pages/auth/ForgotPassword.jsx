
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import api from '../../api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Aapka backend endpoint yahan aayega
            await api.post('/forgot-password', { email });
            setIsSent(true);
            toast.success("Reset link sent to your email!");
        } catch (err) {
            toast.error(err.response?.data?.msg || "User not found with this email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                
                {/* Decorative Accent */}
                <div className="h-2 w-full bg-gradient-to-r from-indigo-600 to-blue-500" />

                <div className="p-10">
                    {!isSent ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                                    <FaEnvelope size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Forgot Password?</h2>
                                <p className="text-slate-500 mt-3 text-sm font-medium leading-relaxed">
                                    Enter your registered email below. We'll send you a secure link to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <FaEnvelope size={14} />
                                        </div>
                                        <input 
                                            type="email"
                                            required
                                            className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
                                        loading 
                                        ? 'bg-slate-300 cursor-not-allowed' 
                                        : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-100'
                                    }`}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                    {!loading && <FaPaperPlane size={12} />}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaPaperPlane size={30} className="animate-bounce" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">Check Your Inbox</h2>
                            <p className="text-slate-500 mt-3 text-sm">
                                We've sent a password recovery link to <br/>
                                <span className="font-bold text-slate-700">{email}</span>
                            </p>
                            <button 
                                onClick={() => setIsSent(false)}
                                className="mt-8 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
                            >
                                Didn't get the email? Try again
                            </button>
                        </div>
                    )}

                    {/* Back to Login */}
                    <div className="mt-10 pt-6 border-t border-slate-50 text-center">
                        <button 
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <FaArrowLeft size={10} /> Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;