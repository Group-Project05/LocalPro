
import { useEffect, useState } from "react";
import api from "../../api";
import HomeItem from "./HomeItem";
import { IoSearch } from "react-icons/io5";
const Home=()=>{



    const [services,setServices]= useState([]);
    useEffect(()=>{
        api.get('/user').then((res)=> setServices(res.data));
    },[])

    return(<>
    <div className="min-h-screen bg-slate-50">

    <div className="bg-slate-900 py-7 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Find the perfect <span className="text-blue-500">Service</span> for your home.
        </h1>

        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <IoSearch  className="w-5 h-5 text-slate-400" />
          </div>
          <input type="text" placeholder="What are you looking for? (e.g. Cleaning, Plumbing)"
            className="w-full pl-14 pr-32 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-2xl"/>
          <button
            className="absolute right-3 top-3 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
        <button
          className="whitespace-nowrap px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all">all
          Services</button>
        <button
          className="whitespace-nowrap px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all">🏠
          Home Cleaning</button>
        <button
          className="whitespace-nowrap px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all">🔧
          Maintenance</button>
        <button
          className="whitespace-nowrap px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all">🎨
          Creative</button>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Service Card */}
        {services.map((s) => (<HomeItem key={s._id} service={s}/>) )}
        

      </div>
      
    </div>
  </div>
    
    </>)
}

export default Home;