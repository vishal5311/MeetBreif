'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all border-slate-200"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all border-slate-200"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white p-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}
