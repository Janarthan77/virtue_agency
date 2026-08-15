"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, CalendarDays, Settings, Mic, ClipboardCheck, MapPin, Building, Palette, Music, Hammer, Store, Megaphone, Activity, Globe, PenTool, Radio } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GallerySection } from "@/components/GallerySection";
import { VenuesSection } from "@/components/VenuesSection";
import { FAQSection } from "@/components/FAQSection";

/* ─── Brand data ─────────────────────────────────────────────── */
const row1Brands = [
  "Phoenix Marketcity", "Audi Chennai", "BNP Paribas", "TVS Emerald",
  "Lanson Toyota", "Vivo", "Marina Harley-Davidson", "Radisson Blu",
];
const row2Brands = [
  "HOG Marina Chapter", "Radiant Dental Care", "VR Chennai", "Welona",
  "Venus Motor Cycle", "Johnnie Walker", "Alten", "BNP Paribas",
];

/* ─── Portfolio data ─────────────────────────────────────────── */
const projects = [
  {
    title: "Rotary Club of Madras West",
    client: "President Installation 2026–27 @ ITC",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2026",
  },
  {
    title: "TVS Emerald – Home Debut",
    client: "Peninsula, Green Enclave & Atrium Launch",
    img: "/service_launch.png",
    badge: "PRODUCT RELEASE",
    year: "2026",
  },
  {
    title: "NeXHS Annual Foundation Day",
    client: "Next Generation Hybrid Systems",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2026",
  },
  {
    title: "JLL – Day Outing",
    client: "Jones Lang LaSalle (JLL)",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Audi Chennai Conference Meeting",
    client: "BNI B Region – Audi Chennai",
    img: "/service_launch.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "IIMM Conference – Spectrum 2024",
    client: "Indian Institute of Material Management",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "Radiant Raising Day 2023",
    client: "Radiant Dental Care – Employees Annual Day",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2023",
  },
  {
    title: "Radiant Raising Day 2024",
    client: "Radiant Dental Care – Day Outing & Annual Day",
    img: "/service_launch.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "10th Southern HOG Rally",
    client: "Harley-Davidson Marina Chapter",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2023",
  },
  {
    title: "Doordarshan Election Conclave",
    client: "Prasar Bharati",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2026",
  },
  {
    title: "NYE Beach Night 2025",
    client: "Fortune Beach Resort",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "BNP Paribas Annual Meet",
    client: "BNP Paribas",
    img: "/service_launch.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "Save a Child Marathon",
    client: "Saveetha Eco Pupil School – Ekam NGO",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Sema Pongal Themed Event @ VGP",
    client: "Round Table India – Area 7",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Middle Office Annual Bash",
    client: "BNP Paribas – Rocktober Evening",
    img: "/service_launch.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "Employees Day Outing",
    client: "Societe Generale",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Madarase Fashion Talent Hunt & Expo",
    client: "Phoenix Marketcity Chennai",
    img: "/hero_bg.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Annual Night Celebrations",
    client: "Bank of America IT Company",
    img: "/service_launch.png",
    badge: "CORPORATE",
    year: "2025",
  },
  {
    title: "Welona Family Day – R & R",
    client: "Welona Healthcare",
    img: "/service_conference.png",
    badge: "CORPORATE",
    year: "2024",
  },
  {
    title: "Harley Davidson Motorcycles Display",
    client: "Marina Harley-Davidson – Various Venues",
    img: "/hero_bg.png",
    badge: "PRODUCT RELEASE",
    year: "2024",
  },
  {
    title: "Toyota Hilux – Product Reveal",
    client: "Lanson Toyota",
    img: "/service_launch.png",
    badge: "PRODUCT RELEASE",
    year: "2024",
  },
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
function BrandCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 w-48 h-24 bg-[#1E293B] rounded-2xl border border-white/10 shadow-sm flex items-center justify-center px-5 cursor-pointer group hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:border-white/40 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300">
      <span className="text-gray-400 group-hover:text-[#FFB800] font-bold text-[11px] uppercase tracking-[0.15em] text-center leading-tight transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

/* ─── Portfolio Card ─────────────────────────────────────────── */
function PortfolioCard({ project, idx }: { project: typeof projects[0]; idx: number }) {
  return (
    <Reveal delay={Math.min(idx * 0.08, 0.4)}>
      <Link href="/portfolio"
        className="group flex flex-col bg-[#1E293B] rounded-2xl overflow-hidden shadow-sm border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer h-full">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle dark vignette at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

          {/* Year chip top-right */}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider">
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Badge */}
          <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3"
            style={{ background: "rgba(255,255,255,0.12)", color: "#FFB800", border: "1px solid rgba(255,255,255,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            {project.badge}
          </span>

          <h3 className="text-lg font-black text-white leading-snug mb-1 group-hover:text-[#FFB800] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs font-medium mb-4 flex-1">{project.client}</p>

          {/* View link */}
          <div className="flex items-center gap-2 text-[#FFB800] text-xs font-bold uppercase tracking-wider
            translate-x-0 group-hover:gap-3 transition-all duration-300">
            View Project <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

const servicesData = [
  {
    num: "01",
    title: "End to End Event Management",
    desc: "Comprehensive management from concept to execution for all types of events, ensuring a seamless experience.",
    bg: "#ffffff",
    icon: CalendarDays,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "02",
    title: "End to End Event Production",
    desc: "Full-scale technical and stage production, ensuring flawless audio, visual, and lighting experiences.",
    bg: "#ffffff",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "03",
    title: "Conference Management - MICE",
    desc: "Expert handling of Meetings, Incentives, Conferences, and Exhibitions for corporate excellence.",
    bg: "#ffffff",
    icon: Mic,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "04",
    title: "Event Planning - Operations",
    desc: "Strategic planning, logistics, and operational consulting to make your events seamless.",
    bg: "#ffffff",
    icon: ClipboardCheck,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "05",
    title: "Destination Management",
    desc: "Complete travel, logistics, and localized event planning across premier destinations.",
    bg: "#ffffff",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "06",
    title: "Venue Sourcing",
    desc: "Finding the perfect backdrop tailored to your event's scale, style, and unique requirements.",
    bg: "#ffffff",
    icon: Building,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "07",
    title: "Decor Hire & Styling",
    desc: "Creative set designs, gorgeous floral arrangements, and thematic styling for immersive environments.",
    bg: "#ffffff",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "08",
    title: "Entertainment & Artists",
    desc: "Curating top-tier talent, bands, speakers, and artists for captivating live performances.",
    bg: "#ffffff",
    icon: Music,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "09",
    title: "Custom Build Setups",
    desc: "Bespoke structural designs, custom staging, and immersive fabrications tailored to your vision.",
    bg: "#ffffff",
    icon: Hammer,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "10",
    title: "Exhibition - Stall Fabrication",
    desc: "Designing and building interactive and engaging exhibition stalls and corporate booths.",
    bg: "#ffffff",
    icon: Store,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "11",
    title: "Signage",
    desc: "High-quality, custom event signage and branding materials for impactful visibility.",
    bg: "#ffffff",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "12",
    title: "BTL Activations",
    desc: "Below-the-line marketing activations focused on direct, meaningful consumer engagement.",
    bg: "#ffffff",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "13",
    title: "Public Relations & Media",
    desc: "Strategic PR campaigns and comprehensive media management to amplify your event's reach.",
    bg: "#ffffff",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "14",
    title: "Creative Design & Print Media",
    desc: "Exceptional graphic design and printing services for all your event collaterals.",
    bg: "#ffffff",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "15",
    title: "ATL Management",
    desc: "Above-the-line mass media advertising and large-scale brand awareness campaigns.",
    bg: "#ffffff",
    icon: Radio,
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800"
  }
];

/* ─── Services Section with GSAP & Slider ───────────────────────────────── */
function ServicesSection() {
  const displayedServices = servicesData.slice(0, 6);

  return (
    <section className="bg-[#0F172A] relative pt-32 pb-32">
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
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
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
              const Icon = s.icon;
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

/* ─── Testimonials Section ─────────────────────────────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      text: "We had the factory inauguration done by Virtue IN and we are very satisfied. We experienced a very smooth and well coordinated team. We will have more interactions with them in the future.",
      client: "Hydra Specma",
      role: "Factory Inauguration",
      initial: "H",
      color: "#FFFFFF",
    },
    {
      text: "Thanks for your extended support on our special day. Thanks and done a great job. Your team managed every detail flawlessly, allowing us to focus on our guests.",
      client: "Corporate Partner",
      role: "Annual Day Event",
      initial: "C",
      color: "#FFB800",
    },
    {
      text: "Virtue IN made our product launch unforgettable. Their attention to detail and creative direction exceeded all our expectations. Truly a world-class event management team.",
      client: "TVS Emerald",
      role: "Product Launch",
      initial: "T",
      color: "#CBD5E1",
    },
  ];

  return (
    <section className="py-28 bg-[#0F172A] relative overflow-hidden z-20">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFFFFF]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#FFB800]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#FFB800]" />
              <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase">
                Client Stories
              </p>
              <span className="w-10 h-[2px] bg-[#FFB800]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Hear it straight from{" "}
              <span className="text-[#FFB800]">our clients</span>
            </h2>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="group relative bg-[#1E293B] rounded-2xl border border-white/[0.07] p-8 flex flex-col h-full hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] transition-all duration-400 cursor-pointer overflow-hidden">
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
                />

                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 shrink-0"
                  style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}
                >
                  <span className="text-2xl font-serif leading-none" style={{ color: t.color }}>&quot;</span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={15} className="fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-white/[0.07] pt-6 flex items-center gap-4 mt-auto">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-black text-white text-base"
                    style={{ background: `linear-gradient(135deg, ${t.color}cc, ${t.color}55)` }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{t.client}</p>
                    <p className="text-gray-500 text-xs font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#1E293B]">

      {/* 1 · HERO */}
      <HeroSlider />

      {/* 2 · ABOUT SECTION */}
      <AboutSection />

      {/* 5 · SERVICES */}
      <ServicesSection />

      {/* 3 · BRANDS MARQUEE */}
      <section className="py-20 bg-[#1E293B] overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-14 px-6">
          <Reveal>
            <p className="text-[#FFB800] font-bold text-xs tracking-[0.25em] uppercase mb-3">Trusted By</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Brands That <span className="text-[#FFB800]">Love</span> Virtue IN
            </h2>
          </Reveal>
        </div>

        {/* Row 1 — left */}
        <div className="relative mb-4" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)", maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
          <div className="flex overflow-hidden">
            <div className="flex gap-4 pl-4" style={{ animation: "marquee-left 35s linear infinite", minWidth: "max-content" }}>
              {[...row1Brands, ...row1Brands, ...row1Brands].map((b, i) => <BrandCard key={i} name={b} />)}
            </div>
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="relative" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)", maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}>
          <div className="flex overflow-hidden">
            <div className="flex gap-4 pl-4" style={{ animation: "marquee-right 35s linear infinite", minWidth: "max-content" }}>
              {[...row2Brands, ...row2Brands, ...row2Brands].map((b, i) => <BrandCard key={i} name={b} />)}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · PROJECTS SECTION */}
      <ProjectsSection />

      {/* 4 · GALLERY SECTION */}
      <GallerySection />

      {/* 6 · VENUES SECTION */}
      <VenuesSection />

      {/* 7 · TESTIMONIALS */}
      <TestimonialsSection />

      {/* 8 · FAQ */}
      <FAQSection variant="home" />

    </div>
  );
}
