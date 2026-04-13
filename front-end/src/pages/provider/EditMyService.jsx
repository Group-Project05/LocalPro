import { useEffect, useState } from "react";
import { useParams, Form, useActionData, useNavigate, Link, redirect } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api";
import { 
  FaSuitcase, 
  FaMapMarkerAlt, 
  FaTag, 
  FaImage, 
  FaChevronLeft, 
  FaSave,
  FaArrowLeft
} from "react-icons/fa";

const EditMyService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const actionData = useActionData();

  // Handle errors from action
  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  // Fetch current service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/provider/edit/${id}`);
        setService(res.data);
      } catch (err) {
        toast.error("Failed to load service data");
        navigate("/provider/my-service");
      }
    };
    fetchService();
  }, [id, navigate]);

  if (!service) return <div className="p-10 text-center font-bold text-slate-400">Loading Service Details...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Edit <span className="text-teal-600">Service</span>
            </h2>
            <p className="text-slate-500 font-medium">Update your listing details and pricing.</p>
          </div>
        </div>
        
        <button
          type="submit"
          form="editServiceForm"
          className="hidden md:flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      <Form id="editServiceForm" method="POST" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Identity */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                <FaSuitcase size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest italic">Service Identity</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={service.title}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-teal-100 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select
                  name="category"
                  defaultValue={service.category}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none transition-all font-medium cursor-pointer"
                >
                  <option value="creative">Creative Arts</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="education">Education</option>
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="labour">Labour</option>
                  <option value="cleaner">Cleaner</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={service.description}
                  rows="5"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none transition-all font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <FaMapMarkerAlt size={18} />
                </div>
                <h3 className="text-md font-black text-slate-800 uppercase tracking-widest italic">Location</h3>
              </div>
              <div className="space-y-4">
                <input type="text" name="street" defaultValue={service.location?.street} placeholder="Street" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white" />
                <input type="text" name="city" defaultValue={service.location?.city} placeholder="City" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white" />
                <div className="flex gap-2">
                  <input type="text" name="state" defaultValue={service.location?.state} placeholder="State" className="w-1/2 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white" />
                  <input type="text" name="zipCode" defaultValue={service.location?.postalCode} placeholder="Zip" className="w-1/2 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <FaTag size={18} />
                </div>
                <h3 className="text-md font-black text-slate-800 uppercase tracking-widest italic">Pricing</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 ml-1">AMOUNT</label>
                  <input type="number" name="priceAmount" defaultValue={service.price?.amount} className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white font-bold text-xl" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 ml-1">CHARGE BASIS</label>
                  <select name="priceCharge" defaultValue={service.price?.chargeType} className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:bg-white font-bold">
                    <option value="per hours">/ hr</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Images */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 text-white rounded-2xl">
                <FaImage size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest italic">Gallery</h3>
            </div>
            
            <div className="space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img 
                  src={service.images || "https://via.placeholder.com/400x300?text=No+Image"} 
                  alt="Current" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                <textarea
                  name="images"
                  defaultValue={service.images}
                  placeholder="Paste image URL here..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 outline-none transition-all font-medium text-teal-100 text-sm"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 md:hidden"
              >
                <FaSave /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export const editServiceAction = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);

  const structuredData = {
    title: rawData.title,
    category: rawData.category,
    description: rawData.description,
    address: {
      street: rawData.street,
      city: rawData.city,
      state: rawData.state,
      postalCode: rawData.zipCode,
    },
    price: {
      amount: Number(rawData.priceAmount),
      charge: rawData.priceCharge,
    },
    // Handling as a string based on your previous preference
    images: rawData.images
  };

  try {
    await api.put(`/provider/edit/${id}`, structuredData);
    toast.success("Service Updated Successfully");
    return redirect("/provider/my-service");
  } catch (err) {
    console.error("Edit Service Error:", err);
    return { error: err.response?.data?.msg || "Failed to update service" };
  }
};

export default EditMyService;