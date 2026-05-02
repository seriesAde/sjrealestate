import LoginForm from "@/components/(forms)/Loginform";
import { FaPersonRifle, FaUser } from "react-icons/fa6";

export default function Login() {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center p-5 shadow-sm rounded-md w-[30%] m-auto shadow-secondary ">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-primary bg-secondary">
                        <FaUser />
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-secondary ">Welcome Back</h1>

                    <LoginForm />
                </div>
            </div>
        </div >
    )
}
