"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";

const portfolioProjects = [
  { title: "Rotary Club of Madras West", year: "2026", type: "Corporate Event", client: "President Installation 2026–27 @ ITC", image: "/service_conference.png", colSpan: "col-span-1 md:col-span-2" },
  { title: "TVS Emerald – Home Debut", year: "2026", type: "Product Launch", client: "Peninsula, Green Enclave & Atrium", image: "/service_launch.png", colSpan: "col-span-1" },
  { title: "NeXHS Annual Foundation Day", year: "2026", type: "Corporate Event", client: "Next Generation Hybrid Systems", image: "/hero_bg.png", colSpan: "col-span-1" },
  { title: "JLL – Day Outing", year: "2025", type: "Corporate Event", client: "Jones Lang LaSalle", image: "/service_conference.png", colSpan: "col-span-1" },
  { title: "Audi Chennai Conference Meeting", year: "2024", type: "Corporate Event", client: "BNI B Region – Audi Chennai", image: "/service_launch.png", colSpan: "col-span-1 md:col-span-2" },
  { title: "IIMM Conference – Spectrum 2024", year: "2024", type: "Corporate Event", client: "Indian Institute of Material Management", image: "/hero_bg.png", colSpan: "col-span-1 md:col-span-3" },
  { title: "Radiant Raising Day 2023", year: "2023", type: "Corporate Event", client: "Radiant Dental Care – Annual Day", image: "/service_conference.png", colSpan: "col-span-1 md:col-span-2" },
  { title: "Radiant Raising Day 2024", year: "2024", type: "Corporate Event", client: "Radiant Dental Care – Day Outing & Annual Day", image: "/service_launch.png", colSpan: "col-span-1" },
  { title: "10th Southern HOG Rally", year: "2023", type: "Corporate Event", client: "Harley-Davidson Marina Chapter", image: "/hero_bg.png", colSpan: "col-span-1" },
  { title: "Doordarshan Election Conclave", year: "2026", type: "Corporate Event", client: "Prasar Bharati", image: "/service_conference.png", colSpan: "col-span-1 md:col-span-2" },
  { title: "NYE Beach Night 2025", year: "2025", type: "Corporate Event", client: "Fortune Beach Resort", image: "/hero_bg.png", colSpan: "col-span-1" },
  { title: "BNP Paribas Annual Meet", year: "2024", type: "Corporate Event", client: "BNP Paribas", image: "/service_launch.png", colSpan: "col-span-1" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  
  const filters = ["All", "Conference", "Product Launch", "Corporate Event", "Entertainment"];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our <span className="text-accent">Portfolio</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A glimpse into the extraordinary experiences we have crafted for our esteemed clients.
            </p>
          </FadeIn>
        </div>

        {/* Filters */}
        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f 
                  ? "bg-accent text-primary" 
                  : "glass text-white hover:bg-[#1E293B]/10"
              }`}
            >
              {f}
            </button>
          ))}
        </FadeIn>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portfolioProjects.map((project, idx) => (
            <FadeIn 
              key={idx} 
              delay={0.1 * idx} 
              className={`group relative overflow-hidden rounded-3xl min-h-[300px] cursor-pointer ${project.colSpan}`}
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent text-xs font-bold uppercase tracking-wider">{project.type}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E293B]/30" />
                    <span className="text-gray-400 text-xs font-semibold">{project.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Client: {project.client}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
