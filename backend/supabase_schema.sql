-- =========================================================
-- VIRTUE IN AGENCY - SUPABASE SCHEMA FOR ENQUIRIES
-- =========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country_code TEXT DEFAULT '+91',
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  venue TEXT NOT NULL,
  event_type TEXT NOT NULL,
  team_size TEXT,
  budget TEXT,
  preferred_date TEXT,
  source TEXT,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'in_review', 'contacted', 'mail_sent', 'archived')),
  notes TEXT DEFAULT '',
  mail_history JSONB DEFAULT '[]'::jsonb
);

-- Index for faster search and filtering
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public insert (for contact form submissions)
CREATE POLICY "Allow public insert on enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

-- Allow service role and authenticated users full access
CREATE POLICY "Allow full access for service_role"
ON public.enquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on enquiries"
ON public.enquiries
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Allow authenticated update on enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated, anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on enquiries"
ON public.enquiries
FOR DELETE
TO authenticated, anon
USING (true);
