import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Example {
  id: string;
  name: string;
  website_link: string;
  business_type: string;
  pricing_chosen: string;
  pinned: boolean;
  created_at: string;
}

export interface AnalyticsLog {
  id: string;
  path: string;
  user_agent: string | null;
  device_type: string | null;
  visited_at: string;
}
