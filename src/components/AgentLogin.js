"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentLoginSchema } from "@/lib/agentLoginSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Loginform() {
    const baseURL = "http://property.reworkstaging.name.ng/v1";
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(agentLoginSchema),
    });

    async function onSubmit(data) {
        try {
            const response = await axios.post(`${baseURL}/auth/login`, data);

            console.log("Fetch Api Response:", response.data);

            const api_response = response.data;// response.data {msg, type, code, data} object
            const token = api_response.data.token;
            const userData = api_response.data;// User data {full_name, email, role etc}

            if (token) {
                const authData = {
                    token: token,
                    user: {
                        id: userData.id,
                        full_name: userData.full_name,
                        email: userData.email,
                        role: userData.role,
                        company: userData.company
                    }
                };

                //Save to localStorage
                localStorage.setItem("authData", JSON.stringify(authData));

                localStorage.setItem("token", token);//Save token too
                toast.success("Login Successful!")

                setTimeout(() => {
                    router.push("/dashboard")
                }, 1500)

            } else {
                toast.error("Login successful, but token was not found in response.")
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data);
            const errorMsg = error.response?.data?.msg || "Invalid email or password";
            toast.error(errorMsg);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
                <input type="email" placeholder="Email" {...register("email")} className={`w-full border p-2 rounded outline-none focus:border-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <input type="password" placeholder="Password" {...register("password")} className={`w-full border p-2 rounded outline-none focus:border-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-3 rounded font-bold hover:opacity-90 disabled:bg-gray-400 transition-all cursor-pointer">
                {isSubmitting ? "Authenticating..." : "Login"}
            </button>
        </form>
    );
}