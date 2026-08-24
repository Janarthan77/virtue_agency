"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Calendar, Eye, Sparkles } from "lucide-react";

export interface GalleryItem {
  id: number;
  type: "photo" | "video" | string;
  title: string;
  date: string;
  img: string;
  videoUrl?: string;
  gridClass?: string;
  description?: string;
}

interface GalleryLightboxModalProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
}

export default function GalleryLightboxModal({
  items,
  selectedIndex,
  onClose,
}: GalleryLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const activeItem = items && selectedIndex !== null ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev === imagesCount - 1 ? 0 : prev + 1));
  }, [items.length]);

  const imagesCount = items.length;

  // Lock body scroll and handle keyboard shortcuts
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handlePrev, handleNext, onClose]);

  if (selectedIndex === null || !activeItem) return null;

  const isVideo = activeItem.type === "video";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between p-2.5 sm:p-4 md:p-8 overflow-hidden select-none">
      {/* Immersive Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-0"
        onClick={onClose}
      />

      {/* ── TOP HUD BAR ─────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-1 sm:py-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span
            className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 sm:gap-2 border shrink-0 ${
              isVideo
                ? "bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_15px_rgba(255,184,0,0.2)]"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            {isVideo ? <Play size={11} className="fill-[#FFB800] shrink-0" /> : <Eye size={11} className="shrink-0" />}
            <span>{isVideo ? "Video" : "Photo"}</span>
          </span>

          <span className="text-gray-400 text-xs font-semibold hidden md:inline-block border-l border-white/15 pl-3 truncate max-w-md">
            {activeItem.title}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Counter pill */}
          <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold tracking-widest shrink-0">
            {currentIndex + 1} <span className="text-gray-400">/</span> {items.length}
          </div>

          {/* Guaranteed Perfect Circular Close button */}
          <button
            type="button"
            onClick={onClose}
            className="icon-btn w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] sm:min-w-[40px] max-w-[36px] sm:max-w-[40px] min-h-[36px] sm:min-h-[40px] max-h-[36px] sm:max-h-[40px] aspect-square rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-950 backdrop-blur-md border border-white/15 flex items-center justify-center p-0 transition-all duration-200 hover:rotate-90 hover:scale-105 shadow-xl shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── CENTER MEDIA VIEWPORT ───────────────────────────── */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto min-h-[260px] sm:min-h-[360px] max-h-[60vh] sm:max-h-[70vh]">
        <AnimatePresence mode="wait">
          {isVideo ? (
            <motion.div
              key={`video-${activeItem.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90 border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.9)] group"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                controls
                autoPlay
                playsInline
                poster={activeItem.img}
                className="w-full h-full object-contain"
                src={
                  activeItem.videoUrl ||
                  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
              >
                Your browser does not support video playback.
              </video>
            </motion.div>
          ) : (
            <motion.div
              key={`photo-${activeItem.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-[260px] xs:h-[320px] sm:h-[460px] md:h-[560px] max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem.img}
                alt={activeItem.title}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Left / Right navigation chevrons - Guaranteed 100% Circles */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="icon-btn absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 min-w-[40px] sm:min-w-[56px] max-w-[40px] sm:max-w-[56px] min-h-[40px] sm:min-h-[56px] max-h-[40px] sm:max-h-[56px] aspect-square rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-950 backdrop-blur-xl border border-white/20 flex items-center justify-center p-0 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 z-20 shrink-0"
              aria-label="Previous item"
            >
              <ChevronLeft size={22} className="sm:w-7 sm:h-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="icon-btn absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 min-w-[40px] sm:min-w-[56px] max-w-[40px] sm:max-w-[56px] min-h-[40px] sm:min-h-[56px] max-h-[40px] sm:max-h-[56px] aspect-square rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-950 backdrop-blur-xl border border-white/20 flex items-center justify-center p-0 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 z-20 shrink-0"
              aria-label="Next item"
            >
              <ChevronRight size={22} className="sm:w-7 sm:h-7" />
            </button>
          </>
        )}
      </div>

      {/* ── BOTTOM HUD BAR & THUMBNAILS ─────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto bg-[#0F172A]/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] shrink-0">
        
        {/* Caption & Date */}
        <div className="text-center md:text-left min-w-0 max-w-full">
          <h3 className="text-white font-black text-sm sm:text-base md:text-lg leading-tight flex items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <Sparkles size={15} className="text-[#FFB800] shrink-0" />
            <span className="truncate">{activeItem.title}</span>
          </h3>
          <p className="text-gray-400 text-[11px] sm:text-xs font-medium flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
            <Calendar size={12} className="text-[#FFB800] shrink-0" />
            <span>{activeItem.date}</span>
          </p>
        </div>

        {/* Thumbnail Carousel Strip */}
        {items.length > 1 && (
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full md:max-w-md py-0.5 px-0.5 custom-scrollbar shrink-0">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`relative w-12 sm:w-16 h-9 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 p-0 ${
                  currentIndex === idx
                    ? "border-[#FFB800] scale-105 shadow-[0_0_15px_rgba(255,184,0,0.4)]"
                    : "border-transparent opacity-40 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play size={10} className="text-white fill-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
