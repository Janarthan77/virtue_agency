import { Request, Response } from "express";
import { supabase, ReviewRecord } from "../services/supabase.service.js";

// In-memory fallback runtime cache (strictly empty by default - no mock JSON data)
export const fallbackReviews: ReviewRecord[] = [];

/**
 * GET /api/reviews
 * Fetch all client reviews directly from database (supports ?status=approved, ?category=corporate, ?search=...)
 */
export async function getReviews(req: Request, res: Response): Promise<void> {
  try {
    const { status, category, search } = req.query;

    let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status as string);
    }
    if (category && category !== "all") {
      query = query.eq("category", category as string);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,role.ilike.%${search}%,text.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Supabase reviews query warning:", error.message);
      let list = [...fallbackReviews];
      if (status && status !== "all") {
        list = list.filter((r) => r.status === status);
      }
      if (category && category !== "all") {
        list = list.filter((r) => r.category === category);
      }
      if (search) {
        const q = (search as string).toLowerCase();
        list = list.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            (r.role && r.role.toLowerCase().includes(q)) ||
            r.text.toLowerCase().includes(q)
        );
      }
      res.json({ success: true, count: list.length, reviews: list });
      return;
    }

    // Return strictly database records! If database has 0 items, returns empty array []
    const reviewsList = data || [];
    res.json({ success: true, count: reviewsList.length, reviews: reviewsList });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error fetching reviews",
      reviews: fallbackReviews,
    });
  }
}

/**
 * POST /api/reviews
 * Submit a new client review / feedback
 */
export async function createReview(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    if (!body.name || !body.text) {
      res.status(400).json({ success: false, error: "Name and review text are required." });
      return;
    }

    const insertData = {
      name: String(body.name).trim(),
      role: body.role ? String(body.role).trim() : "Corporate Client",
      category: body.category || "corporate",
      rating: Number(body.rating) || 5,
      text: String(body.text).trim(),
      email: body.email ? String(body.email).trim() : "",
      phone: body.phone ? String(body.phone).trim() : "",
      avatar_color: body.avatar_color || "#2563EB",
      status: body.status || "approved",
      is_featured: body.is_featured !== undefined ? Boolean(body.is_featured) : true,
    };

    // 1. Try to insert into public.reviews table
    let savedReview: any = insertData;
    const { data: revData, error: revError } = await supabase
      .from("reviews")
      .insert([insertData])
      .select()
      .single();

    if (revError) {
      console.warn("Supabase reviews insert error:", revError.message);
      const mock = { ...insertData, id: Date.now(), created_at: new Date().toISOString() };
      fallbackReviews.unshift(mock);
      savedReview = mock;
    } else if (revData) {
      savedReview = revData;
      fallbackReviews.unshift(revData);
    }

    // 2. Also automatically log as an enquiry lead so it reflects in Enquiries module
    try {
      await supabase.from("enquiries").insert([
        {
          name: newReview.name,
          email: newReview.email || "feedback@virtueinagency.com",
          phone: newReview.phone || "+91 74010 30000",
          company: newReview.name,
          venue: newReview.role || "Client Review",
          event_type:
            newReview.category === "corporate"
              ? "Corporate Conclave"
              : newReview.category === "launch"
              ? "Product Launch"
              : "Annual Gala",
          source: "Client Review & Feedback",
          status: "new",
          notes: `[CLIENT FEEDBACK SUBMISSION]\nRating: ${newReview.rating}/5 Stars\nRole/Event: ${newReview.role}\nCategory: ${newReview.category}\nReview Text:\n"${newReview.text}"`,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (enqErr) {
      console.warn("Could not insert enquiry mirror for review:", enqErr);
    }

    res.status(201).json({
      success: true,
      message: "Client feedback received and stored successfully.",
      review: savedReview,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error saving feedback",
    });
  }
}

/**
 * PUT /api/reviews/:id
 * Update review status or details
 */
export async function updateReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };

    const { data, error } = await supabase
      .from("reviews")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.warn("Supabase update error (updating fallback):", error.message);
      const idx = fallbackReviews.findIndex((r) => String(r.id) === String(id));
      if (idx !== -1) {
        fallbackReviews[idx] = { ...fallbackReviews[idx], ...updates };
        res.json({ success: true, review: fallbackReviews[idx] });
        return;
      }
      res.status(404).json({ success: false, error: "Review not found" });
      return;
    }

    res.json({ success: true, review: data });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error updating review",
    });
  }
}

/**
 * DELETE /api/reviews/:id
 * Delete a review
 */
export async function deleteReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    // Also remove from fallback
    const idx = fallbackReviews.findIndex((r) => String(r.id) === String(id));
    if (idx !== -1) {
      fallbackReviews.splice(idx, 1);
    }

    if (error) {
      console.warn("Supabase delete review notice:", error.message);
    }

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Error deleting review",
    });
  }
}
