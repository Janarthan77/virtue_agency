"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";
import ShareFeedbackModal from "./ShareFeedbackModal";
import { fetchLiveReviews } from "@/lib/api";

/* ─── Client Reviews Data ─────────────────────────────────────────────── */
export interface ClientReviewItem {
  id: number;
  name: string;
  role: string;
  category: "all" | "corporate" | "launch" | "gala";
  rating: number;
  date: string;
  text: string;
  avatarColor: string;
  likes?: number;
  verified: boolean;
}

export function ClientReviewsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "corporate" | "launch" | "gala">("all");
  const [allReviews, setAllReviews] = useState<ClientReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      try {
        const live = await fetchLiveReviews();
        if (live && live.length > 0) {
          const formatted: ClientReviewItem[] = live.map((r, idx) => ({
            id: typeof r.id === "number" ? r.id : idx + 1,
            name: r.name,
            role: r.role || "Corporate Client",
            category: (r.category as any) || "corporate",
            rating: Number(r.rating) || 5,
            date: r.created_at
              ? new Date(r.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "Verified Review",
            text: r.text,
            avatarColor:
              r.avatar_color ||
              ["#2563EB", "#D97706", "#059669", "#7C3AED", "#DC2626", "#0891B2"][idx % 6],
            verified: true,
          }));
          setAllReviews(formatted);
        } else {
          setAllReviews([]);
        }
      } catch (e) {
        console.warn("Error fetching reviews from database:", e);
        setAllReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

  const filteredReviews = allReviews.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / allReviews.length).toFixed(1)
      : "5.0";

  return (
    <section id="reviews" className="py-28 bg-[#0F172A] relative overflow-hidden z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFB800]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-[#FFB800]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header ────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-14">

          {/* Verified Rating Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-xl"
          >
            <div className="w-6 h-6 rounded-full bg-[#FFB800]/15 flex items-center justify-center text-[#FFB800]">
              <Star size={13} className="fill-[#FFB800] text-[#FFB800]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-sm tracking-wide">{avgRating}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={13} className="fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-xs font-semibold text-gray-300">
              {allReviews.length > 0 ? `${allReviews.length} Verified Client Reviews` : "Verified Client Reviews"}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4"
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

          {/* Filter Categories + Write Review Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2.5 mt-8 flex-wrap"
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
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${activeTab === tab.key
                  ? "bg-[#FFB800] text-[#0F172A] shadow-[0_0_20px_rgba(255,184,0,0.4)]"
                  : "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Separate button to write feedback */}
            <button
              onClick={() => setFeedbackModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#FFB800]/15 hover:bg-[#FFB800]/25 text-[#FFB800] border border-[#FFB800]/30 hover:border-[#FFB800]/50 transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Quote size={12} className="text-[#FFB800]" />
              <span>Write a Review</span>
            </button>
          </motion.div>
        </div>

        {/* ── Reviews Grid / Loading / Empty State ─────────────────────── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#1E293B]/60 rounded-3xl border border-white/[0.06] p-7 animate-pulse h-64 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2 my-4">
                  <div className="h-3 bg-white/10 rounded w-full" />
                  <div className="h-3 bg-white/10 rounded w-4/5" />
                  <div className="h-3 bg-white/10 rounded w-2/3" />
                </div>
                <div className="h-4 bg-white/5 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-16 px-6 rounded-3xl bg-[#1E293B]/40 border border-white/10 text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] flex items-center justify-center mb-4 shadow-lg">
              <Quote size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Be the First to Share Your Experience</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              We value genuine feedback from enterprise leaders and organizations we serve. Share your testimonial with Virtue IN Agency.
            </p>
            <button
              type="button"
              onClick={() => setFeedbackModalOpen(true)}
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FFB800] to-[#E5A700] hover:scale-105 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Quote size={13} />
              <span>Write a Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((r, i) => (
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
                    {/* Header of review: Reviewer & Quote Badge */}
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
                              <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-400 text-xs font-medium truncate max-w-[170px]">
                            {r.role}
                          </p>
                        </div>
                      </div>

                      {/* Quote icon badge */}
                      <div className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#FFB800]/80 group-hover:text-[#FFB800] group-hover:border-[#FFB800]/30 transition-all shrink-0" title="Verified Review">
                        <Quote size={16} />
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

                  {/* Footer: Verified Feedback Tag & Category Badge */}
                  <div className="border-t border-white/[0.06] pt-4 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                      <CheckCircle2 size={13} className="text-[#10B981]" />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        Verified Client Review
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#FFB800]/90 bg-[#FFB800]/10 px-2.5 py-1 rounded-lg border border-[#FFB800]/20">
                      {r.category === "corporate" ? "Corporate" : r.category === "launch" ? "Launch" : r.category === "gala" ? "Gala" : "Verified"}
                    </span>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Dedicated Share Feedback Modal */}
      <ShareFeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onFeedbackSubmitted={(newReview) => {
          setAllReviews((prev) => [newReview, ...prev]);
        }}
      />
    </section>
  );
}

// Backward-compatibility export
export { ClientReviewsSection as GoogleReviewsSection };
