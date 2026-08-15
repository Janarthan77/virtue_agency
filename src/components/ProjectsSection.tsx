"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Mic, Briefcase, Music, LayoutGrid, ArrowRight, Eye } from "lucide-react";
import EventDetailsModal, { EventItem } from "@/components/EventDetailsModal";

export const eventsData: EventItem[] = [
  {
    id: 1,
    title: "President Installation 2026–27",
    category: "Corporate",
    subtitle: "Rotary Club of Madras West",
    date: "15",
    month: "JUN",
    time: "10:00am – 04:00pm",
    location: "ITC Grand Chola, Chennai",
    image: "/service_conference.png",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Prestigious annual installation ceremony for Rotary Club of Madras West hosted in the grand ballroom of ITC Grand Chola. Handled presidential regalia stagecraft, thematic lighting, synchronized audiovisual production, and high-profile VIP guest coordination.",
    highlights: ["1,200+ Dignitaries & Rotarians", "3D Stage Backdrop & Intelligent Lighting", "Live Multi-Cam Broadcasting", "Gourmet Banquet Logistics"],
  },
  {
    id: 2,
    title: "TVS Emerald – Home Debut",
    category: "Product Launch",
    subtitle: "Peninsula & Green Enclave Launch",
    date: "22",
    month: "AUG",
    time: "09:00am – 06:00pm",
    location: "TVS Emerald, Chennai",
    image: "/service_launch.png",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Grand property unveiling and sales launch for TVS Emerald's ultra-luxury Peninsula & Green Enclave project. Built interactive architectural model zones, high-lumen experiential projection walkthroughs, and VIP lounge pavilions.",
    highlights: ["Interactive Experience Pavilion", "3D Projection Mapping", "VIP Investor Hospitality", "Over 800 Exclusive Buyer Registrations"],
  },
  {
    id: 3,
    title: "JLL – Day Outing",
    category: "Corporate",
    subtitle: "Jones Lang LaSalle",
    date: "05",
    month: "SEP",
    time: "08:00am – 08:00pm",
    location: "Taj Fisherman's Cove",
    image: "/hero_bg.png",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "An invigorating coastal retreat and leadership team-building event for Jones Lang LaSalle at Taj Fisherman's Cove. Features curated team games, beachside gala dinners, live acoustic sets, and award ceremonies.",
    highlights: ["Custom Team-Building Activities", "Seaside Sunset Dinner", "Live Band & DJ Setup", "Bespoke Corporate Awards"],
  },
  {
    id: 4,
    title: "Madarase Fashion Talent Hunt",
    category: "Entertainment",
    subtitle: "Phoenix Marketcity Chennai",
    date: "12",
    month: "OCT",
    time: "18:00pm – 23:00pm",
    location: "Phoenix Marketcity",
    image: "/service_launch.png",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "High-octane fashion runway competition showcasing emerging regional designers and models. Executed 40-foot illuminated catwalk, dynamic intelligent LED rigging, celebrity green rooms, and live broadcast production.",
    highlights: ["40-Foot LED Runway", "Celebrity Jury Coordination", "Over 2,500 Spectators", "Live HD Streaming"],
  },
  {
    id: 5,
    title: "Annual Tech Summit",
    category: "Corporate",
    subtitle: "Virtue IN Technologies",
    date: "18",
    month: "NOV",
    time: "09:00am – 05:00pm",
    location: "Chennai Trade Centre",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "The region's premier conference covering AI, enterprise cloud systems, and cutting-edge innovations. Designed multiple track breakout stages, digital registration kiosks, and VIP speaker lounges.",
    highlights: ["3 Multi-Track Keynote Stages", "1,500+ Tech Professionals", "Expo Exhibition Booths", "Digital Networking App Integration"],
  },
  {
    id: 6,
    title: "Aura Mobile Launch",
    category: "Product Launch",
    subtitle: "Next-Gen Smartphone Reveal",
    date: "03",
    month: "DEC",
    time: "11:00am – 02:00pm",
    location: "Leela Palace, Chennai",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "An electrifying product unveiling featuring automated robotic podium reveal, holographic display pods, sensory tech demos, and press conference setup.",
    highlights: ["Synchronized Laser Product Reveal", "Hands-on Tech Experience Zones", "Global Media Broadcast", "Exclusive VIP Keynote"],
  },
  {
    id: 7,
    title: "Corporate Gala Dinner",
    category: "Corporate",
    subtitle: "End of Year Celebration",
    date: "20",
    month: "DEC",
    time: "19:00pm – 23:30pm",
    location: "Taj Coromandel",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "An opulent black-tie corporate dinner and annual awards celebration at Taj Coromandel with tailored table stylings, live jazz ensembles, and crystal illumination.",
    highlights: ["Black-Tie Gala Decor", "Live Symphony Quintet", "Executive Awards Conferment", "Multi-Course Gourmet Dinner"],
  },
  {
    id: 8,
    title: "Indie Music Fest",
    category: "Entertainment",
    subtitle: "Local Bands Showcase",
    date: "14",
    month: "JAN",
    time: "17:00pm – 22:00pm",
    location: "YMCA Grounds",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Open-air music festival supporting homegrown indie talent with line-array concert sound, custom truss stage design, food truck villages, and crowd safety control.",
    highlights: ["Line-Array Concert Acoustic Array", "Food Truck Village Management", "Over 4,000 Fans", "Special FX Fireworks"],
  },
  {
    id: 9,
    title: "Startup Pitch Day",
    category: "Corporate",
    subtitle: "Seed Funding Round",
    date: "05",
    month: "FEB",
    time: "10:00am – 16:00pm",
    location: "IIT Madras Research Park",
    image: "/service_conference.png",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Venture pitch arena uniting 50 emerging founders with tier-1 angel investors and venture capitalists. Handled lightning demo timings, live polling systems, and private deal rooms.",
    highlights: ["50 Pitching Startups", "Private Investor Lounges", "Live Pitch Scoring Display", "B2B Deal-Making Sessions"],
  },
  {
    id: 10,
    title: "Electric Scooter Reveal",
    category: "Product Launch",
    subtitle: "Green Mobility Solutions",
    date: "22",
    month: "FEB",
    time: "14:00pm – 18:00pm",
    location: "Phoenix Marketcity",
    image: "/service_launch.png",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Next-gen EV two-wheeler launch with indoor test ride arena, interactive charging pod simulation, and key influencer media interactions.",
    highlights: ["Indoor Test-Track Arena", "Dynamic Vehicle Reveal", "Press Q&A Forum", "Instant Booking Kiosks"],
  },
];

const categories = [
  { id: "All", name: "All Events", icon: LayoutGrid },
  { id: "Corporate", name: "Corporate Event", icon: Briefcase },
  { id: "Product Launch", name: "Product Launch", icon: Mic },
  { id: "Entertainment", name: "Entertainment", icon: Music },
];

const categoryMeta: Record<string, { color: string; bg: string }> = {
  Corporate: { color: "#FFB800", bg: "rgba(255,184,0,0.12)" },
  "Product Launch": { color: "#CBD5E1", bg: "rgba(255,255,255,0.12)" },
  Entertainment: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
};

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const itemsPerPage = 6;

  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
      setCurrentPage(1);
    });
  };

  const filteredEvents =
    activeTab === "All" ? eventsData : eventsData.filter((e) => e.category === activeTab);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="bg-[#0F172A] py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFFFFF]/5 blur-[120px] pointer-events-none" />
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
              Events We&apos;ve <span className="text-[#FFB800]">Managed</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105 self-start lg:self-auto shrink-0"
            style={{
              background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)",
              boxShadow: "0 8px 25px -8px rgba(255,255,255,0.5)",
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
                    ? "linear-gradient(135deg, #FFFFFF, #E2E8F0)"
                    : "rgba(30,41,59,0.8)",
                  color: isActive ? "#111827" : "#94a3b8",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 4px 20px rgba(255,255,255,0.35)" : "none",
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
          {currentEvents.map((event) => {
            const meta = categoryMeta[event.category] || categoryMeta["Corporate"];
            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#FFFFFF]/35 hover:shadow-[0_20px_50px_-15px_rgba(255,255,255,0.25)] transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={14} /> View Photos & Details
                    </span>
                  </div>

                  {/* Date badge */}
                  <div
                    className="absolute top-4 left-4 w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)" }}
                  >
                    <span className="text-gray-900 text-xl font-black leading-none">{event.date}</span>
                    <span className="text-gray-600 text-[9px] font-black tracking-widest uppercase mt-0.5">{event.month}</span>
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

                  {/* View Details Button triggers popup modal */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3 text-left self-start cursor-pointer"
                    style={{ color: meta.color }}
                  >
                    VIEW DETAILS <ArrowRight size={13} />
                  </button>
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
                      ? "linear-gradient(135deg, #FFFFFF, #E2E8F0)"
                      : "rgba(30,41,59,0.8)",
                  color: currentPage === i + 1 ? "#111827" : "#94a3b8",
                  border: currentPage === i + 1 ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: currentPage === i + 1 ? "0 4px 20px rgba(255,255,255,0.4)" : "none",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* ── Event Details Slider Pop-Up Modal ──────────────────────── */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
