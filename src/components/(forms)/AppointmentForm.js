"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "@/lib/appointmentSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Calendar, Clock, ShieldCheck, Loader2 } from "lucide-react";

export default function AppointmentForm({ propertyId, onSuccess, user }) {
    const [userId, setUserId] = useState("");
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("userInfo"));
    //     if (user) setUserId(user.id || user._id);
    //     // console.log(propertyId)
    // }, []);

    // const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [userData, setUserData] = useState(null);
    const baseURL = "/api";

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            property_id: propertyId,
            user_id: user

        },
    });






    useEffect(() => {
        setIsMounted(true);
        const rawData = localStorage.getItem("user_info") || localStorage.getItem("userInfo");
        console.log("this is raw data: ", rawData)
        if (rawData) {
            try {
                const user = JSON.parse(rawData);
                if (user?.id) {
                    setUserData(user);
                    setUserId(user);
                    setValue("user_id", user.id);
                }
            } catch (error) {
                console.error("Auth state sync error:", error);
            }
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        // localStorage
        const token = userData?.token || "{}"?.token;

        if (!token) {
            toast.error("Session expired. Please log in again.");
            return;
        }

        const payload = {
            ...data,
            user_id: userId,
            property_id: propertyId
        };

        try {
            const res = await axios.post(`${baseURL}/appointments`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                toast.success("Inspection booked successfully!");
                onSuccess?.();
            }
        } catch (error) {
            const errorData = error.response?.data;
            console.error("Booking failed:", errorData || error.message);
            toast.error(errorData?.msg || "Unable to process booking. Please try again.");
        }
    };

    if (!isMounted) return null;

    return (
        <div className="max-w-md mx-auto my-10 px-4 animate-in fade-in duration-500">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-green-900/5">
                {/* Branding Header */}
                <div className="bg-[#00492c] p-8 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10" />
                    <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-90" />
                    <h3 className="text-2xl font-bold tracking-wide ">sjRealEstate</h3>
                    <p className="text-[10px] text-gray-200 opacity-80 mt-1 uppercase tracking-widest">
                        Property Inspection Request
                    </p>
                </div>

                <div className="p-8 space-y-5">
                    {/* Hidden Inputs */}
                    <input type="hidden" {...register("user_id")} />
                    <input type="hidden" {...register("property_id")} />

                    {/* Date Picker */}
                    <div className="group space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 group-focus-within:text-[#00492c] uppercase tracking-tighter transition-colors">
                            <Calendar className="w-4 h-4" /> Preferred Date
                        </label>
                        <input
                            type="date"
                            {...register("date")}
                            className="w-full text-black px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#00492c] focus:bg-white outline-none transition-all" />
                        {errors.date && <p className="text-red-500 text-[10px] font-medium italic">{errors.date.message}</p>}
                    </div>


                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="flex items-center text-gray-600 gap-2 text-sm font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#00492c]" /> Start
                            </label>
                            <select
                                {...register("time.from")}
                                className="w-full px-3 py-3 bg-gray-50 border text-xs text-black border-gray-100 rounded-xl focus:ring-2 focus:ring-[#00492c] outline-none transition-all cursor-pointer">
                                <option value="">Select Time</option>
                                <option value="09 AM">09:00 AM</option>
                                <option value="11 AM">11:00 AM</option>
                                <option value="02 PM">02:00 PM</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-gray-400 gap-2 text-[11px] font-bold uppercase tracking-tighter">
                                <Clock className="w-4 h-4" /> End
                            </label>
                            <select
                                {...register("time.to")}
                                className="w-full px-3 py-3 bg-gray-50 border text-xs text-black border-gray-100 rounded-xl focus:ring-2 focus:ring-[#00492c] outline-none transition-all cursor-pointer">
                                <option value="">Select Time</option>
                                <option value="10 AM">10:00 AM</option>
                                <option value="12 PM">12:00 PM</option>
                                <option value="04 PM">04:00 PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                            Inquiry Details
                        </label>
                        <textarea
                            {...register("msg")}
                            placeholder="Tell us what you're looking for..."
                            className="w-full px-4 py-4 bg-gray-50 border text-black text-sm border-gray-100 rounded-xl focus:ring-2 focus:ring-[#00492c] focus:bg-white outline-none transition-all h-28 resize-none shadow-inner" />
                        {errors.msg && <p className="text-red-500 text-[10px] font-medium italic">{errors.msg.message}</p>}
                    </div>

                    {/* Submission Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !userData}
                            className="w-full bg-[#00492c] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#003621] shadow-lg shadow-green-900/20 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Scheduling...
                                </>
                            ) : (
                                "Book Inspection"
                            )}
                        </button>

                        {!userData && (
                            <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                <p className="text-center text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                                    Authentication Required
                                </p>
                                <p className="text-center text-[9px] text-amber-600/80 mt-1 uppercase">
                                    Please login to Jade's account to book
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
            {/* <button
                type="button"
                onClick={() => handleSubmit(onSubmit, (errors) => console.log("ZOD ERRORS:", errors))()}
            >
                Test Submit
            </button> */}
        </div>
    );
}