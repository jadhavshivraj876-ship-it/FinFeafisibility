import { supabase, UserBusinessProfile } from './supabaseClient';

const LOCAL_STORAGE_KEY = 'finfeasibility_user_businesses';

export async function saveUserBusiness(profile: Omit<UserBusinessProfile, 'id' | 'createdAt'>): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    const uniqueId = 'biz-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);

    const record: UserBusinessProfile = {
      ...profile,
      id: uniqueId,
      userId: user?.id || 'guest-entrepreneur',
      createdAt: new Date().toISOString()
    };

    // Save to local cache first so offline & immediate UI works instantly
    try {
      const existingStr = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      const existingList: UserBusinessProfile[] = existingStr ? JSON.parse(existingStr) : [];
      // Prevent duplicate saving of the exact same title & district within 1 minute
      const filtered = existingList.filter(item => !(
        item.userId === record.userId &&
        item.businessTitle === profile.businessTitle &&
        item.district === profile.district
      ));
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
  let cacheUserId = 'guest-entrepreneur';

  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (user) {
      cacheUserId = user.id;
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

    return getCachedBusinesses(cacheUserId);
  } catch (err) {
    console.warn('Error fetching businesses, using cache:', err);
    return getCachedBusinesses(cacheUserId);
  }
}

function getCachedBusinesses(userId: string): UserBusinessProfile[] {
  const existingStr = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
  const businesses: UserBusinessProfile[] = existingStr ? JSON.parse(existingStr) : [];
  return businesses.filter((business) => business.userId === userId);
}

export async function deleteUserBusiness(id: string): Promise<boolean> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id;
    if (userId) {
      const { error } = await supabase
        .from('user_businesses')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
      if (error) throw error;
    }

    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (existingStr) {
        const list: UserBusinessProfile[] = JSON.parse(existingStr);
        const filtered = list.filter((item) => item.id !== id || item.userId !== (userId || 'guest-entrepreneur'));
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
