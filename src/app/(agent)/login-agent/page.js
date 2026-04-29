"use client";
import AgentLoginForm from "@/components/AgentLogin"; // Renamed import to avoid conflict
import { FaUser } from "react-icons/fa6";

export default function AgentRegistrationPage() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
            <div className="flex flex-col items-center p-8 bg-white shadow-xl rounded-2xl w-full max-w-[400px] border border-gray-100">
                
                <div className="w-16 h-16 rounded-full border-4 border-blue-50 flex items-center justify-center text-blue-600 bg-blue-100 mb-4">
                    <FaUser size={28} />
                </div>

                <h1 className="text-2xl font-black tracking-widest text-slate-800 uppercase">
                    Welcome
                </h1>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                    Enter your agent credentials
                </p>

                {/* The Form Component */}
                <div className="w-full">
                    <AgentLoginForm />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        Not an agent? create an account? 
                        <a href="/create-agent" className="text-blue-600 font-bold hover:underline ml-1">
                            create account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}