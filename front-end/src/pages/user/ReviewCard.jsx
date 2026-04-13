import { FaStar } from "react-icons/fa";
const ReviewCard = ({review}) => {
    
    return (<>
        <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-900/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <img src={`https://ui-avatars.com/api/?name=${review.user?.name}&background=f1f5f9&color=64748b`} className="w-14 h-14 rounded-[1.2rem] object-cover" alt="User" />
                    <div>
                        <p className="text-md font-black text-slate-900 tracking-tight">{review.user?.name}</p>
                        <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-400" : "text-slate-200"}`} />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">"{review.comment}"</p>
        </div>


    </>)
}

export default ReviewCard;