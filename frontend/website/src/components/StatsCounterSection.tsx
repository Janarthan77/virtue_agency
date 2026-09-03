"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const COMMON_STATS: StatItem[] = [
  { value: 10, suffix: "+", label: "Agency Services" },
  { value: 300, suffix: "+", label: "Events Delivered" },
  { value: 100, suffix: "+", label: "Clients" },
  { value: 12, suffix: "", label: "Years of Excellence" },
];

export function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800; // 1.8 seconds
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for a premium deceleration feel
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeOut * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function StatsCounterSection({
  className = "",
  variant = "banner",
}: {
  className?: string;
  variant?: "banner" | "inline";
}) {
  if (variant === "inline") {
    return (
      <div className={`flex justify-center flex-wrap gap-8 sm:gap-14 ${className}`}>
        {COMMON_STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-none"
              style={{
                background: "linear-gradient(135deg, #FFB800, #ffd76b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className={`relative border-y border-white/[0.08] bg-[#0F172A]/90 backdrop-blur-md overflow-hidden ${className}`}>
      {/* Subtle gold decorative glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-32 bg-[#FFB800]/5 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-32 bg-[#FFB800]/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {COMMON_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="text-center group"
            >
              <div
                className="text-4xl sm:text-5xl md:text-6xl font-black leading-none mb-2 tracking-tight transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #FFB800 60%, #ffd76b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
