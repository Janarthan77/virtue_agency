/**
 * Admin Authentication Helpers for Virtue IN Agency
 */

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "producer";
  avatar: string;
}

const AUTH_KEY = "virtue_admin_session";

export const DEFAULT_ADMIN_CREDENTIALS = {
  email: "admin@virtuein.agency",
  password: "admin",
};

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return Boolean(parsed && parsed.token);
  } catch {
    return false;
  }
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return null;
    const parsed = JSON.parse(session);
    return parsed.user || null;
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, password: string): { success: boolean; error?: string; user?: AdminUser } {
  // Allow configured or default credentials
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  const isEmailValid = cleanEmail === "admin@virtuein.agency" || cleanEmail === "admin" || cleanEmail === "plan@virtuein.agency";
  const isPassValid = cleanPass === "admin" || cleanPass === "admin123" || cleanPass === "virtue2026";

  if (isEmailValid && isPassValid) {
    const user: AdminUser = {
      id: "admin_01",
      name: "Lead Producer",
      email: cleanEmail.includes("@") ? cleanEmail : "admin@virtuein.agency",
      role: "super_admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    };

    const sessionData = {
      token: `v_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user,
      loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
    return { success: true, user };
  }

  return {
    success: false,
    error: "Invalid email or password. Use demo credentials (admin@virtuein.agency / admin).",
  };
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
