"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegSchema } from "@/lib/UserRegSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersReg() {
    const baseURL = "/api";
    const [token, setToken] = useState(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(userRegSchema),
    });

    //Get the logged-in via Agent's token
    useEffect(() => {
        const storedAgent = localStorage.getItem("agent_info");
        if (storedAgent) {
            const parsed = JSON.parse(storedAgent);
            const activeAgentToken = parsed?.token || parsed?.user?.token;

            if (activeAgentToken) {
                setToken(activeAgentToken);
            } else {
                toast.error("Agent session invalid . Token may have expired. Please log in again.");
            }
        } else {
            toast.error("No agent detected. Please log in.");
            router.push("/agent-login");
        }
    }, [router]);

    //Submit Logic
    async function onSubmit(data) {
        if (!token) {
            toast.error("Authorization token missing. Re-login required.");
            return;
        }

        try {
            // The API Body structure.
            const payload = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            };

            const response = await axios.post(`${baseURL}/users`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // This links the user to the agent
                },
            });

            if (response.status == 200 || response.status == 201) {
                const newUser = response.data?.data || response.data;
                console.log("User Created:", response.data)

                //Store the new user's info in localstorage
                localStorage.setItem("last_created_user", JSON.stringify(newUser));
                const storedAgent = JSON.parse(localStorage.getItem("agent_info"));
                const agentName = storedAgent?.user?.full_name || "the";
                toast.success(`User successfully created under ${agentName} Agent!`);

                // Clear form or redirect to the agent's list of users
                router.push("/agent/clients");
            }
        } catch (error) {
            console.error("Registration Error:", error.response?.data);

            //API error message if available
            const errorMsg = error.response?.data?.msg || "Failed to create user.";
            toast.error(errorMsg);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-lg rounded-xl border border-gray-100 ">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#00492c]">Create User Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-900">First Name</label>
                        <input {...register("first_name")} placeholder="e.g. Josh" className="w-full text-slate-500 border p-2 rounded outline-none focus:border-[#00492c] transition-colors" />
                        {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900">Last Name</label>
                        <input {...register("last_name")} placeholder="e.g. Bright" className="w-full border text-slate-500 p-2 rounded outline-none focus:border-[#00492c] transition-colors" />
                        {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900">Email Address</label>
                        <input type="email" {...register("email")} placeholder="josh@wayne.com" className="w-full border text-slate-500 p-2 rounded outline-none focus:border-[#00492c] transition-colors" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900">Phone Number</label>
                        <input type="text" {...register("phone")} placeholder="080...." className="w-full border text-slate-500 p-2 rounded outline-none focus:border-[#00492c] transition-colors" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900">Password</label>
                        <input type="password" {...register("password")} placeholder="********" className="w-full border  text-slate-500 p-2 rounded outline-none focus:border-[#00492c] transition-colors" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full text-sm bg-[#00492c] text-white py-3 rounded font-bold cursor-pointer disabled:bg-gray-400 hover:bg-[#003621] transition-all uppercase tracking-wide mt-2"> {isSubmitting ? "Creating Account..." : "Register as User"}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">Already have an account?{" "}
                            <Link href="/agent-login" className="text-[#00492c] font-semibold hover:underline">Login here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}