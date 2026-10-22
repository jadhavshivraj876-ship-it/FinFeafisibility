'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const completeSignIn = async () => {
      const callbackParams = new URLSearchParams(
        `${window.location.search.slice(1)}&${window.location.hash.slice(1)}`
      );
      const callbackError = callbackParams.get('error_description') || callbackParams.get('error');

      if (callbackError) {
        if (active) setErrorMessage(callbackError);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!active) return;

        if (error) {
          setErrorMessage(error.message);
        } else if (session) {
          router.replace('/');
        } else {
          setErrorMessage('No authenticated session was returned. Please try signing in again.');
        }
      } catch (error) {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : 'Unable to verify your sign-in. Please try again.');
        }
      }
    };

    void completeSignIn();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        {errorMessage ? (
          <>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Sign-in could not be completed</h1>
            <p role="alert" className="mt-3 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Return to FinFeasibility
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white">Completing sign-in</h1>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Please wait while we verify your account.</p>
          </>
        )}
      </div>
    </main>
  );
}
