import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

export const resend = new Resend(resendApiKey);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}) {
  try {
    const data = await resend.emails.send({
      from: "Virtue IN Agency <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to],
      replyTo: adminEmail,
      subject,
      html: html || (text ? `<p style="white-space: pre-line;">${text}</p>` : ""),
      text,
    });

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Resend Email Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
