"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebsitePreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1-second total duration (1000ms) with smooth 60fps increments
    const duration = 2000;
    const intervalTime = 20; // 50 updates in 1000ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 80);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="website-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090D16] select-none pointer-events-auto overflow-hidden"
        >
          {/* Ambient Luxury Background Lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFB800]/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">

            {/* Animated Logo Mark */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative mb-6"
            >
              {/* Outer rotating subtle ring */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#FFB800]/30 to-transparent blur-[6px] animate-pulse" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <span className="text-3xl font-black text-white italic tracking-tighter">
                  V
                </span>
                <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-7"
            >
              <div className="flex items-center justify-center text-2xl sm:text-3xl font-black tracking-tight text-white uppercase leading-none">
                <span>V-RTUE</span>
                <span className="ml-1 text-white">IN</span>
                <span className="text-[#FFB800] text-3xl sm:text-4xl leading-none">.</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-black italic tracking-[0.3em] text-gray-400 uppercase mt-1.5">
                VIRTUE IN AGENCY
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="w-56 sm:w-64 flex flex-col items-center"
            >
              {/* Background track */}
              <div className="w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden relative backdrop-blur-sm border border-white/[0.05]">
                {/* Active progress bar */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F59E0B] via-[#FFB800] to-[#FDE047] rounded-full shadow-[0_0_12px_rgba(255,184,0,0.8)]"
                  style={{ width: `${Math.min(100, Math.round(progress))}%` }}
                  transition={{ ease: "easeOut", duration: 0.05 }}
                />
              </div>

              {/* Counter & Subtext */}
              <div className="w-full flex items-center justify-between mt-3 px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Loading Experience
                </span>
                <span className="text-[11px] font-mono font-bold text-[#FFB800]">
                  {Math.min(100, Math.round(progress))}%
                </span>
              </div>
            </motion.div>

          </div>

          {/* Bottom subtle brand tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase"
          >
            Extraordinary Corporate Experiences
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
