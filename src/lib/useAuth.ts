'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export interface UserRegistrationData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  district?: string;
  state?: string;
  preferredSector?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      setSession(session);
      setUser(session?.user ?? null);
    } catch (err) {
      console.warn('Auth session check error:', err);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
        // Sync local cache
        if (typeof window !== 'undefined') {
          localStorage.setItem('finfeasibility_active_user', JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            phone: session.user.user_metadata?.phone,
            district: session.user.user_metadata?.district,
            state: session.user.user_metadata?.state,
            preferredSector: session.user.user_metadata?.preferred_sector,
            createdAt: session.user.created_at
          }));
        }
      } else {
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('finfeasibility_active_user');
        }
      }
      setLoading(false);
    });

    const handleStorageChange = () => {
      refreshUser();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('finfeasibility_auth_updated', handleStorageChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('finfeasibility_auth_updated', handleStorageChange);
    };
  }, [refreshUser]);

  // Sign Up / User Registration
  const signUp = async (data: UserRegistrationData) => {
    const { email, password, fullName, phone, district, state, preferredSector } = data;
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
            phone: phone || '',
            district: district || 'Satara',
            state: state || 'Maharashtra',
            preferred_sector: preferredSector || 'Agro & Food Processing'
          }
        }
      });

      if (error) {
        return { data: null, error };
      }

      if (authData.session?.user) {
        localStorage.setItem('finfeasibility_active_user', JSON.stringify({
          id: authData.session.user.id,
          email: authData.session.user.email,
          fullName: authData.session.user.user_metadata?.full_name,
          phone: authData.session.user.user_metadata?.phone,
          district: authData.session.user.user_metadata?.district,
          state: authData.session.user.user_metadata?.state,
          preferredSector: authData.session.user.user_metadata?.preferred_sector,
          createdAt: authData.session.user.created_at
        }));
        window.dispatchEvent(new Event('finfeasibility_auth_updated'));
        await refreshUser();
      }

      return { data: authData, error: null };
    } catch (err: any) {
      console.error('SignUp catch:', err);
      return { data: null, error: err };
    }
  };

  // Sign In with Password
  const signInWithPassword = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { data: null, error };
      }

      if (data.user) {
        localStorage.setItem('finfeasibility_active_user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
          phone: data.user.user_metadata?.phone,
          district: data.user.user_metadata?.district,
          state: data.user.user_metadata?.state,
          preferredSector: data.user.user_metadata?.preferred_sector,
          createdAt: data.user.created_at
        }));
        window.dispatchEvent(new Event('finfeasibility_auth_updated'));
      }

      await refreshUser();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  // Sign In with Google OAuth
  const signInWithGoogle = async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Sign In with Magic Link
  const signInWithEmail = async (email: string) => {
    return supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Update Profile
  const updateUserProfile = async (updates: Partial<UserRegistrationData>) => {
    try {
      if (!user) {
        return { success: false, error: 'You must be signed in to update your profile.' };
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: updates.fullName,
          phone: updates.phone,
          district: updates.district,
          state: updates.state,
          preferred_sector: updates.preferredSector
        }
      });
      if (error) throw error;

      // Update local storage
      const cachedStr = localStorage.getItem('finfeasibility_active_user');
      const prev = cachedStr ? JSON.parse(cachedStr) : {};
      const updated = {
        ...prev,
        ...updates,
        fullName: updates.fullName || prev.fullName
      };
      localStorage.setItem('finfeasibility_active_user', JSON.stringify(updated));
      window.dispatchEvent(new Event('finfeasibility_auth_updated'));
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      console.error('Update profile error:', err);
      return { success: false, error: err?.message };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
      }

      localStorage.removeItem('finfeasibility_active_user');
      window.dispatchEvent(new Event('finfeasibility_auth_updated'));
      setUser(null);
      setSession(null);
      return { success: true };
    } catch (err) {
      console.error('Sign out error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unable to sign out.'
      };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signInWithPassword,
    signInWithGoogle,
    signInWithEmail,
    updateUserProfile,
    signOut,
    refreshUser
  };
}
