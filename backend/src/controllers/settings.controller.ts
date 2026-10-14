import { Request, Response } from "express";
import { supabase, CompanySettingsRecord } from "../services/supabase.service.js";

/**
 * Get company contact & general settings from Supabase DB
 */
export async function getCompanySettings(req: Request, res: Response): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("company_settings")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase settings error:", error.message);
      res.status(500).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, settings: data || null });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error fetching settings",
    });
  }
}

/**
 * Update company contact & general settings in Supabase DB
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
    const { data: existing } = await supabase
      .from("company_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

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
      res.status(400).json({ success: false, error: resultError.message });
      return;
    }

    res.json({ success: true, settings: resultData });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error updating settings",
    });
  }
}
