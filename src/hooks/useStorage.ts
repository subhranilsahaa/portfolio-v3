import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '../types';
import { DEFAULT_DATA } from '../data/defaultData';
import { supabase } from '../lib/supabase';

const ROW_ID = 'main';

export interface StorageRow {
  data: PortfolioData;
  admin_password: string;
  resume_url: string;
}

const FALLBACK: StorageRow = {
  data: DEFAULT_DATA,
  admin_password: 'admin123',
  resume_url: '/resume.pdf',
};

export function useStorage() {
  const [row, setRow] = useState<StorageRow | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Fetch from Supabase ──────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('data, admin_password, resume_url')
        .eq('id', ROW_ID)
        .single();

      if (error || !data) {
        // Row doesn't exist yet — upsert defaults
        await supabase.from('portfolio_data').upsert({
          id: ROW_ID,
          data: DEFAULT_DATA,
          admin_password: FALLBACK.admin_password,
          resume_url: FALLBACK.resume_url,
        });
        setRow(FALLBACK);
      } else {
        setRow({
          data: data.data as PortfolioData,
          admin_password: data.admin_password,
          resume_url: data.resume_url,
        });
      }
    } catch (err) {
      console.error('Supabase fetch error:', err);
      setRow(FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Save portfolio data ──────────────────────────────────────────────────
  const saveData = useCallback(async (newData: PortfolioData) => {
    const { error } = await supabase
      .from('portfolio_data')
      .update({ data: newData, updated_at: new Date().toISOString() })
      .eq('id', ROW_ID);

    if (!error) setRow((prev) => (prev ? { ...prev, data: newData } : prev));
    return !error;
  }, []);

  // ── Change admin password ────────────────────────────────────────────────
  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<string | null> => {
      if (!row) return 'Not loaded yet.';
      if (currentPassword !== row.admin_password) return 'Current password is incorrect.';
      if (newPassword.length < 6) return 'New password must be at least 6 characters.';

      const { error } = await supabase
        .from('portfolio_data')
        .update({ admin_password: newPassword })
        .eq('id', ROW_ID);

      if (error) return 'Failed to update password.';
      setRow((prev) => (prev ? { ...prev, admin_password: newPassword } : prev));
      return null; // null = success
    },
    [row]
  );

  // ── Save resume URL ──────────────────────────────────────────────────────
  const saveResumeUrl = useCallback(async (url: string): Promise<boolean> => {
    const { error } = await supabase
      .from('portfolio_data')
      .update({ resume_url: url })
      .eq('id', ROW_ID);

    if (!error) setRow((prev) => (prev ? { ...prev, resume_url: url } : prev));
    return !error;
  }, []);

  return {
    data: row?.data ?? null,
    adminPassword: row?.admin_password ?? null,
    resumeUrl: row?.resume_url ?? FALLBACK.resume_url,
    loading,
    saveData,
    changePassword,
    saveResumeUrl,
    refetch: fetchData,
  };
}
