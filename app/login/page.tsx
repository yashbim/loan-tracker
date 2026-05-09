'use client';

import { useState } from 'react';
import { login } from '@/lib/actions/auth-actions';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">The Gates of Financial Despair</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the secret code to see how much you&apos;ve been taken advantage of.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                The key to your misery
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoFocus
                  className="block w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
                {error} (Wrong key! The misery is safe for now.)
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Calculating Losses...' : 'Face the Truth'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400">
          Debt Trap Simulator &bull; Secured with Simple Auth
        </p>
      </div>
    </main>
  );
}
