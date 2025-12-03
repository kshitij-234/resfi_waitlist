-- ResFi.ai Waitlist Table Setup
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/spdokfzvqifffnmalovc/sql

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  debt BOOLEAN DEFAULT FALSE,
  credit BOOLEAN DEFAULT FALSE,
  savings BOOLEAN DEFAULT FALSE,
  automate BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for the waitlist form)
CREATE POLICY "Allow public inserts on waitlist"
ON public.waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow service role to read all data (for admin dashboard)
CREATE POLICY "Allow service role to read all waitlist data"
ON public.waitlist
FOR SELECT
TO service_role
USING (true);

-- Create a trigger function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before any update
CREATE TRIGGER update_waitlist_updated_at
BEFORE UPDATE ON public.waitlist
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Create an index on created_at for sorting and filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);
