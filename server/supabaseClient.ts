// supabaseClient.js (or .ts)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kqqkcergzwlfbfmyrijr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
