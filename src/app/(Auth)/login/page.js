import LoginForm from "@/components/(forms)/Loginform";
import { FaPersonRifle, FaUser } from "react-icons/fa6";
import Link from "next/link";

export default function Login() {
    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100">
                <div className="h-2 bg-[#00492c]" />

                <div className="p-10 flex flex-col items-center">
                    <div className=" mt-3 w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center text-white bg-secondary mb-6 shadow-inner">
                        <FaUser className="text-xl " />
                    </div>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-primary tracking-tighter">Welcome Back</h1>
                    </div>
                    <div className="w-full">
                        <LoginForm />
                    </div>

                    <p> dont have an account? <Link className="text-sm text-primary/70" href={"/user/user-reg"}>
                        sign Up
                    </Link></p>
                </div>
            </div>
        </div>
    )
}
