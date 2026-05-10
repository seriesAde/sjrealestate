"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/loginSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Loginform() {
    // const baseURL = "http://property.reworkstaging.name.ng/v1";
    const baseURL = "/api";
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data) {
        console.log("Validated Data:", data);

        try {
            const res = await axios.post(`${baseURL}/auth/login`, data);
            const dataToStore = { token: res.data.data.token, role: res.data.data.role, name: res.data.data.full_name, id: res.data.data.id, email: res.data.data.email || null, company: res.data.data.company || null };
            console.log(dataToStore);
            console.log(res.data);


            // Route to dashboard on successful login
            toast.success(`Login successful! Welcome back ${dataToStore.role == "AGENT" ? `${dataToStore.name}` : dataToStore.role == "MERCHANT" ? `${dataToStore.name}` : null}`);

            setTimeout(() => {
                // localStorage.setItem("authData", JSON.stringify(dataToStore));
                if (dataToStore.role === "AGENT") {
                    localStorage.setItem("agent_info", JSON.stringify(dataToStore));
                    router.push('/agent/agent-dashboard');
                } else if (dataToStore.role === "MERCHANT") {
                    localStorage.setItem("authData", JSON.stringify(dataToStore));
                    router.push('/merchant/dashboard');

                } else if (dataToStore.role === "USER"){
                     localStorage.setItem("user_info", JSON.stringify(dataToStore));
                    router.push('/user/appointment');
                }

            }, 1000)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">


            {/* Email */}
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full border-2 p-2 rounded outline-none border-secondary text-secondary"
                    name="email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full border-2 text-secondary p-2 rounded outline-none border-secondary"
                    name="password"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>

            {/* Submit */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting && true}
                    className={`bg-secondary cursor-pointer text-white font-bold px-4 py-2 rounded ${isSubmitting ? 'bg-secondary/20' : ''}`}
                >
                    {isSubmitting ? "please wait..." : "Login"}
                </button>
            </div>
        </form>
    );
}