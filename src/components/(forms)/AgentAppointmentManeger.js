"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AgentAppointmentManager() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseURL = "/api";

    useEffect(() => {
        const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
        const agentId = agentInfo.id;
        const token = agentInfo.token;

        if (!token || !agentId) return;

        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${baseURL}/appointments?agent=${agentId}&completed=false&page=0&limit=10`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                
                setAppointments(res.data?.data || []);

            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("Failed to fetch appointments");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [baseURL]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return;

        try {
            const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
            const token = agentInfo.token;

            await axios.delete(`${baseURL}/appointments/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Appointment deleted");
            setAppointments((prev) => prev.filter((app) => app.id !== id));
        } catch (err) {
            console.error("Delete Error:", err);
            const errorMsg = err.response?.data?.msg || "Failed to delete appointment";
            toast.error(errorMsg);
        }
    };

    const handleConfirm = async (id) => {
        try {
            const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
            const token = agentInfo.token;

            const response = await axios.put(`${baseURL}/appointments/${id}/confirm-meeting`, {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data)

            toast.success("Appointment confirmed");

            setAppointments((prev) =>
                prev.map((a) => a.id === id ? { ...a, confirmed: true } : a));

        } catch (err) {
            console.error("Confirm Error:", err);
            const msg = err.response?.data?.msg || "Failed to confirm appointment";
            toast.error(msg);
        }
    };
    

    if (loading) return (
        <div className="p-20 text-center font-black tracking-widest animate-pulse text-gray-500 uppercase">
            Loading Records...
        </div>
    );

    return (
        <div className="p-6 space-y-8 bg-white text-gray-900">
            <h2 className="text-3xl font-bold text-left">Agent Appointments</h2>

            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="text-left bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 font-medium">Property</th>
                            <th className="px-6 py-3 font-medium">Client</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Time</th>
                            <th className="px-6 py-3 font-medium">Client ID</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appt, i) => (
                            <tr
                                key={appt.id}
                                className={`border-t border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                <td className="px-6 py-3 font-medium text-gray-900">
                                    {appt.property?.name || "-"}
                                </td>
                                <td className="px-6 py-3">
                                    {appt.user?.full_name} {appt.user?.last_name}
                                </td>
                                <td className="px-6 py-3">
                                    {new Date(appt.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3">
                                    {appt.time?.from} - {appt.time?.to}
                                </td>
                                <td className="px-6 py-3 font-mono text-xs">{appt.user?.id || "-"}</td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <button onClick={() => handleConfirm(appt.id)} disabled={appt.confirmed} className={`px-3 py-1.5  cursor-pointer text-xs font-medium rounded-xl text-white transition
                                        ${appt.confirmed
                                                ? "bg-[#00492c] cursor-not-allowed"
                                                : "bg-[#00492c] hover:bg-green-700"
                                            }`}>
                                        {appt.confirmed ? "Confirmed" : "Confirm"}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(appt.id)}
                                        className="px-3 py-1.5 text-xs cursor-pointer font-medium rounded-xl bg-red-500 hover:bg-red-600 text-white transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {appointments.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No appointments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function AgentAppointmentManager() {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const baseURL = "http://property.reworkstaging.name.ng/v1";

//     // Helper to get fresh auth data
//     const getAuth = useCallback(() => {
//         const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
//         return {
//             agentId: agentInfo.id || agentInfo.user?.id,
//             token: agentInfo.token
//         };
//     }, []);

//     const fetchAppointments = useCallback(async () => {
//         const { agentId, token } = getAuth();
//         if (!token || !agentId) return;

//         try {
//             setLoading(true);
//             // This fetches only "UNCOMPLETED" appointments based on your Postman result
//             const res = await axios.get(
//                 `${baseURL}/appointments?agent=${agentId}&completed=false&page=0&limit=10`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
            
//             setAppointments(res.data?.data || []);
//         } catch (err) {
//             console.error("Fetch Error:", err);
//             toast.error("Could not load appointments");
//         } finally {
//             setLoading(false);
//         }
//     }, [getAuth, baseURL]);

//     useEffect(() => {
//         fetchAppointments();
//     }, [fetchAppointments]);

//     // THE LOGIC TO MAKE "COMPLETED=FALSE" BECOME "TRUE"
//     const handleMarkAsCompleted = async (apptId) => {
//         const { token } = getAuth();
        
//         if (!confirm("Confirm completion of this appointment?")) return;

//         try {
//             // Update the status on the server
//             await axios.put(
//                 `${baseURL}/appointments/${apptId}`,
//                 { is_completed: true }, // This makes the 'completed=false' filter in the GET request no longer match this item
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             toast.success("Appointment marked as COMPLETED");

//             // Optimistically update UI: Remove it from the "Uncompleted" list
//             setAppointments((prev) => prev.filter((item) => item.id !== apptId));
            
//         } catch (err) {
//             const errorMsg = err.response?.data?.msg || "Failed to update status";
//             toast.error(errorMsg);
//         }
//     };

//     if (loading) return <div className="p-20 text-center font-black animate-pulse">SYNCING DATA...</div>;

//     return (
//         <div className="p-6 bg-white min-h-screen">
//             <div className="max-w-5xl mx-auto">
//                 <header className="mb-8 border-b pb-4 flex justify-between items-end">
//                     <div>
//                         <h1 className="text-4xl font-black text-gray-900 tracking-tighter">SCHEDULE</h1>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Appointments</p>
//                     </div>
//                     <div className="text-right">
//                         <span className="text-3xl font-black text-emerald-600">{appointments.length}</span>
//                         <p className="text-[10px] font-black text-gray-400 uppercase">Pending</p>
//                     </div>
//                 </header>

//                 <div className="space-y-4">
//                     {appointments.map((appt) => (
//                         <div key={appt.id} className="group bg-gray-50 border border-gray-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center transition-all hover:border-emerald-200 hover:bg-emerald-50/30">
                            
//                             <div className="flex-1 space-y-1">
//                                 <div className="flex items-center gap-2">
//                                     <span className="bg-white px-2 py-0.5 rounded border border-gray-200 text-[10px] font-black text-gray-500 uppercase">
//                                         {appt.property?.type || "PROPERTY"}
//                                     </span>
//                                     <h3 className="font-bold text-gray-800">{appt.property?.name}</h3>
//                                 </div>
//                                 <p className="text-sm text-gray-600 font-medium">
//                                     Client: {appt.user?.full_name} {appt.user?.last_name}
//                                 </p>
//                                 <div className="flex gap-4 text-[11px] font-bold text-gray-400 uppercase">
//                                     <span>📅 {new Date(appt.date).toLocaleDateString()}</span>
//                                     <span>⏰ {appt.time?.from} - {appt.time?.to}</span>
//                                 </div>
//                             </div>

//                             <div className="mt-4 md:mt-0 flex items-center gap-3">
//                                 <div className="text-right mr-4 hidden md:block">
//                                     <p className="text-[10px] font-black text-gray-300 uppercase">Status</p>
//                                     <p className="text-xs font-bold text-orange-500">{appt.status}</p>
//                                 </div>
                                
//                                 <button 
//                                     onClick={() => handleMarkAsCompleted(appt.id)}
//                                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
//                                 >
//                                     Complete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}

//                     {appointments.length === 0 && (
//                         <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
//                             <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">All caught up!</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }