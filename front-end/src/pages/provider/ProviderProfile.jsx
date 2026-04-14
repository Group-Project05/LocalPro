import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import api from "../../api";
import { logout } from "../../store/slice/authReducer";

import { LuPencil } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const ProviderProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [provider, setProvider] = useState([]);

    const stateHandler = (val) => {
        api.put('/profile/edit', { status: val }).then((res) => {
            setProvider((prev) => ({
                ...prev,
                status: val
            }));
            toast.success(`Status updated to ${val}`);
        }).catch(err => {
            toast.error("Failed to update status");
        });
    }

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        api.get('/profile').then((res) => setProvider(res.data));

    }, [])

    return (<>
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white">
                            <img src={`https://ui-avatars.com/api/?name=${provider.name}`} className="w-full h-full object-cover" />
                        </div>
                        <div id="status-indicator"
                            className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-xl border-4 border-white shadow-lg text-[10px] font-black uppercase tracking-tighter transition-all ${provider.status === "online" ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"}`}
                        >
                            {provider.status}
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {provider.name}
                            </h1>
                            <span
                                className="w-fit mx-auto md:mx-0 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">
                                Verified Provider
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mt-1">{provider.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/provider/profile/edit"
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 text-sm">
                                <LuPencil className="w-4 h-4"  />
                            Edit Profile
                        </Link>
                        <button onClick={logoutHandler}
                            className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 hover:text-rose-700 transition-all border border-rose-100"
                            title="Logout">
                            <RxExit className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">
                            about Me
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{provider.bio}</p>

                        <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-800">
                                    Visibility Status
                                </p>
                                <p className="text-xs text-slate-400">
                                    Turn off to hide your profile from search
                                </p>
                            </div>
                            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200">
                                <button
                                    onClick={() => stateHandler("online")}
                                    className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${provider.status === "online"
                                        ? "bg-white text-emerald-600 shadow-sm"
                                        : "text-slate-500"
                                        }`}
                                >
                                    ONLINE
                                </button>
                                <button
                                    onClick={() => stateHandler("offline")}
                                    id="btn-offline"
                                    className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${provider.status === "offline"
                                        ? "bg-white text-slate-600 shadow-sm"
                                        : "text-slate-500"
                                        }`}
                                >
                                    OFFLINE
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">
                            Security & Password
                        </h3>
                        <div
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div
                                    className="p-2 bg-white rounded-xl text-slate-400 group-hover:text-blue-600 transition-colors">
                                    <IoLockClosedOutline className="w-5 h-5"/>
                                </div>
                                <p className="text-sm font-bold text-slate-700">
                                    Change account Password
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">
                            Contact & Location
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <CiLocationOn className="w-5 h-5 text-blue-500"  />
                                <span className="text-sm font-bold text-slate-700">{provider.address?.street},
                                    {provider.address?.city}</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                <FiPhone className="w-5 h-5 text-emerald-500"/>
                                <span className="text-sm font-bold text-slate-700">{provider.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100">
                        <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest mb-2">
                            Danger Zone
                        </h4>
                        <p className="text-[11px] text-rose-400 mb-4 font-medium">
                            Permanently delete your profile and all service history. This
                            cannot be undone.
                        </p>
                        <button
                            className="w-full py-3 bg-white text-rose-600 border border-rose-200 rounded-xl text-xs font-black hover:bg-rose-600 hover:text-white transition-all">
                            Delete My account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ProviderProfile;
