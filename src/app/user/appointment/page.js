import AppointmentForm from "@/components/(forms)/AppointmentForm";
export default function UserAppointments() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            <p>List of appointments will be displayed here.</p>
            <AppointmentForm/>
        </div>
    );
}