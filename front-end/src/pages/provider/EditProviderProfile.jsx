import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api";

const EditProviderProfile = () => {
    console.log("hlo")
    const navigate = useNavigate();
    const Data = useActionData();

    useEffect(() => {
        if (Data?.success) {
            toast.success("Profile updated Successfully");
            navigate('/provider/profile');
        } else if (Data?.error) {
            toast.error(Data.error);
        }
    }, [Data, navigate]);


    const [tab, setTab] = useState(true)
    const [provider, setProvider] = useState([])

    const handleTab = (val) => {
        setTab(val);
    }

    useEffect(() => {
        api.get('/profile').then((res) => setProvider(res.data));
    }, [])


    return (<>

        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-8 w-fit mx-auto">
                    <button onClick={() => handleTab(true)}
                        className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${tab ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}
                    >
                        Personal Info
                    </button>
                    <button onClick={() => handleTab(false)}
                        className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${!tab ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}>
                        Professional Profile
                    </button>
                </div>

                <Form method="POST" >
                    <div className={tab ? "block" : "hidden"}>
                        <section
                            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-none overflow-hidden transition-all duration-300">
                            <div
                                className="p-8 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-slate-50/50 to-white">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                        account Settings
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Manage your identity and profile picture.
                                    </p>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-col items-center mb-10">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg border border-none">
                                            <img id="profilePreview"
                                                src={'https://ui-avatars.com/api/?name=s'} alt="Profile"
                                                className="w-full h-full object-cover" />
                                        </div>

                                        <label htmlFor="photoInput"
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-[2px]">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change Photo</span>
                                            <input type="file" id="photoInput" name="profilePhoto" className="hidden" accept="image/*" />
                                        </label>

                                        <div className="absolute bottom-1 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                                    </div>
                                    <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Profile Picture
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input type="text" name="name" defaultValue={provider.name}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                                        <input type="email" defaultValue={provider.email} readOnly
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed outline-none" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className={!tab ? "block" : "hidden"}>
                        <section id="section-provider" className=" space-y-8 transition-all duration-300">
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                    Professional Identity
                                </h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">about You / Bio</label>
                                        <textarea name="bio" rows="3"
                                         defaultValue={provider.bio}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none">
                                            </textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="tel" name="phone" defaultValue={provider.phone} placeholder="Phone Number"
                                            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100" />
                                        <input type="text" name="url" defaultValue={provider.url} placeholder="Website URL"
                                            className="px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-none p-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                                    Business address
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <input type="text" name="address[street]" defaultValue={provider.address?.street}
                                            placeholder="Street address"
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-100 outline-none" />
                                    </div>
                                    <input type="text" name="address[city]" defaultValue={provider.address?.city} placeholder="City"
                                        className="px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
                                    <div className="flex gap-4">
                                        <input type="text" name="address[state]" defaultValue={provider.address?.state} placeholder="State"
                                            className="w-1/3 px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
                                        <input type="text" name="address[zipCode]" defaultValue={provider.address?.postalCode} placeholder="Zip"
                                            className="w-2/3 px-5 py-4 rounded-2xl border border-slate-200 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-10 flex items-center justify-between bg-slate-900 p-4 rounded-3xl shadow-2xl">
                        <p className="text-slate-400 text-sm ml-4 hidden sm:block">
                            all changes are encrypted and secure.
                        </p>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button type="button"
                                className="flex-1 sm:flex-none px-8 py-3 text-slate-400 font-bold hover:text-white transition-colors">
                                Discard
                            </button>
                            <button type="submit"
                                className="flex-1 sm:flex-none px-10 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                                Save Profile
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </>)
};

export const editProviderProfileAction = async (data) => {
    const formdata = await data.request.formData();
    const rawData = await Object.fromEntries(formdata);
    console.log(rawData)
    const structuredData = {
        name: rawData.name,
        bio: rawData.bio,
        phone: rawData.phone,
        url: rawData.url,
        address: {
            street: rawData['address[street]'],
            city: rawData['address[city]'],
            state: rawData['address[state]'],
            postalCode: rawData['address[zipCode]'],
        }
    };

    try {
        await api.put('/profile/edit', structuredData);
        return { success: true };
    } catch (err) {
        console.error("action Error:", err);
        return { error: "Failed to edit Profile" };
    }
}

export default EditProviderProfile;