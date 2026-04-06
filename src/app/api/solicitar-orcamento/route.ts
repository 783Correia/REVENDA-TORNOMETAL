import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { nome, empresa, contato, email, estado } = await req.json()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars not configured")
    return NextResponse.json({ ok: false, error: "Configuration error" }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.from("leads").insert([{ nome, empresa, contato, email, estado }])

  if (error) {
    console.error("Supabase insert error:", error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
