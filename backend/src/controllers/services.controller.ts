import { Request, Response } from "express";
import { supabase, ServiceRecord } from "../services/supabase.service.js";

// Complete 15 default services with high-resolution Cloudflare R2 images
export const fallbackServices: ServiceRecord[] = [
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

/**
 * Get all services
 */
export async function getServices(req: Request, res: Response): Promise<void> {
  try {
    const { search } = req.query;

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    let list: ServiceRecord[] = [];
    if (error) {
      console.warn("Supabase services error:", error.message);
      list = [...fallbackServices];
    } else {
      list = (data || []) as ServiceRecord[];
    }

    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      services: list,
      count: list.length,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      services: fallbackServices,
      error: err instanceof Error ? err.message : "Internal server error fetching services",
    });
  }
}

/**
 * Get single service by ID
 */
export async function getServiceById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const found = fallbackServices.find((s) => String(s.id) === id);
      if (found) {
        res.json({ success: true, service: found });
        return;
      }
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    res.json({ success: true, service: data });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error fetching service",
    });
  }
}

/**
 * Create new service
 */
export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const { num, title, description, icon, image, accent_color, sort_order, is_active } = req.body;

    if (!title) {
      res.status(400).json({ success: false, error: "Service title is required" });
      return;
    }

    const newRecord: Omit<ServiceRecord, "id"> = {
      num: num || "",
      title,
      description: description || "",
      icon: icon || "CalendarDays",
      image: image || "",
      accent_color: accent_color || "#FFB800",
      sort_order: sort_order || 1,
      is_active: is_active ?? true,
    };

    const { data, error } = await supabase
      .from("services")
      .insert([newRecord])
      .select()
      .single();

    if (error) {
      // Return simulated created item if Supabase table is not yet migrated
      const simService: ServiceRecord = {
        id: Date.now(),
        ...newRecord,
      };
      fallbackServices.push(simService);
      res.status(201).json({
        success: true,
        service: simService,
        message: "Service created in local fallback (Supabase table optional)",
      });
      return;
    }

    res.status(201).json({ success: true, service: data });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error creating service",
    });
  }
}

/**
 * Update service
 */
export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from("services")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      const idx = fallbackServices.findIndex((s) => String(s.id) === id);
      if (idx !== -1) {
        fallbackServices[idx] = { ...fallbackServices[idx], ...updates };
        res.json({
          success: true,
          service: fallbackServices[idx],
          message: "Service updated in fallback store",
        });
        return;
      }
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, service: data });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error updating service",
    });
  }
}

/**
 * Delete service
 */
export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      const idx = fallbackServices.findIndex((s) => String(s.id) === id);
      if (idx !== -1) {
        fallbackServices.splice(idx, 1);
        res.json({ success: true, message: "Service removed from fallback list" });
        return;
      }
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error deleting service",
    });
  }
}
