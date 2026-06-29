"use client";

import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { ArrowRight, Users, Target } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Corporate Events",
    desc: "Flawless execution of corporate conferences, meetings, and summits with state-of-the-art tech and staging.",
    icon: <Users className="w-8 h-8 text-accent" />,
    image: "/service_conference.png"
  },
  {
    title: "Product Releases",
    desc: "Dramatic and impactful product launches that captivate your audience and dominate the market.",
    icon: <Target className="w-8 h-8 text-accent" />,
    image: "/service_launch.png"
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Expertise</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We exclusively specialize in high-impact Corporate Events and Dramatic Product Releases, ensuring unparalleled focus and quality for your brand.
            </p>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={0.1 * idx}>
              <div className="glass p-8 rounded-3xl h-full flex flex-col group hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-accent/30 relative overflow-hidden">
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="bg-primary/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
                
                <p className="text-gray-400 text-base leading-relaxed mb-8 flex-grow relative z-10">
                  {service.desc}
                </p>
                
                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 font-bold hover:opacity-80 transition-opacity relative z-10 w-fit text-lg">
                  Plan Your Event <ArrowRight size={18} className="text-pink-500" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
