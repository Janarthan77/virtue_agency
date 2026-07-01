"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Link 
        href="/contact"
        className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ 
          background: "linear-gradient(135deg, #6C3EF4, #9D72FF)", 
          boxShadow: "0 10px 30px -10px rgba(108, 62, 244, 0.6)" 
        }}
      >
        <CalendarDays size={18} />
        Plan Your Event
      </Link>
    </div>
  );
}
