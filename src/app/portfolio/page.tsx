"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Grid3X3, List } from "lucide-react";

const portfolioProjects = [
  {
    title: "Rotary Club of Madras West",
    year: "2026",
    type: "Corporate Event",
    client: "President Installation 2026–27 @ ITC Grand Chola",
    image: "/service_conference.png",
    tag: "CORPORATE",
  },
  {
    title: "TVS Emerald – Home Debut",
    year: "2026",
    type: "Product Launch",
    client: "Peninsula, Green Enclave & Atrium Launch",
    image: "/service_launch.png",
    tag: "PRODUCT LAUNCH",
  },
  {
    title: "NeXHS Annual Foundation Day",
    year: "2026",
    type: "Corporate Event",
    client: "Next Generation Hybrid Systems",
    image: "/hero_bg.png",
    tag: "CORPORATE",
  },
  {
    title: "JLL – Day Outing",
    year: "2025",
    type: "Corporate Event",
    client: "Jones Lang LaSalle",
    image: "/service_conference.png",
    tag: "CORPORATE",
  },
  {
    title: "Audi Chennai Conference Meeting",
    year: "2024",
    type: "Corporate Event",
    client: "BNI B Region – Audi Chennai",
    image: "/service_launch.png",
    tag: "CORPORATE",
  },
  {
    title: "IIMM Conference – Spectrum 2024",
    year: "2024",
    type: "Corporate Event",
    client: "Indian Institute of Material Management",
    image: "/hero_bg.png",
    tag: "CORPORATE",
  },
  {
    title: "Radiant Raising Day 2023",
    year: "2023",
    type: "Corporate Event",
    client: "Radiant Dental Care – Annual Day",
    image: "/service_conference.png",
    tag: "CORPORATE",
  },
  {
    title: "Radiant Raising Day 2024",
    year: "2024",
    type: "Corporate Event",
    client: "Radiant Dental Care – Day Outing & Annual Day",
    image: "/service_launch.png",
    tag: "CORPORATE",
  },
  {
    title: "10th Southern HOG Rally",
    year: "2023",
    type: "Corporate Event",
    client: "Harley-Davidson Marina Chapter",
    image: "/hero_bg.png",
    tag: "CORPORATE",
  },
  {
    title: "Doordarshan Election Conclave",
    year: "2026",
    type: "Corporate Event",
    client: "Prasar Bharati",
    image: "/service_conference.png",
    tag: "CORPORATE",
  },
  {
    title: "NYE Beach Night 2025",
    year: "2025",
    type: "Entertainment",
    client: "Fortune Beach Resort",
    image: "/hero_bg.png",
    tag: "ENTERTAINMENT",
  },
  {
    title: "BNP Paribas Annual Meet",
    year: "2024",
    type: "Corporate Event",
    client: "BNP Paribas",
    image: "/service_launch.png",
    tag: "CORPORATE",
  },
  {
    title: "Save a Child Marathon",
    year: "2025",
    type: "Corporate Event",
    client: "Saveetha Eco Pupil School – Ekam NGO",
    image: "/service_conference.png",
    tag: "CORPORATE",
  },
  {
    title: "Toyota Hilux – Product Reveal",
    year: "2024",
    type: "Product Launch",
    client: "Lanson Toyota",
    image: "/service_launch.png",
    tag: "PRODUCT LAUNCH",
  },
  {
    title: "Madarase Fashion Talent Hunt",
    year: "2025",
    type: "Entertainment",
    client: "Phoenix Marketcity Chennai",
    image: "/hero_bg.png",
    tag: "ENTERTAINMENT",
  },
];

const filters = ["All", "Corporate Event", "Product Launch", "Entertainment"];

const tagMeta: Record<string, { color: string; border: string }> = {
  CORPORATE: { color: "#FFB800", border: "rgba(255,184,0,0.25)" },
  "PRODUCT LAUNCH": { color: "#FFFFFF", border: "rgba(255,255,255,0.35)" },
  ENTERTAINMENT: { color: "#CBD5E1", border: "rgba(255,255,255,0.3)" },
};

function GridCard({ project, idx }: { project: (typeof portfolioProjects)[0]; idx: number }) {
  const meta = tagMeta[project.tag] || tagMeta["CORPORATE"];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            background: "rgba(15,23,42,0.7)",
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
          View Project <ArrowRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

function ListCard({ project, idx }: { project: (typeof portfolioProjects)[0]; idx: number }) {
  const meta = tagMeta[project.tag] || tagMeta["CORPORATE"];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
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

      <ArrowRight
        size={16}
        className="text-gray-600 group-hover:text-[#FFB800] group-hover:translate-x-1 transition-all duration-300 shrink-0"
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered =
    filter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* ── PAGE HEADER ─────────────────────────── */}
      <div className="relative pt-36 pb-20 overflow-hidden">
        {/* Subtle purple glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#FFFFFF]/8 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-10 h-[2px] bg-[#FFB800]" />
            <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
              Our Portfolio
            </p>
            <span className="w-10 h-[2px] bg-[#FFB800]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6"
          >
            Events We've{" "}
            <span className="text-[#FFB800]">Crafted</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            A glimpse into the extraordinary experiences we have crafted for our esteemed clients.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-12 md:gap-20 mt-14"
          >
            {[
              { value: "150+", label: "Events" },
              { value: "50+", label: "Clients" },
              { value: "10+", label: "Years" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-[#FFB800] text-xs font-bold tracking-widest uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── FILTERS + TOGGLE ─────────────────────── */}
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
                <GridCard key={project.title} project={project} idx={idx} />
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
                <ListCard key={project.title} project={project} idx={idx} />
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
            Let's create something{" "}
            <span className="text-[#FFB800]">unforgettable.</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)",
              boxShadow: "0 10px 30px -10px rgba(255,255,255,0.5)",
            }}
          >
            Plan Your Event <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
