
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import api from '../../api';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { token } = useParams(); // URL se token nikalne ke liye
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        setLoading(true);
        try {
            const { data } = await api.post(`/reset-password/${token}`, {
                password: formData.password
            });
            toast.success("Password reset successful!");
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.msg || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
                
                {/* Header Decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                
                <div className="p-10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaLock size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Set New Password</h2>
                        <p className="text-slate-500 mt-2 text-sm font-medium">
                            Strong password = Strong security for your LocalPro account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">New Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <FaLock size={14} />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pl-11 pr-12 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold text-slate-700"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                    <FaCheckCircle size={14} />
                                </div>
                                <input 
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold text-slate-700"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all active:scale-95 ${
                                loading 
                                ? 'bg-slate-300 cursor-not-allowed' 
                                : 'bg-slate-900 hover:bg-indigo-600 shadow-indigo-100'
                            }`}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;