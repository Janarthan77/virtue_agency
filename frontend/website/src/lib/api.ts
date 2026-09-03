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
  date?: string;
  month?: string;
  time?: string;
  location: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  year?: string;
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

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    num: "01",
    title: "End to End Event Management",
    description: "Comprehensive management from concept to execution for all types of corporate events, conferences, and milestone summits.",
    icon: "CalendarDays",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    accent_color: "#FFFFFF",
  },
  {
    id: 2,
    num: "02",
    title: "End to End Event Production",
    description: "Full-scale technical and stage production, ensuring flawless audio, concert visual displays, intelligent moving lighting, and laser effects.",
    icon: "Settings",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-6.webp",
    accent_color: "#FFB800",
  },
  {
    id: 3,
    num: "03",
    title: "Conference Management – MICE",
    description: "Expert handling of Meetings, Incentives, Conferences, and Exhibitions with high-capacity delegate management and keynote technologies.",
    icon: "Mic",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
    accent_color: "#CBD5E1",
  },
  {
    id: 4,
    num: "04",
    title: "Event Planning & Operations",
    description: "Strategic planning, crisis-proof logistics, vendor choreography, and operational leadership to ensure effortless execution.",
    icon: "ClipboardCheck",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    accent_color: "#34d399",
  },
  {
    id: 5,
    num: "05",
    title: "Destination Management",
    description: "Complete travel coordination, luxury hospitality suites, and localized thematic event planning across premier national and global destinations.",
    icon: "MapPin",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-5.webp",
    accent_color: "#f472b6",
  },
  {
    id: 6,
    num: "06",
    title: "Venue Sourcing",
    description: "Procuring and negotiating exclusive backdrops tailored to your event scale—from 5-star ballrooms and convention centers to private estates.",
    icon: "Building",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    accent_color: "#60a5fa",
  },
  {
    id: 7,
    num: "07",
    title: "Décor Hire & Styling",
    description: "Creative set designs, luxury thematic installations, bespoke floral arrangements, and immersive ambient lighting.",
    icon: "Palette",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-2.webp",
    accent_color: "#FFFFFF",
  },
  {
    id: 8,
    num: "08",
    title: "Entertainment & Artist Management",
    description: "Curating world-class talent, celebrity keynote speakers, live music bands, mentalists, and choreographers for memorable performances.",
    icon: "Music",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp",
    accent_color: "#FFB800",
  },
  {
    id: 9,
    num: "09",
    title: "Custom Build Setups",
    description: "Bespoke structural engineering, grand entry archways, customized product podiums, and heavy-duty staging systems.",
    icon: "Hammer",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
    accent_color: "#CBD5E1",
  },
  {
    id: 10,
    num: "10",
    title: "Exhibition – Stall Fabrication",
    description: "Designing and constructing interactive double-decker stalls, modular octanorm booths, and brand experience pavilions at international trade expos.",
    icon: "Store",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp",
    accent_color: "#34d399",
  },
  {
    id: 11,
    num: "11",
    title: "Signage",
    description: "High-visibility illuminated LED signs, premium wayfinding totems, dynamic digital kiosks, and monumental exterior brand banners.",
    icon: "Megaphone",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    accent_color: "#f472b6",
  },
  {
    id: 12,
    num: "12",
    title: "BTL Activations",
    description: "Direct consumer experiential marketing, interactive mall setups, gamified brand discovery booths, and corporate roadshows.",
    icon: "Activity",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-3.webp",
    accent_color: "#60a5fa",
  },
  {
    id: 13,
    num: "13",
    title: "Public Relations & Media",
    description: "Strategic PR press conferences, print & TV broadcast coverage, influencer amplification, and executive media management.",
    icon: "Globe",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp",
    accent_color: "#FFFFFF",
  },
  {
    id: 14,
    num: "14",
    title: "Creative Design & Print Media",
    description: "High-concept visual identities, 3D stage renders, luxury invitation kits, custom delegate badges, and high-volume offset printing.",
    icon: "PenTool",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-4.webp",
    accent_color: "#FFB800",
  },
  {
    id: 15,
    num: "15",
    title: "ATL Management",
    description: "Large-scale advertising campaigns encompassing highway billboards, television commercials, radio sponsorships, and airport media takeovers.",
    icon: "Radio",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    accent_color: "#CBD5E1",
  },
];

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

    const res = await fetch(url.toString(), { cache: "no-store" });
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

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return data.items || [];
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
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.services) && data.services.length > 0) {
        return data.services;
      }
    }
  } catch (err) {
    console.warn("Backend unavailable for services, using default:", err);
  }
  return DEFAULT_SERVICES;
}

/**
 * Fetch company contact & general settings for the website
 */
export async function fetchLiveSettings(): Promise<CompanySettings> {
  const defaultSettings: CompanySettings = {
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
    website_url: "https://www.virtueinagency.com",
  };

  try {
    const url = new URL(`${BACKEND_URL}/api/settings`);
    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return data.settings ? { ...defaultSettings, ...data.settings } : defaultSettings;
  } catch (err) {
    console.warn("Backend unavailable for settings, using default:", err);
    return defaultSettings;
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
