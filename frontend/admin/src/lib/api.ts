/**
 * Admin API Client for Virtue IN Agency (Connecting to Node.js Backend & Supabase/Cloudflare R2)
 */

import { compressImage } from "./imageCompression";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ProjectItem {
  id?: number | string;
  title: string;
  category: string;
  subtitle?: string;
  location?: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  tag?: string;
  is_featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}


export interface GalleryItem {
  id?: number | string;
  title: string;
  type?: "photo" | "video";
  date?: string;
  img: string;
  grid_class?: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EnquiryItem {
  id: string;
  created_at: string;
  name: string;
  email: string;
  country_code?: string;
  phone: string;
  company: string;
  venue: string;
  event_type: string;
  team_size?: string;
  budget?: string;
  preferred_date?: string;
  source?: string;
  status: "new" | "in_review" | "contacted" | "mail_sent" | "archived";
  notes?: string;
  mail_history?: Array<{
    sent_at: string;
    subject: string;
    message?: string;
    status: string;
    template?: string;
    resendId?: string;
  }>;
}

export interface ServiceItem {
  id?: number | string;
  num?: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  accent_color?: string;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CompanySettings {
  id?: number | string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  alternate_email?: string;
  phone?: string;
  alternate_phone?: string;
  address_line1?: string;
  address_line2?: string;
  city_state_pin?: string;
  full_address?: string;
  working_hours_mon_sat?: string;
  working_hours_sun?: string;
  map_embed_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  website_url?: string;
  updated_at?: string;
}

export interface DashboardStats {
  total: number;
  new: number;
  inReview: number;
  contacted: number;
  mailSent: number;
  archived: number;
  totalEmailsSent: number;
  totalProjects: number;
  totalGalleryItems: number;
  totalServices?: number;
  totalReviews?: number;
}

export interface ReviewItem {
  id?: number | string;
  name: string;
  role?: string;
  category?: string;
  rating: number;
  text: string;
  email?: string;
  phone?: string;
  avatar_color?: string;
  status?: "approved" | "pending" | "hidden";
  is_featured?: boolean;
  source?: string;
  created_at?: string;
  updated_at?: string;
}


// ── 1. CLOUDFLARE R2 IMAGE UPLOAD ──────────────────────────

/**
 * Upload single image to Cloudflare R2 via Node.js Backend
 * Automatically compresses client-side to keep payload well below Vercel's 4.5MB serverless limit.
 */
export async function uploadImageToR2(
  file: File,
  folder = "projects"
): Promise<{ success: boolean; url: string; key?: string; error?: string }> {
  try {
    const optimizedFile = await compressImage(file);
    const formData = new FormData();
    formData.append("file", optimizedFile);
    formData.append("folder", folder);

    const res = await fetch(`${BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 413) {
        return {
          success: false,
          url: "",
          error: "File size exceeds Vercel 4.5MB limit. Please choose a smaller photo.",
        };
      }
      const errText = await res.text();
      let errorMsg = `Upload failed (${res.status})`;
      try {
        const json = JSON.parse(errText);
        if (json.error) errorMsg = json.error;
      } catch {
        // fallback to status
      }
      return { success: false, url: "", error: errorMsg };
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    return {
      success: false,
      url: "",
      error: err instanceof Error ? err.message : "Cloudflare R2 image upload failed",
    };
  }
}

/**
 * Upload multiple images to Cloudflare R2
 * Uploads images individually (in sequence or parallel) to avoid Vercel 4.5MB payload limit.
 */
export async function uploadMultipleImagesToR2(
  files: File[],
  folder = "projects",
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; urls: string[]; count?: number; error?: string }> {
  try {
    if (!files || files.length === 0) {
      return { success: true, urls: [], count: 0 };
    }

    const uploadedUrls: string[] = [];
    let failureCount = 0;
    let lastError = "";
    const total = files.length;
    let completed = 0;

    for (const file of files) {
      const res = await uploadImageToR2(file, folder);
      completed++;
      if (onProgress) onProgress(completed, total);

      if (res.success && res.url) {
        uploadedUrls.push(res.url);
      } else {
        failureCount++;
        lastError = res.error || "Failed to upload image";
      }
    }

    if (uploadedUrls.length === 0 && failureCount > 0) {
      return {
        success: false,
        urls: [],
        error: lastError || "Failed to upload images to Cloudflare R2",
      };
    }

    return {
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length,
      error: failureCount > 0 ? `${failureCount} of ${total} image(s) failed to upload` : undefined,
    };
  } catch (err: unknown) {
    return {
      success: false,
      urls: [],
      error: err instanceof Error ? err.message : "Cloudflare R2 multiple image upload failed",
    };
  }
}

// ── 2. PROJECTS CRUD ────────────────────────────────────────

export async function fetchProjects(params?: {
  category?: string;
  search?: string;
}): Promise<{ success: boolean; projects: ProjectItem[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${BACKEND_URL}/api/projects`);
    if (params?.category && params.category !== "All") url.searchParams.set("category", params.category);
    if (params?.search) url.searchParams.set("search", params.search);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    return {
      success: false,
      projects: [],
      error: err instanceof Error ? err.message : "Failed to load projects",
    };
  }
}

export async function createProject(
  payload: ProjectItem
): Promise<{ success: boolean; project?: ProjectItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create project failed" };
  }
}

export async function updateProject(
  id: string | number,
  payload: Partial<ProjectItem>
): Promise<{ success: boolean; project?: ProjectItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update project failed" };
  }
}

export async function deleteProject(
  id: string | number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete project failed" };
  }
}

// ── 3. GALLERY CRUD ─────────────────────────────────────────

export async function fetchGallery(params?: {
  type?: string;
}): Promise<{ success: boolean; items: GalleryItem[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${BACKEND_URL}/api/gallery`);
    if (params?.type && params.type !== "all") url.searchParams.set("type", params.type);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    return {
      success: false,
      items: [],
      error: err instanceof Error ? err.message : "Failed to load gallery",
    };
  }
}

export async function createGalleryItem(
  payload: GalleryItem
): Promise<{ success: boolean; item?: GalleryItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create gallery item failed" };
  }
}

export async function updateGalleryItem(
  id: string | number,
  payload: Partial<GalleryItem>
): Promise<{ success: boolean; item?: GalleryItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update gallery item failed" };
  }
}

export async function deleteGalleryItem(
  id: string | number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/gallery/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete gallery item failed" };
  }
}

// ── 4. ENQUIRIES & EMAIL ────────────────────────────────────

export async function fetchEnquiries(params?: {
  status?: string;
  search?: string;
}): Promise<{ success: boolean; enquiries: EnquiryItem[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${BACKEND_URL}/api/enquiries`);
    if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
    if (params?.search) url.searchParams.set("search", params.search);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    return {
      success: false,
      enquiries: [],
      error: err instanceof Error ? err.message : "Failed to load enquiries",
    };
  }
}

export async function updateEnquiryStatus(
  id: string,
  payload: { status?: string; notes?: string }
): Promise<{ success: boolean; enquiry?: EnquiryItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update enquiry failed" };
  }
}

export async function deleteEnquiry(
  id: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/enquiries/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete enquiry failed" };
  }
}

export async function sendEmailViaResend(payload: {
  enquiryId?: string;
  toEmail?: string;
  subject: string;
  message: string;
  templateType?: string;
}): Promise<{ success: boolean; message?: string; error?: string; mailRecord?: any }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Send email failed" };
  }
}

export async function fetchDashboardStats(): Promise<{
  success: boolean;
  stats?: DashboardStats;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/stats`, { cache: "no-store" });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Stats fetch failed",
    };
  }
}

export interface EnquiryInput {
  name: string;
  email: string;
  country_code?: string;
  phone: string;
  company?: string;
  venue?: string;
  event_type?: string;
  team_size?: string;
  budget?: string;
  preferred_date?: string;
  source?: string;
  notes?: string;
}

export async function submitEnquiry(data: EnquiryInput): Promise<{
  success: boolean;
  message?: string;
  enquiry?: EnquiryItem;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

// ── 5. SERVICES CRUD ────────────────────────────────────────

export async function fetchServices(params?: {
  search?: string;
}): Promise<{ success: boolean; services: ServiceItem[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${BACKEND_URL}/api/services`);
    if (params?.search) url.searchParams.set("search", params.search);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.services)) {
        return {
          success: true,
          services: data.services,
          count: data.services.length,
        };
      }
    }
  } catch (err: unknown) {
    console.error("fetchServices API error:", err);
  }

  return {
    success: false,
    services: [],
    count: 0,
    error: "Failed to fetch services",
  };
}

export async function createService(
  payload: ServiceItem
): Promise<{ success: boolean; service?: ServiceItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Create service failed" };
  }
}

export async function updateService(
  id: string | number,
  payload: Partial<ServiceItem>
): Promise<{ success: boolean; service?: ServiceItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update service failed" };
  }
}

export async function deleteService(
  id: string | number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/services/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete service failed" };
  }
}

// ── 6. COMPANY SETTINGS & CONTACT INFO ───────────────────────

export async function fetchCompanySettings(): Promise<{
  success: boolean;
  settings?: CompanySettings;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/settings`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        settings: data?.settings || {},
      };
    }
  } catch (err: unknown) {
    console.error("fetchCompanySettings error:", err);
  }

  return {
    success: false,
    settings: {},
    error: "Failed to fetch settings",
  };
}

export async function updateCompanySettings(
  payload: Partial<CompanySettings>
): Promise<{
  success: boolean;
  settings?: CompanySettings;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update settings failed" };
  }
}

// ── 7. CLIENT REVIEWS & FEEDBACK CRUD ───────────────────────

export async function fetchReviews(params?: {
  status?: string;
  category?: string;
  search?: string;
}): Promise<{ success: boolean; reviews: ReviewItem[]; count?: number; error?: string }> {
  try {
    const url = new URL(`${BACKEND_URL}/api/reviews`);
    if (params?.status && params.status !== "all") url.searchParams.set("status", params.status);
    if (params?.category && params.category !== "all") url.searchParams.set("category", params.category);
    if (params?.search) url.searchParams.set("search", params.search);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err: unknown) {
    console.warn("fetchReviews API error:", err);
  }

  return {
    success: false,
    reviews: [],
    error: "Failed to fetch reviews",
  };
}

export async function createReview(
  payload: ReviewItem
): Promise<{ success: boolean; review?: ReviewItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Create review failed",
    };
  }
}

export async function updateReview(
  id: string | number,
  payload: Partial<ReviewItem>
): Promise<{ success: boolean; review?: ReviewItem; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Update review failed",
    };
  }
}

export async function deleteReview(
  id: string | number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Delete review failed",
    };
  }
}
