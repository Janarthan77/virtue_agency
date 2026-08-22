import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "Virtue IN Agency <onboarding@resend.dev>";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "janarthan200802@gmail.com").trim();

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

function row(label: string, value: string, color = "#0F172A", weight = "700") {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 16px;font-size:13px;color:#64748B;font-weight:600;width:38%;border-bottom:1px solid #E2E8F0;">${label}</td>
    <td style="padding:10px 16px;font-size:13px;color:${color};font-weight:${weight};border-bottom:1px solid #E2E8F0;">${value}</td>
  </tr>`;
}

function adminHtml(e: Record<string, string>) {
  return baseWrapper(`
    <div style="text-align:left;">
      <div style="display:inline-block;background-color:#FEF3C7;border:1px solid #FCD34D;padding:4px 12px;border-radius:999px;font-size:11px;font-weight:800;color:#92400E;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">🚨 New Client Enquiry</div>
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#0F172A;">New Lead: <span style="color:#D97706;">${e.name}</span></h2>
      <p style="margin:0 0 20px;font-size:13px;color:#64748B;">Complete client specifications submitted via website:</p>
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin-bottom:22px;border-collapse:separate;overflow:hidden;">
        <tr style="background-color:#F1F5F9;"><td colspan="2" style="padding:10px 16px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#334155;border-bottom:2px solid #D97706;">👤 Client Details</td></tr>
        ${row("Client Name:", e.name, "#0F172A", "800")}
        <tr><td style="padding:10px 16px;font-size:13px;color:#64748B;font-weight:600;border-bottom:1px solid #E2E8F0;">Email:</td><td style="padding:10px 16px;font-size:13px;border-bottom:1px solid #E2E8F0;"><a href="mailto:${e.email}" style="color:#2563EB;text-decoration:none;font-weight:700;">✉️ ${e.email}</a></td></tr>
        <tr><td style="padding:10px 16px;font-size:13px;color:#64748B;font-weight:600;border-bottom:1px solid #E2E8F0;">Phone:</td><td style="padding:10px 16px;font-size:13px;font-weight:800;border-bottom:1px solid #E2E8F0;"><a href="tel:${e.country_code||"+91"}${e.phone}" style="color:#D97706;text-decoration:none;">📞 ${e.country_code||"+91"} ${e.phone}</a></td></tr>
        ${row("Company:", e.company)}
        ${row("Event Type:", e.event_type, "#0F172A", "800")}
        ${row("Venue:", e.venue)}
        ${row("Budget:", e.budget, "#059669", "800")}
        ${row("Target Date:", e.preferred_date)}
        ${row("Guests:", e.team_size)}
      </table>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr><td align="center" style="padding-bottom:10px;"><a href="tel:${e.country_code||"+91"}${e.phone}" style="display:block;width:90%;background-color:#D97706;color:#FFFFFF;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:800;text-align:center;">📞 Call: ${e.country_code||"+91"} ${e.phone}</a></td></tr>
        <tr><td align="center"><a href="mailto:${e.email}?subject=Regarding your Event Enquiry - Virtue IN Agency" style="display:block;width:90%;background-color:#0F172A;color:#FFFFFF;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;">✉️ Reply via Email</a></td></tr>
      </table>
    </div>`);
}

function clientHtml(e: Record<string, string>) {
  return baseWrapper(`
    <div style="text-align:left;">
      <div style="display:inline-block;background-color:#DCFCE7;border:1px solid #86EFAC;padding:4px 12px;border-radius:999px;font-size:11px;font-weight:800;color:#166534;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">✓ Enquiry Received</div>
      <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#0F172A;">Hello ${e.name},</h2>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#475569;">Thank you for reaching out to <strong>Virtue IN Agency</strong>. We have received your event specifications. Our lead producer will review your requirements and share a tailored proposal within 24 hours.</p>
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin-bottom:22px;border-collapse:separate;overflow:hidden;">
        <tr style="background-color:#F1F5F9;"><td colspan="2" style="padding:10px 16px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#334155;border-bottom:2px solid #D97706;">Your Enquiry Overview</td></tr>
        ${row("Client Name:", e.name)}
        ${row("Email:", e.email)}
        ${row("Phone:", `${e.country_code||"+91"} ${e.phone}`, "#D97706")}
        ${row("Company:", e.company)}
        ${row("Event Type:", e.event_type)}
        ${row("Venue:", e.venue)}
        ${row("Budget:", e.budget, "#D97706", "800")}
        ${row("Target Date:", e.preferred_date)}
        ${row("Estimated Guests:", e.team_size)}
      </table>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr><td align="center"><a href="tel:+917401030000" style="display:block;width:90%;background-color:#0F172A;color:#FFFFFF;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:800;text-align:center;">📞 Call Event Director: +91 74010 30000</a></td></tr>
      </table>
    </div>`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country_code, company, venue, event_type, team_size, budget, preferred_date, source } = body;

    if (!name || !email || !phone || !event_type) {
      return NextResponse.json({ success: false, error: "Required fields missing." }, { status: 400 });
    }

    // 1. Save to Supabase
    const { data: enquiry, error: dbError } = await supabase
      .from("enquiries")
      .insert({
        name, email, phone,
        country_code: country_code || "+91",
        company: company || "",
        venue: venue || "",
        event_type,
        team_size: team_size || "",
        budget: budget || "",
        preferred_date: preferred_date || null,
        source: source || "Website",
        status: "new",
        notes: "",
        mail_history: [],
      })
      .select()
      .single();

    if (dbError) {
      console.error("[DB Error]", dbError);
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    const e: Record<string, string> = {
      name, email, phone,
      country_code: country_code || "+91",
      company: company || "",
      venue: venue || "",
      event_type,
      team_size: team_size || "",
      budget: budget || "",
      preferred_date: preferred_date || "",
      source: source || "Website",
    };

    // 2. Send both emails in parallel
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `🚨 New Lead: ${name} (${event_type}) - Virtue IN`,
        html: adminHtml(e),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "✓ Enquiry Received – Virtue IN Agency",
        html: clientHtml(e),
      }),
    ]);

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully!", enquiry });
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
