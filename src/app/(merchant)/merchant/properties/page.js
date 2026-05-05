"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import PropertyPage from "@/components/(agent)/PropertyPage";


export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agents, setAgents] = useState([]);
    const [selectedAgentId, setSelectedAgentId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const baseURL = "/api";




    useEffect(() => {
        const fetchProperties = async () => {
            const agentData = JSON.parse(localStorage.getItem("agent_info"));
            const merchantData = JSON.parse(localStorage.getItem("authData"));
            //Double Check  id and _id 
            const agentId = agentData?.id || agentData?.user?._id;
            const res = await axios.get(`${baseURL}/merchants/agents?`, {
                headers: {
                    Authorization: `Bearer ${merchantData.token}`
                }
            });
            console.log(res.data.data)
            setAgents(res.data.data);

            if (!agentData?.token || !agentId) {
                setLoading(false);
                return;
            }

            //Api fetch
            try {
                const response = await axios.get(`${baseURL}/properties`, {
                    params: {
                        agent: selectedAgentId ? selectedAgentId : selectedAgentId[0],
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
                // console.log("fetched Property(s):", fetchedData)

                setProperties(fetchedData);

            } catch (error) {
                toast.error("Could not load your properties");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [selectedAgentId]);
    const handleChange = (e) => {
        const value = e.target.value; // Capture the new value immediately

        setSelectedAgentId(value); // Update state for the dropdown UI

        // Use 'value' here instead of 'selectedAgentId'
        const selectedAgent = agents.find((a) => a.id == value);

        if (selectedAgent) {
            setDisplayName(selectedAgent.full_name);
        } else {
            setDisplayName(""); // Reset if "Select Agent" is picked
        }
    };


    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
        </div>
    );

    return (
        <>
            <div className="py-6 px-5 text-secondary font-bold bg-white w-full flex items-center gap-4">
                <label className="text-sm font-bold text-slate-700 mr-5">Select Agent</label>
                <select
                    name="agents"
                    value={selectedAgentId}
                    onChange={handleChange}
                    className="w-2/3  border border-slate-300 p-3 rounded-md outline-none focus:border-[#00492c] bg-white text-slate-900 text-sm truncate"
                >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                            {agent.full_name}
                        </option>
                    ))}
                </select>
            </div>
            <PropertyPage properties={properties} setProperties={setProperties} displayName={displayName} />

        </>
    )
}