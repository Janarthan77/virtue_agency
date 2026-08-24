export interface AdminUser {
  name: string;
  email: string;
  role: string;
}

const ADMIN_KEY = "virtue_admin_auth";

const ADMIN_CREDENTIALS = [
  { email: "admin@virtuein.agency", password: "VirtueIN@2025", name: "Lead Producer", role: "admin" },
  { email: "janarthan200802@gmail.com", password: "VirtueIN@2025", name: "Lead Producer", role: "admin" },
];

export function loginAdmin(email: string, password: string): { success: boolean; user?: AdminUser; error?: string } {
  const match = ADMIN_CREDENTIALS.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!match) return { success: false, error: "Invalid email or password." };

  const user: AdminUser = { name: match.name, email: match.email, role: match.role };
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
  }
  return { success: true, user };
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(ADMIN_KEY);
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}
