"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Plus, Trash2, CheckCircle2, Building2, MapPin, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { ProjectItem } from "../lib/api";
import ImageUploader from "./ImageUploader";

interface ProjectFormModalProps {
  isOpen: boolean;
  project: ProjectItem | null;
  onClose: () => void;
  onSave: (projectData: ProjectItem) => Promise<void>;
}

const categoryOptions = [
  "Corporate",
  "Product Launch",
  "Entertainment",
  "Automotive",
  "Conference & MICE",
  "NGO & Marathon",
];

export default function ProjectFormModal({
  isOpen,
  project,
  onClose,
  onSave,
}: ProjectFormModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Corporate");
  const [date, setDate] = useState("22");
  const [month, setMonth] = useState("AUG");
  const [time, setTime] = useState("09:00am – 06:00pm");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setSubtitle(project.subtitle || "");
      setCategory(project.category || "Corporate");
      setDate(project.date || "");
      setMonth(project.month || "AUG");
      setTime(project.time || "");
      setLocation(project.location || "");
      setDescription(project.description || "");
      setHighlights(project.highlights || []);
      setImage(project.image || "");
      setGallery(project.gallery || []);
    } else {
      setTitle("");
      setSubtitle("");
      setCategory("Corporate");
      setDate("15");
      setMonth("AUG");
      setTime("10:00am – 05:00pm");
      setLocation("Chennai, India");
      setDescription("");
      setHighlights(["Interactive Stage Setup", "VIP Hospitality Experience", "Live AV & Staging"]);
      setImage("");
      setGallery([]);
    }
    setErrorMessage(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights([...highlights, newHighlight.trim()]);
    setNewHighlight("");
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !image.trim()) {
      setErrorMessage("Please enter title, category, and upload a main cover image.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const payload: ProjectItem = {
        ...(project?.id ? { id: project.id } : {}),
        title: title.trim(),
        subtitle: subtitle.trim(),
        category,
        date: date.trim(),
        month: month.trim().toUpperCase(),
        time: time.trim(),
        location: location.trim(),
        description: description.trim(),
        highlights,
        image,
        gallery: gallery.length > 0 ? gallery : [image],
        client: subtitle.trim() || title.trim(),
        year: "2026",
        tag: category.toUpperCase(),
        is_featured: true,
      };

      await onSave(payload);
      onClose();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {project ? "Edit Project & Event Showcase" : "Add New Event Project"}
              </h3>
              <p className="text-xs text-slate-500">
                All photos upload directly to Cloudflare R2 and save to Supabase
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Row 1: Category & Title */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. TVS Emerald – Home Debut"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Row 2: Subtitle / Client Tagline */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Subtitle / Client Initiative
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Peninsula & Green Enclave Launch"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Row 3: Date, Month, Time, Venue Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Day (Date)
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 22"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Month
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value.toUpperCase())}
                placeholder="e.g. AUG"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Timings
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 09:00am – 06:00pm"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Venue Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. TVS Emerald, Chennai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Event Overview Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Event Overview Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Grand property unveiling and sales launch for TVS Emerald..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 font-normal focus:bg-white focus:outline-none"
            />
          </div>

          {/* Row 5: Key Highlights & Deliverables */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Key Highlights &amp; Deliverables
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                placeholder="Type a highlight (e.g. 3D Projection Mapping) and press Add"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-medium"
                >
                  <CheckCircle2 size={12} className="text-amber-600 shrink-0" />
                  {h}
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(i)}
                    className="ml-1 text-amber-700 hover:text-red-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 6: Main Cover Image (Cloudflare R2) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <ImageUploader
              label="Primary Cover Photo (Featured Image)"
              value={image}
              onChange={(url) => setImage(url as string)}
              folder="projects"
            />
          </div>

          {/* Row 7: Event Gallery Multi-Image Slider (Cloudflare R2) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <ImageUploader
              label="Event Showcase Slider Gallery (Multiple Photos)"
              values={gallery}
              multiple={true}
              onChange={(urls) => setGallery(urls as string[])}
              folder="projects/gallery"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              {isSaving ? "Saving to Cloudflare & DB..." : project ? "Update Project" : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
