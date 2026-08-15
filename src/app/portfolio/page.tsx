"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Grid3X3, List, Eye } from "lucide-react";
import EventDetailsModal, { EventItem } from "@/components/EventDetailsModal";

interface PortfolioProject {
  id: number;
  title: string;
  year: string;
  type: string;
  client: string;
  image: string;
  tag: string;
  gallery: string[];
  location: string;
  time: string;
  date: string;
  month: string;
  description: string;
  highlights: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Rotary Club of Madras West",
    year: "2026",
    type: "Corporate Event",
    client: "President Installation 2026–27 @ ITC Grand Chola",
    image: "/service_conference.png",
    tag: "CORPORATE",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "ITC Grand Chola, Chennai",
    time: "10:00am – 04:00pm",
    date: "15",
    month: "JUN",
    description: "Prestigious annual installation ceremony for Rotary Club of Madras West hosted at ITC Grand Chola with presidential stagecraft, live broadcasting, and VIP attendee management.",
    highlights: ["1,200+ Attendees", "AV & Intelligent Lighting", "VIP Banquet", "Executive Protocols"],
  },
  {
    id: 2,
    title: "TVS Emerald – Home Debut",
    year: "2026",
    type: "Product Launch",
    client: "Peninsula, Green Enclave & Atrium Launch",
    image: "/service_launch.png",
    tag: "PRODUCT LAUNCH",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "TVS Emerald, Chennai",
    time: "09:00am – 06:00pm",
    date: "22",
    month: "AUG",
    description: "Mega real estate project launch and experiential customer lounge setup for TVS Emerald's flagship residential properties.",
    highlights: ["3D Architectural Walkthroughs", "Interactive Touchscreen Kiosks", "VIP Investor Lounges"],
  },
  {
    id: 3,
    title: "NeXHS Annual Foundation Day",
    year: "2026",
    type: "Corporate Event",
    client: "Next Generation Hybrid Systems",
    image: "/hero_bg.png",
    tag: "CORPORATE",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Chennai Trade Centre",
    time: "09:00am – 05:00pm",
    date: "10",
    month: "SEP",
    description: "Annual foundation celebration for NeXHS uniting over 800 employees and stakeholders with keynote presentations and rewards.",
    highlights: ["Custom Stage Sets", "Keynote Theater", "Employee Excellence Awards"],
  },
  {
    id: 4,
    title: "JLL – Day Outing",
    year: "2025",
    type: "Corporate Event",
    client: "Jones Lang LaSalle",
    image: "/service_conference.png",
    tag: "CORPORATE",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Taj Fisherman's Cove",
    time: "08:00am – 08:00pm",
    date: "05",
    month: "SEP",
    description: "Beachside corporate retreat and team-building experience at Taj Fisherman's Cove with outdoor challenges and sunset dinner.",
    highlights: ["Team Building Activities", "Beach Gala Dinner", "Live DJ & Band Setup"],
  },
  {
    id: 5,
    title: "Audi Chennai Conference Meeting",
    year: "2024",
    type: "Corporate Event",
    client: "BNI B Region – Audi Chennai",
    image: "/service_launch.png",
    tag: "CORPORATE",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Audi Chennai Showroom & Conclave Arena",
    time: "10:00am – 03:00pm",
    date: "14",
    month: "MAY",
    description: "Executive leadership conference and luxury brand experience meeting organized for Audi Chennai and regional partners.",
    highlights: ["Executive Boardroom Setup", "Multi-screen Keynote", "Luxury Auto Display"],
  },
  {
    id: 6,
    title: "IIMM Conference – Spectrum 2024",
    year: "2024",
    type: "Corporate Event",
    client: "Indian Institute of Material Management",
    image: "/hero_bg.png",
    tag: "CORPORATE",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Hotel Savera, Chennai",
    time: "09:30am – 05:30pm",
    date: "20",
    month: "JUL",
    description: "National supply chain & materials conference featuring panel symposiums, delegate kit fabrication, and AV staging.",
    highlights: ["Supply Chain Symposium", "Technical Panel Setup", "Delegate Concierge"],
  },
  {
    id: 7,
    title: "Radiant Raising Day 2023",
    year: "2023",
    type: "Corporate Event",
    client: "Radiant Dental Care – Annual Day",
    image: "/service_conference.png",
    tag: "CORPORATE",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "VGP Golden Beach Resort",
    time: "10:00am – 06:00pm",
    date: "18",
    month: "OCT",
    description: "Radiant Dental Care annual celebration with clinical award distributions and festive cultural events.",
    highlights: ["Awards Conferment", "Cultural Gala", "Live Entertainment"],
  },
  {
    id: 8,
    title: "Radiant Raising Day 2024",
    year: "2024",
    type: "Corporate Event",
    client: "Radiant Dental Care – Day Outing & Annual Day",
    image: "/service_launch.png",
    tag: "CORPORATE",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "MGM Beach Resorts",
    time: "09:00am – 07:00pm",
    date: "24",
    month: "OCT",
    description: "Subsequent edition of Raising Day festival at MGM Beach Resorts with family fun programs and celebratory banquets.",
    highlights: ["Outdoor Carnival", "Family Engagement Zones", "Beach Banquet"],
  },
  {
    id: 9,
    title: "10th Southern HOG Rally",
    year: "2023",
    type: "Corporate Event",
    client: "Harley-Davidson Marina Chapter",
    image: "/hero_bg.png",
    tag: "CORPORATE",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Mahabalipuram Coastal Highway",
    time: "06:00am – 11:00pm",
    date: "11",
    month: "NOV",
    description: "Mega milestone rally welcoming 500+ Harley-Davidson riders across South India with rock concerts and stunt arenas.",
    highlights: ["500+ Superbikes", "Rock Concert Arena", "Highway Security Logistics"],
  },
  {
    id: 10,
    title: "Doordarshan Election Conclave",
    year: "2026",
    type: "Corporate Event",
    client: "Prasar Bharati",
    image: "/service_conference.png",
    tag: "CORPORATE",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Doordarshan Kendra Studio, Chennai",
    time: "10:00am – 02:00pm",
    date: "04",
    month: "APR",
    description: "Televised election debates and state-level political conclave staging with broadcast-ready lighting and acoustics.",
    highlights: ["Live National Broadcast", "Multi-Party Debate Podiums", "Broadcast Lighting Design"],
  },
  {
    id: 11,
    title: "NYE Beach Night 2025",
    year: "2025",
    type: "Entertainment",
    client: "Fortune Beach Resort",
    image: "/hero_bg.png",
    tag: "ENTERTAINMENT",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "ECR Beachfront, Chennai",
    time: "20:00pm – 01:00am",
    date: "31",
    month: "DEC",
    description: "Electrifying New Year's Eve celebration featuring international DJs, laser lighting spectacles, and seaside countdowns.",
    highlights: ["International DJ Sets", "Laser & Pyro Midnight Show", "VIP Cabanas"],
  },
  {
    id: 12,
    title: "BNP Paribas Annual Meet",
    year: "2024",
    type: "Corporate Event",
    client: "BNP Paribas",
    image: "/service_launch.png",
    tag: "CORPORATE",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Feathers Hotel, Chennai",
    time: "09:00am – 05:00pm",
    date: "08",
    month: "DEC",
    description: "Annual meeting and global compliance forum for BNP Paribas India operations team.",
    highlights: ["Global Finance Keynote", "Interactive Polling", "Corporate Banquet"],
  },
  {
    id: 13,
    title: "Save a Child Marathon",
    year: "2025",
    type: "Corporate Event",
    client: "Saveetha Eco Pupil School – Ekam NGO",
    image: "/service_conference.png",
    tag: "CORPORATE",
    gallery: [
      "/service_conference.png",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Besant Nagar Beach Promenade",
    time: "05:30am – 10:00am",
    date: "16",
    month: "FEB",
    description: "Charity 10K & 5K marathon with 3,000+ runners, route water stations, timing chips, and medal staging.",
    highlights: ["3,000+ Runners", "RFID Timing Gates", "Medical Support Stations"],
  },
  {
    id: 14,
    title: "Toyota Hilux – Product Reveal",
    year: "2024",
    type: "Product Launch",
    client: "Lanson Toyota",
    image: "/service_launch.png",
    tag: "PRODUCT LAUNCH",
    gallery: [
      "/service_launch.png",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Lanson Toyota Flagship, Koyambedu",
    time: "11:00am – 04:00pm",
    date: "12",
    month: "MAR",
    description: "Off-road experiential launch of Toyota Hilux with obstacle course demo and rugged lifestyle thematic booth.",
    highlights: ["Custom Obstacle Ramp", "Rugged 4x4 Experience", "Media & VIP Drive"],
  },
  {
    id: 15,
    title: "Madarase Fashion Talent Hunt",
    year: "2025",
    type: "Entertainment",
    client: "Phoenix Marketcity Chennai",
    image: "/hero_bg.png",
    tag: "ENTERTAINMENT",
    gallery: [
      "/hero_bg.png",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=1200",
    ],
    location: "Phoenix Marketcity, Chennai",
    time: "18:00pm – 23:00pm",
    date: "25",
    month: "OCT",
    description: "Runway fashion talent showcase highlighting regional designers with celebrity jury and live stage broadcast.",
    highlights: ["Catwalk Setup", "Celebrity Jury Coordination", "Over 2,500 Spectators"],
  },
];

const filters = ["All", "Corporate Event", "Product Launch", "Entertainment"];

const tagMeta: Record<string, { color: string; border: string }> = {
  CORPORATE: { color: "#FFB800", border: "rgba(255,184,0,0.25)" },
  "PRODUCT LAUNCH": { color: "#FFFFFF", border: "rgba(255,255,255,0.35)" },
  ENTERTAINMENT: { color: "#CBD5E1", border: "rgba(255,255,255,0.3)" },
};

function GridCard({
  project,
  idx,
  onClick,
}: {
  project: PortfolioProject;
  idx: number;
  onClick: () => void;
}) {
  const meta = tagMeta[project.tag] || tagMeta["CORPORATE"];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1E293B] border border-white/10 hover:border-[#FFFFFF]/40 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] transition-all duration-500"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

      {/* Top tag */}
      <div className="absolute top-4 left-4">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-sm"
          style={{
            background: "rgba(15,23,42,0.75)",
            color: meta.color,
            border: `1px solid ${meta.border}`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
          {project.tag}
        </span>
      </div>

      {/* Year chip top right */}
      <div className="absolute top-4 right-4">
        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider">
          {project.year}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <h3 className="text-white font-black text-lg leading-tight mb-1 group-hover:text-[#FFB800] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          {project.client}
        </p>
        <div
          className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-75"
          style={{ color: meta.color }}
        >
          View Photos & Details <ArrowRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

function ListCard({
  project,
  idx,
  onClick,
}: {
  project: PortfolioProject;
  idx: number;
  onClick: () => void;
}) {
  const meta = tagMeta[project.tag] || tagMeta["CORPORATE"];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      onClick={onClick}
      className="group flex items-center gap-5 bg-[#1E293B] border border-white/10 rounded-2xl p-4 hover:border-[#FFFFFF]/40 hover:shadow-[0_8px_30px_-10px_rgba(255,255,255,0.25)] transition-all duration-400 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-flex items-center gap-1 text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(15,23,42,0.6)",
              color: meta.color,
              border: `1px solid ${meta.border}`,
            }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: meta.color }} />
            {project.tag}
          </span>
          <span className="text-gray-500 text-[10px] font-semibold">{project.year}</span>
        </div>
        <h3 className="text-white font-bold text-sm truncate group-hover:text-[#FFB800] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-500 text-xs truncate mt-0.5">{project.client}</p>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold group-hover:text-white">
        <span className="hidden sm:inline">View Photos</span>
        <ArrowRight
          size={16}
          className="text-gray-600 group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all duration-300 shrink-0"
        />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filtered =
    filter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.type === filter);

  // Convert PortfolioProject to EventItem for Modal
  const modalEventItem: EventItem | null = selectedProject
    ? {
        id: selectedProject.id,
        title: selectedProject.title,
        category: selectedProject.type,
        subtitle: selectedProject.client,
        date: selectedProject.date,
        month: selectedProject.month,
        time: selectedProject.time,
        location: selectedProject.location,
        image: selectedProject.image,
        gallery: selectedProject.gallery,
        description: selectedProject.description,
        highlights: selectedProject.highlights,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFFFFF]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <p className="text-gray-400 font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Our Work Speaks
          </p>
          <h1
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            Curated{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#FFFFFF,#FFB800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Portfolio
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From boardroom assemblies to 50,000+ attendee stadium productions —
            explore how we bring visionary events to life.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-[#1E293B]">
        <div className="container mx-auto px-6 max-w-7xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Completed Events" },
              { value: "30+", label: "Corporate Clients" },
              { value: "100K+", label: "Attendees Engaged" },
              { value: "100%", label: "Flawless Execution" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-gray-500 text-xs font-semibold tracking-wider uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTROLS BAR ─────────────────────────── */}
      <div className="sticky top-[65px] z-30 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4 flex-wrap">

          {/* Filter tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  color: filter === f ? "#111827" : "#6b7280",
                  background: filter === f ? "linear-gradient(135deg,#FFFFFF,#E2E8F0)" : "transparent",
                  border: filter === f ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: filter === f ? "0 4px 20px rgba(255,255,255,0.35)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-[#1E293B] border border-white/[0.08] rounded-xl p-1">
            {([{ m: "grid", I: Grid3X3 }, { m: "list", I: List }] as const).map(({ m, I }) => (
              <button
                key={m}
                onClick={() => setView(m)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  view === m ? "bg-[#FFFFFF] text-gray-900" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <I size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 py-14">
        <AnimatePresence mode="popLayout">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, idx) => (
                <GridCard
                  key={project.title}
                  project={project}
                  idx={idx}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto flex flex-col gap-3"
            >
              {filtered.map((project, idx) => (
                <ListCard
                  key={project.title}
                  project={project}
                  idx={idx}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-gray-600 text-base font-medium">
            No projects found for this category.
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ───────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-[#1E293B] py-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#FFB800] font-bold text-xs tracking-[0.25em] uppercase mb-4">
            Ready to be next?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            Let&apos;s create something{" "}
            <span className="text-[#FFB800]">unforgettable.</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)",
              boxShadow: "0 10px 30px -10px rgba(255,255,255,0.5)",
            }}
          >
            Plan Your Event <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ── Pop-Up Event Details Modal with Image Slider ────── */}
      <EventDetailsModal
        event={modalEventItem}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
