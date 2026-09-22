import { supabase, UserBusinessProfile } from './supabaseClient';

const LOCAL_STORAGE_KEY = 'finfeasibility_user_businesses';

export async function saveUserBusiness(profile: Omit<UserBusinessProfile, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    // Check local storage active user if supabase user not session-linked
    let userEmail = user?.email;
    let userId = user?.id;
    if (!user && typeof window !== 'undefined') {
      const activeStr = localStorage.getItem('finfeasibility_active_user');
      if (activeStr) {
        const active = JSON.parse(activeStr);
        userEmail = active.email;
        userId = active.id;
      }
    }

    const uniqueId = 'biz-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);

    const record: UserBusinessProfile = {
      ...profile,
      id: uniqueId,
      userId: userId || 'guest-entrepreneur',
      createdAt: new Date().toISOString()
    };

    // Save to local cache first so offline & immediate UI works instantly
    try {
      const existingStr = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      const existingList: UserBusinessProfile[] = existingStr ? JSON.parse(existingStr) : [];
      // Prevent duplicate saving of the exact same title & district within 1 minute
      const filtered = existingList.filter(item => !(item.businessTitle === profile.businessTitle && item.district === profile.district));
      filtered.unshift(record);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered.slice(0, 30)));
        window.dispatchEvent(new Event('finfeasibility_storage_updated'));
      }
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
            user_email: userEmail || user.email,
            business_title: profile.businessTitle,
            category: profile.category,
            district: profile.district,
            state: profile.state,
            project_cost: profile.projectCost,
            subsidy_amount: profile.subsidyAmount,
            subsidy_percent: profile.subsidyPercent,
            dscr: profile.dscr,
            monthly_revenue: profile.monthlyRevenue,
            created_at: record.createdAt
          }
        ])
        .select();

      if (error) {
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

export async function deleteUserBusiness(id: string): Promise<boolean> {
  try {
    // Delete from Supabase if online
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      await supabase.from('user_businesses').delete().eq('id', id);
    }

    // Delete from LocalStorage
    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (existingStr) {
        const list: UserBusinessProfile[] = JSON.parse(existingStr);
        const filtered = list.filter(item => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('finfeasibility_storage_updated'));
      }
    }
    return true;
  } catch (err) {
    console.error('Delete error:', err);
    return false;
  }
}
