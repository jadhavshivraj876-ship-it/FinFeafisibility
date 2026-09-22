'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  User as UserIcon, 
  Building2, 
  Sparkles, 
  LogOut, 
  Trash2, 
  ArrowUpRight, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  FolderKanban, 
  Layers,
  Save,
  ShieldCheck,
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import { getUserBusinesses, deleteUserBusiness } from '@/lib/userStorage';
import { UserBusinessProfile } from '@/lib/supabaseClient';
import Link from 'next/link';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject?: (project: UserBusinessProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onLoadProject
}) => {
  const { user, updateUserProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');
  const [savedProjects, setSavedProjects] = useState<UserBusinessProfile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [preferredSector, setPreferredSector] = useState('Agro & Food Processing');

  useEffect(() => {
    if (isOpen && user) {
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || user.email?.split('@')[0] || 'Entrepreneur');
      setPhone(meta.phone || '');
      setDistrict(meta.district || 'Satara');
      setState(meta.state || 'Maharashtra');
      setPreferredSector(meta.preferred_sector || 'Agro & Food Processing');

      loadProjects();
    }
  }, [isOpen, user]);

  const loadProjects = () => {
    getUserBusinesses().then(setSavedProjects);
  };

  if (!isOpen) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    await updateUserProfile({
      fullName,
      phone,
      district,
      state,
      preferredSector
    });

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Remove this saved feasibility from your account?')) {
      await deleteUserBusiness(id);
      loadProjects();
    }
  };

  const userInitials = (fullName || user?.email || 'U')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 perspective-container">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden card-3d-interactive"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-teal-900 to-zinc-900 text-white p-6 sm:p-7 border-b border-emerald-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-500/30 border border-white/20">
              {userInitials}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {fullName || 'Entrepreneur Profile'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified MSME Account
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 flex items-center gap-2">
                <span>{user?.email}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 pt-4 border-t border-white/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Saved Feasibilities ({savedProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 max-h-[65vh] overflow-y-auto">
          {activeTab === 'profile' ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {saveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully and synced with your account!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Shivraj Patil"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mobile / WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Primary District</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Satara, Pune, Nashik, etc."
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State</span>
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Maharashtra, Gujarat, etc."
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Preferred Enterprise Sector</span>
                  </label>
                  <select
                    value={preferredSector}
                    onChange={(e) => setPreferredSector(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer"
                  >
                    <option value="Agro & Food Processing">Agro & Food Processing (Oil, Jaggery, Spices, Dairy)</option>
                    <option value="Renewable Energy & Solar">Renewable Energy & Solar Cold Chain</option>
                    <option value="Light Manufacturing & Engineering">Light Manufacturing & Engineering</option>
                    <option value="Bio-Fertilizers & Organic Farming">Bio-Fertilizers & Organic Inputs</option>
                    <option value="Rural Artisans & Handicrafts">Rural Artisans, Textiles & Handicrafts</option>
                    <option value="Drone & Agri-Tech Services">Agri-Tech & Drone Custom Hiring</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Account</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Saved Feasibilities Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500">
                  Showing {savedProjects.length} enterprise models saved to your account
                </span>
              </div>

              {savedProjects.length === 0 ? (
                <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">No Saved Feasibilities Yet</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    When you run an enterprise analysis on the homepage, click <strong>&quot;Save to My Profile&quot;</strong> to store it here for instant retrieval, DPR generation, and investor pitching.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProjects.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-emerald-500/40 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            {p.category}
                          </span>
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                            {p.businessTitle}
                          </h4>
                          <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {p.district}, {p.state}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                            ₹{(p.projectCost / 100000).toFixed(1)} Lakhs
                          </span>
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                            {p.subsidyPercent}% Subsidy (₹{(p.subsidyAmount / 100000).toFixed(1)}L)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700 text-[11px]">
                        <span className="text-zinc-500">
                          Bank DSCR: <strong className="text-emerald-700 dark:text-emerald-400">{p.dscr}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (onLoadProject) {
                                onLoadProject(p);
                                onClose();
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                          >
                            <span>Open in Engine</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>

                          <Link
                            href="/dpr-generator"
                            onClick={onClose}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer transition-colors"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                            <span>DPR</span>
                          </Link>

                          {p.id && (
                            <button
                              onClick={(e) => handleDeleteProject(p.id!, e)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
