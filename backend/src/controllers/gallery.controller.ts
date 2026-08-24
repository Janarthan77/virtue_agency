import { Request, Response } from "express";
import { supabase, GalleryRecord } from "../services/supabase.service.js";

// Fallback seed gallery items
export const fallbackGallery: GalleryRecord[] = [
  {
    id: 1,
    type: "photo",
    title: "10th Southern HOG Rally",
    date: "Automotive Event, Feb 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-3.webp",
    grid_class: "md:col-span-1 md:row-span-2 h-[300px] md:h-full",
    description: "The 10th Southern H.O.G. Rally — 500+ Harley riders, stunt shows, live bands, and group rides across Chennai.",
  },
  {
    id: 2,
    type: "photo",
    title: "TVS Emerald – Home Debut",
    date: "Product Launch, Aug 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-3.webp",
    grid_class: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Grand property unveiling for TVS Emerald with experiential projection walkthroughs and VIP investor lounges.",
  },
  {
    id: 3,
    type: "photo",
    title: "Radiant Dental Care Annual Day",
    date: "Corporate Retreat, Sep 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-4.webp",
    grid_class: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Coastal retreat and team-building event at Taj Fisherman's Cove — sunset gala dinner, live music, and awards.",
  },
  {
    id: 4,
    type: "photo",
    title: "Madarase Fashion Talent Hunt",
    date: "Entertainment Event, Oct 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-3.webp",
    grid_class: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Fashion runway competition with 40-foot LED catwalk, celebrity jury, and 2,500+ spectators at Phoenix Marketcity.",
  },
  {
    id: 5,
    type: "photo",
    title: "NYE Beach 2025",
    date: "Entertainment Event, Dec 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-5.webp",
    grid_class: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
    description: "New Year Eve beach festival at Fortune Beach Resort — international DJs, laser light shows, and seaside countdown.",
  },
  {
    id: 6,
    type: "photo",
    title: "BNP Paribas Gala Night",
    date: "Corporate Event, Aug 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-2.webp",
    grid_class: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Opulent corporate gala at The Leela Palace with tailored table stylings, live jazz, and crystal illumination.",
  },
  {
    id: 7,
    type: "photo",
    title: "BNI Audi Chennai Meeting",
    date: "Corporate Conference, Dec 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-3.webp",
    grid_class: "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Business networking conference at Audi Chennai showroom with executive roundtables and VIP hospitality.",
  },
  {
    id: 8,
    type: "photo",
    title: "Save a Child Marathon",
    date: "NGO Event, Jul 2024",
    img: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-3.webp",
    grid_class: "md:col-span-2 md:row-span-1 h-[300px] md:h-[400px]",
    description: "Charity marathon for Saveetha Eco Pupil School and Ekam NGO — route management, medal staging, and crowd safety.",
  },
];

/**
 * Get all gallery items
 */
export async function getGallery(req: Request, res: Response): Promise<void> {
  try {
    const { type } = req.query;

    let query = supabase.from("gallery").select("*").order("id", { ascending: false });

    if (type && type !== "all") {
      query = query.eq("type", type as string);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Supabase gallery table error (using fallback):", error.message);
      let list = [...fallbackGallery];
      if (type && type !== "all") {
        list = list.filter((item) => item.type === type);
      }
      res.json({ success: true, count: list.length, items: list, source: "memory_fallback" });
      return;
    }

    if (!data || data.length === 0) {
      res.json({ success: true, count: fallbackGallery.length, items: fallbackGallery, source: "memory_fallback" });
      return;
    }

    res.json({ success: true, count: data.length, items: data, source: "supabase" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching gallery items";
    res.status(500).json({ success: false, error: msg });
  }
}

/**
 * Get single gallery item
 */
export async function getGalleryById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("gallery").select("*").eq("id", id).single();

    if (error || !data) {
      const found = fallbackGallery.find((g) => String(g.id) === id);
      if (found) {
        res.json({ success: true, item: found });
        return;
      }
      res.status(404).json({ success: false, error: "Gallery item not found" });
      return;
    }

    res.json({ success: true, item: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error" });
  }
}

/**
 * Create gallery item
 */
export async function createGalleryItem(req: Request, res: Response): Promise<void> {
  try {
    const body: GalleryRecord = req.body;

    if (!body.title || !body.img) {
      res.status(400).json({ success: false, error: "Title and image URL are required" });
      return;
    }

    const newItem = {
      title: body.title,
      type: body.type || "photo",
      date: body.date || "",
      img: body.img,
      grid_class: body.grid_class || "md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]",
      description: body.description || "",
      sort_order: body.sort_order || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("gallery").insert([newItem]).select().single();

    if (error) {
      console.warn("Supabase gallery insert error (saving to fallback):", error.message);
      const mockItem = { ...newItem, id: Date.now() };
      fallbackGallery.unshift(mockItem);
      res.status(201).json({ success: true, item: mockItem, note: "Saved in runtime fallback" });
      return;
    }

    res.status(201).json({ success: true, item: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error creating gallery item" });
  }
}

/**
 * Update gallery item
 */
export async function updateGalleryItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body;

    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };
    delete updates.id;

    const { data, error } = await supabase.from("gallery").update(updates).eq("id", id).select().single();

    if (error) {
      console.warn("Supabase gallery update error (updating fallback):", error.message);
      const idx = fallbackGallery.findIndex((g) => String(g.id) === id);
      if (idx !== -1) {
        fallbackGallery[idx] = { ...fallbackGallery[idx], ...updates };
        res.json({ success: true, item: fallbackGallery[idx] });
        return;
      }
    }

    res.json({ success: true, item: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error updating gallery item" });
  }
}

/**
 * Delete gallery item
 */
export async function deleteGalleryItem(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      console.warn("Supabase gallery delete error (deleting from fallback):", error.message);
      const idx = fallbackGallery.findIndex((g) => String(g.id) === id);
      if (idx !== -1) {
        fallbackGallery.splice(idx, 1);
      }
    }

    res.json({ success: true, message: `Gallery item ${id} deleted successfully` });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error deleting gallery item" });
  }
}
