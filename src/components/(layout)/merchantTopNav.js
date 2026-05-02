"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function MerchantTopNav() {

    const { authData } = useAuth();
    return (
        <div>
            <div className="flex  justify-between w-full h-30 items-center ">
                <div className="">
                    <Image src='' alt='Logo' width={50} height={50} />
                </div>
                <div className=" capitalize text-lg font-bold text-secondary flex gap-4 items-center">
                    welcome {authData?.name}
                    <div className="flex items-center">
                        <Image src='' alt='Profile' width={50} height={50} />
                    </div>
                </div>
            </div>
        </div>
    )
}