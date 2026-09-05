-- =========================================================================
-- VIRTUE IN AGENCY - CLIENT REVIEWS & FEEDBACK TABLE MIGRATION
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  category TEXT DEFAULT 'corporate',
  rating INT NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  avatar_color TEXT DEFAULT '#2563EB',
  status TEXT DEFAULT 'approved', -- 'pending' | 'approved' | 'hidden'
  is_featured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access on approved reviews
CREATE POLICY "Allow public read approved reviews" ON public.reviews
  FOR SELECT USING (true);

-- Allow public to submit feedback / reviews
CREATE POLICY "Allow public insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Allow service role full access
CREATE POLICY "Allow service all reviews" ON public.reviews
  FOR ALL USING (true);

-- Seed initial client reviews
INSERT INTO public.reviews (name, role, category, rating, text, avatar_color, status, is_featured)
VALUES
  ('Hydra Specma', 'Factory Inauguration & Facility Launch', 'launch', 5, 'We had our factory inauguration executed by Virtue IN and we are extremely satisfied. We experienced a very smooth, well-coordinated, and proactive on-ground team. They handled VIP guest hospitality, audio-visual rigging, and stagecraft flawlessly. We will certainly have more collaborations with them in the future!', '#2563EB', 'approved', true),
  ('Audi Chennai / BNI Futurz', 'Automotive Leadership Conclave', 'corporate', 5, 'Spectacular execution by Sathish and the Virtue IN crew for our BNI Futurz summit at Audi Chennai. The corporate staging, high-definition LED backdrops, acoustic clarity, and VIP protocols were world-class. Truly one of the best corporate event management agencies in South India.', '#D97706', 'approved', true),
  ('TVS Emerald', 'Peninsula & Green Enclave Property Debut', 'launch', 5, 'Virtue IN made our flagship residential property unveiling truly unforgettable. Their attention to detail, interactive 3D customer pavilions, and creative stage direction exceeded all our sales targets and expectations. Flawless execution from initial renders to live show handover!', '#059669', 'approved', true),
  ('BNP Paribas', 'Rocktober Annual Gala @ The Leela Palace', 'gala', 5, 'Flawless end-to-end management of our annual gala at The Leela Palace. From the customized stage sets and live jazz orchestra to delegate registration and award presentations, every minute cue went off without a hitch. Exceptional professionalism.', '#7C3AED', 'approved', true),
  ('Rotary Club of Madras West', 'Installation Ceremony @ ITC Grand Chola', 'corporate', 5, 'Organizing an installation ceremony for 1,200+ dignitaries and VIP guests is a monumental challenge. Virtue IN handled multi-camera live telecasts, presidential banquet arrangements, and protocol escorting seamlessly. Highly recommended!', '#DC2626', 'approved', true),
  ('Radiant Dental Care', 'Annual Coastal Retreat @ Taj Fisherman''s Cove', 'gala', 5, 'Our team day-out and annual retreat was planned to perfection by Virtue IN. The bespoke beach challenges, evening acoustic setup, and sunset dinner arrangements gave our 200+ employees memories for a lifetime. Outstanding work!', '#0891B2', 'approved', true)
ON CONFLICT (id) DO NOTHING;
