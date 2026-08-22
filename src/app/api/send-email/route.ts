import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Virtue IN Agency <onboarding@resend.dev>";

function baseWrapper(content: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Virtue IN Agency</title></head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F1F5F9;padding:30px 15px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
      <tr><td height="4" style="background:linear-gradient(90deg,#D97706 0%,#F59E0B 50%,#D97706 100%);"></td></tr>
      <tr><td style="padding:24px 32px 18px;text-align:center;border-bottom:1px solid #F1F5F9;">
        <div style="font-size:22px;font-weight:900;letter-spacing:1.5px;color:#0F172A;text-transform:uppercase;">V-RTUE <span style="color:#D97706;">IN.</span></div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#64748B;text-transform:uppercase;margin-top:2px;">Corporate Event Management</div>
      </td></tr>
      <tr><td style="padding:28px 32px;background-color:#FFFFFF;">${content}</td></tr>
      <tr><td style="padding:20px 32px;background-color:#F8FAFC;border-top:1px solid #E2E8F0;text-align:center;">
        <p style="margin:0 0 6px;font-size:12px;color:#475569;font-weight:600;">Virtue IN Agency • Mylapore, Chennai – 600 004</p>
        <p style="margin:0;font-size:11px;color:#64748B;">Phone: <a href="tel:+917401030000" style="color:#D97706;text-decoration:none;font-weight:700;">+91 74010 30000</a> | Email: <a href="mailto:plan@virtuein.agency" style="color:#D97706;text-decoration:none;font-weight:700;">plan@virtuein.agency</a></p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { enquiryId, toEmail, subject, message, actionLink } = body;

    if (!toEmail || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Recipient email, subject, and message are required." },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="text-align: left;">
        <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #0F172A;">
          ${subject}
        </h2>
        <div style="font-size: 14px; line-height: 1.7; color: #1E293B; margin-bottom: 24px; white-space: pre-line; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px;">
          ${message}
        </div>
        ${
          actionLink?.url
            ? `<div style="text-align: center; margin: 20px 0;">
                <a href="${actionLink.url}" style="display: inline-block; background-color: #D97706; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 800;">
                  ${actionLink.text || "View Details"}
                </a>
              </div>`
            : ""
        }
        <div style="border-top: 1px solid #E2E8F0; padding-top: 14px; margin-top: 20px;">
          <p style="margin: 0; font-size: 12px; color: #64748B;">
            Warm regards,<br>
            <strong style="color: #0F172A;">Virtue IN Agency Executive Team</strong><br>
            <span style="color: #D97706;">Chennai, India</span>
          </p>
        </div>
      </div>
    `;

    const resendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject,
      html: baseWrapper(htmlContent),
    });

    if (resendResult.error) {
      return NextResponse.json(
        { success: false, error: resendResult.error.message },
        { status: 500 }
      );
    }

    const mailRecord = {
      sent_at: new Date().toISOString(),
      subject,
      status: "sent",
      resendId: resendResult.data?.id,
    };

    // If linked to enquiry, log in mail_history & update status if new
    if (enquiryId) {
      const { data: currentEnq } = await supabase
        .from("enquiries")
        .select("status, mail_history")
        .eq("id", enquiryId)
        .single();

      const existingHistory = currentEnq?.mail_history || [];
      const updatedHistory = [...existingHistory, mailRecord];

      await supabase
        .from("enquiries")
        .update({
          mail_history: updatedHistory,
          status: currentEnq?.status === "new" ? "mail_sent" : currentEnq?.status,
        })
        .eq("id", enquiryId);
    }

    return NextResponse.json({
      success: true,
      message: `Email dispatched successfully via Resend to ${toEmail}`,
      mailRecord,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to send email." },
      { status: 500 }
    );
  }
}
