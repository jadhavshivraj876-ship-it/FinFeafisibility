'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Phone, 
  MapPin, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'signin' 
}) => {
  const { signUp, signInWithPassword, signInWithGoogle, signInWithEmail } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);

  // Sign In Form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);

  // Sign Up Form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDistrict, setRegDistrict] = useState('');
  const [regState, setRegState] = useState('');
  const [regSector, setRegSector] = useState('Agro & Food Processing');

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) return;

    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      if (isMagicLinkMode) {
        const { error } = await signInWithEmail(signInEmail.trim());
        if (error) {
          setStatusMessage({ type: 'error', text: error.message });
        } else {
          setStatusMessage({ type: 'success', text: `Magic link sent to ${signInEmail}! Check your email.` });
        }
      } else {
        const { error } = await signInWithPassword(signInEmail.trim(), signInPassword);
        if (error) {
          setStatusMessage({ type: 'error', text: error.message || 'Invalid email or password.' });
        } else {
          setStatusMessage({ type: 'success', text: 'Signed in successfully!' });
          setTimeout(() => {
            onClose();
          }, 600);
        }
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Authentication error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim() || !regFullName.trim()) return;

    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      const { data, error } = await signUp({
        fullName: regFullName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        phone: regPhone.trim(),
        district: regDistrict.trim() || 'Satara',
        state: regState.trim() || 'Maharashtra',
        preferredSector: regSector
      });

      if (error) {
        setStatusMessage({ type: 'error', text: error.message || 'Registration failed.' });
      } else if (!data?.session) {
        setStatusMessage({
          type: 'success',
          text: `We sent a confirmation link to ${regEmail.trim()}. Open it to finish creating your account.`
        });
      } else {
        setStatusMessage({ 
          type: 'success', 
          text: `Account created for ${regFullName}! You are now signed in.`
        });
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 perspective-container">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden card-3d-interactive"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-zinc-900 text-white p-6 relative border-b border-emerald-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Entrepreneur Portal</h3>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-full">
                  MSME
                </span>
              </div>
              <p className="text-emerald-200/80 text-xs mt-0.5">
                Supabase Cloud Database & Investor Network
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-black/30 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setStatusMessage(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer text-center ${
                activeTab === 'signin'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Existing User • Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setStatusMessage(null);
              }}
              className={`py-2 rounded-xl transition-all cursor-pointer text-center ${
                activeTab === 'signup'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              New Entrepreneur • Register
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in ${
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

          {activeTab === 'signin' ? (
            /* Sign In Tab */
            <div className="space-y-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
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
                <span className="flex-shrink mx-3 text-[11px] text-zinc-400 uppercase font-medium">Or enter credentials</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="entrepreneur@finfeasibility.in"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                {!isMagicLinkMode && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Password</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsMagicLinkMode(true)}
                        className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Use Magic Link instead
                      </button>
                    </div>
                    <input
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      required={!isMagicLinkMode}
                    />
                  </div>
                )}

                {isMagicLinkMode && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsMagicLinkMode(false)}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Use Password sign-in
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{isSubmitting ? 'Signing in...' : isMagicLinkMode ? 'Send Magic Link' : 'Sign In'}</span>
                </button>
              </form>

            </div>
          ) : (
            /* Sign Up / Registration Tab */
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Shivraj Patil"
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="entrepreneur@finfeasibility.in"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Password *</span>
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mobile Phone</span>
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Target District</span>
                  </label>
                  <input
                    type="text"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    placeholder="e.g. Satara, Pune"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State</span>
                  </label>
                  <input
                    type="text"
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Industry Sector</span>
                </label>
                <select
                  value={regSector}
                  onChange={(e) => setRegSector(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer"
                >
                  <option value="Agro & Food Processing">Agro & Food Processing (Oil, Jaggery, Spices, Dairy)</option>
                  <option value="Renewable Energy & Solar">Renewable Energy & Solar Cold Chain</option>
                  <option value="Light Manufacturing & Engineering">Light Manufacturing & Engineering</option>
                  <option value="Bio-Fertilizers & Organic Farming">Bio-Fertilizers & Organic Inputs</option>
                  <option value="Rural Artisans & Handicrafts">Rural Artisans & Handicrafts</option>
                  <option value="Drone & Agri-Tech Services">Agri-Tech & Custom Hiring Services</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? 'Registering Account...' : 'Complete MSME Registration'}</span>
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
