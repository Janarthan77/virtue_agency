"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, MapPin, Calendar, ArrowRight, Sparkles, Building2, CheckCircle } from "lucide-react";

export interface EventItem {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  date: string;
  month: string;
  time: string;
  location: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  attendees?: string;
}

interface EventDetailsModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Collect all images for the slider
  const images = event
    ? [event.image, ...(event.gallery || [])].filter((url, idx, self) => url && self.indexOf(url) === idx)
    : [];

  // Reset slide index when opened event changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [event]);

  const handlePrev = useCallback(() => {
    if (!images.length) return;
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (!images.length) return;
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!event) return;

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
  }, [event, handlePrev, handleNext, onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl bg-[#0B1120]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] z-10 flex flex-col max-h-[94vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] bg-[#0F172A]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 shadow-sm flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse shrink-0" />
              {event.category}
            </span>
            <span className="text-gray-400 text-xs font-medium hidden md:inline-block border-l border-white/10 pl-3 truncate">
              Event Showcase & Specifications
            </span>
          </div>

          {/* Guaranteed Perfect Circular Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="icon-btn w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] sm:min-w-[40px] max-w-[36px] sm:max-w-[40px] min-h-[36px] sm:min-h-[40px] max-h-[36px] sm:max-h-[40px] aspect-square rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-950 backdrop-blur-md border border-white/15 flex items-center justify-center p-0 transition-all duration-200 hover:rotate-90 hover:scale-105 shrink-0 shadow-lg"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Content Area: Responsive Stack on Mobile, 2-Column on Desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 flex-1 overflow-y-auto lg:overflow-hidden min-h-0 custom-scrollbar">
          
          {/* Left Column: Image Slider Showcase (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-black/60 relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08] shrink-0">
            
            {/* Primary Slider Canvas */}
            <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[340px] lg:h-full min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] flex-1 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentSlide] || event.image}
                    alt={`${event.title} - photo ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/30 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Slide Counter Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-semibold tracking-widest shadow-lg">
                {currentSlide + 1} <span className="text-gray-400">/</span> {images.length}
              </div>

              {/* Navigation Arrows - Guaranteed Perfect Circles */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="icon-btn absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 min-w-[36px] sm:min-w-[44px] max-w-[36px] sm:max-w-[44px] min-h-[36px] sm:min-h-[44px] max-h-[36px] sm:max-h-[44px] aspect-square rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md border border-white/15 flex items-center justify-center p-0 transition-all duration-300 shadow-xl opacity-85 hover:opacity-100 hover:scale-110 z-10 shrink-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="icon-btn absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 min-w-[36px] sm:min-w-[44px] max-w-[36px] sm:max-w-[44px] min-h-[36px] sm:min-h-[44px] max-h-[36px] sm:max-h-[44px] aspect-square rounded-full bg-black/60 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md border border-white/15 flex items-center justify-center p-0 transition-all duration-300 shadow-xl opacity-85 hover:opacity-100 hover:scale-110 z-10 shrink-0"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {images.length > 1 && (
              <div className="p-2.5 sm:p-3.5 bg-[#0B1120]/90 backdrop-blur-md border-t border-white/[0.08] flex items-center gap-2 sm:gap-2.5 overflow-x-auto custom-scrollbar shrink-0">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 p-0 ${
                      currentSlide === idx
                        ? "border-[#FFB800] scale-105 shadow-[0_0_15px_rgba(255,184,0,0.35)]"
                        : "border-transparent opacity-40 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Event Details & Metadata (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0F172A] overflow-visible lg:overflow-hidden flex-1">
            
            {/* Details body */}
            <div className="p-4 sm:p-6 lg:p-7 overflow-y-visible lg:overflow-y-auto custom-scrollbar flex-1 space-y-4 sm:space-y-5">
              
              {/* Event Title & Subtitle */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight mb-1.5">
                  {event.title}
                </h2>
                <div className="flex items-center gap-2 text-[#FFB800] font-semibold text-xs sm:text-sm">
                  <Building2 size={14} className="shrink-0" />
                  <span className="truncate">{event.subtitle}</span>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Date</p>
                    <p className="text-white text-xs font-bold truncate">{event.date} {event.month} 2026</p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center shrink-0">
                    <Clock size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Timings</p>
                    <p className="text-white text-xs font-bold truncate">{event.time}</p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 sm:gap-3 sm:col-span-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Venue Location</p>
                    <p className="text-white text-xs font-bold truncate">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Overview Section */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#FFB800] shrink-0" />
                  Event Overview
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {event.description ||
                    `Virtue IN delivered comprehensive execution for this signature ${event.category.toLowerCase()} event, overseeing bespoke staging, audio-visual technology, lighting choreography, and white-glove attendee hospitality.`}
                </p>
              </div>

              {/* Key Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div>
                  <h4 className="text-gray-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest mb-2">
                    Key Highlights & Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {event.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white/[0.04] text-gray-200 text-[11px] sm:text-xs font-medium border border-white/10"
                      >
                        <CheckCircle size={11} className="text-[#FFB800] shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-3.5 sm:p-5 lg:p-6 bg-[#0B1120] border-t border-white/[0.08] shrink-0">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-gray-950 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(255,255,255,0.35)] active:scale-95 text-center"
                style={{ background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)" }}
              >
                Plan A Similar Event <ArrowRight size={15} />
              </Link>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
