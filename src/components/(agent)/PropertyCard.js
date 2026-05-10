import { MapPin, Bed, Bath, Car, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ item, onDelete }) {
    const displayImage = item.image || (item.images && item.images[0]);

    return (
        <div className="group bg-white border border-slate-100 p-4 rounded-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 flex flex-col relative">
            {/* Badges - Floating Style */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md text-[#00492c] px-3 py-1.5 rounded-sm shadow-sm border border-slate-100">
                    {item.contract_type || item.type}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-[#00492c] text-white px-3 py-1.5 rounded-sm shadow-sm">
                    {item.category}
                </span>
            </div>

            {/* Image Container */}
            <div className="relative h-56 w-full mb-5 overflow-hidden rounded-sm bg-slate-100">
                <img
                    src={displayImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Property Info */}
            <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight line-clamp-1 flex-1">
                    {item.name}
                </h3>

                <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/agent/properties//${item.id || item._id}`}>
                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-[#00492c] hover:bg-green-50 rounded-sm transition-all cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all cursor-pointer"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Location */}
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00985B]" /> {item.city}
            </p>

            {/* Price */}
            <div className="text-xl font-black text-[#00492c] mb-6 tracking-tighter">
                ₦{Number(item.price).toLocaleString()}
            </div>

            {/* Specs / Features */}
            <div className="flex justify-between py-4 border-t border-slate-50 mt-auto">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-black text-slate-300 uppercase">Beds</span>
                    <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-black text-slate-700">{item.bedroom || 0}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-black text-slate-300 uppercase">Baths</span>
                    <div className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-black text-slate-700">{item.bathroom || 0}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-black text-slate-300 uppercase">Park</span>
                    <div className="flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-black text-slate-700">{item.parking_space || 0}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Link
                href={`/properties/${item.id}`}
                className="mt-4 block w-full text-center py-4 bg-[#00492c] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-sm hover:bg-[#003620] hover:shadow-lg hover:shadow-green-900/20 transition-all cursor-pointer"
            >
                View Details
            </Link>
        </div>
    );
}