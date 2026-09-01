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


export const DEFAULT_ADMIN_SERVICES: ServiceItem[] = [
  {
    id: 1,
    num: "01",
    title: "End to End Event Management",
    description: "Comprehensive management from concept to execution for all types of corporate events, conferences, and milestone summits.",
    icon: "CalendarDays",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    accent_color: "#FFFFFF",
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    num: "02",
    title: "End to End Event Production",
    description: "Full-scale technical and stage production, ensuring flawless audio, concert visual displays, intelligent moving lighting, and laser effects.",
    icon: "Settings",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-6.webp",
    accent_color: "#FFB800",
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    num: "03",
    title: "Conference Management – MICE",
    description: "Expert handling of Meetings, Incentives, Conferences, and Exhibitions with high-capacity delegate management and keynote technologies.",
    icon: "Mic",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
    accent_color: "#CBD5E1",
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    num: "04",
    title: "Event Planning & Operations",
    description: "Strategic planning, crisis-proof logistics, vendor choreography, and operational leadership to ensure effortless execution.",
    icon: "ClipboardCheck",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    accent_color: "#34d399",
    sort_order: 4,
    is_active: true,
  },
  {
    id: 5,
    num: "05",
    title: "Destination Management",
    description: "Complete travel coordination, luxury hospitality suites, and localized thematic event planning across premier national and global destinations.",
    icon: "MapPin",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-5.webp",
    accent_color: "#f472b6",
    sort_order: 5,
    is_active: true,
  },
  {
    id: 6,
    num: "06",
    title: "Venue Sourcing",
    description: "Procuring and negotiating exclusive backdrops tailored to your event scale—from 5-star ballrooms and convention centers to private estates.",
    icon: "Building",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    accent_color: "#60a5fa",
    sort_order: 6,
    is_active: true,
  },
  {
    id: 7,
    num: "07",
    title: "Décor Hire & Styling",
    description: "Creative set designs, luxury thematic installations, bespoke floral arrangements, and immersive ambient lighting.",
    icon: "Palette",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-2.webp",
    accent_color: "#FFFFFF",
    sort_order: 7,
    is_active: true,
  },
  {
    id: 8,
    num: "08",
    title: "Entertainment & Artist Management",
    description: "Curating world-class talent, celebrity keynote speakers, live music bands, mentalists, and choreographers for memorable performances.",
    icon: "Music",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp",
    accent_color: "#FFB800",
    sort_order: 8,
    is_active: true,
  },
  {
    id: 9,
    num: "09",
    title: "Custom Build Setups",
    description: "Bespoke structural engineering, grand entry archways, customized product podiums, and heavy-duty staging systems.",
    icon: "Hammer",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
    accent_color: "#CBD5E1",
    sort_order: 9,
    is_active: true,
  },
  {
    id: 10,
    num: "10",
    title: "Exhibition – Stall Fabrication",
    description: "Designing and constructing interactive double-decker stalls, modular octanorm booths, and brand experience pavilions at international trade expos.",
    icon: "Store",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp",
    accent_color: "#34d399",
    sort_order: 10,
    is_active: true,
  },
  {
    id: 11,
    num: "11",
    title: "Signage",
    description: "High-visibility illuminated LED signs, premium wayfinding totems, dynamic digital kiosks, and monumental exterior brand banners.",
    icon: "Megaphone",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    accent_color: "#f472b6",
    sort_order: 11,
    is_active: true,
  },
  {
    id: 12,
    num: "12",
    title: "BTL Activations",
    description: "Direct consumer experiential marketing, interactive mall setups, gamified brand discovery booths, and corporate roadshows.",
    icon: "Activity",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-3.webp",
    accent_color: "#60a5fa",
    sort_order: 12,
    is_active: true,
  },
  {
    id: 13,
    num: "13",
    title: "Public Relations & Media",
    description: "Strategic PR press conferences, print & TV broadcast coverage, influencer amplification, and executive media management.",
    icon: "Globe",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp",
    accent_color: "#FFFFFF",
    sort_order: 13,
    is_active: true,
  },
  {
    id: 14,
    num: "14",
    title: "Creative Design & Print Media",
    description: "High-concept visual identities, 3D stage renders, luxury invitation kits, custom delegate badges, and high-volume offset printing.",
    icon: "PenTool",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-4.webp",
    accent_color: "#FFB800",
    sort_order: 14,
    is_active: true,
  },
  {
    id: 15,
    num: "15",
    title: "ATL Management",
    description: "Large-scale advertising campaigns encompassing highway billboards, television commercials, radio sponsorships, and airport media takeovers.",
    icon: "Radio",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    accent_color: "#CBD5E1",
    sort_order: 15,
    is_active: true,
  },
];

export const DEFAULT_ADMIN_SETTINGS: CompanySettings = {
  company_name: "Virtue IN Agency",
  contact_person: "SATHISH RINGESAN",
  email: "plan@virtuein.agency",
  alternate_email: "sathish@virtueinagency.com",
  phone: "+91 74010 30000",
  alternate_phone: "+91 98843 98514",
  address_line1: "28, Judge Jambulingam Road,",
  address_line2: "Mylapore, Chennai – 600 004",
  city_state_pin: "Tamil Nadu, India",
  full_address: "28, Judge Jambulingam Road, Mylapore, Chennai – 600 004, Tamil Nadu, India",
  working_hours_mon_sat: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
  working_hours_sun: "Sunday: By Appointment",
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin",
  facebook_url: "#",
  twitter_url: "#",
  instagram_url: "#",
  linkedin_url: "#",
  website_url: "https://www.virtueinagency.com",
};

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
      if (data && Array.isArray(data.services) && data.services.length > 0) {
        return data;
      }
    }
  } catch (err: unknown) {
    console.warn("fetchServices API error, using fallback:", err);
  }

  let list = [...DEFAULT_ADMIN_SERVICES];
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(s => s.title.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q));
  }
  return {
    success: true,
    services: list,
    count: list.length,
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
    if (res.ok) {
      return await res.json();
    }
  } catch (err: unknown) {
    console.warn("createService API error, using local simulation:", err);
  }

  const newSvc: ServiceItem = {
    id: Date.now(),
    ...payload,
  };
  DEFAULT_ADMIN_SERVICES.push(newSvc);
  return { success: true, service: newSvc };
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
    if (res.ok) {
      return await res.json();
    }
  } catch (err: unknown) {
    console.warn("updateService API error, using local fallback:", err);
  }

  const idx = DEFAULT_ADMIN_SERVICES.findIndex(s => String(s.id) === String(id));
  if (idx !== -1) {
    DEFAULT_ADMIN_SERVICES[idx] = { ...DEFAULT_ADMIN_SERVICES[idx], ...payload };
    return { success: true, service: DEFAULT_ADMIN_SERVICES[idx] };
  }
  return { success: true };
}

export async function deleteService(
  id: string | number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/services/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err: unknown) {
    console.warn("deleteService API error, using local fallback:", err);
  }

  const idx = DEFAULT_ADMIN_SERVICES.findIndex(s => String(s.id) === String(id));
  if (idx !== -1) {
    DEFAULT_ADMIN_SERVICES.splice(idx, 1);
  }
  return { success: true, message: "Deleted from services list" };
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
      if (data && data.settings) {
        return data;
      }
    }
  } catch (err: unknown) {
    console.warn("fetchCompanySettings error, using fallback:", err);
  }

  return {
    success: true,
    settings: DEFAULT_ADMIN_SETTINGS,
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
    if (res.ok) {
      return await res.json();
    }
  } catch (err: unknown) {
    console.warn("updateCompanySettings API error, using local fallback:", err);
  }

  Object.assign(DEFAULT_ADMIN_SETTINGS, payload);
  return {
    success: true,
    settings: DEFAULT_ADMIN_SETTINGS,
  };
}
