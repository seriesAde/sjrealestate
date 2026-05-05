"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AGENT_MENU_ITEMS } from "@/lib/agentDashboardNav";
import { LogOut } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    function handleLogout() {
        localStorage.removeItem("agent_info");
        window.location.href = "/login";
    }

    return (
        <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-xl font-bold text-primary">PropAgent</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {AGENT_MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-blue-50 text-primary"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}