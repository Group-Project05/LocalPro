import { Link } from "react-router-dom";
const InProfileServiceCard = ({service}) => {
    return (<>
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
            <div className="h-40 overflow-hidden relative">
                <img src={service.images} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-black">Rs. {service.price.amount}</div>
            </div>
            <div className="p-6">
                <h4 className="font-black text-slate-800 mb-4">{service.title}</h4>
                <Link to={`/service/detail/${service._id}`} className="block w-full py-3 bg-slate-100 text-slate-900 text-center text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    View Service
                </Link>
            </div>
        </div>
    </>)
}

export default InProfileServiceCard;