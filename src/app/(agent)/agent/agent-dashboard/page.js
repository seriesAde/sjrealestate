
"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AgentDashboard() {
    const [properties, setProperties] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    const BASE_URL = "/api"; // Proxy to backend

    const filteredProperties = useMemo(() => {
        return properties.filter((p) => {
            if (filter === "Bought") return p.isBought || p.market_status === "BOUGHT";
            if (filter === "Available") return !p.isBought && p.market_status !== "BOUGHT";
            return true;
        });
    }, [properties, filter]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
                const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
                const merchantInfo = JSON.parse(localStorage.getItem("authData") || "{}");

                const agentToken = agentInfo?.token;
                const userToken = userInfo?.token;
                
                // Extracting ID correctly for the dynamic route
                const agentId = agentInfo?.id || agentInfo._id;
                const userId = userInfo?.id || userInfo?._id;
                const merchantId = merchantInfo?.id || merchantInfo?._id;

                if (!agentToken) {
                    setLoading(false);
                    return;
                }

                //FETCH PROPERTIES
                const agentRes = await axios.get(`${BASE_URL}/properties`, {
                    params: { agent: agentId, verified: false, merchant: merchantId },
                    headers: { Authorization: `Bearer ${agentToken}` },
                });
                const agentData = agentRes.data?.data || [];

                let userPropertyData = [];
                if (userId && userToken) {
                    try {
                        const userPropRes = await axios.get(`${BASE_URL}/users/${userId}/properties`, {
                            headers: { Authorization: `Bearer ${userToken}` }
                        });
                        userPropertyData = userPropRes.data?.data || [];
                    } catch (e) { console.error(e); }
                }

                //FETCH APPOINTMENTS (UPDATED ENDPOINT) ---
                try {
                    const appointmentRes = await axios.get(`${BASE_URL}/appointments`, {
                        params: { 
                            agent: agentId,     
                            completed: true,  
                            page: 0, 
                            limit: 10 
                        },
                        headers: { Authorization: `Bearer ${agentToken}` }
                    });
                    const appointData = appointmentRes.data?.data || appointmentRes.data || [];
                    setAppointments(Array.isArray(appointData) ? appointData : []);
                } catch (e) {
                    console.error("Appointments fetch error:", e);
                }

                // Combine logic
                const available = agentData.map((p) => ({ ...p, isBought: false, market_status: p.market_status || "AVAILABLE" }));
                const bought = userPropertyData.map((p) => ({ ...p, isBought: true, market_status: p.market_status || "BOUGHT" }));
                
                setProperties([...available, ...bought]);

            } catch (err) {
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="p-20 text-center text-gray-400 animate-pulse font-bold tracking-widest uppercase">
            Syncing Dashboard...
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-900 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* STATS CARDS SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Properties" value={properties.length} color="blue" />
                    <StatCard title="Completed Appts" value={appointments.length} color="purple" />
                    <StatCard title="Reviews" value="0" color="orange" />
                    <StatCard title="Wishlists" value="0" color="pink" />
                </div>

                {/* PROPERTY TABLE */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Portfolio Listings</h2>
                        
                        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                            {["All", "Available", "Bought"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                                        filter === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Property</th>
                                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Location</th>
                                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Price</th>
                                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-center">Status</th>
                                    <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map((p) => (
                                        <tr key={p.id || p._id} className="hover:bg-gray-50/40 transition-colors group">
                                            <td className="p-4 font-semibold text-gray-700 truncate max-w-[220px]">
                                                {p.title || p.name || "Untitled"}
                                            </td>
                                            <td className="p-4 text-sm text-gray-500 font-medium">
                                                {p.city || "N/A"}
                                            </td>
                                            <td className="p-4 text-sm font-black text-gray-900">
                                                {/* Price with commas formatting */}
                                                {p.currency || "₦"}{p.price ? Number(p.price).toLocaleString() : "0"}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${
                                                    p.isBought || p.market_status === "BOUGHT"
                                                        ? "bg-red-50 text-red-600 border-red-100"
                                                        : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                }`}>
                                                    {p.market_status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-gray-400 group-hover:text-blue-600 transition-colors text-[11px] font-black uppercase tracking-widest">
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-16 text-center text-gray-400 italic text-sm">
                                            No properties found matching the current filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    const colors = {
        blue: "border-blue-500 text-blue-600 bg-blue-50",
        purple: "border-purple-600 text-purple-700 bg-purple-50",
        orange: "border-orange-500 text-orange-600 bg-orange-50",
        pink: "border-pink-500 text-pink-600 bg-pink-50",
    };

    return (
        <div className={`p-6 rounded-xl border-l-4 bg-white shadow-sm transition hover:shadow-md ${colors[color]}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );
}