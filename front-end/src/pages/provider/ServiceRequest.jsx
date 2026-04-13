import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import api from '../../api';
import toast from 'react-hot-toast';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaPhoneAlt
} from 'react-icons/fa';

const ServiceRequest = ({ initialRequests }) => {
    const [requests, setRequests] = useState(initialRequests || []);
    const [filter, setFilter] = useState('All');

    // Move useEffect INSIDE the component
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
            console.error("Failed to update status:", err);
            toast.error(err.response?.data?.msg || "Failed to update status");
        }
    };

    // Move logic INSIDE the component
    const filteredRequests = requests.filter(req => {
        if (filter === 'All') return true;
        return req.status.toLowerCase() === filter.toLowerCase();
    });
    // console.log(requests)

    // Move return INSIDE the component
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Service Requests</h2>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                            You have {requests.length} active requests to review
                        </p>
                    </div>

                    <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
                        {['All', 'Pending', 'Completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${filter === tab
                                    ? 'bg-white shadow-sm text-slate-800'
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
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                           <p className="text-slate-400 font-medium">No requests found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; // End of ServiceRequest Component

export default ServiceRequest;