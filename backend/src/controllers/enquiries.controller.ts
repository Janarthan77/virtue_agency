import { Request, Response } from "express";
import { supabase, EnquiryRecord } from "../services/supabase.service.js";
import { sendEmail } from "../services/resend.service.js";

// Runtime fallback for enquiries
export const fallbackEnquiries: EnquiryRecord[] = [];

/**
 * Fetch enquiries for admin
 */
export async function getEnquiries(req: Request, res: Response): Promise<void> {
  try {
    const { status, search } = req.query;

    let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status as string);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,venue.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Supabase enquiries query error (using fallback):", error.message);
      let list = [...fallbackEnquiries];
      if (status && status !== "all") {
        list = list.filter((e) => e.status === status);
      }
      if (search) {
        const q = (search as string).toLowerCase();
        list = list.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.email.toLowerCase().includes(q) ||
            (e.company && e.company.toLowerCase().includes(q))
        );
      }
      res.json({ success: true, count: list.length, enquiries: list });
      return;
    }

    res.json({ success: true, count: data?.length || 0, enquiries: data || [] });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error fetching enquiries" });
  }
}

/**
 * Submit an enquiry from the public website contact form
 */
export async function createEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    if (!body.name || !body.email || !body.phone) {
      res.status(400).json({ success: false, error: "Name, email, and phone are required." });
      return;
    }

    const newRecord: EnquiryRecord = {
      name: body.name,
      email: body.email,
      country_code: body.country_code || "+91",
      phone: body.phone,
      company: body.company || "Individual",
      venue: body.venue || "To be discussed",
      event_type: body.event_type || "Corporate Event",
      team_size: body.team_size || "50-100",
      budget: body.budget || "Flexible",
      preferred_date: body.preferred_date || "",
      source: body.source || "Website Form",
      status: "new",
      notes: body.notes || "",
      mail_history: [],
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("enquiries").insert([newRecord]).select().single();

    if (error) {
      console.warn("Supabase insert error (saving to fallback):", error.message);
      const mock = { ...newRecord, id: `mock-${Date.now()}` };
      fallbackEnquiries.unshift(mock);
      res.status(201).json({ success: true, enquiry: mock });
      return;
    }

    // Try sending notification to agency admin
    const adminEmail = process.env.ADMIN_EMAIL || "janarthan200802@gmail.com";
    sendEmail({
      to: adminEmail,
      subject: `✨ New Event Enquiry from ${newRecord.name} (${newRecord.event_type})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0f172a;">New Event Enquiry Received</h2>
          <p><strong>Client Name:</strong> ${newRecord.name}</p>
          <p><strong>Company:</strong> ${newRecord.company}</p>
          <p><strong>Email:</strong> ${newRecord.email}</p>
          <p><strong>Phone:</strong> ${newRecord.country_code} ${newRecord.phone}</p>
          <p><strong>Event Type:</strong> ${newRecord.event_type}</p>
          <p><strong>Venue / City:</strong> ${newRecord.venue}</p>
          <p><strong>Estimated Budget:</strong> ${newRecord.budget}</p>
          <p><strong>Preferred Date:</strong> ${newRecord.preferred_date || "Flexible"}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">Virtue IN Agency Automated Lead Notification</p>
        </div>
      `,
    }).catch((e) => console.error("Admin notification email failed:", e));

    res.status(201).json({ success: true, enquiry: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error submitting enquiry" });
  }
}

/**
 * Update enquiry status or notes
 */
export async function updateEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body;

    const { data, error } = await supabase.from("enquiries").update(body).eq("id", id).select().single();

    if (error) {
      console.warn("Supabase update error (updating fallback):", error.message);
      const idx = fallbackEnquiries.findIndex((e) => e.id === id);
      if (idx !== -1) {
        fallbackEnquiries[idx] = { ...fallbackEnquiries[idx], ...body };
        res.json({ success: true, enquiry: fallbackEnquiries[idx] });
        return;
      }
    }

    res.json({ success: true, enquiry: data });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error updating enquiry" });
  }
}

/**
 * Delete enquiry
 */
export async function deleteEnquiry(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (error) {
      console.warn("Supabase delete error (deleting fallback):", error.message);
      const idx = fallbackEnquiries.findIndex((e) => e.id === id);
      if (idx !== -1) fallbackEnquiries.splice(idx, 1);
    }

    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error deleting enquiry" });
  }
}
