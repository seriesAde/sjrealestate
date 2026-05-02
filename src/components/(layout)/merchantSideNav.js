"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MERCHANT_MENU_ITEMS } from "@/lib/agentDashboardNav";
import { LogOut, Menu, X } from "lucide-react";

export default function MerchantSideNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    function handleLogout() {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <div className=" ">
            {/* Mobile Top Navbar */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-50">
                <h1 className="text-lg font-bold text-primary">Merchant</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md hover:bg-slate-100"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:sticky top-0 left-0 z-50
                    lg:h-screen w-64 bg-white border-r border-slate-200
                    flex flex-col
                    transform transition-transform duration-500
                    ${isOpen ? "translate-y-18" : "-translate-y-full"}
                    lg:translate-y-0
                `}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 hidden lg:block">
                    <h1 className="text-xl font-bold text-primary text-center">
                        Merchant
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {MERCHANT_MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
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

                {/* Logout */}
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>

    );
}