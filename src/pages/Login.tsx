import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aurora } from '../components/ui/Aurora';
import { supabase } from '../utils/supabaseClient';

export const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('portfolio_content')
        .select('data')
        .eq('id', 1)
        .single();

      const validPassword = (!dbError && dbData?.data?.adminPassword) 
        ? dbData.data.adminPassword 
        : 'portfolio2025';

      if (password === validPassword) {
        sessionStorage.setItem('admin_auth', 'true');
        navigate('/admin');
      } else {
        setError('Incorrect password.');
      }
    } catch (err) {
      setError('Failed to verify password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative">
      <Aurora />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[1]" />
      
      <div className="bg-surface border border-border p-8 rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#b87fff] to-transparent" />
        <h2 className="font-display text-2xl font-bold mb-2 grad-text inline-block">Admin Access</h2>
        <p className="text-sm text-muted mb-6">Enter the password to continue to the dashboard.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm focus:border-[#b87fff] outline-none transition-all"
              autoFocus
              disabled={loading}
            />
            {error && <p className="text-danger text-xs mt-2">{error}</p>}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
        <button onClick={() => navigate('/')} className="w-full mt-4 text-xs text-muted hover:text-text">
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
};
