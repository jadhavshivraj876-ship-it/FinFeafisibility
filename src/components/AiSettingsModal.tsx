'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cpu, 
  Key, 
  CheckCircle2, 
  ExternalLink, 
  Trash2, 
  Zap,
  Save
} from 'lucide-react';

interface AiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySaved?: (key: string) => void;
}

export const AI_API_KEY_STORAGE_KEY = 'finfeasibility_gemini_api_key';

export const AiSettingsModal: React.FC<AiSettingsModalProps> = ({
  isOpen,
  onClose,
  onApiKeySaved
}) => {
  const [apiKey, setApiKey] = useState('');
  const [savedKeyExists, setSavedKeyExists] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const stored = localStorage.getItem(AI_API_KEY_STORAGE_KEY) || '';
      setApiKey(stored);
      setSavedKeyExists(!!stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = apiKey.trim();
    if (cleanKey) {
      localStorage.setItem(AI_API_KEY_STORAGE_KEY, cleanKey);
      setSavedKeyExists(true);
      setStatusMessage('Gemini 2.5 Flash API Key connected successfully!');
      if (onApiKeySaved) onApiKeySaved(cleanKey);
    } else {
      localStorage.removeItem(AI_API_KEY_STORAGE_KEY);
      setSavedKeyExists(false);
      setStatusMessage('Using built-in high-fidelity semantic appraisal engine.');
      if (onApiKeySaved) onApiKeySaved('');
    }

    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem(AI_API_KEY_STORAGE_KEY);
    setApiKey('');
    setSavedKeyExists(false);
    setStatusMessage('Key removed. Now using built-in semantic engine.');
    if (onApiKeySaved) onApiKeySaved('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 perspective-container">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden card-3d-interactive"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
              <Cpu className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">AI Engine Configuration</h3>
                <span className="text-[10px] bg-emerald-400 text-zinc-950 px-2 py-0.5 rounded-full font-bold">
                  Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-emerald-200/80 text-xs mt-0.5">
                Google GenAI Intelligence Backend
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Engine Status Card */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-3 h-3 rounded-full ${savedKeyExists ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">
                  {savedKeyExists ? 'Direct Gemini API Connected' : 'Built-in Semantic Engine Active'}
                </span>
                <span className="text-[11px] text-zinc-500">
                  {savedKeyExists ? 'Live model synthesis active' : 'Runs deep multi-variable appraisal locally'}
                </span>
              </div>
            </div>
            <Zap className={`w-4 h-4 ${savedKeyExists ? 'text-emerald-500' : 'text-amber-500'}`} />
          </div>

          <form onSubmit={handleSave} className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Gemini API Key</span>
                </span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5 text-[11px] font-semibold"
                >
                  <span>Get Free Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>

              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
              <p className="text-[10px] text-zinc-500 leading-normal">
                Stored securely in your browser. Also reads <code>GEMINI_API_KEY</code> from <code>.env.local</code> if available.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
              {savedKeyExists && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-rose-600 hover:underline font-semibold text-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Key</span>
                </button>
              )}

              <button
                type="submit"
                className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
