"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { CategorySliderSection, CategorySlideItem } from "./CategorySliderSection";
import { BookOpen, ChevronDown } from "lucide-react";

/* ─── 7 Portions Data (3 Images / Slides Each) ────────────────────────── */

const concertsFestivalsSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
    tag: "Concerts & Festivals",
    title: "Electrifying Coastal",
    accent: "Music Festivals",
    subtitle: "High-energy beachfront stages, international DJ lineups, line-array acoustics, and seaside laser pyros crafted for massive crowds.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-4.webp",
    tag: "Live Concert Arenas",
    title: "Thunderous Stadium",
    accent: "Rock Music Stages",
    subtitle: "Heavy-duty truss stage rigging, stadium-grade acoustics, and high-octane rock performances uniting thousands of music enthusiasts.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-5.webp",
    tag: "Midnight Galas",
    title: "Spectacular Visual",
    accent: "Pyrotechnic Spectacles",
    subtitle: "Synchronized laser illumination, intelligent stage lighting arrays, and midnight countdown pyrotechnics delivering unforgettable nights.",
  },
];

const ipEventsSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
    tag: "Intellectual Property",
    title: "Curating Original",
    accent: "Signature Event IPs",
    subtitle: "Proprietary intellectual property formats conceptualized, owned, and produced by Virtue IN for sustained brand visibility and cultural impact.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Eat%20Pray%20Love%20-%20SPP%20Gardens/image-1.webp",
    tag: "Lifestyle & Culture",
    title: "Eat Pray Love",
    accent: "Curated Lifestyle Festivals",
    subtitle: "Flagship experiential lifestyle property blending artisan culinary stalls, live acoustic music, and wellness workshops at SPP Gardens.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp",
    tag: "Fashion Showcase",
    title: "Regional Talent",
    accent: "National Runway IP",
    subtitle: "Over 2,500 attendees, celebrity jury panels, 40-foot illuminated catwalks, and multi-channel television and digital broadcast syndication.",
  },
];

const corporateConferencesSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    tag: "Corporate Conferences",
    title: "Precision-Engineered",
    accent: "Leadership Summits",
    subtitle: "Executive business conclaves, multi-speaker symposiums, and high-stakes networking conferences designed with state-of-the-art staging.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-5.webp",
    tag: "Broadcast Conclaves",
    title: "Televised National",
    accent: "Media Conclaves",
    subtitle: "Broadcast-ready stage production, multi-camera live feeds, acoustic isolation, and VIP protocol coordination for high-profile summits.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
    tag: "MICE & Conventions",
    title: "Global Industry",
    accent: "Knowledge Conventions",
    subtitle: "Multi-track breakout rooms, live digital delegate polling, bespoke conference kits, and seamless end-to-end delegate concierge.",
  },
];

const annualGalaSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    tag: "Annual Gala Events",
    title: "Opulent Corporate",
    accent: "Ballroom Gala Nights",
    subtitle: "Luxury 5-star grand ballroom setups at The Leela Palace featuring crystal illumination, live jazz bands, and red-carpet experiences.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    tag: "Presidential Galas",
    title: "Prestigious Dignitary",
    accent: "Installation Ceremonies",
    subtitle: "Honoring leadership milestones with presidential stagecraft, tailored banquet tables, and 1,200+ VIP attendees at ITC Grand Chola.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-7.webp",
    tag: "Milestone Celebrations",
    title: "Unrivaled Glamour",
    accent: "Annual Award Nights",
    subtitle: "Rewarding employees and global leadership teams with world-class entertainment, custom trophies, and gourmet banqueting.",
  },
];

const stallFabricationSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-1.webp",
    tag: "Stall Fabrication",
    title: "Bespoke Exhibition",
    accent: "Custom Pavilions",
    subtitle: "Custom-engineered 3D metal, acrylic, and wood exhibition stalls that draw massive footfall and command attention on expo floors.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-5.webp",
    tag: "Mall Activations",
    title: "High-Impact Retail",
    accent: "Display Stalls & Kiosks",
    subtitle: "Precision carpentry and illuminated signage structures installed in prime shopping mall atriums to maximize customer conversions.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-7.webp",
    tag: "Trade Show Booths",
    title: "Turnkey Trade Show",
    accent: "Structural Engineering",
    subtitle: "From 3D architectural renders to turnkey overnight fabrication, electrical rigging, and on-site event handover.",
  },
];

const productLaunchesSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    tag: "Product Launches",
    title: "Dramatically Engineered",
    accent: "Product Reveals",
    subtitle: "Unveiling flagship residential projects and automotive flagships through immersive projection, kinetic staging, and theatrical timing.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp",
    tag: "Experiential Launches",
    title: "Interactive 3D Walkthrough",
    accent: "Launch Pavilions",
    subtitle: "Transforming product unveilings into high-converting investor experiences with touchscreen kiosks and illuminated scale models.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-3.webp",
    tag: "Automotive Reveals",
    title: "Captivating Audiences",
    accent: "Dominating Markets",
    subtitle: "High-energy vehicle unveil ceremonies with synchronized sound design, smoke effects, and direct media influencer engagement.",
  },
];

const dayOutingsSocialSlides: CategorySlideItem[] = [
  {
    id: 1,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    tag: "Day Outing & Retreats",
    title: "Rejuvenating Beachside",
    accent: "Corporate Day Outs",
    subtitle: "Energizing team escapes at Taj Fisherman's Cove featuring curated team-building games, beachside cabanas, live DJ sets, and sunset dinners.",
  },
  {
    id: 2,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Welona%20Healthcare%20Family%20Day/image-1.webp",
    tag: "Family Days & R&R",
    title: "Joyful Employee",
    accent: "Family Celebrations",
    subtitle: "Curating multi-generational engagement zones, comedy shows, interactive stage games, and rewards recognitions at Illusion.",
  },
  {
    id: 3,
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
    tag: "Social & Charity Events",
    title: "Inspiring Impactful",
    accent: "Community Marathons",
    subtitle: "Full-scale marathon logistics, RFID timing gates, route hydration stations, and medal ceremonies across Besant Nagar Promenade.",
  },
];

/* ─── 7 Portions Configuration ───────────────────────────────────────── */
const portions = [
  {
    id: "portion-concerts-festivals",
    num: "02",
    title: "Concerts & Festivals",
    accentColor: "#FFB800",
    slides: concertsFestivalsSlides,
  },
  {
    id: "portion-ip-events",
    num: "03",
    title: "Intellectual Property - Events",
    accentColor: "#FFB800",
    slides: ipEventsSlides,
  },
  {
    id: "portion-corporate-conferences",
    num: "04",
    title: "Corporate Conferences",
    accentColor: "#FFB800",
    slides: corporateConferencesSlides,
  },
  {
    id: "portion-annual-galas",
    num: "05",
    title: "Annual Gala Events",
    accentColor: "#FFB800",
    slides: annualGalaSlides,
  },
  {
    id: "portion-stall-fabrication",
    num: "06",
    title: "Stall Fabrication",
    accentColor: "#FFB800",
    slides: stallFabricationSlides,
  },
  {
    id: "portion-product-launches",
    num: "07",
    title: "Product Launches",
    accentColor: "#FFB800",
    slides: productLaunchesSlides,
  },
  {
    id: "portion-day-outings",
    num: "08",
    title: "Day Outing & Social Events",
    accentColor: "#FFB800",
    slides: dayOutingsSocialSlides,
  },
];

/* ─── Individual Full-Window Book Page Layer ──────────────────────────── */
function BookPageLayer({
  portion,
  index,
  total,
  scrollYProgress,
}: {
  portion: (typeof portions)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isLast = index === total - 1;

  // Each page transition is smoothly spaced across scroll range
  const segment = 1 / total;
  const startTurn = (index + 0.15) * segment;
  const endTurn = (index + 0.88) * segment;

  // Page turns leftward along spine (0deg to -95deg), strictly clamped
  const rotateY = useTransform(
    scrollYProgress,
    [startTurn, endTurn],
    [0, -95],
    { clamp: true }
  );

  // Smooth fade as it completes the turn, strictly clamped
  const opacity = useTransform(
    scrollYProgress,
    [startTurn, endTurn - segment * 0.15, endTurn],
    [1, 0.9, 0],
    { clamp: true }
  );

  // Dynamic spine shadow sweeping across the bending page, strictly clamped
  const shadowOpacity = useTransform(
    scrollYProgress,
    [startTurn, endTurn - segment * 0.2],
    [0, 0.9],
    { clamp: true }
  );

  // Pointer events: only active when on top and not turned away
  const pointerEvents = useTransform(scrollYProgress, (v) => {
    if (index > 0 && v < index * segment) return "none";
    if (!isLast && v >= endTurn) return "none";
    return "auto";
  });

  // Display: hide once turned to prevent any invisible blocking
  const display = useTransform(scrollYProgress, (v) => {
    if (!isLast && v >= endTurn) return "none";
    return "block";
  });

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: total - index, // Page 0 is on top (70), Page 1 is behind it (60)...
        rotateY: isLast ? 0 : rotateY,
        opacity: isLast ? 1 : opacity,
        display: isLast ? "block" : display,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        pointerEvents,
      }}
    >
      {/* ── Book Spine Crease (Left Edge Binding) ─────────── */}
      <div className="absolute left-0 top-0 bottom-0 w-3 z-40 bg-gradient-to-r from-[#FFB800]/50 via-[#FFB800]/20 to-transparent border-r border-[#FFB800]/40 pointer-events-none shadow-[4px_0_18px_rgba(0,0,0,0.95)]" />

      {/* ── Dynamic Page-Turn Lighting & Shadow ───────────── */}
      {!isLast && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            opacity: shadowOpacity,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.88) 100%)",
          }}
        />
      )}

      {/* ── The 3-Image Slider for this Book Page (100% Full Window) ─── */}
      <CategorySliderSection
        id={portion.id}
        portionNumber={portion.num}
        portionTitle={portion.title}
        accentColor={portion.accentColor}
        slides={portion.slides}
        pageIndex={index + 1}
        totalPages={total}
      />
    </motion.div>
  );
}

/* ─── Main Showcase: 100% Full-Window Pinned Book Stack ───────────────── */
export function CategorySlidersShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll through the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: `${portions.length * 110}vh` }}
    >
      {/* ── Single Pinned Sticky Viewport (100% Full Window) ─────────── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: "2500px" }}
      >
        {/* ── All 7 Pages Stacked from Behind (absolute inset-0, full window) ─ */}
        {portions.map((portion, index) => (
          <BookPageLayer
            key={portion.id}
            portion={portion}
            index={index}
            total={portions.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* ── Subtle Scroll Guide Indicator ────────────────────────────── */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/70 text-[11px] font-semibold tracking-wider">
          <BookOpen size={13} className="text-[#FFB800]" />
          <span>Scroll to turn page</span>
          <ChevronDown size={14} className="text-[#FFB800] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
