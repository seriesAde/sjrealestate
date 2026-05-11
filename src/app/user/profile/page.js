"use client"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import Nav from "@/components/(ui)/nav";
import Footer from "@/components/(ui)/footer";
import { useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Function to check auth status
        const checkAuth = () => {
            const storedData = localStorage.getItem("userInfo");
            if (!storedData) {
                toast.error("Session expired. Please login again.");
                router.push("/login");
            } else {
                setUserData(JSON.parse(storedData));
            }
        };

        // 1. Check immediately on mount
        checkAuth();

        // 2. Listen for changes from other tabs/windows
        window.addEventListener("storage", checkAuth);

        const interval = setInterval(checkAuth, 2000);

        return () => {
            window.removeEventListener("storage", checkAuth);
            clearInterval(interval);
        };
    }, [router]);
    return (
        <div>
            <Nav />
            this is profile
            <Footer />
        </div>
    )
}