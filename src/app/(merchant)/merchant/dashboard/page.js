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

            <div className="flex  justify-between w-full h-30 ">
                <div className="h-full  ">

                </div>
            </div>
        </div>
    );
}