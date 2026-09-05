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
  location?: string;
  image: string;
  gallery?: string[];
  description?: string;
  highlights?: string[];
  client?: string;
  tag?: string;
  is_featured?: boolean;
  sort_order?: number;
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

export interface ServiceRecord {
  id?: number | string;
  num?: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  accent_color?: string;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CompanySettingsRecord {
  id?: number | string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  alternate_email?: string;
  phone?: string;
  alternate_phone?: string;
  address_line1?: string;
  address_line2?: string;
  city_state_pin?: string;
  full_address?: string;
  working_hours_mon_sat?: string;
  working_hours_sun?: string;
  map_embed_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  website_url?: string;
  updated_at?: string;
}

export interface ReviewRecord {
  id?: number | string;
  name: string;
  role?: string;
  category?: string;
  rating: number;
  text: string;
  email?: string;
  phone?: string;
  avatar_color?: string;
  status?: "approved" | "pending" | "hidden";
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

