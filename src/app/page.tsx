"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Briefcase, Rocket, GlassWater, Star, ChevronLeft, ChevronRight, CalendarDays, Settings, Mic, ClipboardCheck, MapPin, Building, Palette, Music, Hammer, Store, Megaphone, Activity, Globe, PenTool, Radio } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GallerySection } from "@/components/GallerySection";
import { VenuesSection } from "@/components/VenuesSection";

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
        transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}>
      {children}
    </div>
  );
}

/* ─── Brand Card ─────────────────────────────────────────────── */
function BrandCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 w-48 h-24 bg-[#1E293B] rounded-2xl border border-white/10 shadow-sm flex items-center justify-center px-5 cursor-pointer group"
      style={{ transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(108,62,244,0.15)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,62,244,0.4)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      <span className="text-gray-400 group-hover:text-[#FFB800] font-bold text-[11px] uppercase tracking-[0.15em] text-center leading-tight transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

/* ─── Portfolio Card ─────────────────────────────────────────── */
function PortfolioCard({ project, idx }: { project: typeof projects[0]; idx: number }) {
  return (
    <Reveal delay={idx * 0.1}>
      <Link href="/portfolio"
        className="group flex flex-col bg-[#1E293B] rounded-2xl overflow-hidden shadow-sm border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer h-full">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src={project.img}
            alt={project.title}
            fill
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
            style={{ background: "rgba(108,62,244,0.12)", color: "#FFB800", border: "1px solid rgba(108,62,244,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C3EF4]" />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    const init = async () => {
      const gsapMod = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapMod.registerPlugin(ScrollTrigger);

      ctx = gsapMod.context(() => {
        gsapMod.fromTo(".service-card",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }, containerRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="bg-[#0F172A] relative overflow-hidden pt-32 pb-32">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Our Services
            </h2>
          </Reveal>

          {/* Slider Navigation */}
          <Reveal delay={0.2}>
            <div className="flex gap-4">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-white/20 bg-[#1E293B] flex items-center justify-center text-gray-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-white/20 bg-[#1E293B] flex items-center justify-center text-gray-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Inject style for Webkit scrollbar hiding inline */}
          <style dangerouslySetInnerHTML={{
            __html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}} />

          {Array(10).fill(servicesData).flat().map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="service-card shrink-0 w-[85vw] sm:w-[380px] lg:w-[400px] snap-center group relative bg-[#1E293B] rounded-[2rem] overflow-hidden cursor-pointer flex flex-col"
                style={{
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.03)"
                }}>

                {/* Top Image */}
                <div className="relative w-full h-56 overflow-hidden shrink-0">
                  <Image src={s.image} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-0 right-8 w-14 h-14 bg-[#1E293B] rounded-t-2xl flex items-center justify-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Icon size={24} className="text-[#FFB800]" />
                  </div>
                </div>

                <div className="relative z-10 flex flex-col p-8 pt-10 flex-grow bg-[#1E293B]">
                  <div className="mb-2">
                    <span className="text-[#FFB800] font-black text-xs tracking-widest">{s.num}</span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-[#FFB800] transition-colors duration-500">
                    {s.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6C3EF4, #9D72FF)", boxShadow: "0 10px 30px -10px rgba(108, 62, 244, 0.4)" }}>
            Plan Your Event
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─────────────────────────────────────── */
function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    const init = async () => {
      const gsapMod = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapMod.registerPlugin(ScrollTrigger);

      ctx = gsapMod.context(() => {
        gsapMod.fromTo(".testimonial-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }, containerRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#1E293B] relative z-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex justify-center mb-6">
              <div className="flex gap-1.5 opacity-20">
                <div className="w-3 h-10 bg-[#6C3EF4] transform skew-x-12" />
                <div className="w-3 h-10 bg-[#6C3EF4] transform skew-x-12" />
              </div>
            </div>
            <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase mb-4">Client Stories</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Hear it straight from our clients
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              text: "We had the factory inauguration done by Virtue IN and we are very satisfied. We experienced a very smooth and well coordinated team. We will have more interactions with them in the future.",
              client: "Hydra Specma"
            },
            {
              text: "Thanks for your extended support on our special day. Thanks and done a great job. Your team managed every detail flawlessly, allowing us to focus on our guests.",
              client: "Corporate Partner"
            }
          ].map((testimonial, i) => (
            <div key={i} className="testimonial-card group bg-[#1E293B] rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/10 overflow-hidden flex flex-col md:flex-row h-full transition-transform duration-500 hover:-translate-y-2 cursor-pointer">
              {/* Left Green Accent */}
              <div className="w-full md:w-24 bg-[#6C3EF4] shrink-0 relative overflow-hidden flex flex-col items-center justify-start p-6 md:pt-10 transition-colors duration-500 group-hover:bg-gray-900">
                <span className="text-7xl font-serif text-white/30 leading-none group-hover:text-[#FFB800]/50 transition-colors duration-500">"</span>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col flex-grow">
                <h4 className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 mb-6 group-hover:text-[#FFB800] transition-colors">Client Testimonial</h4>

                {/* Stars */}
                <div className="flex gap-1.5 mb-8">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={18} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 flex-grow font-medium">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center group-hover:bg-[#6C3EF4]/10 transition-colors">
                    <span className="font-black text-gray-400 group-hover:text-[#FFB800]">{testimonial.client.charAt(0)}</span>
                  </div>
                  <span className="font-black text-white text-lg">{testimonial.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Capabilities Section ─────────────────────────────────────── */
const capabilitiesList = [
  "END TO END EVENT MANAGEMENT",
  "END TO END EVENT PRODUCTION",
  "CONFERENCE MANAGEMENT - MICE",
  "EVENT PLANNING - OPERATIONS & CONSULTING",
  "DESTINATION MANAGEMENT",
  "VENUE SOURCING",
  "DECOR HIRE, STYLING & THEMING",
  "ENTERTAINMENT & ARTIST MANAGEMENT",
  "CUSTOM BUILD SETUPS",
  "EXHIBITION - STALL FABRICATION",
  "SIGNAGE",
  "BTL ACTIVATIONS",
  "PUBLIC RELATIONS & MEDIA",
  "CREATIVE DESIGN & PRINT MEDIA DESIGNING",
  "ATL MANAGEMENT"
];

// function CapabilitiesSection() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     let ctx: any;
//     const init = async () => {
//       const gsapMod = (await import("gsap")).default;
//       const { ScrollTrigger } = await import("gsap/ScrollTrigger");
//       gsapMod.registerPlugin(ScrollTrigger);

//       ctx = gsapMod.context(() => {
//         gsapMod.fromTo(".capability-item",
//           { y: 30, opacity: 0, scale: 0.9 },
//           {
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             duration: 0.5,
//             stagger: 0.04,
//             ease: "back.out(1.2)",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top 80%",
//             }
//           }
//         );
//       }, containerRef);
//     };
//     init();
//     return () => ctx?.revert();
//   }, []);

//   return (
//     <section ref={containerRef} className="bg-[#0b1120] py-32 relative overflow-hidden">
//       {/* Decorative background gradients */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6C3EF4]/5 blur-[120px] rounded-full pointer-events-none" />

//       <div className="container mx-auto px-6 max-w-7xl relative z-10">
//         <div className="text-center mb-20">
//           <Reveal>
//             <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase mb-4">Our Expertise</p>
//             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
//               What Are We Best At
//             </h2>
//           </Reveal>
//         </div>

//         <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
//           {capabilitiesList.map((item, i) => (
//             <div key={i} className="capability-item group relative px-6 py-4 md:px-8 md:py-5 rounded-full border border-gray-800 bg-gray-900/40 backdrop-blur-md hover:border-[#FFB800]/50 hover:bg-[#6C3EF4]/10 hover:shadow-[0_0_30px_rgba(108,62,244,0.15)] hover:-translate-y-1 overflow-hidden transition-all duration-500 cursor-default">
//               {/* Subtle hover sweep effect */}
//               <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#FFB800]/10 to-transparent pointer-events-none" />

//               <span className="relative z-10 text-gray-400 text-xs md:text-sm font-bold tracking-[0.15em] group-hover:text-white transition-colors duration-300 uppercase">
//                 {item}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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

    </div>
  );
}
