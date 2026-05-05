"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AgentContext = createContext();

export function AgentProvider({ children }) {
    const router = useRouter();
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem("authData"));
        setAuthData(storedAuth);

        if (!storedAuth || storedAuth.role !== "AGENT") {
            setAuthorized(false);
            toast.error("Unauthorized access. Please log in as an agent.");

            localStorage.removeItem("authData");
            router.push("/login");
            return;
        } else if (storedAuth.role === "AGENT") {
            
            setAuthorized(true);
        }

        setLoading(false);
    }, [router]); 

    return (
        <AgentContext.Provider value={{ authData, loading, setLoading, authorized, setAuthorized }}>
            {children}
        </AgentContext.Provider>
    );
}

export function useAgent() {
    return useContext(AgentContext);
}