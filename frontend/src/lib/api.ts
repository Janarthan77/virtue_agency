/**
 * API Client for Virtue IN Node.js Express Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error. Please make sure the backend server is running.";
    return {
      success: false,
      error: errorMsg,
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
    const url = new URL(`${API_BASE_URL}/enquiries`);
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
      error: err instanceof Error ? err.message : "Failed to connect to backend",
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
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
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
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Delete failed" };
  }
}

/**
 * Send email via Resend through Node.js backend
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
    const res = await fetch(`${API_BASE_URL}/send-email`, {
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
    const res = await fetch(`${API_BASE_URL}/stats`, { cache: "no-store" });
    return await res.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Stats fetch failed",
    };
  }
}

/**
 * Fetch System status (Backend, Resend, Supabase)
 */
export async function fetchSystemStatus(): Promise<{
  success: boolean;
  status?: SystemStatus;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/status`, { cache: "no-store" });
    const json = await res.json();
    return {
      success: json.success ?? false,
      status: {
        server: json.server,
        resend: json.resend,
        database: json.database,
      },
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server unreachable",
    };
  }
}
