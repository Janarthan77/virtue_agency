"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, CheckCircle, Loader2, Image as ImageIcon, Plus } from "lucide-react";
import { uploadImageToR2, uploadMultipleImagesToR2 } from "../lib/api";

interface ImageUploaderProps {
  label: string;
  value?: string;
  values?: string[];
  multiple?: boolean;
  folder?: string;
  onChange: (url: string | string[]) => void;
}

export default function ImageUploader({
  label,
  value,
  values = [],
  multiple = false,
  folder = "projects",
  onChange,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      if (multiple) {
        const fileList = Array.from(files);
        setUploadProgressText(`Optimizing 0/${fileList.length}...`);
        const res = await uploadMultipleImagesToR2(fileList, folder, (done, total) => {
          setUploadProgressText(`Uploading ${done}/${total}...`);
        });
        if (res.success && res.urls.length > 0) {
          onChange([...values, ...res.urls]);
        } else {
          setError(res.error || "Failed to upload images to Cloudflare R2");
        }
      } else {
        setUploadProgressText("Optimizing & uploading...");
        const file = files[0];
        const res = await uploadImageToR2(file, folder);
        if (res.success && res.url) {
          onChange(res.url);
        } else {
          setError(res.error || "Failed to upload image to Cloudflare R2");
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setIsUploading(false);
      setUploadProgressText(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveSingle = () => {
    onChange("");
  };

  const handleRemoveMultiple = (indexToRemove: number) => {
    const updated = values.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
          {label}
        </label>
        <span className="text-[11px] text-slate-600 font-medium">Cloudflare R2 Storage</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Multiple Images Mode */}
      {multiple ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {values.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-2xs"
              >
                <Image
                  src={imgUrl}
                  alt={`Gallery upload ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveMultiple(idx)}
                    className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow"
                  >
                    <X size={13} />
                  </button>
                </div>
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                  #{idx + 1}
                </div>
              </div>
            ))}

            {/* Add More Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="aspect-video rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 flex flex-col items-center justify-center text-slate-500 hover:text-amber-700 transition-all cursor-pointer p-2"
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-1">
                  <Loader2 size={18} className="animate-spin text-amber-600" />
                  <span className="text-[10px] font-semibold text-amber-700 text-center leading-tight px-1">
                    {uploadProgressText || "Uploading..."}
                  </span>
                </div>
              ) : (
                <>
                  <Plus size={18} className="mb-0.5" />
                  <span className="text-[11px] font-semibold">Upload Photo</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Single Image Mode */
        <div>
          {value ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group shadow-2xs">
              <Image
                src={value}
                alt="Uploaded cover"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold text-xs shadow hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={handleRemoveSingle}
                  className="p-2 rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] flex items-center gap-1">
                <CheckCircle size={10} className="text-emerald-400" />
                Cloudflare CDN
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/40 transition-all flex flex-col items-center justify-center cursor-pointer p-4 text-center"
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={24} className="animate-spin text-amber-600" />
                  <p className="text-xs font-semibold text-slate-600">
                    {uploadProgressText || "Uploading to Cloudflare R2..."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                    <UploadCloud size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to upload or drag &amp; drop
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    PNG, JPG, WEBP up to 20MB (Direct to Cloudflare CDN)
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
