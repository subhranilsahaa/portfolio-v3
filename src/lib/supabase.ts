import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hdqjixqgqulfnpctpmwl.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWppeHFncXVsZm5wY3RwbXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTEwODcsImV4cCI6MjA5Nzk2NzA4N30.lXHw7_2THRn4c4BRmmz55V8NBSihCPXjVj2R1UwzE-o';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
