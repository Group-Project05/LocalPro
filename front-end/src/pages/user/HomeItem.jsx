
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Api from "../../api"
import { updateFav } from "../../store/slice/favReducer";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
const HomeItem = ({ service }) => {
    const dispatch = useDispatch();
    const fvrt = useSelector(state => state.favorites.items) || [];

    const isFavorite = fvrt.some(id => String(id) === String(service._id));

    const addFavourite = async (data) => {
        try {
            const res = await Api.post('/user/favorites', { serviceId: data });
            if (res.data && res.data.fvrtArray) {
                dispatch(updateFav(res.data.fvrtArray));
            }
        } catch (err) {
            console.error("Error adding favorite:", err);
        }
    }

    useEffect(() => {
        Api.get('/user/favorites').then((res) => dispatch(updateFav(res.data.fvrtArray)));
    }, [])


    return (<>
        <div
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_50px_rgba(8,112,184,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col relative">

            <button onClick={() => addFavourite(service._id)}
                className={`absolute top-5 left-5 z-20 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 active:scale-90 ${isFavorite ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-white/90 text-slate-400 hover:text-rose-500 shadow-xl"}`}
            >
                <FaRegHeart className="w-5 h-5 fill-current" />
            </button>

            <div className="relative h-64 overflow-hidden">
                <img src={service.images}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity">
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between ">
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1">Location</span>
                        <span className="text-sm font-bold text-white leading-none">{service.location.street},
                            {service.location.city}</span>
                    </div>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl">
                        <span className="text-xl font-black text-white leading-none">Rs.{service.price.amount}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-400">
                            <FaStar className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-sm font-black text-slate-700">{/*{ this.reviewScore }*/}</span>
                        <span className="text-xs text-slate-400 font-medium">({/*{ this.reviewCount }*/} reviews)</span>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>

                <h3
                    className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {service.title}
                </h3>

                <a href="/provider/{{this.provider._id}}"
                    className="inline-flex items-center gap-3 p-2 -ml-2 rounded-2xl hover:bg-slate-50 transition-all mb-8">
                    <div className="relative">
                        <img src={service.images}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-md" />
                        <div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white ">
                            <GoDotFill className="w-full h-full text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col text-left">
                        <span
                            className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Provider</span>
                        <span className="text-sm font-bold text-slate-700">{service.provider.name}</span>
                    </div>
                </a>

                <div className="mt-auto flex items-center gap-4">
                    <a href={`/user/book/service/${service._id}`}
                        className="flex-[2.5] relative overflow-hidden group/btn px-6 py-4 bg-slate-900 text-white rounded-2xl transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
                        <div
                            className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000">
                        </div>
                        <div className="relative flex items-center justify-center gap-2">
                            <span className="text-xs font-black uppercase tracking-widest">Book Now</span>
                            <MdArrowRightAlt className="w-7 h-7 p-1 group-hover:translate-x-1 transition-transform" />

                        </div>
                    </a>

                    <a
                        href={`/user/service/detail/${service._id}`}
                        className="flex-1 p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center">
                        <MdOutlineRemoveRedEye className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    </>)
}


export default HomeItem;