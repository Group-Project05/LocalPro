import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useEffect } from "react";
import api from "../../api";

const FavoriteCard = ({favorite}) => {

     const removeFavourite = async (data) => {
        try {
            const res = await api.post('/user/favorites', { serviceId: data });
            if (res.data && res.data.fvrtArray) {
                console.log(res.data.fvrtArray)
            }
        } catch (err) {
            console.error("Error adding favorite:", err);
        }
    }
    useEffect(()=>{
        
    },[])
    console.log(favorite);
    console.log(favorite.category);
    return (<>
        <div className="group bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
            <div className="relative h-60 w-full overflow-hidden rounded-[2rem] bg-slate-100">
                <img src={favorite.images}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Service Image" />

                <div className="absolute top-4 inset-x-4 flex justify-between items-center">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                        {favorite.category}
                    </span>
                    <button onClick={() => removeFavourite(favorite._id) } className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg">
                        <FaHeart className="w-5 h-5 fill-current " />
                    </button>
                </div>
            </div>

            <div className="mt-6 px-2 pb-2">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {favorite.title}
                    </h3>
                    <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-slate-900">Rs. {favorite.price.amount}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{favorite.price.chargeType}</span>
                    </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                    {favorite.description}
                </p>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                SR
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider</p>
                            <p className="text-sm font-bold text-slate-800 leading-none">{favorite.provider.name}</p>
                        </div>
                    </div>

                    <Link to={`/user/service/detail/${favorite._id}`} className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-md transition-all">
                        <MdOutlineArrowOutward className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    </>)
}

export default FavoriteCard;