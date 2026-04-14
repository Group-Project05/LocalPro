import { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import api from '../../api';
import toast from 'react-hot-toast';

const ServiceRequest = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data } = await api.get('/booking/request');
                setRequests(data);
            } catch (err) {
                toast.error("Could not load service requests");
            }
        };
        fetchRequests();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await api.put(`/booking/status/${id}`, { status: newStatus });
            if (response.status === 200) {
                setRequests(prev =>
                    prev.map(req => req._id === id ? { ...req, status: newStatus } : req)
                );
                toast.success(`Request marked as ${newStatus}`);
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to update status");
        }
    };

    // Filter Logic: Pending tab ab 'confirmed' status ko bhi handle karega
    const filteredRequests = requests.filter(req => {
        const status = req.status.toLowerCase();
        
        if (filter === 'All') return true;
        
        if (filter === 'Pending') {
            // 'Pending' tab mein dono states dikhayenge
            return status === 'pending' || status === 'confirmed' ;
        }
        
        // Baki sab ke liye exact match (Completed, Cancelled, Rejected)
        return status === filter.toLowerCase();
    });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Service Requests</h2>
                        <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                            Showing {filteredRequests.length} {filter !== 'All' ? filter : ''} requests
                        </p>
                    </div>

                    {/* Filter Tabs - Added more options for full control */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
                        {['All', 'Pending', 'Completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all ${
                                    filter === tab
                                    ? 'bg-white shadow-md text-indigo-600 scale-105'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Section */}
                <div className="space-y-6">
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                            <RequestCard
                                key={request._id}
                                request={request}
                                onUpdateStatus={updateStatus}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-inner">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📁</span>
                            </div>
                            <h3 className="text-slate-800 font-bold">No {filter} Requests</h3>
                            <p className="text-slate-400 text-sm mt-1">Jab koi request aayegi, wo yahan dikhegi.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceRequest;