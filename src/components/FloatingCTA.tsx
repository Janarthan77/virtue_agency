"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      className={`hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Link 
        href="/contact"
        className="flex items-center gap-2 px-6 py-3 rounded-full text-gray-900 font-bold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ 
          background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)", 
          boxShadow: "0 10px 30px -10px rgba(255,255,255, 0.6)" 
        }}
      >
        <CalendarDays size={18} />
        Plan Your Event
      </Link>
    </div>
  );
}
