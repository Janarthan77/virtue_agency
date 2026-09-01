"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
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
  Camera,
  Video,
  Award,
  Shield,
  Zap,
  Users,
  Star,
  Layers,
  Check,
} from "lucide-react";
import { ServiceItem } from "../lib/api";
import ImageUploader from "./ImageUploader";

interface ServiceFormModalProps {
  isOpen: boolean;
  service: ServiceItem | null;
  onClose: () => void;
  onSave: (serviceData: ServiceItem) => Promise<void>;
}

const AVAILABLE_ICONS = [
  { name: "CalendarDays", icon: CalendarDays, label: "Calendar / Event" },
  { name: "Settings", icon: Settings, label: "Production / Tech" },
  { name: "Mic", icon: Mic, label: "MICE / Conference" },
  { name: "ClipboardCheck", icon: ClipboardCheck, label: "Planning / Ops" },
  { name: "MapPin", icon: MapPin, label: "Destination" },
  { name: "Building", icon: Building, label: "Venue Sourcing" },
  { name: "Palette", icon: Palette, label: "Décor / Styling" },
  { name: "Music", icon: Music, label: "Entertainment / Artists" },
  { name: "Hammer", icon: Hammer, label: "Custom Builds" },
  { name: "Store", icon: Store, label: "Exhibitions & Stalls" },
  { name: "Megaphone", icon: Megaphone, label: "Signage & Branding" },
  { name: "Activity", icon: Activity, label: "BTL Activations" },
  { name: "Globe", icon: Globe, label: "PR & Media" },
  { name: "PenTool", icon: PenTool, label: "Design & Print" },
  { name: "Radio", icon: Radio, label: "ATL Management" },
  { name: "Sparkles", icon: Sparkles, label: "Luxury / Signature" },
  { name: "Camera", icon: Camera, label: "Photography" },
  { name: "Video", icon: Video, label: "Videography / Live Stream" },
  { name: "Award", icon: Award, label: "Awards & Honors" },
  { name: "Shield", icon: Shield, label: "Security & Protocols" },
  { name: "Zap", icon: Zap, label: "Special FX / Pyro" },
  { name: "Users", icon: Users, label: "Crowd & VIP Hospitality" },
  { name: "Star", icon: Star, label: "Featured" },
  { name: "Layers", icon: Layers, label: "Multi-Tier Production" },
];

const ACCENT_COLORS = [
  { name: "Gold Accent", value: "#FFB800", bg: "bg-[#FFB800]" },
  { name: "Pure White", value: "#FFFFFF", bg: "bg-white" },
  { name: "Slate Silver", value: "#CBD5E1", bg: "bg-slate-300" },
  { name: "Emerald Mint", value: "#34d399", bg: "bg-emerald-400" },
  { name: "Rose Pink", value: "#f472b6", bg: "bg-pink-400" },
  { name: "Sky Blue", value: "#60a5fa", bg: "bg-blue-400" },
  { name: "Amber Orange", value: "#f59e0b", bg: "bg-amber-500" },
  { name: "Purple Royal", value: "#a855f7", bg: "bg-purple-500" },
];

export default function ServiceFormModal({
  isOpen,
  service,
  onClose,
  onSave,
}: ServiceFormModalProps) {
  const [num, setNum] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("CalendarDays");
  const [image, setImage] = useState("");
  const [accentColor, setAccentColor] = useState("#FFB800");
  const [sortOrder, setSortOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setNum(service.num || "");
      setTitle(service.title || "");
      setDescription(service.description || "");
      setIcon(service.icon || "CalendarDays");
      setImage(service.image || "");
      setAccentColor(service.accent_color || "#FFB800");
      setSortOrder(service.sort_order || 1);
      setIsActive(service.is_active ?? true);
    } else {
      setNum("");
      setTitle("");
      setDescription("");
      setIcon("Sparkles");
      setImage("");
      setAccentColor("#FFB800");
      setSortOrder(1);
      setIsActive(true);
    }
    setErrorMessage(null);
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Please provide service title and description.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const payload: ServiceItem = {
        ...(service?.id ? { id: service.id } : {}),
        num: num.trim(),
        title: title.trim(),
        description: description.trim(),
        icon,
        image,
        accent_color: accentColor,
        sort_order: Number(sortOrder) || 1,
        is_active: isActive,
      };

      await onSave(payload);
      onClose();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setIsSaving(false);
    }
  };

  const SelectedIconComp = AVAILABLE_ICONS.find((i) => i.name === icon)?.icon || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs"
              style={{ background: accentColor, color: accentColor === "#FFFFFF" ? "#0F172A" : "#FFFFFF" }}
            >
              <SelectedIconComp size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {service ? "Edit Agency Service" : "Add New Agency Service"}
              </h3>
              <p className="text-xs text-slate-500">
                Instantly displays on public website /services &amp; Home showcase
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Row 1: Number & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Service No. (Optional)
              </label>
              <input
                type="text"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                placeholder="e.g. 16"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Drone Light Shows & Architectural Projection"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
              Service Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of what this event service provides to corporate clients..."
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Row 3: Icon Selection Picker */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
              Select Lucide Vector Icon
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-48 overflow-y-auto custom-scrollbar">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIcon(item.name)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-amber-400 border-slate-900 shadow-sm scale-105"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    title={item.label}
                  >
                    <IconComponent size={20} />
                    <span className="text-[9px] font-medium truncate w-full mt-1">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Accent Color & Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Accent Theme Color
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setAccentColor(c.value)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${c.bg} ${
                      accentColor === c.value
                        ? "ring-2 ring-slate-900 ring-offset-2 scale-110 border-slate-400"
                        : "border-slate-300 opacity-80 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    {accentColor === c.value && (
                      <Check size={12} className={c.value === "#FFFFFF" ? "text-black" : "text-white"} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-1.5">
                Display Order &amp; Status
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 font-bold focus:bg-white focus:outline-none"
                  min={1}
                />
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 border-slate-300 focus:ring-amber-400"
                  />
                  <span>Active &amp; Live on Website</span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 5: Feature Photo (Cloudflare R2 Upload) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <ImageUploader
              label="Service Showcase Image (Cloudflare R2)"
              value={image}
              onChange={(url) => setImage(url as string)}
              folder="services"
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
              {isSaving ? "Saving Service..." : service ? "Update Service" : "Publish Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
