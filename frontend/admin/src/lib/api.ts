/**
 * Admin API Client for Virtue IN Agency (Connecting to Node.js Backend & Supabase/Cloudflare R2)
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ProjectItem {
  id?: number | string;
  title: string;
  category: string;
  subtitle?: string;
  date?: string;
  month?: string;
  time?: string;
  location?: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  year?: string;
  tag?: string;
  is_featured?: boolean;
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
}

// ── 1. CLOUDFLARE R2 IMAGE UPLOAD ──────────────────────────

/**
 * Upload single image to Cloudflare R2 via Node.js Backend
 */
export async function uploadImageToR2(
  file: File,
  folder = "projects"
): Promise<{ success: boolean; url: string; key?: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch(`${BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

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
 */
export async function uploadMultipleImagesToR2(
  files: File[],
  folder = "projects"
): Promise<{ success: boolean; urls: string[]; count?: number; error?: string }> {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("folder", folder);

    const res = await fetch(`${BACKEND_URL}/api/upload/multiple`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data;
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

