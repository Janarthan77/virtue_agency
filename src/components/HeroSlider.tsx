"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    img: "/hero_bg.png",
    tag: "Corporate Events",
    title: "Creating Unforgettable",
    accent: "Event Experiences",
    subtitle: "End-to-end corporate event management crafted for the world's most demanding brands.",
  },
  {
    id: 2,
    img: "/service_launch.png",
    tag: "Product Releases",
    title: "Delivering High-Impact",
    accent: "Product Launches",
    subtitle: "Dramatic and immersive launch experiences that captivate audiences and dominate markets.",
  },
  {
    id: 3,
    img: "/service_conference.png",
    tag: "Conferences",
    title: "Executing Flawless",
    accent: "Corporate Summits",
    subtitle: "State-of-the-art conference management for global corporations and leadership teams.",
  },
];

const SLIDE_DURATION = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // Auto-advance via a simple timer — no 50ms setState loop
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background slides with Ken Burns zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-3xl">

            {/* Tag badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${current}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm text-accent text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {slides[current].tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${current}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight text-white mb-2">
                  {slides[current].title}
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 md:mb-8"
                  style={{ WebkitTextStroke: "2px #FFB800", color: "transparent" }}>
                  {slides[current].accent}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] text-gray-900 font-bold rounded-full hover:scale-105 transition-transform text-sm sm:text-base text-center shadow-xl shadow-white/20"
              >
                Plan Your Event
              </Link>
              <Link
                href="/portfolio"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base text-center"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators with progress bars */}
      <div className="absolute bottom-10 left-0 right-0 z-30">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-end gap-3">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="group flex flex-col gap-2 cursor-pointer"
              >
                {/* Slide number */}
                <span className={`text-xs font-bold tracking-wider transition-colors ${idx === current ? "text-accent" : "text-white/30 group-hover:text-white/60"}`}>
                  0{idx + 1}
                </span>
                {/* Progress track */}
                <div className="relative h-[3px] rounded-full overflow-hidden"
                  style={{ width: idx === current ? "80px" : "40px", transition: "width 0.3s ease" }}>
                  <div className="absolute inset-0 bg-[#1E293B]/20 rounded-full" />
                  {idx === current && (
                    // CSS animation — zero JS re-renders. key resets animation on slide change.
                    <div
                      key={`progress-${current}`}
                      className="absolute inset-y-0 left-0 bg-accent rounded-full"
                      style={{ animation: `progressFill ${SLIDE_DURATION}ms linear forwards` }}
                    />
                  )}
                  {idx < current && (
                    <div className="absolute inset-0 bg-[#1E293B]/40 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide count (top right) */}
      <div className="absolute top-8 right-12 z-30 hidden md:flex items-center gap-3">
        <span className="text-white text-sm font-bold">0{current + 1}</span>
        <div className="w-6 h-px bg-[#1E293B]/30" />
        <span className="text-white/40 text-sm">0{slides.length}</span>
      </div>

    </section>
  );
}
