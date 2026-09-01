import { Request, Response } from "express";
import { supabase, CompanySettingsRecord } from "../services/supabase.service.js";

export const fallbackSettings: CompanySettingsRecord = {
  id: 1,
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
  updated_at: new Date().toISOString(),
};

/**
 * Get company contact & general settings
 */
export async function getCompanySettings(req: Request, res: Response): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("company_settings")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Supabase settings fallback:", error.message);
      res.json({ success: true, settings: fallbackSettings, source: "fallback" });
      return;
    }

    res.json({ success: true, settings: data, source: "supabase" });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error fetching settings" });
  }
}

/**
 * Update company contact & general settings
 */
export async function updateCompanySettings(req: Request, res: Response): Promise<void> {
  try {
    const body: Partial<CompanySettingsRecord> = req.body;

    const updates: CompanySettingsRecord = {
      ...body,
      updated_at: new Date().toISOString(),
    };
    delete updates.id;

    // Check if row exists in Supabase
    const { data: existing } = await supabase.from("company_settings").select("id").limit(1).maybeSingle();

    let resultData = null;
    let resultError = null;

    if (existing?.id) {
      const { data, error } = await supabase
        .from("company_settings")
        .update(updates)
        .eq("id", existing.id)
        .select()
        .single();
      resultData = data;
      resultError = error;
    } else {
      const { data, error } = await supabase
        .from("company_settings")
        .insert([{ ...updates, id: 1 }])
        .select()
        .single();
      resultData = data;
      resultError = error;
    }

    if (resultError) {
      console.warn("Supabase settings update fallback:", resultError.message);
      Object.assign(fallbackSettings, updates);
      res.json({ success: true, settings: fallbackSettings, note: "Saved in runtime fallback" });
      return;
    }

    Object.assign(fallbackSettings, resultData);
    res.json({ success: true, settings: resultData });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error updating settings" });
  }
}
