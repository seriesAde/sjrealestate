"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "@/lib/appointmentSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Calendar, Clock, MessageSquare, ShieldCheck } from "lucide-react";

export default function AppointmentForm({ propertyId }) {
    const [userId, setUserId] = useState("");
    const baseURL = "http://property.reworkstaging.name.ng/v1";

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("last_created_user"));
        if (user) setUserId(user.id || user._id);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            property_id: propertyId,
            user_id: "",
        },
    });

    const onSubmit = async (data) => {
        const payload = { ...data, user_id: userId };
        const agentData = JSON.parse(localStorage.getItem("agent_info"));
        const token = agentData?.token;

        try {
            const res = await axios.post(`${baseURL}/appointments`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200 || res.status === 201) {
                toast.success("Inspection booked successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Booking failed");
        }
    };

    return (
        <div className="max-w-md mx-auto my-10"> {/* Added vertical margin to the outer container */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-[#00492c] p-8 text-white text-center">
                    <ShieldCheck className="w-14 h-14 mx-auto mb-3 opacity-90" />
                    <h3 className="text-2xl font-bold italic tracking-wide">SJ Real Estate</h3>
                    <p className="text-[10px]text-gray-200 opacity-80 mt-1">Request a property inspection</p>
                </div>

                <div className="p-8 sm:p-10 space-y-8">
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-wider">
                            <Calendar className="w-4 h-4 text-[#00492c]" /> Inspection Date
                        </label>
                        <input type="date" {...register("date")} className="w-full text-black px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00492c] focus:border-transparent outline-none transition-all" />
                        {errors.date && <p className="text-red-500 text-xs font-medium mt-1">{errors.date.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="flex items-center text-gray-600 gap-2 text-sm font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#00492c]" /> From
                            </label>
                            <select
                                {...register("time.from")}
                                className="w-full px-4 py-4 bg-gray-50 border text-sm text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00492c] outline-none transition-all cursor-pointer">
                                <option value="">Start Time</option>
                                <option value="09 AM">09:00 AM</option>
                                <option value="10 AM">10:00 AM</option>
                                <option value="11 AM">11:00 AM</option>
                                <option value="12 PM">12:00 PM</option>
                                <option value="02 PM">02:00 PM</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-gray-600 text-sm font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#00492c]" /> To
                            </label>
                            <select
                                {...register("time.to")}
                                className="w-full px-4 py-4 bg-gray-50 border text-sm  text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00492c] outline-none transition-all cursor-pointer">
                                <option value="">End Time</option>
                                <option value="10 AM">10:00 AM</option>
                                <option value="11 AM">11:00 AM</option>
                                <option value="12 PM">12:00 PM</option>
                                <option value="01 PM">01:00 PM</option>
                                <option value="04 PM">04:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-wider">
                            <MessageSquare className="w-4 h-4 text-[#00492c]" /> Additional Message
                        </label>
                        <textarea {...register("msg")} placeholder="Tell the agent any specific details..."
                            className="w-full px-4 py-4 bg-gray-50 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00492c] outline-none transition-all h-36 resize-none" />
                        {errors.msg && <p className="text-red-500 text-xs font-medium mt-1">{errors.msg.message}</p>}
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={isSubmitting || !userId}
                            className="w-full bg-[#00492c] text-white py-5 cursor-pointer rounded-lg text-sm font-bold hover:bg-[#003621] shadow-xl shadow-green-900/20 disabled:bg-gray-300 disabled:shadow-none transition-all transform active:scale-95">
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing Booking...
                                </span>
                            ) : (
                                "Confirm Appointment"
                            )}
                        </button>

                        {!userId && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                                <p className="text-center text-red-600 text-xs font-bold uppercase tracking-tighter ">⚠️ Account Required: Please log in to request viewings.</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}