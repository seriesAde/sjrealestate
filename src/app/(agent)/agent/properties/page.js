"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import PropertyPage from "@/components/(agent)/PropertyPage";


export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseURL = "/api";

    useEffect(() => {
        const fetchProperties = async () => {
            const agentData = JSON.parse(localStorage.getItem("agent_info"));
            //Double Check  id and _id 
            const agentId = agentData?.user?.id || agentData?.user?._id;

            if (!agentData?.token || !agentId) {
                setLoading(false);
                return;
            }
            
            //Api fetch
            try {
                const response = await axios.get(`${baseURL}/properties`, {
                    params: {
                        agent: agentId,
                        verified: false,
                        merchant: agentId,
                    },
                    headers: {
                        Authorization: `Bearer ${agentData.token}`
                    }
                });

                // Standardizing the data format
                const fetchedData = Array.isArray(response.data)
                    ? response.data : (response.data.properties || response.data.data || []);
                console.log("fetched Property(s):", fetchedData)

                setProperties(fetchedData);

            } catch (error) {
                toast.error("Could not load your properties");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
        </div>
    );

    return (
        <>
            <PropertyPage properties={properties} setProperties={setProperties}  />
        </>
    )
}