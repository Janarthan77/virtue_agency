"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, CheckCircle2, Loader2, Send, Quote } from "lucide-react";
import { submitReview } from "@/lib/api";

interface ShareFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmitted?: (newReview: {
    id: number;
    name: string;
    role: string;
    category: "all" | "corporate" | "launch" | "gala";
    rating: number;
    date: string;
    text: string;
    avatarColor: string;
    verified: boolean;
  }) => void;
}

const RATING_LABELS: Record<number, string> = {
  5: "Exceptional — 5.0 / 5.0",
  4: "Very Good — 4.0 / 5.0",
  3: "Good / Satisfied — 3.0 / 5.0",
  2: "Fair — 2.0 / 5.0",
  1: "Needs Improvement — 1.0 / 5.0",
};

const AVATAR_COLORS = ["#2563EB", "#D97706", "#059669", "#7C3AED", "#DC2626", "#0891B2"];

export default function ShareFeedbackModal({
  isOpen,
  onClose,
  onFeedbackSubmitted,
}: ShareFeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"corporate" | "launch" | "gala">("corporate");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setRating(5);
    setHoverRating(0);
    setName("");
    setRole("");
    setCategory("corporate");
    setEmail("");
    setPhone("");
    setReviewText("");
    setIsSubmitting(false);
    setIsSuccess(false);
    setErrorMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your name or organization.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage("Please share a few words about your experience.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    try {
      const res = await submitReview({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || "+91 0000000000",
        role: role.trim() || "Corporate Client",
        category,
        rating,
        text: reviewText.trim(),
        avatar_color: randomColor,
      });

      if (!res.success && res.error) {
        throw new Error(res.error);
      }

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted({
          id: res.review?.id ? Number(res.review.id) || Date.now() : Date.now(),
          name: name.trim(),
          role: role.trim() || "Enterprise Client",
          category,
          rating,
          date: "Just now",
          text: reviewText.trim(),
          avatarColor: randomColor,
          verified: true,
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-lg bg-[#1E293B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top subtle golden glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {isSuccess ? (
            /* Success State */
            <div className="p-8 sm:p-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Thank You for Your Feedback!
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-6">
                Your review has been successfully submitted and added to our client testimonials.
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            /* Feedback Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] flex items-center justify-center shrink-0">
                  <Quote size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Share Your Experience
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Your feedback inspires corporate teams & event planners.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Star Rating Selector */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Rate Your Experience
                </p>
                <div className="flex justify-center gap-2 mb-1.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          size={26}
                          className={`transition-colors ${
                            active
                              ? "fill-[#FFB800] text-[#FFB800]"
                              : "text-gray-600 hover:text-gray-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-[#FFB800]">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>

              {/* Category Selector */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Event Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "corporate" as const, label: "Corporate Conclave" },
                    { key: "launch" as const, label: "Product Launch" },
                    { key: "gala" as const, label: "Annual Gala" },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCategory(cat.key)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer truncate ${
                        category === cat.key
                          ? "bg-[#FFB800] text-slate-950 shadow-md"
                          : "bg-slate-900/60 text-gray-400 hover:text-white border border-white/5"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Role Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Audi Chennai / John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Designation / Event Handled
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Annual Summit / VP Ops"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98843 98514"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>
              </div>

              {/* Review Textarea */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Your Review / Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about the stagecraft, AV clarity, hospitality, and team coordination..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFB800] transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#E5A700] hover:scale-105 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
