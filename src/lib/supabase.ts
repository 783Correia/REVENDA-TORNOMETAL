import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_client) return _client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // During build / SSG the env vars may not exist.
    // Return a lightweight stub whose queries resolve to empty data
    // so the build completes without errors.
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    } as unknown as SupabaseClient
  }

  _client = createClient(url, key)
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
