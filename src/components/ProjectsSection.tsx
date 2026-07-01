"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Mic, Briefcase, Music, LayoutGrid, ArrowRight } from "lucide-react";

const events = [
  { id: 1, title: "President Installation 2026–27", category: "Corporate", subtitle: "Rotary Club of Madras West", date: "15", month: "JUN", time: "10:00am – 04:00pm", location: "ITC Grand Chola, Chennai", image: "/service_conference.png" },
  { id: 2, title: "TVS Emerald – Home Debut", category: "Product Launch", subtitle: "Peninsula & Green Enclave Launch", date: "22", month: "AUG", time: "09:00am – 06:00pm", location: "TVS Emerald, Chennai", image: "/service_launch.png" },
  { id: 3, title: "JLL – Day Outing", category: "Corporate", subtitle: "Jones Lang LaSalle", date: "05", month: "SEP", time: "08:00am – 08:00pm", location: "Taj Fisherman's Cove", image: "/hero_bg.png" },
  { id: 4, title: "Madarase Fashion Talent Hunt", category: "Entertainment", subtitle: "Phoenix Marketcity Chennai", date: "12", month: "OCT", time: "18:00pm – 23:00pm", location: "Phoenix Marketcity", image: "/service_launch.png" },
  { id: 5, title: "Annual Tech Summit", category: "Corporate", subtitle: "Virtue IN Technologies", date: "18", month: "NOV", time: "09:00am – 05:00pm", location: "Chennai Trade Centre", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Aura Mobile Launch", category: "Product Launch", subtitle: "Next-Gen Smartphone Reveal", date: "03", month: "DEC", time: "11:00am – 02:00pm", location: "Leela Palace, Chennai", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "Corporate Gala Dinner", category: "Corporate", subtitle: "End of Year Celebration", date: "20", month: "DEC", time: "19:00pm – 23:30pm", location: "Taj Coromandel", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "Indie Music Fest", category: "Entertainment", subtitle: "Local Bands Showcase", date: "14", month: "JAN", time: "17:00pm – 22:00pm", location: "YMCA Grounds", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800" },
  { id: 9, title: "Startup Pitch Day", category: "Corporate", subtitle: "Seed Funding Round", date: "05", month: "FEB", time: "10:00am – 16:00pm", location: "IIT Madras Research Park", image: "/service_conference.png" },
  { id: 10, title: "Electric Scooter Reveal", category: "Product Launch", subtitle: "Green Mobility Solutions", date: "22", month: "FEB", time: "14:00pm – 18:00pm", location: "Phoenix Marketcity", image: "/service_launch.png" },
];

const categories = [
  { id: "All", name: "All Events", icon: LayoutGrid },
  { id: "Corporate", name: "Corporate Event", icon: Briefcase },
  { id: "Product Launch", name: "Product Launch", icon: Mic },
  { id: "Entertainment", name: "Entertainment", icon: Music },
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
  Corporate: { color: "#FFB800", bg: "rgba(255,184,0,0.12)" },
  "Product Launch": { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  Entertainment: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
};

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
      setCurrentPage(1);
    });
  };

  const filteredEvents =
    activeTab === "All" ? events : events.filter((e) => e.category === activeTab);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-[#0F172A] py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6C3EF4]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFB800]/4 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header ─────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#FFB800]" />
              <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                Virtue IN Events
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Events We've <span className="text-[#FFB800]">Managed</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105 self-start lg:self-auto shrink-0"
            style={{
              background: "linear-gradient(135deg, #6C3EF4, #9D72FF)",
              boxShadow: "0 8px 25px -8px rgba(108,62,244,0.5)",
            }}
          >
            View All Events <ArrowRight size={16} />
          </Link>
        </div>

        {/* ── Filter Tabs ─────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #6C3EF4, #9D72FF)"
                    : "rgba(30,41,59,0.8)",
                  color: isActive ? "#fff" : "#94a3b8",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 4px 20px rgba(108,62,244,0.35)" : "none",
                }}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* ── Event Cards Grid ─────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px]"
          style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}
        >
            {currentEvents.map((event, idx) => {
              const meta = categoryMeta[event.category] || categoryMeta["Corporate"];
              return (
                <div
                  key={event.id}
                  className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#6C3EF4]/35 hover:shadow-[0_20px_50px_-15px_rgba(108,62,244,0.25)] transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden shrink-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />

                    {/* Date badge */}
                    <div
                      className="absolute top-4 left-4 w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-lg"
                      style={{ background: "linear-gradient(135deg, #6C3EF4, #9D72FF)" }}
                    >
                      <span className="text-white text-xl font-black leading-none">{event.date}</span>
                      <span className="text-white/80 text-[9px] font-black tracking-widest uppercase mt-0.5">{event.month}</span>
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-sm"
                        style={{
                          background: "rgba(15,23,42,0.7)",
                          color: meta.color,
                          border: `1px solid ${meta.color}40`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-white font-black text-lg leading-tight mb-1 group-hover:text-[#FFB800] transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-sm font-semibold mb-5" style={{ color: meta.color }}>
                      {event.subtitle}
                    </p>

                    <div className="space-y-2.5 mb-6 flex-1">
                      <div className="flex items-center gap-2.5 text-sm text-gray-400">
                        <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                          <Clock size={13} className="text-[#FFB800]" />
                        </div>
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-400">
                        <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center shrink-0">
                          <MapPin size={13} className="text-[#FFB800]" />
                        </div>
                        {event.location}
                      </div>
                    </div>

                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                      style={{ color: meta.color }}
                    >
                      View Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>

        {/* ── Pagination ───────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-14">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                onClick={() => startTransition(() => setCurrentPage(i + 1))}
                key={i}
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background:
                    currentPage === i + 1
                      ? "linear-gradient(135deg, #6C3EF4, #9D72FF)"
                      : "rgba(30,41,59,0.8)",
                  color: currentPage === i + 1 ? "#fff" : "#94a3b8",
                  border: currentPage === i + 1 ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: currentPage === i + 1 ? "0 4px 20px rgba(108,62,244,0.4)" : "none",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
