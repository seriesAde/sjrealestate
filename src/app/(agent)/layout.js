import Sidebar from "@/components/(layout)/Sidebar";
import { AgentProvider } from "@/context/AgentContext";

export default function AgentLayout({ children }) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">
                <AgentProvider>
                    {children}
                </AgentProvider>
            </main>
        </div>
    );
}