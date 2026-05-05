"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import {
    Home,  Tag, Layout,  Bed,
    Bath, User, Car, PlusCircle, Loader2,
    FileText, CheckCircle2, ShieldCheck,
     ImageIcon, Layers, X
} from "lucide-react";

export default function CreateProperties() {
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const router = useRouter();

    const agentData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("agent_info")) : null;
    const baseURL = "/api";

    const abujaDistricts = ["Lugbe", "Kubwa", "Karu", "Wuse", "Jabi", "Maitama", "Gwarinpa"];
    const availableAmenities = ["GYM", "SECURITY", "24/7 WATER", "STEADY ELECTRICITY"];

    const paymentPlans = ["PER_ANNUM", "MONTHLY", "PER_PLOT", "PER_DAY"];
    const propertyTypes = ["RENT", "LEASE", "SALES"];
    const categories = ["FLAT", "APPARTMENT", "LAND", "DUPLEX", "WAREHOUSE", "SHOP"];
    const propertyUses = ["RESIDENTIAL", "COMMERCIAL"];

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        city: "",
        lat: 9.0765,
        lng: 7.3986,
        address: "",
        description: "",
        category: "",
        total_area: "",
        property_use: "",
        payment_plan: "",
        type: "",
        bedroom: "",
        bathroom: "",
        toilet: "",
        parking_space: "",
        furnishing: "FURNISHED",
        disclaimer: "",
        amenities: [],
        agent: agentData?.user.full_name
    });

    useEffect(() => {
        if (!agentData?.token) {
            toast.error("Session expired. Please login.");
            router.push("/agent-login");
        }
    }, [router, agentData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleFileSelection = (e) => {
        const files = Array.from(e.target.files);
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB

        if (files.length + selectedFiles.length > 5) {
            toast.error("Maximum 5 images allowed in total.");
            return;
        }

        const oversized = files.filter(file => file.size > MAX_SIZE);
        if (oversized.length > 0) {
            toast.error("One or more images exceed the 10MB limit.");
            return;
        }

        setSelectedFiles(prev => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const uploadImages = async (propertyId) => {
        if (selectedFiles.length === 0) return;

        const formDataUpload = new FormData();
        selectedFiles.forEach((file) => {
            formDataUpload.append("images", file);
        });

        try {
            await axios.put(`${baseURL}/properties/${propertyId}/resource`, formDataUpload, {
                headers: { 
                    Authorization: `Bearer ${agentData?.token}`,
                    "Content-Type": "multipart/form-data" 
                }
            });
        } catch (error) {
            console.error("Gallery Error:", error);
            toast.error("Property saved, but images failed to upload.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const required = ["name", "price", "city", "address", "description", "category", "type"];
        const missing = required.filter(f => !formData[f]);

        if (missing.length > 0) {
            return toast.error(`Required: ${missing.join(", ")}`);
        }

        const token = agentData?.token;
        const agentId = agentData?.user?.id || agentData?.user?._id;

        setLoading(true);

        const payload = {
            ...formData,
            country: "NIGERIA",
            state: "ABUJA",
            price: Number(formData.price),
            toilet: Number(formData.toilet) || 0,
            bedroom: Number(formData.bedroom) || 0,
            bathroom: Number(formData.bathroom) || 0,
            parking_space: Number(formData.parking_space) || 0,
            agent: agentId
        };

        try {
            // 1. Create Property
            const response = await axios.post(`${baseURL}/properties`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const newPropertyId = response.data.data.id;

            // 2. TRIGGER IMAGE UPLOAD
            if (selectedFiles.length > 0) {
                await uploadImages(newPropertyId);
            }

            localStorage.setItem("property_details", newPropertyId);
            toast.success("Property published successfully!");
            router.push("/agent/properties");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Failed to create property");
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-[#00492C] p-8 text-white">
                    <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-[#00985B]" />
                        <h2 className="text-3xl font-bold tracking-tight">sjRealEstate</h2>
                    </div>
                    <p className="text-slate-200 mt-2 uppercase text-xs tracking-widest font-semibold">Create New Listing</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* General Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <Layout className="w-5 h-5 text-[#00492c]" />
                            <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">General Info</h3>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Property Title</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900" placeholder="e.g. Maitama Luxury Suite" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Price (₦)</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900" placeholder="0.00" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Address</label>
                            <input name="address" value={formData.address} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900" placeholder="Street address" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">District (Abuja)</label>
                            <select name="city" value={formData.city} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm">
                                <option value="">Select District</option>
                                {abujaDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-[#00492c]" />
                            <h3 className=" text-slate-800 uppercase text-sm tracking-widest">Classification</h3>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm">
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Listing Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm">
                                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-700">Payment Plan</label>
                            <select name="payment_plan" value={formData.payment_plan} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm">
                                {paymentPlans.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[12px] font-bold text-slate-700">Property Use</label>
                            <select name="property_use" value={formData.property_use} onChange={handleChange} className="w-full border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm">
                                {propertyUses.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Bedrooms", name: "bedroom", icon: Bed },
                            { label: "Bathroom", name: "bathroom", icon: Bath },
                            { label: "Toilets", name: "toilet", icon: User },
                            { label: "Parking", name: "parking_space", icon: Car },
                        ].map((spec) => (
                            <div key={spec.name} className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1 justify-center">
                                    <spec.icon className="w-3 h-3" /> {spec.label}
                                </label>
                                <input name={spec.name} type="number" value={formData[spec.name]} onChange={handleChange} className="w-full border border-slate-300 p-2 rounded-md bg-white text-slate-900 font-bold text-center outline-none focus:border-[#00492c]" />
                            </div>
                        ))}
                    </div>

                    {/* Amenities */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#00985B]" /> Amenities
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {availableAmenities.map(amenity => (
                                <button key={amenity} type="button"
                                    onClick={() => handleAmenityChange(amenity)} className={`p-3 text-[10px] font-black rounded-md border-2 transition-all flex items-center justify-between tracking-widest ${formData.amenities.includes(amenity)
                                        ? 'bg-green-50 border-[#00492c] text-[#00492c]'
                                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                    }`}
                                >
                                    {amenity}
                                    {formData.amenities.includes(amenity) && <ShieldCheck className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-[#00492c]" />
                            <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">Property Gallery</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeFile(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                                        <X size={12} className="text-red-600" />
                                    </button>
                                </div>
                            ))}
                            {selectedFiles.length < 5 && (
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#00985B] hover:bg-green-50 transition-all text-slate-400">
                                    <ImageIcon size={24} />
                                    <span className="text-[10px] font-bold mt-1 uppercase">Add Photo</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelection} />
                                </label>
                            )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter text-center">Max 5 images • Max 10MB per file</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-slate-300 p-4 rounded-md h-32 bg-white text-slate-900 outline-none focus:border-[#00492c]" placeholder="Provide details about the property..." />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-[#00492c] cursor-pointer text-white py-5 rounded-md font-black uppercase tracking-widest text-sm hover:bg-[#003620] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-green-900/20">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><PlusCircle className="w-5 h-5" /> Publish Property</>}
                    </button>
                </form>
            </div>
        </div>
    );
}