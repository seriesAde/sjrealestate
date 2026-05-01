import Sidebar from "@/components/Sidebar";
import MerchantSideNav from "@/components/merchantSideNav";
import { AuthProvider } from "@/context/AuthContext";


export default function MerchantLayout({ children }) {

    return (
        <div className="flex flex-col lg:flex-row bg-slate-50 min-h-screen">
            <MerchantSideNav />
            <main className="p-8 min-h-screen overflow-y-auto w-full">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </main>
        </div >
    );
}