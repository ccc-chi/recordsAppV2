import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const supabase = createClient(
  "https://drzfjgdizokxbhcvcjhf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyemZqZ2Rpem9reGJoY3ZjamhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzAxMzcsImV4cCI6MjA0OTkwNjEzN30.hI2FUg6iFfkJZR9HqLRKSlDUWtLTiy1yDaPMR5CExQU"
);
