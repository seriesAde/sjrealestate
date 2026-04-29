import Sidebar from "@/components/Sidebar";

export default function AgentLayout({ children }) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}