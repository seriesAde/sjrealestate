import AgentLogin from "@/components/(forms)/AgentLogin";
import { FaUser } from "react-icons/fa6";

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100">
                <div className="h-2 bg-[#00492c]" />

                <div className="p-10 flex flex-col items-center">
                    <div className=" mt-3 w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center text-[#00492c] bg-slate-50 mb-6 shadow-inner">
                        <FaUser className="text-xl " />
                    </div>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-primary tracking-tighter">Welcome Back</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2"> Agent Portal Access</p>
                    </div>
                    <div className="w-full">
                        <AgentLogin />
                    </div>
                </div>
            </div>
        </div>
    );
}