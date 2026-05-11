"use client"
import { useForm } from "@/hooks/UseForm";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Save, ArrowLeft, Home, MapPin, Info } from "lucide-react";

const baseURL = "/api";
const AMENITY_OPTIONS = ["CAR WASH", "GYM", "SECURITY", "WATER", "ELECTRICITY", "CLEANERS"];

export default function UpdatePropertyPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { formData, setFormData, errors, setErrors, handleChange } = useForm({
        name: "", price: "", country: "NIGERIA", state: "ABUJA", city: "",
        lat: 9.0765, lng: 7.3986, address: "", description: "", category: "FLAT",
        total_area: "", property_use: "RESIDENTIAL", payment_plan: "PER_ANNUM",
        contract_type: "RENT", bedroom: 0, bathroom: 0, toilet: 0,
        parking_space: 0, furnishing: "FURNISHED", disclaimer: "", amenities: []
    });

    const fetchProperty = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}/properties/${id}`);
            const actualData = response.data.data || response.data; // Handles both {data: {...}} and {...} response 

            if (actualData) {
                setFormData({
                    ...actualData,//spread operator for the data fetched and add o this obj

                    bedroom: Number(actualData.bedroom),
                    bathroom: Number(actualData.bathroom),
                    toilet: Number(actualData.toilet),
                    parking_space: Number(actualData.parking_space),
                    amenities: Array.isArray(actualData.amenities) ? actualData.amenities : [],
                });
            }
        } catch (err) {
            console.log("Fetch Error:", err);
            toast.error("Failed to load property data.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { fetchProperty(); }, [fetchProperty]);

    const validateForm = () => {
        let inputErrors = {};
        if (!formData.name) inputErrors.name = "Property name is required";
        if (!formData.price) inputErrors.price = "Price is required";
        if (!formData.address) inputErrors.address = "Address is required";
        if (!formData.address || formData.address == "") {
            inputErrors.address = "Street address cannot be empty";
        }
        if (!formData.city || formData.city == "") {
            inputErrors.city = "City cannot be empty";
        }
        if ((formData.description?.length || 0) < 10) {
            inputErrors.description = "Description too short (minimum 10 characters)";
        }
        setErrors(inputErrors);
        return Object.keys(inputErrors).length === 0;
    };

    const toggleAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };
        const payload = () => {
        return {
            ...formData, // Spread everything first
            price: formData.price?.toString(),
            lat: Number(formData.lat) || 9.0765,
            lng: Number(formData.lng) || 7.3986,
            bedroom: Number(formData.bedroom) || 0,
            bathroom: Number(formData.bathroom) || 0,
            toilet: Number(formData.toilet) || 0,
            parking_space: Number(formData.parking_space) || 0,
            name: formData.name?.trim(),
            address: formData.address?.trim(),
        };
    };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validate the form locally first
    if (!validateForm()) return toast.error("Please fill required fields");

    setSubmitting(true);

    try {
        // 2. Get the token from localStorage
        const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
        const token = agentInfo?.token;

        if (!token) {
            setSubmitting(false);
            return toast.error("Session expired. Please login.");
        }

        // 3. THE OLD PAYLOAD (Manually mapping every single field)
        const payload = {
            name: formData.name,
            price: formData.price.toString(),
            country: formData.country,
            state: formData.state,
            city: formData.city,
            lat: Number(formData.lat) || 9.0765,
            lng: Number(formData.lng) || 7.3986,
            address: formData.address,
            description: formData.description,
            category: formData.category,
            total_area: formData.total_area,
            property_use: formData.property_use,
            payment_plan: formData.payment_plan,
            contract_type: formData.contract_type,
            bedroom: Number(formData.bedroom),
            bathroom: Number(formData.bathroom),
            toilet: Number(formData.toilet),
            parking_space: Number(formData.parking_space),
            furnishing: formData.furnishing,
            disclaimer: formData.disclaimer,
            amenities: formData.amenities,
        };

        // 4. Making the API call with the manual payload
        const res = await axios.put(
            `${baseURL}/properties/${id}`, 
            payload, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        const result = res.data;

        // 5. Handling common API responses
        if (result.type === "TOKEN_EXPIRED" || result.code === 419) {
            toast.error("Your session has expired. Redirecting...");
            return router.push("/login");
        }

        if (result.type === "SUCCESS" || res.status === 200) {
            toast.success("Property updated successfully!");
            router.refresh();

            setTimeout(() => {
                router.push("/agent/properties");
            }, 800);
        } else {
            toast.error(result.msg || "Update failed. Check your data.");
        }
    } catch (err) {
        console.error("UPDATE ERROR:", err?.response?.data || err.message);
        toast.error(err?.response?.data?.msg || "Network error. Try again.");
    } finally {
        setSubmitting(false);
    }
};

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-700 w-12 h-12" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Record...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 mb-6 md:mb-8">
                <div className="max-w-3xl mx-auto flex flex-row items-center justify-between gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-all font-bold text-sm shrink-0">
                        <ArrowLeft size={20} /> <span className="font-bold sm:inline">Back</span>
                    </button>
                    <div className="text-right">
                        <h1 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">Update Property</h1>
                        <p className="text-[9px] md:text-[10px] text-slate-600 font-mono italic truncate max-w-37.5 md:max-w-none ml-auto">Property ID: {id}</p>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 md:px-6 space-y-6">

                {/* Section 1: Basic Info */}
                <div className="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 text-emerald-800 border-b pb-4">
                        <Home size={18} />
                        <h2 className="text-xs font-black uppercase tracking-widest">Basic Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Property Title</label>
                            <input
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-slate-300'} p-3 rounded-sm outline-none focus:border-emerald-600 text-slate-900 font-semibold transition-all shadow-sm`} />
                            {errors.name && <p className="text-red-600 text-[10px] font-bold mt-1 italic uppercase tracking-tighter">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                            <textarea
                                name="description"
                                rows={5}
                                value={formData.description || ""}
                                onChange={handleChange}
                                className={`w-full bg-white border ${errors.description ? 'border-red-500' : 'border-slate-300'} p-3 rounded-sm outline-none focus:border-emerald-600 text-slate-900 font-medium transition-all resize-none shadow-sm`} />
                            {errors.description && <p className="text-red-600 text-[10px] font-bold mt-1 italic uppercase tracking-tighter">{errors.description}</p>}
                        </div>
                    </div>
                </div>

                {/* Pricing & Stats */}
                <div className="bg-[#00492c] p-6 md:p-8 rounded-sm shadow-xl text-white space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">Price (₦)</label>
                        <input
                            name="price"
                            value={formData.price || ""}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b ${errors.price ? 'border-red-400' : 'border-slate-700'} p-2 text-2xl md:text-3xl font-black outline-none focus:border-emerald-500 text-white transition-all`} />
                        {errors.price && <p className="text-red-400 text-[10px] font-bold mt-1 italic uppercase tracking-tighter">{errors.price}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                            <label className="text-[9px] font-bold text-slate-300 uppercase block mb-1">Bedrooms</label>
                            <input name="bedroom" type="number" value={formData.bedroom || ""} onChange={handleChange}
                                className="w-full bg-transparent font-black text-xl text-white outline-none" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                            <label className="text-[9px] font-bold text-slate-300 uppercase block mb-1">Bathrooms</label>
                            <input name="bathroom" type="number" value={formData.bathroom || ""} onChange={handleChange} className="w-full bg-transparent font-black text-xl text-white outline-none" />
                        </div>
                        <div className="bg-white/5 p-4 rounded-sm border border-white/10 sm:col-span-2 lg:col-span-1">
                            <label className="text-[9px] font-bold text-slate-300 uppercase block mb-1">Parking Space</label>
                            <input name="parking_space" type="number" value={formData.parking_space || ""} onChange={handleChange} className="w-full bg-transparent font-black text-xl text-white outline-none" />
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 text-emerald-800 border-b pb-4">
                        <MapPin size={18} />
                        <h2 className="text-xs font-black uppercase tracking-widest">Location Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address</label>
                            <input
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                className={`w-full bg-white border ${errors.address ? 'border-red-500' : 'border-slate-300'} p-3 rounded-sm outline-none focus:border-emerald-600 text-slate-900 font-semibold shadow-sm`} />
                            {errors.address && <p className="text-red-600 text-[10px] font-bold mt-1 italic uppercase tracking-tighter">{errors.address}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">City</label>
                            <input
                                name="city"
                                value={formData.city || ""}
                                onChange={handleChange}
                                className={`w-full bg-white border ${errors.city ? 'border-red-500' : 'border-slate-300'} p-3 rounded-sm outline-none focus:border-emerald-600 text-slate-900 font-semibold shadow-sm`} />
                            {errors.city && <p className="text-red-600 text-[10px] font-bold mt-1 italic uppercase tracking-tighter">{errors.city}</p>}
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-slate-800 border-b pb-4">
                        <span className="p-1 bg-slate-100 rounded-full"><Info size={14} /></span>
                        <h2 className="text-xs font-black uppercase tracking-widest">Amenities</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {AMENITY_OPTIONS.map(a => (
                            <button
                                key={a}
                                type="button"
                                onClick={() => toggleAmenity(a)}
                                className={`px-3 md:px-4 py-2.5 text-[9px] md:text-[10px] font-black rounded-sm border transition-all ${formData.amenities.includes(a)
                                    ? 'bg-emerald-800 border-emerald-800 text-white shadow-md'
                                    : 'bg-white border-slate-300 text-slate-400 hover:border-emerald-300'
                                    }`}>
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-700 text-white py-5 cursor-pointer md:py-6 rounded-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all disabled:opacity-50 active:scale-[0.98] mt-4">
                    {submitting ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={18} />
                            <span>Updating...</span>
                        </div>
                    ) : (
                        <><Save size={16} /> Update Changes</>
                    )}
                </button>
            </form>
        </div>
    );
}