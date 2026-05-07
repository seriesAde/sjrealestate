"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";


export default function MerchantTopNav() {

    const { authData } = useAuth();
    return (
        <div>
            <div className="flex px-5  justify-between w-full h-10 bg-white items-center border-b border-gray-300 pb-1">
                <div className="">
                </div>
                <div className=" capitalize text-md font-bold text-secondary flex gap-4 items-center justify-center">
                    <div>
                        welcome {authData?.name}
                    </div>
                    <div className="">
                        {/* <Image src={User} alt='Profile' width={50} height={50} /> */}
                        <User size={24} className="text-secondary" />
                    </div>
                </div>
            </div>
        </div>
    )
}