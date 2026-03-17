import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lozduuvplbfiduaigjth.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvemR1dXZwbGJmaWR1YWlnanRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTU4NDUsImV4cCI6MjA4ODk5MTg0NX0.J7i39lHSeWdC1y9G1o7cW4UKpfOcVdZ3IRFjhoSX1Tw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

