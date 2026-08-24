"use client";

import { useState, useEffect } from "react";
import { X, Image as ImageIcon, Sparkles, Layers } from "lucide-react";
import { GalleryItem } from "../lib/api";
import ImageUploader from "./ImageUploader";

interface GalleryFormModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onSave: (data: GalleryItem) => Promise<void>;
}

const gridClassOptions = [
  { label: "Standard Card (1x1)", value: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]" },
  { label: "Wide Card (2x1)", value: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]" },
  { label: "Tall Card (1x2)", value: "md:col-span-1 md:row-span-2 h-[300px] md:h-full" },
  { label: "Large Featured (2x2)", value: "md:col-span-2 md:row-span-2 h-[300px] md:h-full" },
];

export default function GalleryFormModal({
  isOpen,
  item,
  onClose,
  onSave,
}: GalleryFormModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"photo" | "video">("photo");
  const [date, setDate] = useState("");
  const [gridClass, setGridClass] = useState("md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setType(item.type || "photo");
      setDate(item.date || "");
      setGridClass(item.grid_class || gridClassOptions[0].value);
      setDescription(item.description || "");
      setImg(item.img || "");
    } else {
      setTitle("");
      setType("photo");
      setDate("Corporate Event, 2026");
      setGridClass(gridClassOptions[0].value);
      setDescription("");
      setImg("");
    }
    setError(null);
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !img.trim()) {
      setError("Please enter a title and upload an image.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const payload: GalleryItem = {
        ...(item?.id ? { id: item.id } : {}),
        title: title.trim(),
        type,
        date: date.trim(),
        grid_class: gridClass,
        description: description.trim(),
        img,
      };

      await onSave(payload);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save gallery item");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <ImageIcon size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {item ? "Edit Gallery Item" : "Add Photo to Gallery"}
              </h3>
              <p className="text-xs text-slate-500">
                Uploaded image is stored in Cloudflare R2 and synced with Supabase
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4.5 custom-scrollbar">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Photo / Event Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10th Southern HOG Rally"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
            />
          </div>

          {/* Row: Type & Category Date Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Media Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "photo" | "video")}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Event Subtitle / Date Tag
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Automotive Event, Feb 2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Grid Span Layout */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Layers size={13} className="text-amber-600" />
              Masonry Grid Size Layout
            </label>
            <select
              value={gridClass}
              onChange={(e) => setGridClass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
            >
              {gridClassOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Caption / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of the event moment..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 font-normal focus:bg-white focus:outline-none"
            />
          </div>

          {/* Cloudflare R2 Upload */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <ImageUploader
              label="Gallery Image (Cloudflare R2)"
              value={img}
              onChange={(url) => setImg(url as string)}
              folder="gallery"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow cursor-pointer"
            >
              {isSaving ? "Saving..." : item ? "Update Photo" : "Add to Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
