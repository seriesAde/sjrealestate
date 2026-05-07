"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";
import { useAuth } from "@/context/AuthContext";
// import { useContext } from "react";

export default function Dashboard() {
    const { authData } = useAuth();
    const [loading, setLoading] = useState(true);

    let baseUrl = " /api";
    const [dashboardData, setDashboardData] = useState({
        wishlist: null,
        properties: null,
        totalAgents: null,
        totalProperties: null,
        status: null,
        recentAppointments: []
    });
    // console.log("Auth Data:", authData.id);
    async function fetchDashboardData() {
        if (!authData?.id) {
            console.warn("Fetch skipped: authData.id is not ready yet.");

            return;
        }
        let wishRes = await Axios.get(`${baseUrl}/merchants/${authData.id}/wishlist`, {
            headers: {
                'Authorization': `Bearer ${authData.token}`
            }
        })
        let agentId = localStorage.getItem("agent_info") ? JSON.parse(localStorage.getItem("agent_info")).id : null;
        let agentRes = await Axios.get(`${baseUrl}/merchants/agents`, {
            headers: {
                'Authorization': `Bearer ${authData.token}`
            }
        })
        let propertyRes = await Axios.get(`${baseUrl}/properties`, {
            params: {

                verified: false,
                merchant: authData.id,
            },
            headers: {
                'Authorization': `Bearer ${authData.token}`
            }
        })
        let totalWishlist = wishRes.data.total;
        let totalAgents = agentRes.data.total;
        let totalProperties = propertyRes.data.total;
        let properties = propertyRes.data.data;
        let propStatus = propertyRes.data.data.is_verified;
        console.log(properties);
        setLoading(false);
        setDashboardData(prevData => ({
            ...prevData,
            wishlist: totalWishlist,
            totalAgents: totalAgents,
            properties: properties,
            totalProperties: totalProperties,
            status: propStatus
        }));


    }


    useEffect(() => {
        fetchDashboardData();
    }, [authData]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
        </div>
    );

    return (
        <div className=" w-full ">

            <div className="flex justify-between w-full gap-20  p-5">
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        {`Wishlist: ${dashboardData.wishlist !== null ? dashboardData.wishlist : "Loading..."}`}
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full  text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        {`Agents: ${dashboardData.totalAgents !== null ? dashboardData.totalAgents : "Loading..."}`}
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        {`Properties: ${dashboardData.properties !== null ? dashboardData.totalProperties : "Loading..."}`}
                    </h2>
                </div>
            </div>
            <div className="px-5 ">
                {
                    dashboardData.properties && dashboardData.properties.length > 0 ? (dashboardData.properties.map((property) => (
                        <table className="w-full text-sm text-left text-secondary ">
                            <thead className="text-lg text-secondary capitalize" >
                                <h1 className="text-2xl font-bold text-primary mb-4">
                                    Properties
                                </h1>
                                <tr className="">
                                    <th className="w-1/4 px-2">Name</th>
                                    <th className="w-1/4 px-2">Category</th>
                                    <th className="w-1/4 px-2">Location</th>
                                    <th className="w-1/4 px-2">Type</th>
                                    <th className="w-1/4 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={property.id}>
                                    <td className="py-3 px-2" >{property.name}</td>
                                    <td className="py-3 px-2" >{property.category}</td>
                                    <td className="py-3 px-2" >{property.address}</td>
                                    <td className="py-3 px-2" >{property.type}</td>
                                    <td className="py-3 px-2 text-nowrap" >{property.is_verified ? "Verified" : "Not Verified"}</td>
                                </tr>

                            </tbody>
                        </table>
                    )))


                        : (

                            <div className="h-screen flex items-center justify-center bg-white">
                                <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
                            </div>

                        )
                }
            </div>

        </div>
    );
}