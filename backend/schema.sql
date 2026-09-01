-- =========================================================================
-- VIRTUE IN AGENCY - SUPABASE POSTGRESQL SCHEMA
-- Copy and paste this into Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  date TEXT DEFAULT '',
  month TEXT DEFAULT '',
  time TEXT DEFAULT '',
  location TEXT DEFAULT '',
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',
  client TEXT DEFAULT '',
  year TEXT DEFAULT '2026',
  tag TEXT DEFAULT 'CORPORATE',
  is_featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 2. Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'photo',
  date TEXT DEFAULT '',
  img TEXT NOT NULL,
  grid_class TEXT DEFAULT 'md:col-span-1 md:row-span-1 h-[300px] md:h-[400px]',
  description TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country_code TEXT DEFAULT '+91',
  phone TEXT NOT NULL,
  company TEXT DEFAULT 'Individual',
  venue TEXT DEFAULT 'To be discussed',
  event_type TEXT DEFAULT 'Corporate Event',
  team_size TEXT DEFAULT '50-100',
  budget TEXT DEFAULT 'Flexible',
  preferred_date TEXT DEFAULT '',
  source TEXT DEFAULT 'Website Form',
  status TEXT DEFAULT 'new',
  notes TEXT DEFAULT '',
  mail_history JSONB[] DEFAULT '{}'
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id BIGSERIAL PRIMARY KEY,
  num TEXT DEFAULT '',
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT 'CalendarDays',
  image TEXT DEFAULT '',
  accent_color TEXT DEFAULT '#FFB800',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Company Settings & Contact Info Table
CREATE TABLE IF NOT EXISTS public.company_settings (
  id BIGSERIAL PRIMARY KEY,
  company_name TEXT DEFAULT 'Virtue IN Agency',
  contact_person TEXT DEFAULT 'SATHISH RINGESAN',
  email TEXT DEFAULT 'plan@virtuein.agency',
  alternate_email TEXT DEFAULT 'sathish@virtueinagency.com',
  phone TEXT DEFAULT '+91 74010 30000',
  alternate_phone TEXT DEFAULT '+91 98843 98514',
  address_line1 TEXT DEFAULT '28, Judge Jambulingam Road,',
  address_line2 TEXT DEFAULT 'Mylapore, Chennai – 600 004',
  city_state_pin TEXT DEFAULT 'Tamil Nadu, India',
  full_address TEXT DEFAULT '28, Judge Jambulingam Road, Mylapore, Chennai – 600 004, Tamil Nadu, India',
  working_hours_mon_sat TEXT DEFAULT 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
  working_hours_sun TEXT DEFAULT 'Sunday: By Appointment',
  map_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin',
  facebook_url TEXT DEFAULT '#',
  twitter_url TEXT DEFAULT '#',
  instagram_url TEXT DEFAULT '#',
  linkedin_url TEXT DEFAULT '#',
  website_url TEXT DEFAULT 'https://www.virtueinagency.com',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Public Permissions for Anon/Service
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow service all projects" ON public.projects FOR ALL USING (true);

CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow service all gallery" ON public.gallery FOR ALL USING (true);

CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service all enquiries" ON public.enquiries FOR ALL USING (true);

CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow service all services" ON public.services FOR ALL USING (true);

CREATE POLICY "Allow public read company_settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Allow service all company_settings" ON public.company_settings FOR ALL USING (true);

-- =========================================================================
-- 6. SEED DATA FOR SERVICES (15 Core Agency Services with R2 Images)
-- =========================================================================
INSERT INTO public.services (num, title, description, icon, image, accent_color, sort_order, is_active)
VALUES
  ('01', 'End to End Event Management', 'Comprehensive management from concept to execution for all types of events, ensuring a seamless experience.', 'CalendarDays', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-1.webp', '#FFFFFF', 1, true),
  ('02', 'End to End Event Production', 'Full-scale technical and stage production, ensuring flawless audio, visual, and lighting experiences.', 'Settings', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-6.webp', '#FFB800', 2, true),
  ('03', 'Conference Management – MICE', 'Expert handling of Meetings, Incentives, Conferences, and Exhibitions for corporate excellence.', 'Mic', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-3.webp', '#CBD5E1', 3, true),
  ('04', 'Event Planning & Operations', 'Strategic planning, logistics, and operational consulting to make your events seamless.', 'ClipboardCheck', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-4.webp', '#34d399', 4, true),
  ('05', 'Destination Management', 'Complete travel, logistics, and localized event planning across premier destinations.', 'MapPin', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-5.webp', '#f472b6', 5, true),
  ('06', 'Venue Sourcing', 'Finding the perfect backdrop tailored to your event''s scale, style, and unique requirements.', 'Building', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-6.webp', '#60a5fa', 6, true),
  ('07', 'Décor Hire & Styling', 'Creative set designs, floral arrangements, and thematic styling for immersive environments.', 'Palette', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-2.webp', '#FFFFFF', 7, true),
  ('08', 'Entertainment & Artist Management', 'Curating top-tier talent, bands, speakers, and artists for captivating performances.', 'Music', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-1.webp', '#FFB800', 8, true),
  ('09', 'Custom Build Setups', 'Bespoke structural designs, custom staging, and immersive fabrications.', 'Hammer', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-1.webp', '#CBD5E1', 9, true),
  ('10', 'Exhibition – Stall Fabrication', 'Designing and building interactive exhibition stalls and corporate booths.', 'Store', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/TVS%20Emerald%20Peninsula/image-1.webp', '#34d399', 10, true),
  ('11', 'Signage', 'High-quality, custom event signage and branding materials for impactful visibility.', 'Megaphone', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNP%20Paribas%20Gala%20Night/image-1.webp', '#f472b6', 11, true),
  ('12', 'BTL Activations', 'Below-the-line marketing activations focused on direct, meaningful consumer engagement.', 'Activity', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Southern%20HOG%20Rally/image-3.webp', '#60a5fa', 12, true),
  ('13', 'Public Relations & Media', 'Strategic PR campaigns and comprehensive media management to amplify your event''s reach.', 'Globe', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/BNI%20Futurz%20chapter%20Meeting%20at%20Audi%20chennai/image-2.webp', '#FFFFFF', 13, true),
  ('14', 'Creative Design & Print Media', 'Exceptional graphic design and printing services for all your event collaterals.', 'PenTool', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Madras%20-%20Fashion%20talent%20Expo/image-4.webp', '#FFB800', 14, true),
  ('15', 'ATL Management', 'Above-the-line mass media advertising and large-scale brand awareness campaigns.', 'Radio', 'https://pub-e796496b65134e82b311969a354b7898.r2.dev/Radiant%20Dental%20Care%20-%20Day%20out%20%40%20Polaris/image-8.webp', '#CBD5E1', 15, true)
ON CONFLICT (id) DO NOTHING;


