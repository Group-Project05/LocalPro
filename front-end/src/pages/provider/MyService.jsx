import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import ServiceCard from "./ServiceCard";
import { FaPlus, FaSuitcase, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const MyService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Services
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/provider/myservice");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Handle Delete
  const dltService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await api.delete(`/provider/delete/${id}`);
      toast.success("Service deleted successfully");
      // Update local state to remove the deleted item immediately
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            My <span className="text-teal-600">Inventory</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage your professional listings and track performance.
          </p>
        </div>

        <Link
          to="/provider/create" // Updated path to match suggested route config
          className="group flex items-center gap-3 px-7 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-teal-100 transition-all active:scale-95"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Stats Quick Look (Optional - matches the "premium" vibe) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Listings</p>
          <p className="text-3xl font-black text-slate-900">{services.length}</p>
        </div>
        <div className="bg-teal-600 p-6 rounded-[2rem] shadow-xl shadow-teal-50">
          <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest mb-1">Status</p>
          <p className="text-3xl font-black text-white italic underline">Active</p>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Services...</p>
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} dltService={dltService} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-dashed border-slate-200 p-20 text-center">
          <div className="inline-flex p-6 bg-slate-50 text-slate-300 rounded-full mb-6">
            <FaSuitcase size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">No Services Found</h3>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">
            You haven't listed any services yet. Start your journey by creating your first listing.
          </p>
          <Link
            to="/provider/create"
            className="inline-flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
          >
            Create Listing Now <FaPlus />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyService;