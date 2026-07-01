"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    type: "photo",
    title: "Keynote Speakers",
    date: "Tech Summit, 15 June 2026",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-2 h-[300px] md:h-full",
  },
  {
    id: 2,
    type: "video",
    title: "Business Conference In Dubai",
    date: "Food Festival, 24 June 2016", // matching the screenshot text roughly
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
  },
  {
    id: 3,
    type: "photo",
    title: "Envato Author Fun Hiking",
    date: "Food Festival, 24 June 2016",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
  },
  {
    id: 4,
    type: "photo",
    title: "Workshop Sessions",
    date: "Startup Meet, 10 Aug 2025",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    gridClass: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
  },
  {
    id: 5,
    type: "video",
    title: "Annual Gala Fireworks",
    date: "New Year Eve, 31 Dec 2025",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
  }
];

const tabs = [
  { id: "all", label: "All Gallery", icon: Star },
  { id: "video", label: "Video Gallery", icon: Play },
  { id: "photo", label: "Photo Gallery", icon: ImageIcon },
];

export function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = activeTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeTab);

  return (
    <section className="bg-[#1E293B] pt-24 pb-0 relative">
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-400 font-semibold text-sm tracking-[0.25em] uppercase mb-3">
            Virtue IN Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Beautiful & <span className="font-bold">Unforgettable Times</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-8 border-b border-white/20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 relative transition-colors duration-300 font-medium ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#FFB800]" : "text-gray-400"} />
                <span className={isActive ? "font-bold" : ""}>{tab.label.split(" ")[0]}</span>
                <span className="font-light">Gallery</span>
                
                {/* Active underline */}
                {isActive && (
                  <motion.div 
                    layoutId="galleryTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#6C3EF4]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-width seamless grid */}
      <div className="w-full max-w-[2000px] mx-auto overflow-hidden">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative group overflow-hidden cursor-pointer bg-gray-900 ${
                  activeTab === 'all' ? item.gridClass : 'md:col-span-1 md:row-span-1 h-[300px]'
                }`}
              >
                {/* Image */}
                <Image 
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                />
                
                {/* Dark Gradient Overlay for text readability (always slightly there, stronger on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#FFB800] text-sm font-medium tracking-wide">
                    {item.date}
                  </p>
                </div>
                
                {/* Video Play Icon overlay if video */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="w-16 h-16 rounded-full bg-[#6C3EF4] flex items-center justify-center pl-1 shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <Play size={24} className="text-white fill-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
