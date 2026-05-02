"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
// import { useContext } from "react";

export default function Dashboard() {
    const { authData } = useAuth();
    // console.log("Auth Data in Dashboard:", authData);



    return (
        <div className=" w-full">

            <div className="flex justify-between w-full gap-20  p-5">
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        120 Properties
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full  text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        Appointments: 20
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        Total Agents: 5
                    </h2>
                </div>
            </div>
            <table className="w-full text-sm text-left text-secondary">
                <thead className="text-lg text-secondary capitalize" >
                    <h1 className="text-2xl font-bold text-primary mb-4">
                        Appointments
                    </h1>
                    <tr className="">
                        <th>Property</th>
                        <th>Applicant</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123 Main St</td>
                        <td>John Doe</td>
                        <td>2023-10-15</td>
                        <td>Pending</td>
                    </tr>
                    <tr>
                        <td>456 Oak Ave</td>
                        <td>Jane Smith</td>
                        <td>2023-10-16</td>
                        <td>Confirmed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}