"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CategorySlideItem {
  id: number;
  img: string;
  tag: string;
  title: string;
  accent: string;
  subtitle: string;
}

export interface CategorySliderSectionProps {
  id: string;
  portionNumber: string;
  portionTitle: string;
  accentColor?: string;
  slides: CategorySlideItem[];
  pageIndex?: number;
  totalPages?: number;
}

const SLIDE_DURATION = 5500;

export function CategorySliderSection({
  id,
  portionNumber,
  portionTitle,
  accentColor = "#FFB800",
  slides,
  pageIndex,
  totalPages = 7,
}: CategorySliderSectionProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Guaranteed auto-advance synchronized with progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [current, slides.length]);

  const activeSlide = slides[current] || slides[0];

  return (
    <div
      id={id}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        touchStartX.current = null;
      }}
    >
      {/* Background slide with Ken Burns smooth scale */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`${id}-bg-${current}`}
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.img}
            alt={activeSlide.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Subtle cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Book Header Bar inside section */}
      <div className="absolute top-6 left-0 right-0 z-30 px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-md text-[11px] font-black tracking-widest uppercase"
            style={{
              background: `${accentColor}20`,
              color: accentColor,
              border: `1px solid ${accentColor}40`,
            }}
          >
            {pageIndex ? `PAGE 0${pageIndex} OF 0${totalPages}` : `PORTION ${portionNumber}`}
          </span>
          <span className="text-white/70 text-xs font-bold tracking-widest uppercase hidden sm:inline-block">
            {portionTitle}
          </span>
        </div>

        {/* Slide Counter (top right) */}
        <div className="flex items-center gap-2.5">
          <span className="text-white text-sm font-bold">0{current + 1}</span>
          <div className="w-5 h-px bg-white/30" />
          <span className="text-white/40 text-sm">0{slides.length}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center pt-16 md:pt-0">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-3xl">

            {/* Tag badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${id}-tag-${current}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-5 inline-block"
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
                  style={{
                    background: `${accentColor}18`,
                    color: accentColor,
                    border: `1px solid ${accentColor}45`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: accentColor }}
                  />
                  {activeSlide.tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${id}-title-${current}`}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -35 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-white mb-2">
                  {activeSlide.title}
                </h2>
                <h3
                  className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight mb-5 md:mb-7"
                  style={{
                    WebkitTextStroke: `2px ${accentColor}`,
                    color: "transparent",
                  }}
                >
                  {activeSlide.accent}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Subtitle description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`${id}-sub-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8 md:mb-10"
              >
                {activeSlide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] text-gray-900 font-bold rounded-full hover:scale-105 transition-transform text-sm sm:text-base text-center shadow-xl shadow-white/20 inline-flex items-center gap-2 cursor-pointer"
              >
                Plan Your Event <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="px-6 sm:px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base text-center cursor-pointer"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows (Prev / Next) */}
      <div className="absolute right-6 md:right-16 bottom-8 z-30 flex items-center gap-2.5">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full bg-black/50 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 hover:border-[#FFB800] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full bg-black/50 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 hover:border-[#FFB800] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators: 01, 02, 03 */}
      <div className="absolute bottom-8 left-0 right-32 md:right-48 z-30">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-end gap-3.5">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="group flex flex-col gap-1.5 cursor-pointer text-left"
                  aria-label={`Go to slide 0${idx + 1}: ${slide.title}`}
                >
                  {/* Slide number */}
                  <span
                    className={`text-xs font-bold tracking-wider transition-colors ${
                      isActive ? "text-[#FFB800]" : "text-white/40 group-hover:text-white/75"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  {/* Progress track */}
                  <div
                    className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: isActive ? "75px" : "36px",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    {isActive && (
                      <div
                        key={`${id}-progress-${current}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: accentColor,
                          animation: `progressFill ${SLIDE_DURATION}ms linear forwards`,
                        }}
                      />
                    )}
                    {idx < current && (
                      <div className="absolute inset-0 bg-white/50 rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
