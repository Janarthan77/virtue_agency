"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const featured = [
  {
    title: "Rotary Club of Madras West",
    client: "President Installation 2026–27 @ ITC",
    img: "/service_conference.png",
    badge: "Corporate Event",
    year: "2026",
    accent: "#93C52E",
    wide: true,
  },
  {
    title: "TVS Emerald – Home Debut",
    client: "Peninsula, Green Enclave & Atrium Launch",
    img: "/service_launch.png",
    badge: "Product Release",
    year: "2026",
    accent: "#f97316",
    wide: false,
  },
  {
    title: "JLL – Day Outing",
    client: "Jones Lang LaSalle",
    img: "/hero_bg.png",
    badge: "Corporate Event",
    year: "2025",
    accent: "#22d3ee",
    wide: false,
  },
  {
    title: "Audi Chennai Conference",
    client: "BNI B Region – Audi Chennai",
    img: "/service_conference.png",
    badge: "Corporate Event",
    year: "2024",
    accent: "#a78bfa",
    wide: false,
  },
  {
    title: "Madarase Fashion Talent Hunt",
    client: "Phoenix Marketcity Chennai",
    img: "/service_launch.png",
    badge: "Corporate Event",
    year: "2025",
    accent: "#f43f5e",
    wide: true,
  },
];

function Card({
  p,
  delay = 0,
}: {
  p: (typeof featured)[0];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={p.img}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Year chip */}
        <span className="absolute top-3 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider">
          {p.year}
        </span>

        {/* Arrow button */}
        <span
          className="absolute top-3 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
          style={{ background: p.accent }}
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Badge */}
        <span
          className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4"
          style={{
            background: `${p.accent}15`,
            color: p.accent,
            border: `1px solid ${p.accent}35`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
          {p.badge}
        </span>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 leading-snug mb-1 group-hover:text-gray-700 transition-colors">
          {p.title}
        </h3>

        {/* Client */}
        <p className="text-gray-400 text-xs font-medium mb-4 flex-1">{p.client}</p>

        {/* Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-2.5"
          style={{ color: p.accent }}
        >
          View Project <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: p.accent }}
      />
    </motion.div>
  );
}

export function ProjectSlider() {
  return (
    <section className="bg-gray-50 py-20">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[#93C52E] font-bold text-xs tracking-[0.25em] uppercase mb-3">
              Our Work
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Events That Made<br />An Impression
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="self-start md:self-end inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-600 hover:border-[#93C52E] hover:text-[#93C52E] font-semibold text-sm transition-all duration-300 group shrink-0"
          >
            View All Projects
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Row 1: 1 wide + 2 normal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
          <div className="md:col-span-6">
            <Card p={featured[0]} delay={0} />
          </div>
          <div className="md:col-span-3">
            <Card p={featured[1]} delay={0.1} />
          </div>
          <div className="md:col-span-3">
            <Card p={featured[2]} delay={0.2} />
          </div>
        </div>

        {/* Row 2: 2 normal + 1 wide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-3">
            <Card p={featured[3]} delay={0.1} />
          </div>
          <div className="md:col-span-3">
            <Card p={featured[4]} delay={0.2} />
          </div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-6"
          >
            <Link href="/portfolio" className="group flex flex-col items-center justify-center h-full min-h-[220px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#93C52E] bg-white hover:bg-[#93C52E]/5 transition-all duration-500 p-10 text-center">
              <span className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-[#93C52E] flex items-center justify-center mb-5 transition-colors duration-300">
                <ArrowUpRight size={22} className="text-gray-400 group-hover:text-white transition-colors" />
              </span>
              <p className="text-xl font-black text-gray-700 group-hover:text-[#93C52E] transition-colors mb-1">
                See All 17+ Events
              </p>
              <p className="text-gray-400 text-sm">
                Explore our full portfolio of corporate events
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
