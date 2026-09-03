"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ExternalLink, ThumbsUp, Quote } from "lucide-react";
import Link from "next/link";

/* ─── Official Google "G" Icon ────────────────────────────────────────── */
export function GoogleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Google Reviews Data ─────────────────────────────────────────────── */
interface GoogleReviewItem {
  id: number;
  name: string;
  role: string;
  category: "all" | "corporate" | "launch" | "gala";
  rating: number;
  date: string;
  text: string;
  avatarColor: string;
  likes: number;
  verified: boolean;
}

const reviewsData: GoogleReviewItem[] = [
  {
    id: 1,
    name: "Hydra Specma",
    role: "Factory Inauguration & Facility Launch",
    category: "launch",
    rating: 5,
    date: "2 months ago",
    text: "We had our factory inauguration executed by Virtue IN and we are extremely satisfied. We experienced a very smooth, well-coordinated, and proactive on-ground team. They handled VIP guest hospitality, audio-visual rigging, and stagecraft flawlessly. We will certainly have more collaborations with them in the future!",
    avatarColor: "#2563EB",
    likes: 18,
    verified: true,
  },
  {
    id: 2,
    name: "Audi Chennai / BNI Futurz",
    role: "Automotive Leadership Conclave",
    category: "corporate",
    rating: 5,
    date: "3 months ago",
    text: "Spectacular execution by Sathish and the Virtue IN crew for our BNI Futurz summit at Audi Chennai. The corporate staging, high-definition LED backdrops, acoustic clarity, and VIP protocols were world-class. Truly one of the best corporate event management agencies in South India.",
    avatarColor: "#D97706",
    likes: 24,
    verified: true,
  },
  {
    id: 3,
    name: "TVS Emerald",
    role: "Peninsula & Green Enclave Property Debut",
    category: "launch",
    rating: 5,
    date: "1 month ago",
    text: "Virtue IN made our flagship residential property unveiling truly unforgettable. Their attention to detail, interactive 3D customer pavilions, and creative stage direction exceeded all our sales targets and expectations. Flawless execution from initial renders to live show handover!",
    avatarColor: "#059669",
    likes: 31,
    verified: true,
  },
  {
    id: 4,
    name: "BNP Paribas",
    role: "Rocktober Annual Gala @ The Leela Palace",
    category: "gala",
    rating: 5,
    date: "4 months ago",
    text: "Flawless end-to-end management of our annual gala at The Leela Palace. From the customized stage sets and live jazz orchestra to delegate registration and award presentations, every minute cue went off without a hitch. Exceptional professionalism.",
    avatarColor: "#7C3AED",
    likes: 22,
    verified: true,
  },
  {
    id: 5,
    name: "Rotary Club of Madras West",
    role: "Installation Ceremony @ ITC Grand Chola",
    category: "corporate",
    rating: 5,
    date: "5 months ago",
    text: "Organizing an installation ceremony for 1,200+ dignitaries and VIP guests is a monumental challenge. Virtue IN handled multi-camera live telecasts, presidential banquet arrangements, and protocol escorting seamlessly. Highly recommended!",
    avatarColor: "#DC2626",
    likes: 19,
    verified: true,
  },
  {
    id: 6,
    name: "Radiant Dental Care",
    role: "Annual Coastal Retreat @ Taj Fisherman's Cove",
    category: "gala",
    rating: 5,
    date: "2 months ago",
    text: "Our team day-out and annual retreat was planned to perfection by Virtue IN. The bespoke beach challenges, evening acoustic setup, and sunset dinner arrangements gave our 200+ employees memories for a lifetime. Outstanding work!",
    avatarColor: "#0891B2",
    likes: 15,
    verified: true,
  },
];

export function GoogleReviewsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "corporate" | "launch" | "gala">("all");
  const [likedReviews, setLikedReviews] = useState<Record<number, boolean>>({});

  const filteredReviews = reviewsData.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const toggleLike = (id: number) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-28 bg-[#0F172A] relative overflow-hidden z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4285F4]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-[#FFB800]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header with Official Google Badge ──────────────── */}
        <div className="flex flex-col items-center text-center mb-14">
          
          {/* Google Verified Rating Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-xl"
          >
            <GoogleIcon size={22} />
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-sm tracking-wide">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={13} className="fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-xs font-semibold text-gray-300">
              Verified Google Reviews
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4"
          >
            Hear It Straight from{" "}
            <span className="text-[#FFB800]">Our Clients</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Real feedback from enterprise leaders, corporate heads, and event committees who trusted Virtue IN with their flagship events.
          </motion.p>

          {/* Filter Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-8 flex-wrap"
          >
            {[
              { key: "all", label: "All Reviews" },
              { key: "corporate", label: "Corporate Conclaves" },
              { key: "launch", label: "Product Launches" },
              { key: "gala", label: "Annual Galas & Retreats" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-[#FFB800] text-[#0F172A] shadow-[0_0_20px_rgba(255,184,0,0.4)]"
                    : "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Reviews Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((r, i) => {
              const isLiked = likedReviews[r.id];
              const likeCount = r.likes + (isLiked ? 1 : 0);

              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group relative bg-[#1E293B] rounded-3xl border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#FFB800]/40 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.6)] transition-all duration-400 overflow-hidden"
                >
                  {/* Subtle top card glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header of review: Reviewer & Google Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-md shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${r.avatarColor}, ${r.avatarColor}99)`,
                          }}
                        >
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-white font-black text-sm group-hover:text-[#FFB800] transition-colors">
                              {r.name}
                            </h4>
                            {r.verified && (
                              <CheckCircle2 size={14} className="text-[#34A853] shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-400 text-xs font-medium truncate max-w-[170px]">
                            {r.role}
                          </p>
                        </div>
                      </div>

                      {/* Google G icon badge */}
                      <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] shrink-0" title="Verified Google Review">
                        <GoogleIcon size={18} />
                      </div>
                    </div>

                    {/* Stars + Date */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex gap-1">
                        {[...Array(r.rating)].map((_, idx) => (
                          <Star key={idx} size={14} className="fill-[#FFB800] text-[#FFB800]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {r.date}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-normal">
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </div>

                  {/* Footer: Google Verified Tag + Helpful counter */}
                  <div className="border-t border-white/[0.06] pt-4 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold">
                      <GoogleIcon size={14} />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        Google Review
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLike(r.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isLiked
                          ? "bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30"
                          : "bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp size={12} className={isLiked ? "fill-[#FFB800]" : ""} />
                      <span>{likeCount}</span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Bottom Callout: View on Google & Review Us ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
              <GoogleIcon size={26} />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                Had an experience with Virtue IN?
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                Your feedback helps corporate leaders make informed event decisions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/15"
            >
              <GoogleIcon size={16} />
              <span>Review Us on Google</span>
              <ExternalLink size={13} className="text-gray-400" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] hover:scale-105 text-[#0F172A] font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Plan Your Event</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
