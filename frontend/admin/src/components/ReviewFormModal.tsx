"use client";

import { useState, useEffect } from "react";
import { X, Star, Quote, CheckCircle2, AlertCircle } from "lucide-react";
import { ReviewItem } from "../lib/api";

interface ReviewFormModalProps {
  isOpen: boolean;
  review: ReviewItem | null;
  onClose: () => void;
  onSave: (reviewData: ReviewItem) => Promise<void>;
}

const CATEGORIES = [
  { key: "corporate", label: "Corporate Conclave" },
  { key: "launch", label: "Product Launch" },
  { key: "gala", label: "Annual Gala & Retreat" },
];

const AVATAR_COLORS = [
  "#2563EB",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DC2626",
  "#0891B2",
];

export default function ReviewFormModal({
  isOpen,
  review,
  onClose,
  onSave,
}: ReviewFormModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("corporate");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"approved" | "pending" | "hidden">("approved");
  const [isFeatured, setIsFeatured] = useState(true);
  const [avatarColor, setAvatarColor] = useState("#2563EB");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (review) {
      setName(review.name || "");
      setRole(review.role || "");
      setCategory(review.category || "corporate");
      setRating(review.rating || 5);
      setText(review.text || "");
      setEmail(review.email || "");
      setPhone(review.phone || "");
      setStatus(review.status || "approved");
      setIsFeatured(review.is_featured !== undefined ? review.is_featured : true);
      setAvatarColor(review.avatar_color || "#2563EB");
    } else {
      setName("");
      setRole("");
      setCategory("corporate");
      setRating(5);
      setText("");
      setEmail("");
      setPhone("");
      setStatus("approved");
      setIsFeatured(true);
      setAvatarColor(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);
    }
    setError(null);
  }, [review, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Client/Company name is required.");
      return;
    }
    if (!text.trim()) {
      setError("Review / Feedback testimonial text is required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await onSave({
        ...(review?.id ? { id: review.id } : {}),
        name: name.trim(),
        role: role.trim() || "Corporate Client",
        category,
        rating,
        text: text.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status,
        is_featured: isFeatured,
        avatar_color: avatarColor,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save review");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              <Quote size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {review ? "Edit Client Feedback / Review" : "Add New Client Review"}
              </h3>
              <p className="text-xs text-slate-500">
                {review ? `Managing review for ${review.name}` : "Manual entry of client testimonial"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Rating selector */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
                Client Rating *
              </label>
              <p className="text-xs text-slate-500">Stars awarded by the client</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                >
                  <Star
                    size={22}
                    className={
                      rating >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 hover:text-amber-200"
                    }
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-800 ml-2">{rating}.0 / 5.0</span>
            </div>
          </div>

          {/* Client Name & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Client / Company Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Audi Chennai / Hydra Specma"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Designation / Event Handled
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Factory Inauguration & Facility Launch"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Event Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Display Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="approved">Approved &amp; Live on Website</option>
                <option value="pending">Pending Review</option>
                <option value="hidden">Hidden from Website</option>
              </select>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Client Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Client Phone (Optional)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98843 98514"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Feedback / Review Quote *
            </label>
            <textarea
              required
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did the client say about stagecraft, AV clarity, hospitality, coordination..."
              className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed font-normal focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
            />
          </div>

          {/* Avatar Color & Featured Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Avatar Badge Color:</span>
              <div className="flex items-center gap-1.5">
                {AVATAR_COLORS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setAvatarColor(col)}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      avatarColor === col ? "scale-125 ring-2 ring-slate-900 ring-offset-1" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-xs font-semibold text-slate-700">Feature on Homepage</span>
            </label>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow disabled:opacity-50"
            >
              <CheckCircle2 size={14} className="text-amber-400" />
              <span>{isSaving ? "Saving..." : review ? "Update Review" : "Publish Review"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
