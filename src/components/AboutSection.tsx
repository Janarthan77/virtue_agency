"use client";

import { Users, MapPin, Sparkles, Clock, Headset, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  { icon: Users, title: "Friendly Team", desc: "Experienced & professional" },
  { icon: MapPin, title: "Perfect Venues", desc: "Curated premium locations" },
  { icon: Sparkles, title: "Unique Scenario", desc: "Thinking out of the box" },
  { icon: Clock, title: "Unforgettable Time", desc: "Flawless execution" },
  { icon: Headset, title: "24/7 Support", desc: "Always here for you" },
  { icon: Lightbulb, title: "Brilliant Ideas", desc: "Creative concepts" },
];

export function AboutSection() {
  return (
    <section className="bg-white py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-[#93C52E]"></span>
                <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                  We Are Virtue IN
                </p>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                <span className="font-bold">No.1</span> Events<br />Management
              </h2>
              
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10">
                Virtue IN Agency stands at the forefront of corporate event management, delivering extraordinary experiences that blend creativity with flawless execution. We craft moments that inspire, connect, and elevate your brand to new heights.
              </p>
              
              <div>
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#93C52E] text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_10px_30px_-10px_rgba(147,197,46,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(147,197,46,0.8)] hover:scale-105 transition-all duration-300"
                >
                  About Virtue IN
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    <div className="w-16 h-16 mb-5 flex items-center justify-center bg-gray-50 group-hover:bg-[#93C52E]/10 rounded-full transition-colors duration-500">
                      <Icon size={32} className="text-[#93C52E] transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
