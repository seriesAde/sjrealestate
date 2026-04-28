"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/loginSchema";
import { useRouter } from "next/navigation";

export default function Loginform() {
    const baseURL = "http://property.reworkstaging.name.ng/v1";
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
            console.log(res.data);
            const dataToStore = res.data.data.token;
            localStorage.setItem("authData", JSON.stringify(dataToStore));
            // Route to dashboard on successful login
            alert("Login successful! Welcome back.");
            // router.push('/dashboard');
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
                    className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
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
                    className={`bg-primary cursor-pointer text-black px-4 py-2 rounded ${isSubmitting ? 'bg-secondary' : ''}`}
                >
                    {isSubmitting ? "please wait..." : "Login"}
                </button>
            </div>
        </form>
    );
}