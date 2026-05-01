"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem("authData"));
        // console.log("Stored Auth Data from localStorage:", storedAuth);
        if (!storedAuth || storedAuth.role !== "MERCHANT") {
            setAuthorized(false);
            router.push("/login");
            localStorage.removeItem("authData");
            alert("Unauthorized access. Please log in as a merchant to view the dashboard.");
            return;
        } else if (storedAuth.role === "MERCHANT") {
            setAuthorized(true);
        } else if (storedAuth.role === "AGENT") {
            router.push("/agent-dashboard");
        }

        setLoading(false);
    }, []);



    return (
        <AuthContext.Provider value={{ authData, loading, setLoading, authorized, setAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}