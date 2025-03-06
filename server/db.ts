import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@/shared/schema";
import { supabase } from './supabaseClient';

neonConfig.webSocketConstructor = ws;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}
export const pool = new Pool({ connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL });
export const db = drizzle({ client: pool, schema });


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Add your Supabase URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Add your Supabase Anon Key

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);