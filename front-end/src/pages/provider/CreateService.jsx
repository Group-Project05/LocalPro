import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import { 
  FaSuitcase, 
  FaMapMarkerAlt, 
  FaTag, 
  FaImage, 
  FaChevronLeft, 
  FaCloudUploadAlt 
} from "react-icons/fa";

const CreateService = () => {
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:border-teal-600 transition-all shadow-sm active:scale-95 lg:hidden"
        >
          <FaChevronLeft />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Create New <span className="text-teal-600">Service</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Setup your professional listing to start receiving bookings.
          </p>
        </div>
      </div>

      <Form method="POST" action="/provider/create" className="space-y-8">
        {/* Section 1: Service Identity */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
              <FaSuitcase size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest italic">Service Identity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Premium Interior Painting"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-teal-100 outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select
                name="category"
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-teal-100 outline-none transition-all cursor-pointer font-medium"
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

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">About the Service</label>
              <textarea
                name="description"
                rows="4"
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-teal-100 outline-none transition-all font-medium"
                placeholder="Describe your expertise, tools used, and what's included..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <FaMapMarkerAlt size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest italic">Service Location</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                <input 
                  type="text" 
                  name="street" 
                  required
                  placeholder="Street Address" 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <input type="text" name="city" required placeholder="City" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                  <input type="text" name="state" required placeholder="State" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Zip</label>
                  <input type="text" name="zipCode" required placeholder="Zip" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <FaTag size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest italic">Pricing</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rate</label>
                  <input
                    type="number"
                    name="priceAmount"
                    required
                    min="0"
                    placeholder="0.00"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/30 focus:bg-white outline-none transition-all font-bold text-xl"
                  />
                </div>
                <div className="w-1/3 space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Basis</label>
                  <select
                    name="priceCharge"
                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 bg-white font-bold text-sm outline-none h-[60px]"
                  >
                    <option value="per hours">/ hr</option>
                    <option value="fixed">Fixed</option>
                  </select>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  Transparent pricing helps you get booked 40% faster.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Visuals */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 text-white rounded-2xl">
                <FaImage size={20} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest italic">Portfolio Gallery</h3>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Image URLs (Comma Separated)
              </label>
              <textarea
                name="images"
                placeholder="https://example.com/work1.jpg, https://example.com/work2.jpg"
                className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 focus:bg-white/10 outline-none transition-all font-medium text-teal-100 placeholder:text-slate-600"
                rows="3"
              ></textarea>
              <div className="flex items-center gap-2 text-teal-400/60 text-[10px] font-bold uppercase tracking-widest">
                <FaCloudUploadAlt />
                <span>Hosting images on Cloudinary is recommended</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-6 bg-teal-600 hover:bg-teal-700 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            List My Service
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest group-hover:bg-white group-hover:text-teal-700 transition-all">
              Publish
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export const createServiceAction = async ({ request }) => {
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
    images: rawData.images
  };

  try {
    await api.post("/provider/createService", structuredData);
    toast.success("Service Created Successfully");
    return redirect("/provider/my-service");
  } catch (err) {
    console.error("Create Service Error:", err);
    return { error: err.response?.data?.msg || "Failed to create Service" };
  }
};

export default CreateService;