"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentRegSchema } from "@/lib/agentRegSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


export default function AgentReg() {
    const baseURL = "/api";
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("authData");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setToken(parsed.token || parsed);
            } catch {
                setToken(storedData); // If it's just a raw string
            }
        }
    }, []);

    const {
        register,
        handleSubmit, reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(agentRegSchema),
    });

    async function onSubmit(data) {
        if (!token) {
            toast.error("Session missing. Please login as a Merchant.");
            return;
        }

        try {
            //Api 
            const response = await axios.post(`${baseURL}/merchants/agents`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                const regData = response.data?.data || response.data;
                localStorage.setItem("reg_info", JSON.stringify(regData));
                toast.success(response.data.msg);
                reset()
            }

        } catch (error) {
            console.error("Failure:", error.response?.data);
            const status = error.response?.status;

            if (status === 419 || status === 401) {
                toast.error("Your session has expired. Please log out and log back in.");
            } else {
                toast.error(error.response?.data?.msg || "Registration failed.");
            }
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-black">Full Name</label>
                    <input {...register("full_name")} className="w-full border border-gray-300 text-black p-2 rounded outline-none focus:border-primary" />
                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium text-black">Company Name</label>
                    <input {...register("company")} className="w-full border border-gray-300 text-black p-2 rounded outline-none focus:border-primary " />
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium text-black">Email Address</label>
                    <input type="email" {...register("email")} className="w-full border border-gray-300 text-black   p-2 rounded outline-none focus:border-primary" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium text-black">Phone Number</label>
                    <input type="text" {...register("phone")} className="w-full border border-gray-300 text-black p-2 rounded outline-none focus:border-primary" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="col-span-2">
                    <label className="text-sm font-medium text-black">Password</label>
                    <input type="password" {...register("password")} className="w-full border border-gray-300 text-black p-2   rounded outline-none focus:border-primary" />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-[11px] bg-[#00492c] text-white py-3 rounded font-bold cursor-pointer col-span-2 disabled:bg-gray-400 transition-all">
                    {isSubmitting ? "Processing..." : "Register as Agent"}
                </button>

            </form>
        </div>
    );
}