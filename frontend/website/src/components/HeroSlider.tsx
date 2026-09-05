"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

export const heroEvents = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    tag: "Product Launches",
    title: "TVS Emerald Home Debut",
    accent: "Luxury Property Launch",
    subtitle: "High-impact real estate unveiling with interactive architectural walk-throughs, 3D projection mapping, and VIP investor pavilions.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-1.webp",
    tag: "Stall Fabrication & Expo",
    title: "Harley-Davidson Display",
    accent: "VR Chennai Custom Stall",
    subtitle: "Bespoke architectural stall fabrication, illuminated vehicle showcase pavilions, and high-conversion interactive mall setups.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
    tag: "Automotive & Festivals",
    title: "10th Southern HOG Rally",
    accent: "Rock Music Arena",
    subtitle: "Bringing together 500+ Harley-Davidson riders across South India with stadium stunt arenas, live bands, and custom rallies.",
  },
  {
    id: 4,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    tag: "Corporate Conferences",
    title: "Audi Chennai Conclave",
    accent: "Leadership Summits",
    subtitle: "State-of-the-art business conference and networking summit organized with executive staging and VIP hospitality.",
  },
  {
    id: 5,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
    tag: "Concerts & Festivals",
    title: "NYE Beach Festival 2025",
    accent: "Mega Music & DJ Stage",
    subtitle: "Electrifying open-air coastal music festival at Fortune Beach Resort with international DJs, laser lighting, and seaside pyros.",
  },
  {
    id: 6,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
    tag: "Intellectual Property",
    title: "Madarase Fashion Talent Hunt",
    accent: "40-Ft LED Runway Expo",
    subtitle: "Premier fashion intellectual property event at Phoenix Marketcity uniting top designers, celebrity jury, and over 2,500 attendees.",
  },
  {
    id: 7,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    tag: "Day Outing & Social",
    title: "Radiant Dental Care",
    accent: "Taj Beachside Retreat",
    subtitle: "Invigorating coastal team getaway and annual day celebration at Taj Fisherman's Cove with curated challenges and sunset gala.",
  },
  {
    id: 8,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    tag: "Presidential Galas",
    title: "Rotary Club of Madras West",
    accent: "ITC Grand Chola Gala",
    subtitle: "Prestigious annual installation ceremony at ITC Grand Chola with presidential stagecraft, live broadcast, and 1,200+ VIP attendees.",
  },
  {
    id: 9,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
    tag: "Social & Charity Events",
    title: "Save a Child Marathon",
    accent: "EKAM NGO 3000+ Runners",
    subtitle: "Full-scale marathon logistics, RFID timing gates, route hydration stations, and medal ceremonies across Besant Nagar Promenade.",
  },
  {
    id: 10,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    tag: "Annual Gala Events",
    title: "BNP Paribas Annual Bash",
    accent: "Rocktober Gala Night",
    subtitle: "Opulent corporate celebration at The Leela Palace featuring tailored grand ballroom styling, live jazz orchestration, and awards.",
  },
];

const SLIDE_DURATION = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroEvents.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroEvents.length) % heroEvents.length);
  }, []);

  const shuffleSlide = useCallback(() => {
    let nextIdx = Math.floor(Math.random() * heroEvents.length);
    if (nextIdx === current) {
      nextIdx = (current + 1) % heroEvents.length;
    }
    setCurrent(nextIdx);
  }, [current]);

  // Guaranteed auto-advance synchronized with SLIDE_DURATION
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroEvents.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section
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
            src={heroEvents[current].img}
            alt={heroEvents[current].title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
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
                className="mb-6 flex items-center gap-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFB800]/40 bg-[#FFB800]/10 backdrop-blur-sm text-[#FFB800] text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                  {heroEvents[current].tag}
                </span>
                <span className="text-white/40 text-xs font-semibold tracking-wider hidden sm:inline-block">
                  Event {current + 1} of {heroEvents.length}
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-2">
                  {heroEvents[current].title}
                </h1>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 md:mb-8"
                  style={{ WebkitTextStroke: "2px #FFB800", color: "transparent" }}
                >
                  {heroEvents[current].accent}
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
                className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
              >
                {heroEvents[current].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs & Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] text-gray-900 font-bold rounded-full hover:scale-105 transition-transform text-sm sm:text-base text-center shadow-xl shadow-white/20"
              >
                Plan Your Event
              </Link>
              <Link
                href="/gallery"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base text-center"
              >
                View Gallery
              </Link>
              <button
                onClick={shuffleSlide}
                title="Shuffle to another Big Event"
                aria-label="Shuffle slide"
                className="p-3.5 rounded-full bg-white/5 hover:bg-[#FFB800]/20 border border-white/15 hover:border-[#FFB800]/50 text-white hover:text-[#FFB800] transition-all cursor-pointer"
              >
                <Shuffle size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute right-6 md:right-16 bottom-10 z-30 flex items-center gap-2">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full bg-black/40 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 hover:border-[#FFB800] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full bg-black/40 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 hover:border-[#FFB800] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 10 Big Events Slide indicators with progress bars */}
      <div className="absolute bottom-10 left-0 right-32 md:right-48 z-30">
        <div className="container mx-auto px-6 md:px-16">
          <div className="flex items-end gap-2 overflow-x-auto pb-2 scrollbar-none">
            {heroEvents.map((slide, idx) => {
              const isActive = idx === current;
              const formattedNum = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
              return (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="group flex flex-col gap-1.5 cursor-pointer shrink-0"
                  aria-label={`Go to slide ${formattedNum}: ${slide.title}`}
                >
                  {/* Slide number */}
                  <span
                    className={`text-[10px] md:text-xs font-bold tracking-wider transition-colors ${
                      isActive ? "text-[#FFB800]" : "text-white/30 group-hover:text-white/70"
                    }`}
                  >
                    {formattedNum}
                  </span>
                  {/* Progress track */}
                  <div
                    className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: isActive ? "52px" : "24px",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    {isActive && (
                      <div
                        key={`hero-progress-${current}`}
                        className="absolute inset-y-0 left-0 bg-[#FFB800] rounded-full"
                        style={{
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

      {/* Slide count (top right) */}
      <div className="absolute top-8 right-12 z-30 hidden md:flex items-center gap-3">
        <span className="text-white text-sm font-bold">
          {current + 1 < 10 ? `0${current + 1}` : current + 1}
        </span>
        <div className="w-6 h-px bg-white/30" />
        <span className="text-white/40 text-sm">
          {heroEvents.length < 10 ? `0${heroEvents.length}` : heroEvents.length}
        </span>
      </div>
    </section>
  );
}
