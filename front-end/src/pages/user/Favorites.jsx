import api from "../../api";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import FavoriteCard from "./FavoriteCard";
import { useEffect, useState } from "react";

const Favorites = () => {

    const [fvrt, setFvrt] = useState([]); 

    useEffect(() => {
        api.get('/user/favorites').then((res) => {
            setFvrt(res.data.favorites || []); 
        }).catch(err => console.error("Fetch Error:", err));
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-1 px-6">
                <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-200">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Saved <span className="text-blue-600">Favorites</span>
                        </h2>
                        <p className="text-slate-600 mt-1">Manage and book your bookmarked services.</p>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <span className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                            {fvrt.length} Saved Items
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {fvrt.length > 0 ? (
                        fvrt.map((f) => (
                            <FavoriteCard key={f._id} favorite={f} /> 
                        ))
                    ) : (
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No favorites found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;