"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Star, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryLightboxModal, { GalleryItem } from "@/components/GalleryLightboxModal";

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "photo",
    title: "Keynote Speakers",
    date: "Tech Summit, 15 June 2026",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-1 md:row-span-2 h-[300px] md:h-full",
    description: "Opening keynote presentation on stage featuring dynamic intelligent lighting and multi-screen visuals.",
  },
  {
    id: 2,
    type: "video",
    title: "Business Conference In Dubai",
    date: "Food Festival, 24 June 2026",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    gridClass: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Full production highlights reel of the international business summit and banquet gala in Dubai.",
  },
  {
    id: 3,
    type: "photo",
    title: "Envato Author Fun Hiking",
    date: "Corporate Retreat, 24 June 2026",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Outdoor adventure and corporate retreat team engagement event.",
  },
  {
    id: 4,
    type: "photo",
    title: "Workshop Sessions",
    date: "Startup Meet, 10 Aug 2026",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    gridClass: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Interactive break-out seminars and hands-on corporate workshop sessions.",
  },
  {
    id: 5,
    type: "video",
    title: "Annual Gala Fireworks",
    date: "New Year Eve, 31 Dec 2026",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    gridClass: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Grand midnight fireworks and celebration stage at the annual end-of-year corporate gala.",
  }
];

const tabs = [
  { id: "all", label: "All Gallery", icon: Star },
  { id: "video", label: "Video Gallery", icon: Play },
  { id: "photo", label: "Photo Gallery", icon: ImageIcon },
];

export function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeTab);

  const handleItemClick = (item: GalleryItem) => {
    // Find index in filteredItems or in all items
    const index = filteredItems.findIndex(i => i.id === item.id);
    setSelectedIndex(index !== -1 ? index : 0);
  };

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
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedIndex(null);
                }}
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
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#FFFFFF]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-width seamless grid */}
      <div className="w-full max-w-[2000px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleItemClick(item)}
                className={`relative group overflow-hidden cursor-pointer bg-gray-900 ${
                  activeTab === 'all' ? item.gridClass : 'md:col-span-1 md:row-span-1 h-[300px]'
                }`}
              >
                {/* Image */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes={item.gridClass?.includes("col-span-2") ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-75"
                />

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Permanent / Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 leading-tight group-hover:text-[#FFB800] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#FFB800] text-xs md:text-sm font-medium tracking-wide">
                    {item.date}
                  </p>
                </div>

                {/* Video Play Icon overlay if video */}
                {item.type === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/95 text-gray-900 flex items-center justify-center pl-1 shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
                      <Play size={24} className="fill-gray-900 text-gray-900" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                      <Eye size={18} />
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Gallery Lightbox / Video Player Pop-Up Modal ──────────────────────── */}
      <GalleryLightboxModal
        items={filteredItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </section>
  );
}
