"use client";

import { FadeIn } from "@/components/FadeIn";
import { 
  ArrowRight, CalendarDays, Settings, Mic, ClipboardCheck, MapPin, 
  Building, Palette, Music, Hammer, Store, Megaphone, Activity, 
  Globe, PenTool, Radio 
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "End to End Event Management",
    desc: "Comprehensive management from concept to execution for all types of events, ensuring a seamless experience.",
    icon: <CalendarDays className="w-8 h-8 text-accent" />
  },
  {
    title: "End to End Event Production",
    desc: "Full-scale technical and stage production, ensuring flawless audio, visual, and lighting experiences.",
    icon: <Settings className="w-8 h-8 text-accent" />
  },
  {
    title: "Conference Management - MICE",
    desc: "Expert handling of Meetings, Incentives, Conferences, and Exhibitions for corporate excellence.",
    icon: <Mic className="w-8 h-8 text-accent" />
  },
  {
    title: "Event Planning - Operations & Consulting",
    desc: "Strategic planning, logistics, and operational consulting to make your events seamless.",
    icon: <ClipboardCheck className="w-8 h-8 text-accent" />
  },
  {
    title: "Destination Management",
    desc: "Complete travel, logistics, and localized event planning across premier destinations.",
    icon: <MapPin className="w-8 h-8 text-accent" />
  },
  {
    title: "Venue Sourcing",
    desc: "Finding the perfect backdrop tailored to your event's scale, style, and unique requirements.",
    icon: <Building className="w-8 h-8 text-accent" />
  },
  {
    title: "Decor Hire, Styling & Theming",
    desc: "Creative set designs, gorgeous floral arrangements, and thematic styling for immersive environments.",
    icon: <Palette className="w-8 h-8 text-accent" />
  },
  {
    title: "Entertainment & Artist Management",
    desc: "Curating top-tier talent, bands, speakers, and artists for captivating live performances.",
    icon: <Music className="w-8 h-8 text-accent" />
  },
  {
    title: "Custom Build Setups",
    desc: "Bespoke structural designs, custom staging, and immersive fabrications tailored to your vision.",
    icon: <Hammer className="w-8 h-8 text-accent" />
  },
  {
    title: "Exhibition - Stall Fabrication",
    desc: "Designing and building interactive and engaging exhibition stalls and corporate booths.",
    icon: <Store className="w-8 h-8 text-accent" />
  },
  {
    title: "Signage",
    desc: "High-quality, custom event signage and branding materials for impactful visibility.",
    icon: <Megaphone className="w-8 h-8 text-accent" />
  },
  {
    title: "BTL Activations",
    desc: "Below-the-line marketing activations focused on direct, meaningful consumer engagement.",
    icon: <Activity className="w-8 h-8 text-accent" />
  },
  {
    title: "Public Relations & Media",
    desc: "Strategic PR campaigns and comprehensive media management to amplify your event's reach.",
    icon: <Globe className="w-8 h-8 text-accent" />
  },
  {
    title: "Creative Design & Print Media",
    desc: "Exceptional graphic design and printing services for all your event collaterals.",
    icon: <PenTool className="w-8 h-8 text-accent" />
  },
  {
    title: "ATL Management",
    desc: "Above-the-line mass media advertising and large-scale brand awareness campaigns.",
    icon: <Radio className="w-8 h-8 text-accent" />
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF]">Expertise</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We exclusively specialize in delivering high-impact experiences across a diverse range of services, ensuring unparalleled focus and quality for your brand.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={0.05 * idx}>
              <div className="glass p-8 rounded-3xl h-full flex flex-col group hover:bg-[#1E293B]/10 transition-all duration-300 border border-white/5 hover:border-accent/30 relative overflow-hidden">
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="bg-primary/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
                
                <p className="text-gray-400 text-base leading-relaxed mb-8 flex-grow relative z-10">
                  {service.desc}
                </p>
                
                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] font-bold hover:opacity-80 transition-opacity relative z-10 w-fit text-lg">
                  Learn More <ArrowRight size={18} className="text-pink-500" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
