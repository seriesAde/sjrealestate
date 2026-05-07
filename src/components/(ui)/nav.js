"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ListIcon } from "lucide-react";

export default function Nav() {
    const pathname = usePathname();
    const [scroll, setScroll] = useState(false);
    const [hidden, setHidden] = useState(true);

    const linkArr = [
        { name: "HOME", path: "/" },
        { name: "ABOUT", path: "/about" },
        { name: "PROPERTIES", path: "/properties" },
        { name: "CONTACTS", path: "/contacts" },
        { name: "FAQ", path: "/faq" },
    ];

    useEffect(() => {
        function handleScroll() {
            setScroll(window.scrollY > 50);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function toggleMenu() {
        setHidden(!hidden);
    }

    return (
        <nav
            className={`mx-auto px-5 shadow-sm sticky top-0 left-0 z-50 w-full bg-background  transition-all duration-500 ease-in-out ${scroll ? "lg:scale-100" : "lg:scale-95 lg:mt-5"
                }`}
        >
            <div className="lg:flex justify-between items-center min-h-[72px]">
                {/* Logo Section */}
                <div className="flex justify-between items-center py-3 lg:py-0">
                    <Link href="/" className="text-primary flex items-center gap-2">
                        <Image
                            src="/logo_whity.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="md:w-15 md:h-15 w-12 h-12"
                        />
                        <h1 className="font-extrabold md:text-2xl text-lg leading-5 flex items-center">
                            <span >SERIES <br /> <span className="text-secondary">&</span> JOSH</span>
                        </h1>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="border rounded-lg p-2 border-gray-400 lg:hidden"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {/* Simple SVG Hamburger */}
                        <ListIcon />
                    </button>
                </div>

                {/* Links Section */}
                <ul
                    className={`lg:flex lg:gap-8 lg:items-center font-semibold text-primary transition-all duration-500 ease-in-out overflow-hidden ${hidden
                        ? "max-h-0 opacity-0 lg:max-h-96 lg:opacity-100"
                        : "max-h-96 opacity-100"
                        }`}
                >
                    {linkArr.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.name} className="py-3 lg:py-0 ">
                                <Link
                                    href={item.path}
                                    onClick={() => setHidden(true)} // Close menu on click
                                    className={`relative md:py-5 transition-colors duration-300 hover:text-black 
                                    ${isActive ? "text-black underline underline-offset-4 pb-2"
                                            : "text-primary"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

