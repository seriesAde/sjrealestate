import AgentAppointmentManager from "@/components/(forms)/AgentAppointmentManeger";
export default function Appointments() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-black">Appointments</h1>
            <p className=" text-black">List of appointments will be displayed here.</p>
            <AgentAppointmentManager />
        </div>
    );
}