import { supabase, UserBusinessProfile } from './supabaseClient';

const LOCAL_STORAGE_KEY = 'finfeasibility_user_businesses';

export async function saveUserBusiness(profile: Omit<UserBusinessProfile, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    const record: UserBusinessProfile = {
      ...profile,
      userId: user?.id || 'guest-entrepreneur',
      createdAt: new Date().toISOString()
    };

    // Save to local cache first so offline works instantly
    try {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingList: UserBusinessProfile[] = existingStr ? JSON.parse(existingStr) : [];
      existingList.unshift(record);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingList.slice(0, 20)));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // If user is authenticated with Supabase, store to Supabase table
    if (user) {
      const { data, error } = await supabase
        .from('user_businesses')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            business_title: profile.businessTitle,
            category: profile.category,
            district: profile.district,
            state: profile.state,
            project_cost: profile.projectCost,
            subsidy_amount: profile.subsidyAmount,
            subsidy_percent: profile.subsidyPercent,
            dscr: profile.dscr,
            monthly_revenue: profile.monthlyRevenue,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        // Table might not exist yet if not created in Supabase dashboard, still return success from local cache
        console.warn('Supabase insert note (cached locally):', error.message);
        return { success: true, data: record };
      }
      return { success: true, data };
    }

    return { success: true, data: record };
  } catch (err: any) {
    console.error('Error saving user business:', err);
    return { success: false, error: err?.message || 'Failed to save profile' };
  }
}

export async function getUserBusinesses(): Promise<UserBusinessProfile[]> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (user) {
      const { data, error } = await supabase
        .from('user_businesses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          userId: item.user_id,
          businessTitle: item.business_title,
          category: item.category,
          district: item.district,
          state: item.state,
          projectCost: item.project_cost,
          subsidyAmount: item.subsidy_amount,
          subsidyPercent: item.subsidy_percent,
          dscr: item.dscr,
          monthlyRevenue: item.monthly_revenue,
          createdAt: item.created_at
        }));
      }
    }

    // Fallback to local cache
    const existingStr = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    return existingStr ? JSON.parse(existingStr) : [];
  } catch (err) {
    console.warn('Error fetching businesses, using cache:', err);
    const existingStr = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    return existingStr ? JSON.parse(existingStr) : [];
  }
}
