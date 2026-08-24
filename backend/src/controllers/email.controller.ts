import { Request, Response } from "express";
import { sendEmail } from "../services/resend.service.js";
import { supabase } from "../services/supabase.service.js";
import { fallbackEnquiries } from "./enquiries.controller.js";

export async function handleSendEmail(req: Request, res: Response): Promise<void> {
  try {
    const { enquiryId, toEmail, subject, message, templateType } = req.body;

    if (!toEmail || !subject || !message) {
      res.status(400).json({ success: false, error: "Recipient email, subject, and message are required" });
      return;
    }

    const emailResult = await sendEmail({
      to: toEmail,
      subject,
      text: message,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <div style="background: #0f172a; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em;">
              VIRTUE <span style="color: #fbbf24;">IN.</span>
            </h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">
              Luxury Event Production &amp; Brand Experiences
            </p>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="font-size: 14px; color: #334155; white-space: pre-line;">${message}</div>
            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #64748b; margin: 0;">
              Warm regards,<br />
              <strong>Virtue IN Agency Executive Desk</strong><br />
              Chennai, India | Direct: +91 74010 30000
            </p>
          </div>
        </div>
      `,
    });

    if (!emailResult.success) {
      res.status(500).json({ success: false, error: emailResult.error });
      return;
    }

    const mailRecord = {
      sent_at: new Date().toISOString(),
      subject,
      message,
      status: "delivered",
      template: templateType || "custom",
      resendId: (emailResult.data as any)?.id || "sent",
    };

    // If enquiryId provided, update enquiry mail history
    if (enquiryId) {
      const { data: enq } = await supabase.from("enquiries").select("mail_history").eq("id", enquiryId).single();
      const updatedHistory = [...(enq?.mail_history || []), mailRecord];

      await supabase
        .from("enquiries")
        .update({
          status: "mail_sent",
          mail_history: updatedHistory,
        })
        .eq("id", enquiryId);

      const fallbackIdx = fallbackEnquiries.findIndex((e) => e.id === enquiryId);
      if (fallbackIdx !== -1) {
        fallbackEnquiries[fallbackIdx].status = "mail_sent";
        fallbackEnquiries[fallbackIdx].mail_history = [
          ...(fallbackEnquiries[fallbackIdx].mail_history || []),
          mailRecord,
        ];
      }
    }

    res.json({
      success: true,
      message: "Email sent successfully via Resend",
      mailRecord,
    });
  } catch (err: unknown) {
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : "Error sending email" });
  }
}
