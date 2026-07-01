/* ... (imports and data) ... */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const venues = [
  {
    id: 1,
    name: "Chocolato Hotel",
    stars: 5,
    capacity: "2,500 seats",
    price: "$52/night",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    name: "Vanila Hotel",
    stars: 4,
    capacity: "2,500 seats",
    price: "$52/night",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    name: "pear Hotel",
    stars: 3,
    capacity: "2,500 seats",
    price: "$52/night",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
  }
];

export function VenuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVenue = venues[activeIndex];

  return (
    <section className="bg-[#0F172A] py-24 relative overflow-hidden text-white">
      {/* Background image overlay simulating the mountain landscape faintly */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#6C3EF4]"></span>
              Virtue IN Venues
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Conference <span className="font-light">Rooms & Hotels</span>
            </h2>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 min-h-[500px]">

          {/* Left List */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center gap-2">
            {venues.map((venue, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={venue.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative p-6 cursor-pointer border-b border-white/20 transition-all duration-300 ${isActive ? "bg-[#1E293B] shadow-sm rounded-lg" : "hover:bg-[#1E293B]/50"
                    }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeVenueIndicator"
                      className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-[#6C3EF4] rounded-l"
                    />
                  )}

                  <div className="flex gap-6 items-center">
                    {/* Thumbnail */}
                    <div className="w-32 h-20 relative overflow-hidden shrink-0 rounded-md shadow-sm">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="font-bold text-lg flex items-center gap-2 mb-1 text-white">
                        <span className="text-[#FFB800] flex items-center text-sm">{venue.stars} <Star size={12} className="fill-[#FFB800] ml-0.5" /></span>
                        {venue.name}
                      </h4>
                      <p className="text-gray-400 text-xs mb-1 font-semibold tracking-wide">Party Room {venue.capacity}</p>
                      <p className="text-[#FFB800] text-xs font-bold tracking-wide">Price from {venue.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-8 pl-6">
              <Link href="#" className="text-[#FFB800] font-bold text-xs tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                View All <span className="text-gray-400 font-normal">Hotel & Resort</span>
              </Link>
            </div>
          </div>

          {/* Right Featured Image */}
          <div className="w-full lg:w-7/12 relative overflow-hidden mt-12 lg:mt-0 min-h-[400px] rounded-2xl border border-white/10 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeVenue.image}
                  alt={activeVenue.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/5" />

                {/* Green Badge */}
                <div className="absolute top-0 left-8 bg-[#6C3EF4] text-white px-3 pt-6 pb-6 flex flex-col items-center justify-center min-w-[70px]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}>
                  <Star size={20} className="fill-white mb-1" />
                  <span className="text-xl font-black">{activeVenue.stars}.0</span>
                  <span className="text-[8px] font-bold tracking-widest uppercase mt-1 text-center">Featured<br />Hotel</span>
                </div>

                {/* Booking Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="px-10 py-4 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] text-white font-black text-sm tracking-widest uppercase rounded-lg shadow-[0_10px_30px_-10px_rgba(236,72,153,0.6)] transform hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(236,72,153,0.8)] transition-all duration-300">
                    Booking Now
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
