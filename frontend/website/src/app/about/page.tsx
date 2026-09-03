"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, MapPin, Sparkles, Clock, Headset, Lightbulb,
  ArrowRight, CheckCircle2, Target, Eye, Award, TrendingUp,
  Quote, Briefcase, Handshake, ShieldCheck,
} from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { StatsCounterSection } from "@/components/StatsCounterSection";

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
    color: "#FFFFFF",
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
    color: "#CBD5E1",
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
          <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-[#FFFFFF]/8 blur-[130px]" />
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
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)",
                      boxShadow: "0 10px 30px -10px rgba(255,255,255,0.5)",
                    }}
                  >
                    Plan Your Event <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-300 font-bold text-sm border border-white/10 hover:border-[#FFFFFF]/50 hover:text-white transition-all duration-300"
                  >
                    Our Services
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right image */}
            <Reveal delay={0.2} className="lg:w-1/2 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/15 group" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp"
                  alt="Virtue IN Agency Corporate Event Production"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Floating mission card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#1E293B]/90 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl">
                  <h3 className="text-white font-black text-base mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                    Our Mission
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    To deliver flawless, premium corporate events that leave a lasting
                    impression and drive your business objectives forward.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══ 2. STATS BAR WITH ANIMATED COUNTER ═════════════ */}
      <StatsCounterSection />

      {/* ══ 3. WHO WE ARE & OUR PHILOSOPHY ════════════════════ */}
      <section className="py-28 bg-[#0F172A] relative overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FFB800]/5 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/[0.04] blur-[140px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">

          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-[#FFB800]" />
                <p className="text-[#FFB800] font-bold text-xs tracking-[0.25em] uppercase">
                  Who We Are & Our Philosophy
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Your End-to-End{" "}
                <span className="text-[#FFB800]">Event Partner</span>
              </h2>
              <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed">
                As an all-encompassing corporate event company, our expansive capabilities span End-to-End Event & Conference Management, MICE, Destination Sourcing, Thematic Décor, Custom Builds, and Turnkey Productions.
              </p>
            </Reveal>
          </div>

          {/* ── High-Impact Editorial Quote & Solutions Bento ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">

            {/* Left: The Executive Problem & Solution Feature Card (7 cols) */}
            <Reveal delay={0.1} className="lg:col-span-7 flex">
              <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] border border-white/[0.12] p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-[#FFB800]/40 transition-all duration-500">
                
                {/* Top golden accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFB800] via-[#ffd76b] to-transparent" />

                {/* Ambient Quote Watermark */}
                <div className="absolute top-6 right-6 text-white/[0.04] pointer-events-none group-hover:text-[#FFB800]/[0.08] transition-colors duration-500">
                  <Quote size={120} />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-2.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800]">
                      <Quote size={20} />
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFB800]">
                      The Event Planning Reality
                    </span>
                  </div>

                  {/* Part 1 of Quote: The Challenge */}
                  <blockquote className="text-white text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed mb-8 italic">
                    &ldquo;Many people with good intentions often underestimate the time and work involved in organising meetings and events until they find themselves partway through the process with fast approaching deadlines with competing priorities.&rdquo;
                  </blockquote>

                  {/* Part 2 of Quote: The Virtue IN Solution */}
                  <div className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#FFB800] rounded-r" />
                    <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                      <strong className="text-white font-bold">This is where we can help you</strong> – by entrusting your event with <span className="text-[#FFB800] font-bold">Virtue IN</span>, you will free up your time to be able to focus on your core business, liaise with your clients, and work on other projects and strategies in your organisation.
                    </p>
                  </div>
                </div>

                {/* Bottom Trust Tag */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] animate-pulse" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Reclaim Bandwidth • Flawless Staging • Guaranteed Delivery
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#FFB800] hover:text-white uppercase tracking-wider transition-colors"
                  >
                    Partner with us <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right: Why Clients Trust Us Checklist (5 cols) */}
            <Reveal delay={0.2} className="lg:col-span-5 flex">
              <div className="w-full bg-[#1E293B] rounded-3xl border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-black text-2xl tracking-tight">Why Clients Trust Us</h3>
                    <span className="text-xs text-[#FFB800] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30">
                      Standard
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Equipped with teams of adept professionals and extensive vendor networks, we carve events that communicate and deliver on your objectives.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {whyUs.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 bg-[#0F172A] rounded-xl px-4 py-3.5 border border-white/[0.04] hover:border-[#FFB800]/40 transition-colors group"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#FFB800]/15 flex items-center justify-center shrink-0 group-hover:bg-[#FFB800] transition-colors">
                          <CheckCircle2 size={13} className="text-[#FFB800] group-hover:text-black transition-colors" />
                        </div>
                        <span className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Tailored options from full turnkey coordination to executive consultancy where you &ldquo;run the show&rdquo; backed by our full arsenal.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── 3 Executive Value Pillars (Focus, Relationships, Peace of Mind) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Target size={22} />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFB800] transition-colors">
                    Focus on Core Business
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Keep your internal teams focused on quarterly deliverables, revenue pipelines, and operational excellence without event distractions.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/[0.05] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Zero Bandwidth Drain
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFFFFF]/10 border border-white/30 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Users size={22} />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFB800] transition-colors">
                    Liaise With Your Clients
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Arrive at your event as a gracious, relaxed host. Nurture high-stakes stakeholder relationships while we direct all backstage cues.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/[0.05] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Executive Presence
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#CBD5E1]/10 border border-[#CBD5E1]/30 text-[#CBD5E1] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Clock size={22} />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFB800] transition-colors">
                    Zero Deadline Friction
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Overcome competing priorities with our battle-tested project calendars, vendor SLA locks, and 24/7 on-ground readiness.
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/[0.05] text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Flawless Execution
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)",
                    boxShadow: "0 10px 30px -10px rgba(255,255,255,0.5)",
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
                      className="group flex items-center gap-3 bg-[#1E293B] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-[#FFFFFF]/40 hover:bg-[#1E293B] transition-all duration-300 cursor-default"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
                        style={{ background: "linear-gradient(135deg,#FFFFFF,#FFB800)" }}
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
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)",
                boxShadow: "0 10px 30px -10px rgba(255,255,255,0.5)",
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
