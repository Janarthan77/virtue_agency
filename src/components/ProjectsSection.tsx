"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Mic, Briefcase, Music, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  { id: 1, title: "President Installation 2026–27", category: "Corporate", subtitle: "Rotary Club of Madras West", date: "15", month: "JUNE", time: "10:00am - 04:00pm", location: "ITC Grand Chola, Chennai", image: "/service_conference.png" },
  { id: 2, title: "TVS Emerald – Home Debut", category: "Product Launch", subtitle: "Peninsula & Green Enclave Launch", date: "22", month: "AUG", time: "09:00am - 06:00pm", location: "TVS Emerald, Chennai", image: "/service_launch.png" },
  { id: 3, title: "JLL – Day Outing", category: "Corporate", subtitle: "Jones Lang LaSalle", date: "05", month: "SEP", time: "08:00am - 08:00pm", location: "Taj Fisherman's Cove", image: "/hero_bg.png" },
  { id: 4, title: "Madarase Fashion Talent Hunt", category: "Entertainment", subtitle: "Phoenix Marketcity Chennai", date: "12", month: "OCT", time: "18:00pm - 23:00pm", location: "Phoenix Marketcity", image: "/service_launch.png" },
  { id: 5, title: "Annual Tech Summit", category: "Corporate", subtitle: "Virtue IN Technologies", date: "18", month: "NOV", time: "09:00am - 05:00pm", location: "Chennai Trade Centre", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Aura Mobile Launch", category: "Product Launch", subtitle: "Next-Gen Smartphone Reveal", date: "03", month: "DEC", time: "11:00am - 02:00pm", location: "Leela Palace, Chennai", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "Corporate Gala Dinner", category: "Corporate", subtitle: "End of Year Celebration", date: "20", month: "DEC", time: "19:00pm - 23:30pm", location: "Taj Coromandel", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "Indie Music Fest", category: "Entertainment", subtitle: "Local Bands Showcase", date: "14", month: "JAN", time: "17:00pm - 22:00pm", location: "YMCA Grounds", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { id: 9, title: "Startup Pitch Day", category: "Corporate", subtitle: "Seed Funding Round", date: "05", month: "FEB", time: "10:00am - 16:00pm", location: "IIT Madras Research Park", image: "/service_conference.png" },
  { id: 10, title: "Electric Scooter Reveal", category: "Product Launch", subtitle: "Green Mobility Solutions", date: "22", month: "FEB", time: "14:00pm - 18:00pm", location: "Phoenix Marketcity", image: "/service_launch.png" },
];

const categories = [
  { id: "All", name: "All Events", icon: LayoutGrid },
  { id: "Corporate", name: "Corporate Event", icon: Briefcase },
  { id: "Product Launch", name: "Product Launch", icon: Mic },
  { id: "Entertainment", name: "Entertainment", icon: Music },
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1); // Reset pagination on filter change
  };

  const filteredEvents = activeTab === "All"
    ? events
    : events.filter(e => e.category === activeTab);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-[#f8f9fa] py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header & Tabs */}
        <div className="flex flex-col items-center mb-16">
          <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase mb-2">
            Virtue IN Events
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Event <span className="font-light">Listing</span>
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-gray-200 w-full max-w-4xl">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`flex items-center gap-2 pb-4 px-2 relative transition-colors duration-300 ${isActive ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-900 font-medium"
                    }`}
                >
                  <Icon size={16} className={isActive ? "text-[#93C52E]" : "text-gray-400"} />
                  {cat.name}

                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#93C52E]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {currentEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white flex flex-col sm:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
              >
                {/* Left Image */}
                <div className="relative w-full sm:w-[240px] h-[200px] sm:h-auto shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-0 left-0 bg-[#93C52E] text-white flex flex-col items-center justify-center w-16 h-16">
                    <span className="text-xl font-black leading-none">{event.date}</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase mt-1">{event.month}</span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-1 hover:text-[#93C52E] transition-colors cursor-pointer">
                    {event.title}
                  </h3>
                  <p className="text-[#93C52E] text-sm font-semibold mb-5">
                    {event.subtitle}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <Clock size={16} className="text-[#93C52E]/70" />
                      Start {event.time}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <MapPin size={16} className="text-[#93C52E]/70" />
                      {event.location}
                    </div>
                  </div>

                  <Link href="/portfolio" className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-100 hover:bg-[#93C52E] text-gray-600 hover:text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors duration-300 self-start">
                    Product Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-3 mt-16"
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentPage === i + 1 
                    ? "bg-[#93C52E] text-white shadow-[0_8px_20px_-6px_rgba(147,197,46,0.5)]" 
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 shadow-sm border border-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
