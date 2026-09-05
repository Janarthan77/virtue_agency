-- =========================================================================
-- Migration: Remove 'year' column from projects table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- =========================================================================

ALTER TABLE public.projects DROP COLUMN IF EXISTS year;
