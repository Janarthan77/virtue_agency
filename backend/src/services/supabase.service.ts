import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://dbyqljuqqbivxnmrjdqd.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface ProjectRecord {
  id?: number | string;
  title: string;
  category: string;
  subtitle?: string;
  date?: string;
  month?: string;
  time?: string;
  location?: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  year?: string;
  tag?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryRecord {
  id?: number | string;
  title: string;
  type?: "photo" | "video";
  date?: string;
  img: string;
  grid_class?: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EnquiryRecord {
  id?: string;
  name: string;
  email: string;
  country_code?: string;
  phone: string;
  company?: string;
  venue?: string;
  event_type?: string;
  team_size?: string;
  budget?: string;
  preferred_date?: string;
  source?: string;
  status?: "new" | "in_review" | "contacted" | "mail_sent" | "archived";
  notes?: string;
  mail_history?: Array<{
    sent_at: string;
    subject: string;
    message?: string;
    status: string;
    template?: string;
    resendId?: string;
  }>;
  created_at?: string;
}
