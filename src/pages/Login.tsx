import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aurora } from '../components/ui/Aurora';
import { supabase } from '../lib/supabase'; // Change if your file is elsewhere

export const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: 'subhranilsaha69@gmail.com',
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate('/admin');
  };

  return (
      <div className="min-h-screen bg-bg flex items-center justify-center relative">
        <Aurora />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[1]" />

        <div className="bg-surface border border-border p-8 rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#b87fff] to-transparent" />

          <h2 className="font-display text-2xl font-bold mb-2 grad-text inline-block">
            Admin Login
          </h2>

          <p className="text-sm text-muted mb-6">
            Sign in with your admin password.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm focus:border-[#b87fff] outline-none transition-all"
                autoFocus
                disabled={loading}
            />

            {error && (
                <p className="text-red-400 text-xs">
                  {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <button
              onClick={() => navigate('/')}
              className="w-full mt-4 text-xs text-muted hover:text-text"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
  );
};