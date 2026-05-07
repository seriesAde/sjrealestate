"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import ActionButtons from "@/components/(ui)/button";
import toast from "react-hot-toast";

export default function Agents() {
    const baseURL = "/api";
    const { authData } = useAuth();
    const [fetchedAgents, setAgents] = useState([]);
    const [status, setStatus] = useState([])

    // console.log("Auth Data in Agents Page:", authData);
    async function fecthAgents() {
        if (!authData?.id) {
            console.warn("Fetch skipped: authData.id is not ready yet.");

            return;
        }
        let response = await axios.get(`${baseURL}/merchants/agents`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authData.token}`
            }
        })
        let data = response.data.data;
        // console.log(data)
        setAgents(data)
        setStatus(data.is_verified)

    }
    useEffect(() => {
        fecthAgents()
    }, [authData?.id])

    async function handleVerify(id) {
        try {
            const agent = fetchedAgents.find((a) => a.id === id);
            const agentName = agent ? agent.full_name : "Unknown Agent";
            const response = await axios.post(`/api/merchants/verify-agent`,
                { agent_id: id, is_verified: true },
                { headers: { Authorization: `Bearer ${authData.token}` } }
            );


            if (response.data.code === 200 || response.data.code === 201) {


                toast.success(
                    `${response.data.msg}: ${agentName}`
                )

                // 1. RE-FETCH DATA TO UPDATE UI
                await fecthAgents();
            }
        } catch (error) {
            console.error("Failed to verify agent:", error.response?.data || error.message);
            alert("Verification failed. Please try again.");
        }
    }
    async function handleEdit(id) {
        try {
            const agent = fetchedAgents.find((a) => a.id === id);
            const agentName = agent ? agent.full_name : "Unknown Agent";
            const response = await axios.post(`/api/merchants/verify-agent`,
                { agent_id: id, is_verified: true },
                { headers: { Authorization: `Bearer ${authData.token}` } }
            );


            if (response.data.code === 200 || response.data.code === 201) {


                toast.success(
                    `${response.data.msg}: ${agentName}`
                )

                // 1. RE-FETCH DATA TO UPDATE UI
                await fecthAgents();
            }
        } catch (error) {
            console.error("Failed to verify agent:", error.response?.data || error.message);
            alert("Verification failed. Please try again.");
        }
    }
    return (
        <div className=" w-full">


            <div className="px-5 mt-10">
                <div className="flex items-center justify-between w-full ">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                        AGENTS
                    </h1>
                    <Link href="/merchant/agents/create-agent" className="text-md font-bold text-primary mb-4 bg-primary/20 px-4 py-2 rounded-md hover:bg-primary/30 transition-all duration-300 cursor-pointer">
                        Add New Agent
                    </Link>
                </div>
                <table className="w-full text-sm text-left text-secondary ">
                    <thead className="text-lg text-secondary  " >
                        <tr className="">
                            <th className="w-1/4">Name</th>
                            <th className="w-1/4">Company</th>
                            <th className="w-1/4">Status</th>
                            <th className="w-1/4">Actions</th>
                        </tr>
                    </thead>
                    {
                        fetchedAgents && fetchedAgents.length > 0 ? (fetchedAgents.map((agent) => (
                            <tbody key={agent.id} >
                                <tr className="  " key={agent.id}>
                                    <td className="py-3">{agent.full_name}</td>
                                    <td className="py-3">{agent.company}</td>
                                    <td className="py-3">{agent.is_verified ? "Verified" : "Not Verified"}</td>
                                    <td className="">
                                        <ActionButtons
                                            // onEdit={() => handleVerify(agent.id)}
                                            // onDelete={() => console.log("Delete clicked for agent:", agent.id)}
                                            onVerify={() => handleVerify(agent.id)}
                                            status={agent.is_verified ? 'verified' : 'pending'}

                                        />


                                    </td>
                                </tr>

                            </tbody>
                        ))) : null

                    }
                </table>
            </div>
        </div>
    )
}