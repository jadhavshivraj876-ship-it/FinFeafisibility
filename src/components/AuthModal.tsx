'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, LogOut, User as UserIcon, Building2, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import { getUserBusinesses } from '@/lib/userStorage';
import { UserBusinessProfile } from '@/lib/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, signInWithGoogle, signInWithEmail, signOut, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProjects, setSavedProjects] = useState<UserBusinessProfile[]>([]);

  useEffect(() => {
    if (isOpen) {
      getUserBusinesses().then(setSavedProjects);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setStatusMessage(null);
      const { error } = await signInWithGoogle();
      if (error) {
        setStatusMessage({ type: 'error', text: error.message });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Google Auth redirection failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsSubmitting(true);
      setStatusMessage(null);
      const { error } = await signInWithEmail(email.trim());
      if (error) {
        setStatusMessage({ type: 'error', text: error.message });
      } else {
        setStatusMessage({ type: 'success', text: `Magic link sent to ${email}! Check your inbox to sign in.` });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Authentication error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = () => {
    // Quick instant demo login for offline or evaluation convenience
    localStorage.setItem('finfeasibility_demo_user', JSON.stringify({
      email: 'entrepreneur@finfeasibility.ai',
      name: 'Shivraj Patil',
      role: 'Registered MSME Entrepreneur'
    }));
    setStatusMessage({ type: 'success', text: 'Logged in as Demo Entrepreneur (Shivraj Patil).' });
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-emerald-200 dark:border-zinc-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Entrepreneur Portal</h3>
              <p className="text-emerald-200 text-xs">
                Powered by Supabase & Google Cloud Auth
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                statusMessage.type === 'error'
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              {statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {user ? (
            /* Logged in view */
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                </div>
              </div>

              {/* Saved Feasibility Projects */}
              <div>
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Your Stored Business Feasibilities ({savedProjects.length})</span>
                </h4>
                {savedProjects.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    No saved projects yet. When you analyze a business on the home page, it is automatically synced to your Supabase profile.
                  </p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {savedProjects.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-xs space-y-1"
                      >
                        <div className="flex justify-between font-semibold text-zinc-800 dark:text-zinc-200">
                          <span className="truncate max-w-[200px]">{p.businessTitle}</span>
                          <span className="text-emerald-700 dark:text-emerald-400">₹{(p.projectCost / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-zinc-500">
                          <span>{p.district}, {p.state}</span>
                          <span>DSCR: {p.dscr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* Not logged in view */
            <div className="space-y-4">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sign in to save your business ideas, track bank viability scores, and connect directly with verified investors and government schemes.
              </p>

              {/* Google OAuth Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-100 text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-3 text-[11px] text-zinc-400 uppercase font-medium">Or email sign-in</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Send Sign-In Link
                </button>
              </form>

              {/* Instant Evaluation / Demo Login option */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="w-full text-center text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer py-1"
                >
                  ⚡ Instant 1-Click Evaluation Login (Demo Mode)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
