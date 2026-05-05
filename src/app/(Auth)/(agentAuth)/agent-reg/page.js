import AgentReg from "@/components/(forms)/AgentReg";
import {FaUser } from "react-icons/fa6";

export default function Login() {
    return (
       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
             <div className="w-full max-w-[400px] bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100">
                 <div className="h-2 bg-[#009895]" />
 
                 <div className="p-10 flex flex-col items-center">
                     <div className=" mt-3 w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center text-[#00492c] bg-slate-50 mb-6 shadow-inner">
                         <FaUser className="text-xl " />
                     </div>
                     <div className="text-center mb-10">
                         <h1 className="text-3xl font-bold tracking-widest text-primary mb-5 ">Agent Registration</h1>
                     </div>
                     <div className="w-full">
                         <AgentReg />
                     </div>
                 </div>
             </div>
         </div>
    )
}
