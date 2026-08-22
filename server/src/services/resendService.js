import { Resend } from "resend";
import { getAdminLeadAlertTemplate, getClientConfirmationTemplate, getAdminCustomReplyTemplate } from "../templates/emails.js";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "Virtue IN Agency <onboarding@resend.dev>";
const adminEmail = process.env.ADMIN_EMAIL;

let resendClient = null;
if (apiKey) {
  try {
    resendClient = new Resend(apiKey);
  } catch (err) {
    console.warn("⚠️ [Resend] Failed to initialize Resend client:", err.message);
  }
}

/**
 * 1. Send Alert Email to ADMIN when a client submits an enquiry
 */
export async function sendAdminNotificationEmail(enquiry) {
  if (!resendClient) {
    console.warn("⚠️ [Resend] API key not found. Simulated Admin notification for lead:", enquiry.name);
    return { success: true, simulated: true };
  }

  // Target receiver is the Admin Email from .env
  const rawAdmin = process.env.ADMIN_EMAIL || adminEmail;
  const targetAdminEmail = String(rawAdmin).replace(/[\r\n]/g, "").trim();

  try {
    const html = getAdminLeadAlertTemplate(enquiry);
    const result = await resendClient.emails.send({
      from: fromEmail,
      to: String(targetAdminEmail).trim(),
      replyTo: enquiry.email,
      subject: `🚨 New Lead: ${enquiry.name} (${enquiry.event_type || "Event Inquiry"}) - Virtue IN`,
      html,
    });

    if (result.error) {
      console.error("❌ [Resend Admin Alert Error]:", result.error);
      return { success: false, error: result.error.message };
    }

    console.log("✅ [Resend] Admin Lead Alert sent to", targetAdminEmail, "ID:", result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error("❌ [Resend Admin Alert Exception]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. Send automatic enquiry confirmation email to client
 */
export async function sendEnquiryConfirmationEmail(enquiry) {
  if (!resendClient) {
    return { success: true, simulated: true };
  }

  try {
    const html = getClientConfirmationTemplate(enquiry);
    const result = await resendClient.emails.send({
      from: fromEmail,
      to: [enquiry.email],
      subject: `Enquiry Received: ${enquiry.event_type || "Event Consultation"} - Virtue IN Agency`,
      html,
    });

    if (result.error) {
      console.error("❌ [Resend Client Confirmation Error]:", result.error);
      return { success: false, error: result.error.message };
    }

    console.log("✅ [Resend] Confirmation email sent to client:", enquiry.email, "ID:", result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 3. Send custom or templated email from Admin to an enquiry
 */
export async function sendAdminCustomEmail({ enquiry, toEmail, subject, message, actionLink }) {
  if (!resendClient) {
    return { success: true, simulated: true };
  }

  const recipient = toEmail || enquiry?.email;
  if (!recipient) {
    return { success: false, error: "No recipient email provided" };
  }

  try {
    const html = getAdminCustomReplyTemplate(enquiry || { name: "Client" }, subject, message, actionLink);
    const result = await resendClient.emails.send({
      from: fromEmail,
      to: [recipient],
      subject: subject || `Regarding your enquiry - Virtue IN Agency`,
      html,
    });

    if (result.error) {
      console.error("❌ [Resend Error]:", result.error);
      return { success: false, error: result.error.message };
    }

    console.log("✅ [Resend] Admin email sent to", recipient, "ID:", result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error("❌ [Resend Exception]:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Check Resend API connectivity
 */
export function getResendStatus() {
  return {
    configured: Boolean(apiKey),
    sender: fromEmail,
    adminReceiver: process.env.ADMIN_EMAIL || adminEmail,
  };
}
