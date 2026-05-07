"use client";
import AgentRegForm from "@/components/(forms)/AgentReg"; // Renamed import to avoid conflict
import { FaUser } from "react-icons/fa6";

export default function AgentRegistrationPage() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
            <div className="flex flex-col items-center p-8 bg-white shadow-xl rounded-2xl w-1/2 border border-gray-100">

                <div className="w-16 h-16 rounded-full border-4 border-blue-50 flex items-center justify-center text-secondary bg-primary/10 mb-4">
                    <FaUser size={28} />
                </div>

                <h1 className="text-2xl font-black tracking-widest text-slate-800 uppercase">
                    Welcome
                </h1>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                    Create your agent account to get started
                </p>

                {/* The Form Component */}
                <div className="w-full">
                    <AgentRegForm />
                </div>


            </div>
        </div>
    );
}