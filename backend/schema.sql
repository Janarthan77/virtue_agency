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

-- Enable Row Level Security (RLS) & Public Permissions for Anon/Service
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow service all projects" ON public.projects FOR ALL USING (true);

CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow service all gallery" ON public.gallery FOR ALL USING (true);

CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service all enquiries" ON public.enquiries FOR ALL USING (true);
