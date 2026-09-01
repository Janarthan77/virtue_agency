'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Settings,
  Mic,
  ClipboardCheck,
  MapPin,
  Building,
  Palette,
  Music,
  Hammer,
  Store,
  Megaphone,
  Activity,
  Globe,
  PenTool,
  Radio,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
  Users,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { fetchLiveServices, ServiceItem, DEFAULT_SERVICES } from '@/lib/api'

/* ─── Icon Component Resolver ─────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  CalendarDays,
  Settings,
  Mic,
  ClipboardCheck,
  MapPin,
  Building,
  Palette,
  Music,
  Hammer,
  Store,
  Megaphone,
  Activity,
  Globe,
  PenTool,
  Radio,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
  Users,
  Layers,
  Sparkles,
};

function ResolveIcon({ name, size = 20, style, className }: { name?: string; size?: number; style?: React.CSSProperties; className?: string }) {
  const IconComp = (name && ICON_MAP[name]) ? ICON_MAP[name] : Sparkles;
  return <IconComp size={size} style={style} className={className} />;
}

const ACCENT_CYCLE = ['#FFFFFF', '#FFB800', '#CBD5E1', '#34d399', '#f472b6', '#60a5fa'];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Brief', desc: 'We deep-dive into your vision, target audience, brand ethos, and operational goals to establish a strategic blueprint.' },
  { num: '02', title: 'Design & Engineering', desc: '3D renders, stage mockups, technical acoustics, and budgets are drafted with meticulous precision before execution.' },
  { num: '03', title: 'Live Production', desc: 'Our on-ground production directors, engineers, and hospitality managers coordinate every cue in real time.' },
  { num: '04', title: 'Flawless Delivery', desc: 'We deliver an unforgettable attendee experience, followed by data debriefs and media asset transfers.' },
];

function GoldEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span style={{ display: 'block', width: 48, height: 2, background: 'linear-gradient(to right, transparent, #FFB800)' }} />
      <span style={{ color: '#FFB800', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {text}
      </span>
      <span style={{ display: 'block', width: 48, height: 2, background: 'linear-gradient(to left, transparent, #FFB800)' }} />
    </div>
  )
}

/* ─── Modern Image-Powered Service Card ─────────────────────────────────────── */
function ModernServiceCard({
  service,
  accentColor,
  index,
}: {
  service: ServiceItem
  accentColor: string
  index: number
}) {
  const displayNum = service.num || (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`);
  const effectiveColor = service.accent_color || accentColor;
  const imageUrl = service.image || DEFAULT_SERVICES[index % DEFAULT_SERVICES.length]?.image || 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#1E293B] rounded-[1.75rem] border border-white/[0.08] hover:border-white/30 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.7)] transition-all duration-500"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top Accent Gradient Border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-30 opacity-90 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${effectiveColor}, ${effectiveColor}66, transparent)`,
        }}
      />

      <div>
        {/* ── Top Cover Image Section ── */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/40 to-black/30" />

          {/* Floating Icon Box (Top Left - Never Cropped) */}
          <div className="absolute top-4 left-4 z-20">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: `1.5px solid ${effectiveColor}70`,
                boxShadow: `0 8px 24px -4px ${effectiveColor}40`,
              }}
            >
              <ResolveIcon
                name={service.icon}
                size={20}
                style={{ color: effectiveColor === '#FFFFFF' ? '#FFFFFF' : effectiveColor }}
              />
            </div>
          </div>

          {/* Number badge (Top Right) */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-md"
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFB800',
                border: '1px solid rgba(255, 184, 0, 0.4)',
              }}
            >
              {displayNum}
            </span>
          </div>
        </div>

        {/* ── Text Content Section ── */}
        <div className="p-6 sm:p-7 pb-4">
          <h3
            className="text-lg sm:text-xl font-black text-white leading-snug tracking-tight mb-2.5 group-hover:text-[#FFB800] transition-colors duration-300 line-clamp-2"
          >
            {service.title}
          </h3>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>
      </div>

      {/* ── Bottom Action Row ── */}
      <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-white/[0.05] flex items-center justify-between mt-auto">
        <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-emerald-400" />
          Signature Capability
        </span>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5 cursor-pointer"
          style={{ color: effectiveColor }}
        >
          <span>Plan This</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

function ProcessCard({ step, index }: { step: (typeof PROCESS_STEPS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-6 sm:p-8 w-full h-full bg-[#0F172A]/70 border border-white/[0.08] hover:border-white/25 rounded-3xl flex flex-col items-center text-center gap-5 transition-all duration-300 shadow-lg"
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFFFFF, #CBD5E1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 900,
          color: '#0F172A',
          letterSpacing: '0.05em',
          boxShadow: '0 0 24px rgba(255,255,255,0.3)',
          flexShrink: 0,
        }}
      >
        {step.num}
      </div>

      <div>
        <h4 className="text-base sm:text-lg font-bold text-white mb-2">
          {step.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    fetchLiveServices().then((data) => {
      if (data && data.length > 0) {
        setServicesList(data);
      }
    });
  }, []);

  const stats = [
    { value: `10+`, label: 'Agency Services' },
    { value: '300+', label: 'Events Delivered' },
    { value: '100+', label: 'Clients' },
    { value: '12', label: 'Years of Excellence' },
  ];

  return (
    <main className="bg-[#0F172A] text-white min-h-screen font-sans overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] pt-28 md:pt-36 pb-16 md:pb-24 text-center overflow-hidden">
        {/* Glow backdrop blobs */}
        <div
          aria-hidden
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-white/[0.14] to-transparent pointer-events-none blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-radial from-[#FFB800]/[0.08] to-transparent pointer-events-none blur-2xl"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GoldEyebrow text="Our Capabilities" />

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-5">
              Comprehensive Event{' '}
              <span className="text-[#FFB800]">Services</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              From executive boardroom symposiums to 50,000+ attendee stadium productions,
              Virtue IN delivers full-throttle event engineering with unparalleled stagecraft,
              acoustics, and precision logistics.
            </p>

            {/* Stat Row */}
            <div className="flex justify-center flex-wrap gap-8 sm:gap-14">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-3xl sm:text-4xl md:text-5xl font-black leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #FFB800, #ffd76b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID (ALL 15 CARDS VISIBLE IMMEDIATELY) ──────────────────── */}
      <section className="bg-[#0F172A] py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {servicesList.map((svc, i) => (
              <ModernServiceCard
                key={svc.id || svc.num || i}
                service={svc}
                accentColor={ACCENT_CYCLE[i % ACCENT_CYCLE.length]}
                index={i}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW WE WORK (PROCESS) ────────────────────────────────────────────── */}
      <section className="bg-[#1E293B]/70 border-y border-white/[0.06] py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <GoldEyebrow text="Execution Methodology" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              How We Bring Your Vision To{' '}
              <span className="text-[#FFB800]">Life</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard key={step.num} step={step} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-20 px-6 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-radial from-white/[0.12] to-transparent pointer-events-none blur-3xl"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GoldEyebrow text="Direct Consultation" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Ready to produce your <span className="text-[#FFB800]">next landmark event?</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Connect directly with our Lead Event Producers to discuss creative concepts,
              venue selection, audio-visual technicals, and turnkey delivery.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-white to-slate-200 text-slate-900 font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_45px_rgba(255,255,255,0.55)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span>Plan Your Event</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
