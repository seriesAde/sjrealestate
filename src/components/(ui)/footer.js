import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react"
import Link from "next/link"
import { FaAngleRight, FaFacebookMessenger, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6"
export default function Footer() {
    return (
        <div>
            <div className="mt-10 bg-primary/20 ">
                <div className="w-[85%] mx-auto">
                    <div className="md:flex capitalize pt-10 gap-10">
                        <ul className="text-secondary w-full space-y-2">
                            <h1 className="text-[#352F29] font-bold text-lg md:text-xl mb-5">contact us</h1>
                            <li className="text-sm"> <p className="flex items-center"> <MapPinIcon /> <span className="ms-3">Block C, House 5, Aknaton estate, Area1, Durumi, Abuja, Federal Capital Territory.</span></p></li>
                            <li className="text-sm "> <p className="flex items-center"> <PhoneCallIcon /> <Link href="tel:+234 805 260 5026" className="ms-3">+234 805 260 5026</Link></p></li>
                            <li className="text-sm"> <p className="flex items-center"> <MailIcon /> <Link href="mailto:seriesonthejob@gmail.com" className="ms-3">seriesonthejob@gmail.com</Link></p></li>
                            <div className="flex gap-2 mt-5">
                                <Link href="/" className="h-8 w-8 border border-gray-500 text-secondary hover:bg-secondary hover:text-white transition-all duration-700 ease-in-out rounded-full flex justify-center items-center bg-white"><FaTwitter /> </Link>
                                <Link href="/" className="h-8 w-8 border border-gray-500 text-secondary hover:bg-secondary hover:text-white transition-all duration-700 ease-in-out rounded-full flex justify-center items-center bg-white"> <FaFacebookMessenger /> </Link>
                                <Link href="/" className="h-8 w-8 border border-gray-500 text-secondary hover:bg-secondary hover:text-white transition-all duration-700 ease-in-out rounded-full flex justify-center items-center bg-white"><FaInstagram /> </Link>
                                <Link href="/" className="h-8 w-8 border border-gray-500 text-secondary hover:bg-secondary hover:text-white transition-all duration-700 ease-in-out rounded-full flex justify-center items-center bg-white"><FaTiktok /></Link>
                            </div>
                        </ul>
                        <ul className="text-secondary w-full leading-7 lg:leading-8 font-light mt-10 md:mt-0">
                            <h1 className="text-[#352F29] font-bold text-lg md:text-xl mb-5">Quick Links</h1>
                            <li className="hover:tracking-widest transition-all duration-500 ease-in-out text-md flex items-center"> <FaAngleRight /><Link href="/about">about us</Link></li>
                            <li className="hover:tracking-widest transition-all duration-500 ease-in-out text-md flex items-center"> <FaAngleRight /><Link href="/contacts">contact us</Link></li>
                            <li className="hover:tracking-widest transition-all duration-500 ease-in-out text-md flex items-center"> <FaAngleRight /><Link href="/properties">our properties</Link></li>
                            <li className="hover:tracking-widest transition-all duration-500 ease-in-out text-md flex items-center"> <FaAngleRight /><Link href="/faq">frequently asked questions</Link></li>
                        </ul>
                    </div>

                    <div className="md:flex-row md:justify-between mt-20 pb-5 flex flex-col justify-center items-center">
                        <p className="font-light text-sm">© 2026- <Link href="/" className="text-primary">Series & Josh</Link></p>
                        <div className="flex gap-5 text-primary">
                            <Link href="/" className="border-r border-gray-400 pr-5">Home</Link>
                            <Link href="/faq">FAQ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}