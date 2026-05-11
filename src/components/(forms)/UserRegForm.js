"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegSchema } from "@/lib/UserRegSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UsersReg() {
    const baseURL = "/api";
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(userRegSchema),
    });


    //Submit Logic
    async function onSubmit(data) {

        try {
            // The API Body structure.
            const payload = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            };

            const response = await axios.post(`${baseURL}/users`, payload)

            if (response.status == 200 || response.status == 201) {
                const newUser = response.data?.data || response.data;
                console.log("User Created:", newUser)

                //localStorage.setItem("last_created_user", JSON.stringify(newUser));
                toast.success(`User successfully created!`);

                // Clear form or redirect to the agent's list of users
                router.push("/login");
            }
        } catch (error) {
            console.error("Registration Error:", error.response?.data);

            //API error message if available
            const errorMsg = error.response?.data?.msg || "Failed to create user.";
            toast.error(errorMsg);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xs border border-gray-200">
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-[#00492c] uppercase tracking-tighter">Register</h2>
                    <div className="h-1 w-8 bg-[#00492c] mt-2"/>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {[
                        { id: "first_name", label: "First Name", placeholder: "Josh" },
                        { id: "last_name", label: "Last Name", placeholder: "Bright" },
                        { id: "email", label: "Email", placeholder: "josh@gmail.com", type: "email" },
                        { id: "phone", label: "Phone", placeholder: "080..." },
                        { id: "password", label: "Password", placeholder: "••••••••", type: "password" },
                    ].map((field) => (
                        <div key={field.id} className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">
                                {field.label}
                            </label>
                            <input type={field.type || "text"} {...register(field.id)} placeholder={field.placeholder}
                                className="w-full bg-slate-50 text-black border-none px-4 py-3 rounded-sm text-sm outline-none focus:ring-1 focus:ring-[#00492c] transition-all"/>
                            {errors[field.id] && (
                                <p className="text-red-500 text-[9px] font-bold uppercase mt-1 ml-1">
                                    {errors[field.id].message}
                                </p>
                            )}
                        </div>
                    ))}

                    <button type="submit" disabled={isSubmitting} 
                    className="w-full bg-[#00492c] cursor-pointer text-white py-4 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-[#003621] transition-all disabled:opacity-50 mt-4"> {isSubmitting ? "Processing..." : "Create Account"}
                    </button>

                    <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-2">
                        Have an account?{" "}
                        <Link href="/login" className="text-[#00492c] hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}