"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";
import { useAuth } from "@/context/AuthContext";
// import { useContext } from "react";

export default function Dashboard() {
    const { authData } = useAuth();

    let baseUrl = " /api";
    const [dashboardData, setDashboardData] = useState({
        wishlist: null,
        properties: null,
        totalAgents: null,
        totalProperties: null,
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
        setDashboardData(prevData => ({
            ...prevData,
            wishlist: totalWishlist,
            totalAgents: totalAgents,
            properties: properties,
            totalProperties: totalProperties
        }));
        // console.log("Dashboard Data:", totalWishlist, totalAgents, totalProperties, properties);
        // console.log("Dashboard Data State:", properties);


    }

    useEffect(() => {
        fetchDashboardData();
    }, [authData]);


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
                                    Appointments
                                </h1>
                                <tr className="">
                                    <th className="w-1/4 px-2">Name</th>
                                    <th className="w-1/4 px-2">Category</th>
                                    <th className="w-1/4 px-2">Location</th>
                                    <th className="w-1/4 px-2">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={property.id}>
                                    <td className="py-3 px-2" >{property.name}</td>
                                    <td className="py-3 px-2" >{property.category}</td>
                                    <td className="py-3 px-2" >{property.address}</td>
                                    <td className="py-3 px-2" >{property.type}</td>
                                </tr>

                            </tbody>
                        </table>
                    )))


                        : (

                            <table className="w-full text-sm text-left text-secondary ">
                                <thead className="text-lg text-secondary capitalize " >
                                    <h1 className="text-2xl font-bold text-primary mb-4">
                                        Appointments
                                    </h1>
                                    <tr className="">
                                        <th className="w-1/4">Name</th>
                                        <th className="w-1/4">Agent</th>
                                        <th className="w-1/4">Location</th>
                                        <th className="w-1/4">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-3">123 Main St</td>
                                        <td className="py-3">John Doe</td>
                                        <td className="py-3">No 5, Kaitam road, Lugbe airport Abuja</td>
                                        <td className="py-3">Rent</td>
                                    </tr>
                                    <tr>
                                        <td>456 Oak Ave</td>
                                        <td>Jane Smith</td>
                                        <td>No 5, Kaitam road, Lugbe airport Abuja</td>
                                        <td>Sale</td>
                                    </tr>
                                </tbody>
                            </table>

                        )
                }
            </div>

        </div>
    );
}