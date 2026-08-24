import { Request, Response } from "express";
import { supabase, ProjectRecord } from "../services/supabase.service.js";

// Complete 15 custom event projects with R2 images and full metadata
export const fallbackProjects: ProjectRecord[] = [
  {
    id: 1,
    title: "Rotary Club of Madras West",
    category: "Corporate",
    subtitle: "President Installation 2026–27 @ ITC Grand Chola",
    date: "15",
    month: "JUN",
    time: "10:00am – 04:00pm",
    location: "ITC Grand Chola, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    ],
    description: "Prestigious annual installation ceremony for Rotary Club of Madras West hosted at ITC Grand Chola with presidential stagecraft, live broadcasting, and VIP attendee management.",
    highlights: ["1,200+ Attendees", "AV & Intelligent Lighting", "VIP Banquet", "Executive Protocols"],
    client: "Rotary Club of Madras West",
    year: "2026",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 2,
    title: "TVS Emerald – Home Debut",
    category: "Product Launch",
    subtitle: "Peninsula & Green Enclave Launch",
    date: "22",
    month: "AUG",
    time: "09:00am – 06:00pm",
    location: "TVS Emerald, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-9.webp",
    ],
    description: "Grand property unveiling and sales launch for TVS Emerald's ultra-luxury Peninsula & Green Enclave project. Built interactive architectural model zones, high-lumen experiential projection walkthroughs, and VIP lounge pavilions.",
    highlights: ["Interactive Experience Pavilion", "3D Projection Mapping", "VIP Investor Hospitality", "Over 800 Exclusive Buyer Registrations"],
    client: "Peninsula, Green Enclave & Atrium Launch",
    year: "2026",
    tag: "PRODUCT LAUNCH",
    is_featured: true,
  },
  {
    id: 3,
    title: "NeXHS Annual Foundation Day",
    category: "Corporate",
    subtitle: "Next Generation Hybrid Systems",
    date: "10",
    month: "SEP",
    time: "09:00am – 05:00pm",
    location: "Chennai Trade Centre",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
    ],
    description: "Annual foundation celebration for NeXHS uniting over 800 employees and stakeholders with keynote presentations and rewards.",
    highlights: ["Custom Stage Sets", "Keynote Theater", "Employee Excellence Awards"],
    client: "Next Generation Hybrid Systems",
    year: "2026",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 4,
    title: "JLL – Day Outing",
    category: "Corporate",
    subtitle: "Jones Lang LaSalle",
    date: "05",
    month: "SEP",
    time: "08:00am – 08:00pm",
    location: "Taj Fisherman's Cove",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-7.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp",
    ],
    description: "Beachside corporate retreat and team-building experience at Taj Fisherman's Cove with outdoor challenges and sunset dinner.",
    highlights: ["Team Building Activities", "Beach Gala Dinner", "Live DJ & Band Setup"],
    client: "Jones Lang LaSalle",
    year: "2025",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 5,
    title: "Audi Chennai Conference Meeting",
    category: "Corporate",
    subtitle: "BNI B Region – Audi Chennai",
    date: "14",
    month: "MAY",
    time: "10:00am – 03:00pm",
    location: "Audi Chennai Showroom & Conclave Arena",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-5.webp",
    ],
    description: "Executive leadership conference and luxury brand experience meeting organized for Audi Chennai and regional partners.",
    highlights: ["Executive Boardroom Setup", "Multi-screen Keynote", "Luxury Auto Display"],
    client: "BNI B Region – Audi Chennai",
    year: "2024",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 6,
    title: "IIMM Conference – Spectrum 2024",
    category: "Corporate",
    subtitle: "Indian Institute of Material Management",
    date: "20",
    month: "JUL",
    time: "09:30am – 05:30pm",
    location: "Hotel Savera, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-6.webp",
    ],
    description: "National supply chain & materials conference featuring panel symposiums, delegate kit fabrication, and AV staging.",
    highlights: ["Supply Chain Symposium", "Technical Panel Setup", "Delegate Concierge"],
    client: "Indian Institute of Material Management",
    year: "2024",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 7,
    title: "Radiant Raising Day 2023",
    category: "Corporate",
    subtitle: "Radiant Dental Care – Annual Day",
    date: "18",
    month: "OCT",
    time: "10:00am – 06:00pm",
    location: "VGP Golden Beach Resort",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-2.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-5.webp",
    ],
    description: "Radiant Dental Care annual celebration with clinical award distributions and festive cultural events.",
    highlights: ["Awards Conferment", "Cultural Gala", "Live Entertainment"],
    client: "Radiant Dental Care – Annual Day",
    year: "2023",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 8,
    title: "Radiant Raising Day 2024",
    category: "Corporate",
    subtitle: "Radiant Dental Care – Day Outing & Annual Day",
    date: "24",
    month: "OCT",
    time: "09:00am – 07:00pm",
    location: "MGM Beach Resorts",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-5.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-6.webp",
    ],
    description: "Subsequent edition of Raising Day festival at MGM Beach Resorts with family fun programs and celebratory banquets.",
    highlights: ["Outdoor Carnival", "Family Engagement Zones", "Beach Banquet"],
    client: "Radiant Dental Care",
    year: "2024",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 9,
    title: "10th Southern HOG Rally",
    category: "Automotive",
    subtitle: "Harley-Davidson Marina Chapter",
    date: "11",
    month: "NOV",
    time: "06:00am – 11:00pm",
    location: "Mahabalipuram Coastal Highway",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-4.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-9.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-14.webp",
    ],
    description: "Mega milestone rally welcoming 500+ Harley-Davidson riders across South India with rock concerts and stunt arenas.",
    highlights: ["500+ Superbikes", "Rock Concert Arena", "Highway Security Logistics"],
    client: "Harley-Davidson Marina Chapter",
    year: "2023",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 10,
    title: "Doordarshan Election Conclave",
    category: "Corporate",
    subtitle: "Prasar Bharati",
    date: "04",
    month: "APR",
    time: "10:00am – 02:00pm",
    location: "Doordarshan Kendra Studio, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-5.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-5.webp",
    ],
    description: "Televised election debates and state-level political conclave staging with broadcast-ready lighting and acoustics.",
    highlights: ["Live National Broadcast", "Multi-Party Debate Podiums", "Broadcast Lighting Design"],
    client: "Prasar Bharati",
    year: "2026",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 11,
    title: "NYE Beach Night 2025",
    category: "Entertainment",
    subtitle: "Fortune Beach Resort",
    date: "31",
    month: "DEC",
    time: "20:00pm – 01:00am",
    location: "ECR Beachfront, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-10.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/NYE%20Beach%202025/image-15.webp",
    ],
    description: "Electrifying New Year's Eve celebration featuring international DJs, laser lighting spectacles, and seaside countdowns.",
    highlights: ["International DJ Sets", "Laser & Pyro Midnight Show", "VIP Cabanas"],
    client: "Fortune Beach Resort",
    year: "2025",
    tag: "ENTERTAINMENT",
    is_featured: true,
  },
  {
    id: 12,
    title: "BNP Paribas Annual Meet",
    category: "Corporate",
    subtitle: "BNP Paribas",
    date: "08",
    month: "DEC",
    time: "09:00am – 05:00pm",
    location: "Feathers Hotel, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-5.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-2.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-8.webp",
    ],
    description: "Annual meeting and global compliance forum for BNP Paribas India operations team.",
    highlights: ["Global Finance Keynote", "Interactive Polling", "Corporate Banquet"],
    client: "BNP Paribas",
    year: "2024",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 13,
    title: "Save a Child Marathon",
    category: "Corporate",
    subtitle: "Saveetha Eco Pupil School – Ekam NGO",
    date: "16",
    month: "FEB",
    time: "05:30am – 10:00am",
    location: "Besant Nagar Beach Promenade",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Save%20a%20Child%20EKAM%20Foundation%20Marathon/image-5.webp",
    ],
    description: "Charity 10K & 5K marathon with 3,000+ runners, route water stations, timing chips, and medal staging.",
    highlights: ["3,000+ Runners", "RFID Timing Gates", "Medical Support Stations"],
    client: "Saveetha Eco Pupil School – Ekam NGO",
    year: "2025",
    tag: "CORPORATE",
    is_featured: true,
  },
  {
    id: 14,
    title: "Toyota Hilux – Product Reveal",
    category: "Product Launch",
    subtitle: "Lanson Toyota",
    date: "12",
    month: "MAR",
    time: "11:00am – 04:00pm",
    location: "Lanson Toyota Flagship, Koyambedu",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-7.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Display%20Advertising%20of%20Classic%2048%20-%20VR%20Chennai/image-7.webp",
    ],
    description: "Off-road experiential launch of Toyota Hilux with obstacle course demo and rugged lifestyle thematic booth.",
    highlights: ["Custom Obstacle Ramp", "Rugged 4x4 Experience", "Media & VIP Drive"],
    client: "Lanson Toyota",
    year: "2024",
    tag: "PRODUCT LAUNCH",
    is_featured: true,
  },
  {
    id: 15,
    title: "Madarase Fashion Talent Hunt",
    category: "Entertainment",
    subtitle: "Phoenix Marketcity Chennai",
    date: "25",
    month: "OCT",
    time: "18:00pm – 23:00pm",
    location: "Phoenix Marketcity, Chennai",
    image: "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
    gallery: [
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-3.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-5.webp",
      "https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-7.webp",
    ],
    description: "Runway fashion talent showcase highlighting regional designers with celebrity jury and live stage broadcast.",
    highlights: ["Catwalk Setup", "Celebrity Jury Coordination", "Over 2,500 Spectators"],
    client: "Phoenix Marketcity Chennai",
    year: "2025",
    tag: "ENTERTAINMENT",
    is_featured: true,
  },
];

/**
 * Get all projects with optional filtering
 */
export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const { category, search } = req.query;

    let query = supabase.from("projects").select("*").order("id", { ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category as string);
    }
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase query fallback (projects):", error.message);
      let list = [...fallbackProjects];
      if (category && category !== "All") {
        list = list.filter((p) => p.category.toLowerCase().includes((category as string).toLowerCase()));
      }
      if (search) {
        list = list.filter((p) => p.title.toLowerCase().includes((search as string).toLowerCase()));
      }
      res.json({ success: true, count: list.length, projects: list, source: data?.length === 0 ? "fallback" : "error_fallback" });
      return;
    }

    res.json({ success: true, count: data.length, projects: data, source: "supabase" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching projects";
    res.status(500).json({ success: false, error: msg });
  }
}

/**
 * Get single project by ID
 */
export async function getProjectById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

    if (error || !data) {
      const found = fallbackProjects.find((p) => String(p.id) === id);
      if (found) {
        res.json({ success: true, project: found });
        return;
      }
      res.status(404).json({ success: false, error: "Project not found" });
      return;
    }

    res.json({ success: true, project: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error" });
  }
}

/**
 * Create new project (Admin)
 */
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const body: ProjectRecord = req.body;

    if (!body.title || !body.category || !body.image) {
      res.status(400).json({ success: false, error: "Title, category, and main cover image are required" });
      return;
    }

    const newProject = {
      title: body.title,
      category: body.category,
      subtitle: body.subtitle || "",
      date: body.date || "",
      month: body.month || "",
      time: body.time || "",
      location: body.location || "",
      image: body.image,
      gallery: body.gallery || [body.image],
      description: body.description || "",
      highlights: body.highlights || [],
      client: body.client || body.subtitle || "",
      year: body.year || "2026",
      tag: body.tag || (body.category.toUpperCase().includes("PRODUCT") ? "PRODUCT LAUNCH" : body.category.toUpperCase().includes("ENTERTAIN") ? "ENTERTAINMENT" : "CORPORATE"),
      is_featured: body.is_featured ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("projects").insert([newProject]).select().single();

    if (error) {
      console.warn("Supabase project insert fallback:", error.message);
      const mockProject = { ...newProject, id: Date.now() };
      fallbackProjects.unshift(mockProject);
      res.status(201).json({ success: true, project: mockProject, note: "Saved in runtime fallback" });
      return;
    }

    res.status(201).json({ success: true, project: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error creating project" });
  }
}

/**
 * Update project (Admin)
 */
export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body;

    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };
    delete updates.id;

    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single();

    if (error) {
      console.warn("Supabase update fallback:", error.message);
      const idx = fallbackProjects.findIndex((p) => String(p.id) === id);
      if (idx !== -1) {
        fallbackProjects[idx] = { ...fallbackProjects[idx], ...updates };
        res.json({ success: true, project: fallbackProjects[idx] });
        return;
      }
    }

    res.json({ success: true, project: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error updating project" });
  }
}

/**
 * Delete project (Admin)
 */
export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.warn("Supabase delete fallback:", error.message);
      const idx = fallbackProjects.findIndex((p) => String(p.id) === id);
      if (idx !== -1) {
        fallbackProjects.splice(idx, 1);
      }
    }

    res.json({ success: true, message: `Project ${id} deleted successfully` });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error deleting project" });
  }
}
