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
  date: string;
  month: string;
  time: string;
  location: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  year?: string;
  tag?: string;
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

    const res = await fetch(url.toString(), { next: { revalidate: 10 } });
    const data = await res.json();
    return data.projects || [];
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

    const res = await fetch(url.toString(), { next: { revalidate: 10 } });
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn("Backend unavailable, using static fallback for gallery:", err);
    return [];
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
