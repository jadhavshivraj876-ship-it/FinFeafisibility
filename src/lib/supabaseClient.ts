import { createClient } from '@supabase/supabase-js';

// Supabase configuration provided for project: uszegwhlwhzprltymzet
const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://uszegwhlwhzprltymzet.supabase.co';
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_EpAxaBkeDfoJqgpT0KiH6w_BbFWQXbT';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface UserBusinessProfile {
  id?: string;
  userId?: string;
  businessTitle: string;
  category: string;
  district: string;
  state: string;
  projectCost: number;
  subsidyAmount: number;
  subsidyPercent: number;
  dscr: number;
  monthlyRevenue: number;
  createdAt?: string;
}
