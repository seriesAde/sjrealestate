"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AgentAvatarUpload from "@/components/(agent)/AgentProfile"; // Assuming the upload component is in the same folder
import { property } from "zod";
import Appointments from "../appointments/page";
import AgentAppointmentManager from "@/components/(forms)/AgentAppointmentManeger";

export default function AgentProfile() {
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        // Pulling the data from your established localStorage key
        const storedData = localStorage.getItem("agent_info");
        if (storedData) {
            const parsed = JSON.parse(storedData);
            // Handling the nested user object structure often found in reworkstaging APIs
            setAgent(parsed.user || parsed);
        }
    }, []);

    if (!agent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-emerald-100 rounded-full mb-4"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading Profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8faf9] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* TOP NAVIGATION / HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-[#00492c] uppercase tracking-tighter">My Profile</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Partner Dashboard</p>
                    </div>
                    <Link href="/edit-profile" className="px-5 py-2.5 bg-white border border-gray-200 text-[#00492c] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                        Edit Details
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: AVATAR & QUICK STATS */}
                    <div className="space-y-6">
                        <AgentAvatarUpload />
                        
                        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account Status</p>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                                Verified Agent
                            </span>
                            <div className="mt-6 pt-6 border-t border-gray-50">
                                <p className="text-xs font-bold text-gray-600 italic">"Committed to finding the perfect home for every client."</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILED INFO */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 md:p-10 rounded-sm border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-black text-[#00492c] uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
                                    <p className="text-lg font-bold text-gray-800 tracking-tight">
                                        {agent.name}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Email Address</label>
                                    <p className="text-lg font-bold text-gray-800 tracking-tight">{agent.email}</p>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Phone Number</label>
                                    <p className="text-lg font-bold text-gray-800 tracking-tight">{agent.phone || "0901234785"}</p>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Agent ID</label>
                                    <p className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md inline-block">
                                        {agent.id}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-50 flex flex-wrap gap-4">
                                <div className="flex-1 min-w-35 bg-gray-50 p-4 rounded-xl">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Properties</p>
                                    <p className="text-xl font-black text-gray-800">{property.length}</p>
                                </div>
                                <div className="flex-1 min-w-35 bg-gray-50 p-4 rounded-xl">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Appointments</p>
                                    <p className="text-xl font-black text-gray-800">{Appointments.length}</p>
                                </div>
                                <div className="flex-1 min-w-35 bg-gray-50 p-4 rounded-xl">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Rating</p>
                                    <p className="text-xl font-black text-gray-800">4.9</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#00492c] p-8 rounded-2xl text-white flex justify-between items-center overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-lg font-black uppercase tracking-tighter">Ready to list?</h4>
                                <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mt-1">Add a new property to your portfolio</p>
                            </div>
                            <Link href="/add-property" className="relative z-10 bg-white text-[#00492c] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                                New Property
                            </Link>
                            {/* Decorative element */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-700 rounded-full opacity-50"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}