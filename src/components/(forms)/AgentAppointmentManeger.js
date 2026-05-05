

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AgentAppointmentManager() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseURL = "/api";

    useEffect(() => {
        fetchAppointments();
    }, []); // Refetch when appointments change (e.g., after confirming/completing)

    const fetchAppointments = async () => {
        try {
            const agentInfo = JSON.parse(localStorage.getItem("agent_info"));
            const token = agentInfo?.token;
            const agentId = agentInfo?.id;

            const res = await axios.get(`${baseURL}/appointments?agent=${agentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched Appointments:", res.data.data);
            setAppointments(res.data.data || []);
        } catch (error) {
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("agent_info"))?.token;
            await axios.put(`${baseURL}/appointments/${id}/confirm-meeting`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Meeting Confirmed!");
            fetchAppointments(); // Refresh the list
        } catch (error) {
            toast.error("Action failed");
        }
    };

    const handleComplete = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("agent_info"))?.token;
            await axios.put(`${baseURL}/appointments/${id}/set-agent-appointment-completion`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Marked as Completed!");
            fetchAppointments();
        } catch (error) {
            toast.error("Action failed");
        }
    };

    if (loading) return <p className="text-center p-10">Loading schedule...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Your Inspections</h2>

            <div className="grid gap-4">
                {appointments.length == 0 ? (
                    <p className="text-gray-500 italic">No appointments found.</p>
                ) : (
                    appointments.map((app) => (
                        <div key={app.id} className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-[#00492c] uppercase tracking-widest mb-1">
                                    {app.property_id?.name || "Property Inspection"}
                                </p>
                                <p className="text-lg font-semibold text-gray-800">{app.date}</p>
                                <p className="text-sm text-gray-600">Time: {app.time.from} - {app.time.to}</p>
                                <p className="mt-2 text-sm italic text-gray-500">"{app.msg}"</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* Logic to show different buttons based on status */}
                                {!app.is_confirmed && (
                                    <button onClick={() => handleConfirm(app.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">Confirm Meeting
                                    </button>
                                )}

                                {app.is_confirmed && !app.agent_completed && (
                                    <button onClick={() => handleComplete(app.id)} className="bg-[#00492c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#003621]">
                                        Mark Completed
                                    </button>
                                )}

                                {app.agent_completed && (
                                    <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                                        ✅ Completed
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}