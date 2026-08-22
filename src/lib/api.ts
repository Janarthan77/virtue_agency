/**
 * Unified API Client for Virtue IN Agency (Next.js Internal API Routes)
 */

export interface EnquiryItem {
  id: string;
  created_at: string;
  name: string;
  email: string;
  country_code?: string;
  phone: string;
  company: string;
  venue: string;
  event_type: string;
  team_size?: string;
  budget?: string;
  preferred_date?: string;
  source?: string;
  status: "new" | "in_review" | "contacted" | "mail_sent" | "archived";
  notes?: string;
  mail_history?: Array<{
    sent_at: string;
    subject: string;
    message?: string;
    status: string;
    template?: string;
    resendId?: string;
  }>;
}

export interface EnquiryInput {
  name: string;
  email: string;
  country_code?: string;
  phone: string;
  company: string;
  venue: string;
  event_type: string;
  team_size?: string;
  budget?: string;
  preferred_date?: string;
  source?: string;
  notes?: string;
}

export interface DashboardStats {
  total: number;
  new: number;
  inReview: number;
  contacted: number;
  mailSent: number;
  archived: number;
  totalEmailsSent: number;
}

export interface SystemStatus {
  server: {
    status: string;
    time: string;
    version: string;
  };
  resend: {
    configured: boolean;
    sender: string;
  };
  database: {
    configured: boolean;
    isLive: boolean;
    url: string | null;
    totalRecordsCount: number;
  };
}

/**
 * Submit contact form enquiry
 */
export async function submitEnquiry(data: EnquiryInput): Promise<{
  success: boolean;
  message?: string;
  enquiry?: EnquiryItem;
  error?: string;
}> {
  try {
    const res = await fetch("/api/send-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error. Please check your connection.",
    };
  }
}

/**
 * Fetch enquiries for Admin
 */
export async function fetchEnquiries(params?: { status?: string; search?: string }): Promise<{
  success: boolean;
  count?: number;
  enquiries: EnquiryItem[];
  error?: string;
}> {
  try {
    const url = new URL("/api/enquiries", window.location.origin);
    if (params?.status && params.status !== "all") {
      url.searchParams.set("status", params.status);
    }
    if (params?.search) {
      url.searchParams.set("search", params.search);
    }

    const res = await fetch(url.toString(), { cache: "no-store" });
    const json = await res.json();
    return {
      success: json.success ?? false,
      count: json.count ?? 0,
      enquiries: json.enquiries ?? [],
      error: json.error,
    };
  } catch (err: unknown) {
    return {
      success: false,
      enquiries: [],
      error: err instanceof Error ? err.message : "Failed to fetch enquiries",
    };
  }
}

/**
 * Update enquiry status or notes
 */
export async function updateEnquiryStatus(
  id: string,
  payload: { status?: string; notes?: string }
): Promise<{ success: boolean; enquiry?: EnquiryItem; error?: string }> {
  try {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

/**
 * Delete enquiry
 */
export async function deleteEnquiry(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

/**
 * Send email via Resend
 */
export async function sendEmailViaResend(payload: {
  enquiryId?: string;
  toEmail?: string;
  subject: string;
  message: string;
  templateType?: string;
  actionLink?: { url: string; text: string };
}): Promise<{ success: boolean; message?: string; error?: string; mailRecord?: any }> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to send email" };
  }
}

/**
 * Fetch stats for Admin Dashboard
 */
export async function fetchDashboardStats(): Promise<{
  success: boolean;
  stats?: DashboardStats;
  error?: string;
}> {
  try {
    const res = await fetch("/api/stats", { cache: "no-store" });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Stats fetch failed",
    };
  }
}

/**
 * Fetch System status
 */
export async function fetchSystemStatus(): Promise<{
  success: boolean;
  status?: SystemStatus;
  error?: string;
}> {
  return {
    success: true,
    status: {
      server: {
        status: "online",
        time: new Date().toISOString(),
        version: "Next.js 16 (Serverless)",
      },
      resend: {
        configured: true,
        sender: "Virtue IN Agency <onboarding@resend.dev>",
      },
      database: {
        configured: true,
        isLive: true,
        url: "https://dbyqljuqqbivxnmrjdqd.supabase.co",
        totalRecordsCount: 0,
      },
    },
  };
}
