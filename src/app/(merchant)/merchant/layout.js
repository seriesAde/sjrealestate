import MerchantSideNav from "@/components/(layout)/merchantSideNav";
import { AuthProvider } from "@/context/AuthContext";
import MerchantTopNav from "@/components/(layout)/merchantTopNav";


export default function MerchantLayout({ children }) {

    return (
        <div className="flex flex-col lg:flex-row bg-[#F1EDE7]  min-h-screen">
            <MerchantSideNav />
            <main className="p-5 min-h-screen overflow-y-auto w-full">
                <AuthProvider>
                    <MerchantTopNav />
                    {children}
                </AuthProvider>
            </main>
        </div >
    );
}