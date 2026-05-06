import { MapPin, Bed, Bath, Car, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ item, onDelete }) {
    const displayImage = item.image || (item.images && item.images[0]);

    return (
        <div className="group border border-slate-100 p-5 rounded-xl bg-gray-900 hover:shadow-sm transition-all flex flex-col relative">
            <div className="absolute top-3 left-3 flex gap-2 z-10">
                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded">
                    {item.type}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#00492c] text-white px-3 py-1 rounded">
                    {item.category}
                </span>
            </div>
            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl bg-gray-500">
                <img src={displayImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-black text-slate-900 line-clamp-1 flex-1">{item.name}</h3>
                
                <div className="flex gap-1 ml-2">
                    <Link href="/agent/properties/edith">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"><Edit className="w-4 h-4" /></button>
                    </Link>

                    <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer" >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-4 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {item.city}, {item.state}
            </p>

            <div className="text-2xl font-black text-primary mb-6">
                ₦{Number(item.price).toLocaleString()}
            </div>

            {/* Features */}
            <div className="flex justify-between py-4 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">{item.bedroom || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">{item.bathroom || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">{item.parking_space || 0}</span>
                </div>
            </div>

            <Link href={`/properties/${item.id}`} className="mt-4 block w-full text-center py-3 bg-[#00492c] hover:bg-[#003620] text-slate-50 text-[10px] font-black uppercase tracking-widest rounded transition-colors cursor-pointer">
                View Details
            </Link>
        </div>
    );
}