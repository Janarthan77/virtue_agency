import { Request, Response } from "express";
import { supabase, ServiceRecord } from "../services/supabase.service.js";

/**
 * Get all services directly from Supabase DB
 */
export async function getServices(req: Request, res: Response): Promise<void> {
  try {
    const { search } = req.query;

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Supabase services error:", error.message);
      res.status(500).json({
        success: false,
        services: [],
        error: error.message,
      });
      return;
    }

    let list = (data || []) as ServiceRecord[];

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
      services: [],
      error: err instanceof Error ? err.message : "Internal server error fetching services",
    });
  }
}

/**
 * Get single service by ID from Supabase DB
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
 * Create new service in Supabase DB
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
      res.status(400).json({ success: false, error: error.message });
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
 * Update service in Supabase DB
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
 * Delete service from Supabase DB
 */
export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
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
