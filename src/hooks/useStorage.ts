import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { DEFAULT_DATA } from '../data/defaultData';
import { supabase } from '../utils/supabaseClient';

export function useStorage() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: dbData, error } = await supabase
          .from('portfolio_content')
          .select('data')
          .eq('id', 1)
          .single();

        if (error || !dbData) {
          setData(DEFAULT_DATA);
        } else {
          setData(dbData.data as PortfolioData);
        }
      } catch (err) {
        console.error(err);
        setData(DEFAULT_DATA);
      }
    }
    fetchData();
  }, []);

  const saveData = async (newData: PortfolioData) => {
    try {
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({ id: 1, data: newData });

      if (!error) {
        setData(newData);
      } else {
        console.error("Supabase Save Error:", error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { data, saveData };
}
