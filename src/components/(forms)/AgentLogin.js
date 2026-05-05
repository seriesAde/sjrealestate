"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentLoginSchema } from "@/lib/agentLoginSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Loginform() {
    // const baseURL = "http://property.reworkstaging.name.ng/v1";
    const baseURL = "/api";
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
                localStorage.setItem("agent_info", JSON.stringify(authData));

                localStorage.setItem("token", token);//Save token too
                toast.success(`Welcome back, ${userData.role.toLowerCase()} ${userData.full_name || userData.first_name}`)

                setTimeout(() => {
                    router.push("/agent/agent-dashboard")
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
        <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="group space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#00492c] transition-colors">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="agent@gmail.com"
                        {...register("email")}
                        className={`w-full bg-slate-50 border-b-2 p-3 text-sm text-black outline-none transition-all duration-300
                    ${errors.email
                                ? 'border-red-500 bg-red-50/50'
                                : 'border-slate-100 focus:border-[#00492c] focus:bg-white focus:shadow-sm'}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mt-1 ml-1">{errors.email.message} </p>
                    )}
                </div>

                <div className="group space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-[#00492c] transition-colors">
                        Password
                    </label>
                    <input type="password" placeholder="••••••••" {...register("password")}
                        className={`w-full bg-slate-50 border-b-2 p-3 text-sm text-black outline-none transition-all duration-300
                    ${errors.password
                                ? 'border-red-500 bg-red-50/50'
                                : 'border-slate-100 focus:border-[#00492c] focus:bg-white focus:shadow-sm'}`}/>
                    {errors.password && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight mt-1 ml-1"> {errors.password.message}</p>
                    )}
                </div>

                <button type="submit" disabled={isSubmitting}
                    className="group relative w-full bg-[#00492c] text-white py-4 rounded-xl cursor-pointer uppercase text-[10px] tracking-[0.2em] 
                       hover:bg-[#003620] hover:shadow-2xl hover:shadow-green-900/30 active:scale-[0.98] 
                       disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-500 overflow-hidden">
                    <span className="relative z-10">
                        {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}
                    </span>
                </button>
                <Link href="agent-reg" className="text-black text-sm  flex justify-center gap-2">Don't have an account? <p className="hover:underline "> Register</p></Link>
            </form>
        </div>
    );
}