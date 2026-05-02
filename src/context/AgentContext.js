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
        // console.log("Stored Auth Data from localStorage:", storedAuth);
        if (!storedAuth || storedAuth.role !== "AGENT") {
            setAuthorized(false);
            router.push("/login");
            localStorage.removeItem("authData");
            toast.error("Unauthorized access. Please log in as an agent to access agent dashboard.");
            return;
        } else if (storedAuth.role === "AGENT") {
            setAuthorized(true);
        }
        //  else if (storedAuth.role === "AGENT") {
        //     router.push("/agent-dashboard");
        // }

        setLoading(false);
    }, []);



    return (
        <AgentContext.Provider value={{ authData, loading, setLoading, authorized, setAuthorized }}>
            {children}
        </AgentContext.Provider>
    );
}

export function useAgent() {
    return useContext(AgentContext);
}