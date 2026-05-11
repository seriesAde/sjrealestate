"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
    const { authData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [dashboardData, setDashboardData] = useState({
        wishlist: null,
        properties: null,
        totalAgents: null,
        totalProperties: null,
    });

    const baseUrl = "/api";

    const filteredProperties = useMemo(() => {
        if (!dashboardData.properties) return [];
        return dashboardData.properties.filter((p) => {
            if (filter === "Verified") return p.is_verified === true;
            if (filter === "Unverified") return p.is_verified === false;
            if (filter === "Bought") return p.is_bought === true;
            if (filter === "Available") return p.is_bought === false || p.is_bought === undefined;
            return true; // "All"
        });
    }, [dashboardData.properties, filter]);

    async function fetchDashboardData() {
        if (!authData?.id) return;

        try {
            const [wishRes, agentRes, propertyRes] = await Promise.all([
                Axios.get(`${baseUrl}/merchants/${authData.id}/wishlist`, {
                    headers: { Authorization: `Bearer ${authData.token}` }
                }),
                Axios.get(`${baseUrl}/merchants/agents`, {
                    headers: { Authorization: `Bearer ${authData.token}` }
                }),
                Axios.get(`${baseUrl}/properties`, {
                    params: {

                        verified: false,
                        merchant: authData.id,
                    },
                    headers: {
                        'Authorization': `Bearer ${authData.token}`
                    }
                }),
            ]);
            console.log(propertyRes)

            setDashboardData(prev => ({
                ...prev,
                wishlist: wishRes.data.total,
                totalAgents: agentRes.data.total,
                properties: propertyRes.data.data,
                totalProperties: propertyRes.data.total,
            }));
        } catch (error) {
            console.error("Dashboard fetch error:", error.response?.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, [authData]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
        </div>
    );

    return (
        <div className="w-full">

            {/* Stats Row */}
            <div className="flex justify-between w-full gap-20 p-5">
                <div className="bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">
                        {`Wishlist: ${dashboardData.wishlist ?? "..."}`}
                    </h2>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">
                        {`Agents: ${dashboardData.totalAgents ?? "..."}`}
                    </h2>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold">
                        {`Properties: ${dashboardData.totalProperties ?? "..."}`}
                    </h2>
                </div>
            </div>

            {/* Properties Table */}
            <div className="px-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h1 className="text-2xl font-bold text-primary">Properties</h1>

                    {/* Filter toggles */}
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 flex-wrap gap-1">
                        {["All", "Verified", "Unverified", "Bought", "Available"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${filter === t
                                    ? "bg-white text-[#00492c] shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <table className="w-full text-sm text-left text-secondary">
                    <thead className="text-sm text-secondary capitalize border-b border-gray-200">
                        <tr>
                            <th className="px-2 py-3">Name</th>
                            <th className="px-2 py-3">Category</th>
                            <th className="px-2 py-3">Location</th>
                            <th className="px-2 py-3">Type</th>
                            <th className="px-2 py-3">Verified</th>
                            <th className="px-2 py-3">Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((property) => (
                                <tr key={property._id || property.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-2">{property.name}</td>
                                    <td className="py-3 px-2">{property.category}</td>
                                    <td className="py-3 px-2">{property.address}</td>
                                    <td className="py-3 px-2">{property.type}</td>

                                    {/* Verified badge */}
                                    <td className="py-3 px-2">
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${property.is_verified
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : "bg-red-50 text-red-600 border-red-100"
                                            }`}>
                                            {property.is_verified ? "Verified" : "Not Verified"}
                                        </span>
                                    </td>

                                    {/* Bought / Available badge */}
                                    <td className="py-3 px-2">
                                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${property.is_bought
                                            ? "bg-orange-50 text-orange-600 border-orange-100"
                                            : "bg-blue-50 text-blue-600 border-blue-100"
                                            }`}>
                                            {property.is_bought ? "Bought" : "Available"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-16 text-center text-gray-400 italic">
                                    No properties found for this filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}