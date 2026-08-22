import { Router } from "express";
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "../db/supabase.js";
import { sendEnquiryConfirmationEmail, sendAdminNotificationEmail } from "../services/resendService.js";

const router = Router();

/**
 * @route   POST /api/enquiries
 * @desc    Submit new enquiry from Contact Form & Send Admin Alert + Client Confirmation via Resend
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, venue, event_type, country_code, team_size, budget, preferred_date, source, notes } = req.body;

    // Validation
    if (!name || !email || !phone || !company || !venue || !event_type) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields (Name, Email, Phone, Company, Venue, Event Type).",
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    // Save to Database (Supabase / local fallback)
    const newEnquiry = await createEnquiry({
      name,
      email,
      phone,
      company,
      venue,
      event_type,
      country_code: country_code || "+91",
      team_size: team_size || "",
      budget: budget || "",
      preferred_date: preferred_date || "",
      source: source || "",
      notes: notes || "",
    });

    // 1. Send Alert Email to Admin (receives lead details with instant Reply-To)
    let adminEmailResult = { success: false };
    try {
      adminEmailResult = await sendAdminNotificationEmail(newEnquiry);
    } catch (adminMailErr) {
      console.error("⚠️ Failed to dispatch Admin Lead alert:", adminMailErr.message);
    }

    // 2. Send Auto-Confirmation Email to Client
    let clientEmailResult = { success: false };
    try {
      clientEmailResult = await sendEnquiryConfirmationEmail(newEnquiry);
    } catch (clientMailErr) {
      console.error("⚠️ Failed to dispatch client confirmation:", clientMailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry: newEnquiry,
      adminNotification: adminEmailResult,
      clientConfirmation: clientEmailResult,
    });
  } catch (error) {
    console.error("❌ Error in POST /api/enquiries:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while processing enquiry.",
    });
  }
});

/**
 * @route   GET /api/enquiries
 * @desc    Get list of enquiries with filtering & search
 */
router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;
    const enquiries = await getEnquiries({ status, search });

    return res.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("❌ Error in GET /api/enquiries:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch enquiries.",
    });
  }
});

/**
 * @route   GET /api/enquiries/:id
 * @desc    Get single enquiry
 */
router.get("/:id", async (req, res) => {
  try {
    const enquiry = await getEnquiryById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: "Enquiry not found" });
    }
    return res.json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   PATCH /api/enquiries/:id
 * @desc    Update status or notes of an enquiry
 */
router.patch("/:id", async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const updated = await updateEnquiry(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Enquiry not found" });
    }

    return res.json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   DELETE /api/enquiries/:id
 * @desc    Delete an enquiry
 */
router.delete("/:id", async (req, res) => {
  try {
    const success = await deleteEnquiry(req.params.id);
    return res.json({ success, message: "Enquiry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
