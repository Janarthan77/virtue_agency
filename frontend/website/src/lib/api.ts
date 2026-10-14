/**
 * Public Website API Client for Virtue IN Agency
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface EnquiryInput {
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
  notes?: string;
}

export interface ProjectItem {
  id: number | string;
  title: string;
  category: string;
  subtitle: string;
  location: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  tag?: string;
  sort_order?: number;
}


export interface GalleryItem {
  id: number | string;
  title: string;
  type: string;
  date: string;
  img: string;
  grid_class?: string;
  gridClass?: string;
  description?: string;
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
}



// In-memory cache for ultra-fast repeated client fetches
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 20000; // 20 seconds TTL

async function cachedFetchJson<T>(url: string): Promise<T | null> {
  const now = Date.now();
  const cached = apiCache.get(url);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    apiCache.set(url, { data, timestamp: now });
    return data as T;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch projects for the website (from Backend / Supabase)
 */
export async function fetchLiveProjects(params?: {
  category?: string;
  search?: string;
}): Promise<ProjectItem[]> {
  try {
    const url = new URL(`${BACKEND_URL}/api/projects`);
    if (params?.category && params.category !== "All") url.searchParams.set("category", params.category);
    if (params?.search) url.searchParams.set("search", params.search);

    const data = await cachedFetchJson<{ projects?: ProjectItem[] }>(url.toString());
    return data?.projects || [];
  } catch (err) {
    console.warn("Backend unavailable, using static fallback for projects:", err);
    return [];
  }
}

/**
 * Fetch gallery items for the website (from Backend / Supabase)
 */
export async function fetchLiveGallery(params?: { type?: string }): Promise<GalleryItem[]> {
  try {
    const url = new URL(`${BACKEND_URL}/api/gallery`);
    if (params?.type && params.type !== "all") url.searchParams.set("type", params.type);

    const data = await cachedFetchJson<{ items?: GalleryItem[] }>(url.toString());
    return data?.items || [];
  } catch (err) {
    console.warn("Backend unavailable, using static fallback for gallery:", err);
    return [];
  }
}

/**
 * Fetch services for the website (from Backend / Supabase)
 */
export async function fetchLiveServices(): Promise<ServiceItem[]> {
  try {
    const url = new URL(`${BACKEND_URL}/api/services`);
    const data = await cachedFetchJson<{ services?: ServiceItem[] }>(url.toString());
    if (data && Array.isArray(data.services)) {
      return data.services;
    }
  } catch (err) {
    console.warn("Backend unavailable for services:", err);
  }
  return [];
}

/**
 * Fetch company contact & general settings for the website
 */
export async function fetchLiveSettings(): Promise<CompanySettings> {
  try {
    const url = new URL(`${BACKEND_URL}/api/settings`);
    const data = await cachedFetchJson<{ settings?: CompanySettings }>(url.toString());
    return data?.settings || {};
  } catch (err) {
    console.warn("Backend unavailable for settings:", err);
    return {};
  }
}

/**
 * Submit contact form enquiry
 */
export async function submitEnquiry(data: EnquiryInput): Promise<{
  success: boolean;
  message?: string;
  enquiry?: any;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/send-enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error. Please check your connection.",
    };
  }
}

export interface ClientReviewRecord {
  id?: number | string;
  name: string;
  role?: string;
  category?: "all" | "corporate" | "launch" | "gala" | string;
  rating: number;
  text: string;
  email?: string;
  phone?: string;
  avatar_color?: string;
  status?: string;
  is_featured?: boolean;
  created_at?: string;
}

/**
 * Fetch approved client reviews for website
 */
export async function fetchLiveReviews(): Promise<ClientReviewRecord[]> {
  try {
    const url = `${BACKEND_URL}/api/reviews?status=approved`;
    const data = await cachedFetchJson<{ reviews?: ClientReviewRecord[] }>(url);
    if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
      return data.reviews;
    }
  } catch (err) {
    console.warn("fetchLiveReviews error, falling back to static seeds:", err);
  }
  return [];
}

/**
 * Submit client review & feedback (Stores in reviews table and mirrors to enquiries table)
 */
export async function submitReview(data: {
  name: string;
  role?: string;
  category?: string;
  rating: number;
  text: string;
  email?: string;
  phone?: string;
  avatar_color?: string;
}): Promise<{
  success: boolean;
  message?: string;
  review?: ClientReviewRecord;
  error?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error submitting review",
    };
  }
}
