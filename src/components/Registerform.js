"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/registerSchema";
import { useRouter } from "next/navigation";

export default function Registerform() {
    const baseURL = "http://property.reworkstaging.name.ng/v1";
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data) {
        console.log("Validated Data:", data);

        try {
            const res = await axios.post(`${baseURL}/merchants`, data);
            console.log(res.data);
            // Route to login page on successful registration
            alert("Registration successful! Please log in.");
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">

            {/* full_name */}
            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("full_name")}
                    className="w-full border p-2 rounded"
                    name="full_name"
                />
                {errors.full_name && (
                    <p className="text-red-500 text-sm">{errors.full_name.message}</p>
                )}
            </div>
            {/* phone */}
            <div>
                <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="w-full border p-2 rounded"
                    name="phone"
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
            </div>

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
                    disabled={isSubmitting}
                    className={`bg-primary cursor-pointer text-black px-4 py-2 rounded ${isSubmitting ? 'bg-secondary ' : ''}`}
                >
                    {isSubmitting ? "please wait..." : "Register"}
                </button>
            </div>
        </form>
    );
}