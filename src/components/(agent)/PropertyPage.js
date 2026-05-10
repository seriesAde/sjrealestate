"use client"
import { Home, Plus } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function PropertyPage({ properties, setProperties }) {
    const baseURL = "/api";

    const handleDelete = async (propertyId) => {
        if (!propertyId) {
            toast.error("Property ID is missing");
            return;
        }

        if (!window.confirm("Are you sure? This will delete the property permanently from the system.")) return;

        // Create a loading toast
        const deletingToast = toast.loading("Deleting property...");

        try {
            const agentData = JSON.parse(localStorage.getItem("agent_info"));
            const token = agentData?.token;

            //  DELETE: Targeting the property Id
            await axios.delete(`${baseURL}/properties/${propertyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // UI DELETE: 
            setProperties((deletingProperty) => deletingProperty.filter((item) => item.id !== propertyId));
            toast.success("Property permanently deleted", { id: deletingToast });

        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete from server", { id: deletingToast });
        }
    };

    // Get agent name for the header safely
    const agentName = JSON.parse(localStorage.getItem("agent_info"))?.company || "Agent";

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen bg-white">
            <div className="mb-12 flex justify-between border-b border-slate-100 pb-8 md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-[#00492c] tracking-tighter">
                        {agentName} Properties
                    </h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-wider mt-2">
                        Managing {properties.length} Active Properties
                    </p>
                </div>
                <Link href="/agent/properties/addProperties">
                    <button className="flex items-center gap-2 bg-[#00492c] text-white py-3 px-3 rounded-lg text-[10px] font-semibold uppercase tracking-widest hover:bg-[#003620] hover:shadow-md transition-all active:scale-95 cursor-pointer shadow-sm">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Properties</span>
                    </button>
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-2xl">
                    <Home className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No properties created yet</p>
                    <Link href="/agent/properties/addProperties" className="text-[#00492c] text-xs font-black underline mt-4 inline-block uppercase">
                        Create your first listing
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {properties.map((item) => (
                        <PropertyCard
                            key={item.id}
                            item={item}
                            onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}