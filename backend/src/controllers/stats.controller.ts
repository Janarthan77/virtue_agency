import { Request, Response } from "express";
import { supabase } from "../services/supabase.service.js";
import { fallbackEnquiries } from "./enquiries.controller.js";
import { fallbackProjects } from "./projects.controller.js";
import { fallbackGallery } from "./gallery.controller.js";
import { fallbackServices } from "./services.controller.js";

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  try {
    const { data: enquiries } = await supabase.from("enquiries").select("status, mail_history");
    const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
    const { count: galleryCount } = await supabase.from("gallery").select("*", { count: "exact", head: true });
    const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true });

    const list = enquiries || fallbackEnquiries;

    let newCount = 0;
    let inReviewCount = 0;
    let contactedCount = 0;
    let mailSentCount = 0;
    let archivedCount = 0;
    let totalEmailsSent = 0;

    list.forEach((e: any) => {
      if (e.status === "new") newCount++;
      else if (e.status === "in_review") inReviewCount++;
      else if (e.status === "contacted") contactedCount++;
      else if (e.status === "mail_sent") mailSentCount++;
      else if (e.status === "archived") archivedCount++;

      if (e.mail_history && Array.isArray(e.mail_history)) {
        totalEmailsSent += e.mail_history.length;
      }
    });

    res.json({
      success: true,
      stats: {
        total: list.length,
        new: newCount,
        inReview: inReviewCount,
        contacted: contactedCount,
        mailSent: mailSentCount,
        archived: archivedCount,
        totalEmailsSent,
        totalProjects: projectCount || fallbackProjects.length,
        totalGalleryItems: galleryCount || fallbackGallery.length,
        totalServices: servicesCount || fallbackServices.length,
      },
    });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error fetching stats" });
  }
}

