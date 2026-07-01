"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, MapPin, Sparkles, Clock, Headset, Lightbulb,
  ArrowRight, CheckCircle2, Target, Eye, Award, TrendingUp,
} from "lucide-react";
import { FAQSection } from "@/components/FAQSection";

/* ─── Data ───────────────────────────────────────────────── */
const stats = [
  { value: "150+", label: "Events Delivered" },
  { value: "50+", label: "Premium Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "15+", label: "Services Offered" },
];

const values = [
  {
    icon: Target,
    title: "Precision Execution",
    desc: "Every detail planned, every moment delivered perfectly.",
    color: "#6C3EF4",
  },
  {
    icon: Eye,
    title: "Creative Vision",
    desc: "We think beyond the ordinary to craft unique experiences.",
    color: "#FFB800",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Seasoned professionals who thrive under pressure.",
    color: "#a78bfa",
  },
  {
    icon: Award,
    title: "Quality First",
    desc: "Uncompromising standards in every service we deliver.",
    color: "#34d399",
  },
  {
    icon: TrendingUp,
    title: "Client Growth",
    desc: "Your success is our success — we grow together.",
    color: "#f472b6",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "Always available before, during, and after your event.",
    color: "#60a5fa",
  },
];

const whyUs = [
  "End-to-End Event Execution",
  "Adept Professionals",
  "Extensive Vendor Network",
  "Tailored Options",
  "Time & Resource Saving",
  "Strategic Guidance",
  "Creative Concepts",
  "Transparent Budgeting",
];

const services = [
  "End to End Event Management",
  "End to End Event Production",
  "Conference Management – MICE",
  "Event Planning & Operations",
  "Destination Management",
  "Venue Sourcing",
  "Décor Hire & Styling",
  "Entertainment & Artists",
  "Custom Build Setups",
  "Exhibition – Stall Fabrication",
  "Signage",
  "BTL Activations",
  "Public Relations & Media",
  "Creative Design & Print Media",
  "ATL Management",
];

/* ─── Reveal Wrapper ─────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function About() {
  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-[#6C3EF4]/8 blur-[130px]" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FFB800]/5 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left text */}
            <div className="lg:w-1/2">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-[#FFB800]" />
                  <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                    We Are Virtue IN
                  </p>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
                  Chennai's{" "}
                  <span className="text-[#FFB800]">Premier</span>
                  <br />
                  Event Agency
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                  Virtue IN Agency stands at the forefront of corporate event management,
                  delivering extraordinary experiences that blend creativity with flawless
                  execution. We craft moments that inspire, connect, and elevate your brand.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg,#6C3EF4,#9D72FF)",
                      boxShadow: "0 10px 30px -10px rgba(108,62,244,0.5)",
                    }}
                  >
                    Plan Your Event <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-300 font-bold text-sm border border-white/10 hover:border-[#6C3EF4]/50 hover:text-white transition-all duration-300"
                  >
                    Our Services
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right image */}
            <Reveal delay={0.2} className="lg:w-1/2 w-full">
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/hero_bg.png"
                  alt="Virtue IN Agency Corporate Event"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/80 via-transparent to-transparent" />

                {/* Floating mission card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-black text-base mb-1">Our Mission</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    To deliver flawless, premium corporate events that leave a lasting
                    impression and drive your business objectives forward.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══ 2. STATS BAR ═════════════════════════════════════ */}
      <div className="bg-[#1E293B] border-y border-white/[0.06]">
        <div className="container mx-auto px-6 max-w-7xl py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg,#6C3EF4,#FFB800)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm font-semibold tracking-wider uppercase">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. WHO WE ARE ════════════════════════════════════ */}
      <div className="py-28 bg-[#0F172A]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-[#FFB800]" />
                  <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                    Who We Are
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                  Your end-to-end{" "}
                  <span className="text-[#FFB800]">event partner</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                  As an all-encompassing corporate event company, our expansive list of
                  services includes End-to-End Event and Conference Management, Event
                  Planning, Incentives and Destination Management, Venue Sourcing, Décor
                  Hire and Styling, Theming, Entertainment, Custom Builds, and Exhibitions.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  Equipped with teams of adept professionals and extensive vendors, we can
                  help you realise your idea and carve an event that communicates and
                  delivers on your objectives.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-gray-400 text-base leading-relaxed">
                  We offer tailored options from full to partial event coordination, or a
                  consultancy option where you &ldquo;run the show&rdquo; with access to our knowledge
                  base. Entrust your event with Virtue IN and free up your time to focus on
                  your core business.
                </p>
              </Reveal>
            </div>

            {/* Right — Why Us checklist */}
            <div>
              <Reveal delay={0.1}>
                <div className="bg-[#1E293B] rounded-2xl border border-white/[0.07] p-8">
                  <h3 className="text-white font-black text-xl mb-6">Why Clients Trust Us</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {whyUs.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-[#0F172A] rounded-xl px-4 py-3"
                      >
                        <CheckCircle2 size={16} className="text-[#6C3EF4] shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 4. CORE VALUES ═══════════════════════════════════ */}
      <div className="py-28 bg-[#1E293B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="w-10 h-[2px] bg-[#FFB800]" />
                <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase">
                  What We Stand For
                </p>
                <span className="w-10 h-[2px] bg-[#FFB800]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Our Core <span className="text-[#FFB800]">Values</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className="group bg-[#0F172A] rounded-2xl border border-white/[0.07] p-7 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] transition-all duration-400 cursor-default relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${v.color}, transparent)` }}
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}
                    >
                      <Icon size={22} style={{ color: v.color }} />
                    </div>
                    <h3 className="text-white font-black text-lg mb-2">{v.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ 5. SERVICES LIST ═════════════════════════════════ */}
      <div className="py-28 bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/5 lg:sticky lg:top-28">
              <Reveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-[#FFB800]" />
                  <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                    What We Offer
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                  All Services <span className="text-[#FFB800]">Under One Roof</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  From concept to curtain call — we handle every aspect of your event so
                  you don&apos;t have to.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#6C3EF4,#9D72FF)",
                    boxShadow: "0 10px 30px -10px rgba(108,62,244,0.5)",
                  }}
                >
                  Explore Services <ArrowRight size={16} />
                </Link>
              </Reveal>
            </div>

            <div className="lg:w-3/5">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-3 bg-[#1E293B] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#6C3EF4]/40 hover:bg-[#1E293B] transition-all duration-300 cursor-default"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
                        style={{ background: "linear-gradient(135deg,#6C3EF4,#FFB800)" }}
                      />
                      <span className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 6. FAQ ═══════════════════════════════════════════ */}
      <FAQSection variant="about" />

      {/* ══ 7. CTA STRIP ═════════════════════════════════════ */}
      <div className="bg-[#1E293B] border-t border-white/[0.06] py-24">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[#FFB800] font-bold text-xs tracking-[0.25em] uppercase mb-4">
              Let&apos;s Connect
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Ready to create something{" "}
              <span className="text-[#FFB800]">extraordinary?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#6C3EF4,#9D72FF)",
                boxShadow: "0 10px 30px -10px rgba(108,62,244,0.5)",
              }}
            >
              Plan Your Event <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </div>

    </div>
  );
}
