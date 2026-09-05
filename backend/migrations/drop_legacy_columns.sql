-- =========================================================================
-- Migration: Remove legacy 'date', 'month', 'time', and 'year' columns from projects table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- =========================================================================

ALTER TABLE public.projects 
  DROP COLUMN IF EXISTS date,
  DROP COLUMN IF EXISTS month,
  DROP COLUMN IF EXISTS time,
  DROP COLUMN IF EXISTS year;
