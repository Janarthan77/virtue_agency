import { Router } from "express";
import { getEnquiryById, addMailRecord, getEnquiries, getDbStatus } from "../db/supabase.js";
import { sendAdminCustomEmail, getResendStatus } from "../services/resendService.js";

const router = Router();

/**
 * @route   POST /api/send-email
 * @desc    Send email to an enquiry client via Resend from Admin Portal
 */
router.post("/send-email", async (req, res) => {
  try {
    const { enquiryId, toEmail, subject, message, actionLink, templateType } = req.body;

    if (!message || (!enquiryId && !toEmail)) {
      return res.status(400).json({
        success: false,
        error: "Message and recipient (enquiryId or toEmail) are required.",
      });
    }

    let enquiry = null;
    if (enquiryId) {
      enquiry = await getEnquiryById(enquiryId);
    }

    if (!enquiry && toEmail) {
      enquiry = { email: toEmail, name: "Client" };
    }

    if (!enquiry) {
      return res.status(404).json({ success: false, error: "Enquiry not found." });
    }

    const emailSubject = subject || `Regarding your Event Enquiry - Virtue IN Agency`;

    // Send via Resend
    const result = await sendAdminCustomEmail({
      enquiry,
      toEmail: toEmail || enquiry.email,
      subject: emailSubject,
      message,
      actionLink,
    });

    if (!result.success && !result.simulated) {
      return res.status(500).json({
        success: false,
        error: result.error || "Failed to send email via Resend.",
      });
    }

    // Record email in history if enquiryId is valid
    const mailRecord = {
      sent_at: new Date().toISOString(),
      subject: emailSubject,
      message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      status: result.success ? "sent" : "simulated",
      template: templateType || "custom",
      resendId: result.messageId || null,
    };

    if (enquiryId) {
      await addMailRecord(enquiryId, mailRecord);
    }

    return res.json({
      success: true,
      message: "Email sent successfully via Resend!",
      mailRecord,
      resendResult: result,
    });
  } catch (error) {
    console.error("❌ Error in POST /api/send-email:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/stats
 * @desc    Get summary counts and statistics for Admin Dashboard
 */
router.get("/stats", async (req, res) => {
  try {
    const all = await getEnquiries();
    const total = all.length;
    const newCount = all.filter((e) => e.status === "new").length;
    const inReviewCount = all.filter((e) => e.status === "in_review").length;
    const contactedCount = all.filter((e) => e.status === "contacted").length;
    const mailSentCount = all.filter((e) => e.status === "mail_sent").length;
    const archivedCount = all.filter((e) => e.status === "archived").length;

    // Total emails sent across all leads
    const totalEmailsSent = all.reduce((acc, curr) => acc + (curr.mail_history?.length || 0), 0);

    return res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        inReview: inReviewCount,
        contacted: contactedCount,
        mailSent: mailSentCount,
        archived: archivedCount,
        totalEmailsSent,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route   GET /api/status
 * @desc    Get system connectivity status
 */
router.get("/status", async (req, res) => {
  try {
    const resend = getResendStatus();
    const db = getDbStatus();

    return res.json({
      success: true,
      server: {
        status: "online",
        time: new Date().toISOString(),
        version: "1.0.0",
      },
      resend,
      database: db,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
