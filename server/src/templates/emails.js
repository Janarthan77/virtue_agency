/**
 * Clean & Modern 100% Light-Theme HTML Email Templates for Virtue IN Agency
 * Pure White (#FFFFFF), Soft Background (#F8FAFC), Charcoal Text (#0F172A), Gold (#D97706)
 */

const baseEmailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Virtue IN Agency</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F1F5F9; min-height: 100vh; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #D97706 100%);"></td>
          </tr>

          <!-- Header / Brand Logo -->
          <tr>
            <td style="padding: 24px 32px 18px 32px; text-align: center; border-bottom: 1px solid #F1F5F9; background-color: #FFFFFF;">
              <div style="font-size: 22px; font-weight: 900; letter-spacing: 1.5px; color: #0F172A; text-transform: uppercase;">
                V-RTUE <span style="color: #D97706;">IN.</span>
              </div>
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #64748B; text-transform: uppercase; margin-top: 2px;">
                Corporate Event Management
              </div>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 32px; background-color: #FFFFFF;">
              ${content}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * 1. Admin Lead Alert Template
 */
export function getAdminLeadAlertTemplate(enquiry) {
  const content = `
    <div style="text-align: left;">
      
      <!-- Badge -->
      <div style="display: inline-block; background-color: #FEF3C7; border: 1px solid #FCD34D; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; color: #92400E; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
        🚨 New Client Enquiry
      </div>
      
      <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #0F172A; line-height: 1.3;">
        New Event Lead: <span style="color: #D97706;">${enquiry.name}</span>
      </h2>
      
      <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748B;">
        Here are the complete client specifications submitted via website:
      </p>

      <!-- Contact & Event Details Card -->
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 22px; border-collapse: separate; overflow: hidden;">
        
        <tr style="background-color: #F1F5F9;">
          <td colspan="2" style="padding: 10px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #334155; border-bottom: 2px solid #D97706;">
            👤 Client Details &amp; Requirements
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; width: 38%; border-bottom: 1px solid #E2E8F0;">
            Client Name:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 800; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.name}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Official Email:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #E2E8F0;">
            <a href="mailto:${enquiry.email}" style="color: #2563EB; text-decoration: none; font-weight: 700;">
              ✉️ ${enquiry.email}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Phone Number:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; font-weight: 800; border-bottom: 1px solid #E2E8F0;">
            <a href="tel:${enquiry.country_code || "+91"}${enquiry.phone}" style="color: #D97706; text-decoration: none;">
              📞 ${enquiry.country_code || "+91"} ${enquiry.phone}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Company / Org:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.company}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Event Type:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 800; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.event_type}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Location / Venue:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.venue}
          </td>
        </tr>

        ${enquiry.budget ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Budget Range:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #059669; font-weight: 800; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.budget}
          </td>
        </tr>` : ""}

        ${enquiry.preferred_date ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Target Date:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.preferred_date}
          </td>
        </tr>` : ""}

        ${enquiry.team_size ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Guest Count:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.team_size}
          </td>
        </tr>` : ""}

        ${enquiry.source ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600;">
            Lead Source:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #475569;">
            ${enquiry.source}
          </td>
        </tr>` : ""}

      </table>

      <!-- Quick Action Buttons -->
      <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: 16px;">
        <tr>
          <td align="center" style="padding-bottom: 10px;">
            <a href="tel:${enquiry.country_code || "+91"}${enquiry.phone}" style="display: block; width: 90%; background-color: #D97706; color: #FFFFFF; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 800; text-align: center;">
              📞 Call Client: ${enquiry.country_code || "+91"} ${enquiry.phone}
            </a>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a href="mailto:${enquiry.email}?subject=Regarding%20your%20Event%20Enquiry%20-%20Virtue%20IN%20Agency" style="display: block; width: 90%; background-color: #0F172A; color: #FFFFFF; text-decoration: none; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-align: center;">
              ✉️ Reply via Email
            </a>
          </td>
        </tr>
      </table>

    </div>
  `;
  return baseEmailWrapper(content);
}

/**
 * 2. Client Auto-Confirmation Template (With Complete Contact & Specification Overview)
 */
export function getClientConfirmationTemplate(enquiry) {
  const content = `
    <div style="text-align: left;">
      
      <!-- Badge -->
      <div style="display: inline-block; background-color: #DCFCE7; border: 1px solid #86EFAC; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
        ✓ Enquiry Received
      </div>
      
      <h2 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 800; color: #0F172A;">
        Hello ${enquiry.name},
      </h2>
      
      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
        Thank you for reaching out to <strong>Virtue IN Agency</strong>. We have received your event specifications. Our lead producer will review your requirements and share a tailored proposal within 24 hours.
      </p>

      <!-- Complete Enquiry Details Box -->
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 22px; border-collapse: separate; overflow: hidden;">
        <tr style="background-color: #F1F5F9;">
          <td colspan="2" style="padding: 10px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #334155; border-bottom: 2px solid #D97706;">
            Your Enquiry Overview
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; width: 38%; border-bottom: 1px solid #E2E8F0;">
            Client Name:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.name}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Official Email:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.email}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Phone Number:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #D97706; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.country_code || "+91"} ${enquiry.phone}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Company / Org:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.company}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Event Type:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.event_type}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Location / Venue:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.venue}
          </td>
        </tr>

        ${enquiry.budget ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Budget Range:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #D97706; font-weight: 800; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.budget}
          </td>
        </tr>` : ""}

        ${enquiry.preferred_date ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            Target Date:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700; border-bottom: 1px solid #E2E8F0;">
            ${enquiry.preferred_date}
          </td>
        </tr>` : ""}

        ${enquiry.team_size ? `
        <tr>
          <td style="padding: 10px 16px; font-size: 13px; color: #64748B; font-weight: 600;">
            Estimated Guests:
          </td>
          <td style="padding: 10px 16px; font-size: 13px; color: #0F172A; font-weight: 700;">
            ${enquiry.team_size}
          </td>
        </tr>` : ""}
      </table>

    </div>
  `;
  return baseEmailWrapper(content);
}

/**
 * 3. Admin Direct Custom Reply Template
 */
export function getAdminCustomReplyTemplate(enquiry, subject, customMessage, actionLink) {
  const content = `
    <div style="text-align: left;">
      <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 800; color: #0F172A;">
        ${subject}
      </h2>

      <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569;">
        Dear <strong>${enquiry.name || "Client"}</strong>,
      </p>

      <div style="font-size: 14px; line-height: 1.7; color: #1E293B; margin-bottom: 24px; white-space: pre-line; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px;">
${customMessage}
      </div>

      ${actionLink ? `
      <div style="text-align: center; margin: 20px 0;">
        <a href="${actionLink.url}" style="display: inline-block; background-color: #D97706; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 800;">
          ${actionLink.text || "View Proposal"}
        </a>
      </div>` : ""}

      <div style="border-top: 1px solid #E2E8F0; padding-top: 14px; margin-top: 20px;">
        <p style="margin: 0; font-size: 12px; color: #64748B;">
          Warm regards,<br>
          <strong style="color: #0F172A;">Virtue IN Agency Executive Team</strong><br>
          <span style="color: #D97706;">Chennai, India</span>
        </p>
      </div>
    </div>
  `;
  return baseEmailWrapper(content);
}
