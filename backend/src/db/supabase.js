import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
let isSupabaseLive = false;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log("⚡ [Supabase] Initialized client for:", supabaseUrl);
  } catch (err) {
    console.warn("⚠️ [Supabase] Failed to initialize client:", err.message);
  }
}

// In-memory fallback storage
let mockEnquiries = [];

/**
 * Verify and test Supabase connection
 */
export async function testSupabaseConnection() {
  if (!supabase) return { live: false, reason: "Credentials not provided" };
  try {
    const { data, error } = await supabase.from("enquiries").select("id").limit(1);
    if (error) {
      console.warn("⚠️ [Supabase] Table check error:", error.message);
      return { live: false, reason: error.message };
    }
    isSupabaseLive = true;
    console.log("✅ [Supabase] Live and successfully connected to 'enquiries' table!");
    return { live: true };
  } catch (err) {
    console.warn("⚠️ [Supabase] Connection error:", err.message);
    return { live: false, reason: err.message };
  }
}

/**
 * Fetch all enquiries with optional filters
 */
export async function getEnquiries({ status, search } = {}) {
  // If Supabase is connected, fetch from Supabase
  if (supabase) {
    try {
      let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false });

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,event_type.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        isSupabaseLive = true;
        return data;
      } else if (error) {
        console.warn("⚠️ [Supabase] getEnquiries error:", error.message);
      }
    } catch (e) {
      console.warn("⚠️ [Supabase] Fetch failed, falling back to local store:", e.message);
    }
  }

  // Fallback to local / mock store
  let results = [...mockEnquiries];

  if (status && status !== "all") {
    results = results.filter((item) => item.status === status);
  }

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.company?.toLowerCase().includes(term) ||
        item.event_type?.toLowerCase().includes(term)
    );
  }

  return results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Get single enquiry by ID
 */
export async function getEnquiryById(id) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("enquiries").select("*").eq("id", id).single();
      if (!error && data) return data;
    } catch (e) {
      // fallback
    }
  }
  return mockEnquiries.find((item) => item.id === id) || null;
}

/**
 * Insert new enquiry
 */
export async function createEnquiry(enquiryData) {
  const insertPayload = {
    name: enquiryData.name || "",
    email: enquiryData.email || "",
    country_code: enquiryData.country_code || "+91",
    phone: enquiryData.phone || "",
    company: enquiryData.company || "",
    venue: enquiryData.venue || "",
    event_type: enquiryData.event_type || "",
    team_size: enquiryData.team_size || null,
    budget: enquiryData.budget || null,
    preferred_date: enquiryData.preferred_date || null,
    source: enquiryData.source || null,
    status: enquiryData.status || "new",
    notes: enquiryData.notes || "",
    mail_history: enquiryData.mail_history || [],
  };

  // Insert into Supabase (Let Supabase generate the UUID)
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .insert([insertPayload])
        .select()
        .single();

      if (!error && data) {
        console.log("✅ [Supabase] Inserted record into Supabase successfully! ID:", data.id);
        isSupabaseLive = true;
        return data;
      } else if (error) {
        console.error("❌ [Supabase Insert Error]:", error);
      }
    } catch (e) {
      console.error("❌ [Supabase Insert Exception]:", e.message);
    }
  }

  // Fallback store
  const fallbackRecord = {
    ...insertPayload,
    id: `local_${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  mockEnquiries.unshift(fallbackRecord);
  return fallbackRecord;
}

/**
 * Update enquiry status or notes
 */
export async function updateEnquiry(id, updates) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        console.log("✅ [Supabase] Updated enquiry in Supabase DB:", id);
        return data;
      } else if (error) {
        console.warn("⚠️ [Supabase] updateEnquiry error:", error.message);
      }
    } catch (e) {
      console.warn("⚠️ [Supabase] Update exception:", e.message);
    }
  }

  const idx = mockEnquiries.findIndex((item) => item.id === id);
  if (idx !== -1) {
    mockEnquiries[idx] = { ...mockEnquiries[idx], ...updates };
    return mockEnquiries[idx];
  }
  return null;
}

/**
 * Delete enquiry
 */
export async function deleteEnquiry(id) {
  if (supabase) {
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (!error) {
        console.log("✅ [Supabase] Deleted enquiry from Supabase DB:", id);
        return true;
      } else {
        console.warn("⚠️ [Supabase] delete error:", error.message);
      }
    } catch (e) {
      console.warn("⚠️ [Supabase] Delete exception:", e.message);
    }
  }
  mockEnquiries = mockEnquiries.filter((item) => item.id !== id);
  return true;
}

/**
 * Add a sent email record to enquiry's history
 */
export async function addMailRecord(id, mailRecord) {
  const enquiry = await getEnquiryById(id);
  if (!enquiry) return null;

  const updatedHistory = [...(enquiry.mail_history || []), mailRecord];
  return await updateEnquiry(id, {
    mail_history: updatedHistory,
    status: enquiry.status === "new" ? "mail_sent" : enquiry.status,
  });
}

/**
 * Get DB connectivity info
 */
export function getDbStatus() {
  return {
    configured: Boolean(supabaseUrl && supabaseKey),
    isLive: isSupabaseLive,
    url: supabaseUrl || null,
    totalRecordsCount: mockEnquiries.length,
  };
}
