"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
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
  Sparkles,
  Layers,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/HeroSlider";
import { CategorySlidersShowcase } from "@/components/CategorySlidersShowcase";
import { AboutSection } from "@/components/AboutSection";
import { StatsCounterSection } from "@/components/StatsCounterSection";
import { fetchLiveServices } from "@/lib/api";

const ProjectsSection = dynamic(() => import("@/components/ProjectsSection").then((m) => m.ProjectsSection), {
  loading: () => <div className="min-h-[400px] bg-[#0F172A]" />,
});
const GallerySection = dynamic(() => import("@/components/GallerySection").then((m) => m.GallerySection), {
  loading: () => <div className="min-h-[400px] bg-[#0B0F19]" />,
});
const ClientReviewsSection = dynamic(() => import("@/components/GoogleReviewsSection").then((m) => m.ClientReviewsSection), {
  loading: () => <div className="min-h-[400px] bg-[#0B0F19]" />,
});
const FAQSection = dynamic(() => import("@/components/FAQSection").then((m) => m.FAQSection), {
  loading: () => <div className="min-h-[300px] bg-[#0F172A]" />,
});

const ICON_MAP: Record<string, any> = {
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
  Sparkles,
  Layers,
  Camera,
  Video,
  Award,
  Shield,
  Zap,
};


/* ─── Brand data ─────────────────────────────────────────────── */
const R2_BRAND = "https://pub-e796496b65134e82b311969a354b7898.r2.dev/brand_logo";
const row1Brands = [
  { name: "Phoenix Marketcity", logo: `${R2_BRAND}/brand_logo_1.png` },
  { name: "Audi Chennai", logo: `${R2_BRAND}/brand_logo_2.png` },
  { name: "BNP Paribas", logo: `${R2_BRAND}/brand_logo_3.jpg` },
  { name: "TVS Emerald", logo: `${R2_BRAND}/brand_logo_4.jpg` },
  { name: "Lanson Toyota", logo: `${R2_BRAND}/brand_logo_5.jpg` },
  { name: "Vivo", logo: `${R2_BRAND}/brand_logo_6.jpg` },
  { name: "Marina Harley-Davidson", logo: `${R2_BRAND}/brand_logo_7.png` },
  { name: "Radisson Blu", logo: `${R2_BRAND}/brand_logo_8.jpg` },
];
const row2Brands = [
  { name: "HOG Marina Chapter", logo: `${R2_BRAND}/brand_logo_9.jpg` },
  { name: "Radiant Dental Care", logo: `${R2_BRAND}/brand_logo_10.jpg` },
  { name: "VR Chennai", logo: `${R2_BRAND}/brand_logo_11.jpg` },
  { name: "Welona", logo: `${R2_BRAND}/brand_logo_12.jpg` },
  { name: "Venus Motor Cycle", logo: `${R2_BRAND}/brand_logo_13.png` },
  { name: "Johnnie Walker", logo: `${R2_BRAND}/brand_logo_14.jpg` },
  { name: "Alten", logo: `${R2_BRAND}/brand_logo_15.jpeg` },
  { name: "BNP Paribas", logo: `${R2_BRAND}/brand_logo_16.png` },
];

/* ─── Animation Wrapper ──────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}
      className={className}
      style={{
        transform: isInView ? "none" : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transition: `opacity 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s, transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        willChange: "transform, opacity",
      }}>
      {children}
    </div>
  );
}

/* ─── Brand Card ─────────────────────────────────────────────── */
function BrandCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 w-48 h-24 bg-[#1E293B] rounded-2xl border border-white/10 shadow-sm flex items-center justify-center px-4 cursor-pointer group hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:border-white/40 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300">
      <div className="relative w-full h-14 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="192px"
          className="object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
}

/* ─── Services Section with Dynamic API Data ───────────────────────────────── */
function ServicesSection() {
  const [liveList, setLiveList] = useState<any[]>([]);

  useEffect(() => {
    fetchLiveServices().then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map((item, idx) => ({
          num: item.num || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
          title: item.title,
          desc: item.description,
          icon: (item.icon && (ICON_MAP as any)[item.icon]) ? (ICON_MAP as any)[item.icon] : Sparkles,
          image: item.image || "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-5.webp",
        }));
        setLiveList(mapped);
      }
    });
  }, []);

  const displayedServices = liveList.slice(0, 6);

  return (
    <section id="services" className="bg-[#0F172A] relative pt-32 pb-32">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12 relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 relative">
          {/* Left Side: Sticky Content */}
          <div className="lg:w-1/3 flex flex-col justify-start relative z-10">
            {/* Fixed sticky positioning */}
            <div className="lg:sticky lg:top-[30vh]">
              <Reveal>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-[2px] bg-[#FFB800]"></span>
                  <p className="text-gray-400 font-semibold text-sm tracking-[0.2em] uppercase">
                    Comprehensive Solutions
                  </p>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-6">
                  From concept to execution — <br />
                  <span className="text-[#FFB800]">managed by experts.</span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
                  Virtue IN Agency handles every detail of your corporate event with dedicated expertise. We manage the complexity so you can focus on your guests and business.
                </p>
                <Link href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #FFFFFF, #E2E8F0)", boxShadow: "0 10px 30px -10px rgba(255,255,255, 0.4)" }}>
                  See All Services <ArrowRight size={18} />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Right Side: Scrolling Cards */}
          <div className="lg:w-2/3 flex flex-col gap-12 relative mt-12 lg:mt-0 z-20">
            {displayedServices.map((s, i) => {
              const Icon = s.icon || Sparkles;
              return (
                <Link
                  key={i}
                  href='/services'
                  className="group relative bg-[#1E293B] rounded-[2rem] overflow-hidden cursor-pointer flex flex-col shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Side */}
                    <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden shrink-0">
                      <Image src={s.image} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute top-6 left-6 w-12 h-12 bg-[#1E293B] rounded-xl flex items-center justify-center shadow-lg">
                        <Icon size={20} className="text-[#FFB800]" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="relative z-10 flex flex-col p-8 md:p-12 flex-grow bg-[#1E293B]">
                      <div className="mb-4">
                        <span className="text-[#FFB800] font-black text-xs tracking-widest bg-[#FFB800]/10 px-3 py-1 rounded-full">{s.num}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-[#FFB800] transition-colors duration-500">
                        {s.title}
                      </h3>
                      <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#1E293B]">

      {/* 1 · HERO (10 Big Events Shuffle Picture) */}
      <HeroSlider />

      {/* 2-8 · THE 7 EVENT PORTIONS (Category Sliders - 3 Images Each) */}
      <CategorySlidersShowcase />

      {/* STATS WITH ANIMATED COUNTER */}
      <StatsCounterSection />

      {/* 2 · ABOUT SECTION */}
      <AboutSection />

      {/* 5 · SERVICES */}
      <ServicesSection />

      {/* 3 · BRANDS MARQUEE */}
      <section className="py-20 bg-[#1E293B] overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-14 px-6">
          <Reveal>
            <p className="text-[#FFB800] font-bold text-xs tracking-[0.25em] uppercase mb-3">Trusted By</p>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Brands That <span className="text-[#FFB800]">Love</span> Virtue IN
            </h2>
          </Reveal>
        </div>

        {/* Row 1 — left */}
        <div className="relative mb-4" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)", maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
          <div className="flex overflow-hidden">
            <div className="flex gap-4 pl-4" style={{ animation: "marquee-left 35s linear infinite", minWidth: "max-content" }}>
              {[...row1Brands, ...row1Brands, ...row1Brands].map((b, i) => <BrandCard key={i} name={b.name} logo={b.logo} />)}
            </div>
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="relative" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)", maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
          <div className="flex overflow-hidden">
            <div className="flex gap-4 pl-4" style={{ animation: "marquee-right 35s linear infinite", minWidth: "max-content" }}>
              {[...row2Brands, ...row2Brands, ...row2Brands].map((b, i) => <BrandCard key={i} name={b.name} logo={b.logo} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · PROJECTS SECTION */}
      <ProjectsSection />

      {/* 4 · GALLERY SECTION */}
      <GallerySection />

      {/* 7 · CLIENT REVIEWS & TESTIMONIALS */}
      <ClientReviewsSection />

      {/* 8 · FAQ */}
      <FAQSection variant="home" />

    </div>
  );
}
