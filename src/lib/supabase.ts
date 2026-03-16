import { createClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Ensure the URL has a valid protocol if the user forgot to copy 'https://'
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
    supabaseUrl = `https://${supabaseUrl}`
}

let client: ReturnType<typeof createClient> | null = null;

try {
    if (supabaseUrl && supabaseAnonKey) {
        client = createClient(supabaseUrl, supabaseAnonKey)
    }
} catch (error) {
    console.error("Failed to initialize Supabase client:", error)
}

// Export the client or a dummy object with a mock .from() method to prevent runtime crashes during SSG
export const supabase = client || ({
    from: () => ({
        select: () => ({
            eq: () => ({
                limit: () => Promise.resolve({ data: null, error: null }),
                then: () => Promise.resolve({ data: null, error: null })
            }),
            then: () => Promise.resolve({ data: null, error: null })
        })
    })
} as unknown as ReturnType<typeof createClient>)
