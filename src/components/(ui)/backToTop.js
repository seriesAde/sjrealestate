"use client"
import { useState, useEffect } from "react";
import { ArrowUpFromDotIcon } from "lucide-react";

export default function BackToTop() {

    const [visible, setVisible] = useState(false);

    // 1. Refactored toggle logic with a check for 'window'
    const toggleVisible = useCallback(() => {
        if (typeof window !== "undefined") {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            if (scrolled > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    }, []);

    // scroll function
    const scrollToTop = () => {
        const container = "main-content"
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        //  in case they refreshed mid-page it remounts
        toggleVisible();

        window.addEventListener("scroll", toggleVisible, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisible);
    }, [toggleVisible]);

    return (
        <button
            onClick={scrollToTop}
            className={` 
        fixed bottom-8 right-8 p-3 h-10 w-10 rounded-full bg-secondary cursor-pointer hover:bg-primary text-white shadow-lg 
        transition-opacity duration-900 flex items-center justify-center  
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        >
            <ArrowUpFromDotIcon className="animate-[bounce_0.5s_infinite] " />
        </button>
    );
}
