"use client"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
]

interface Props {
  open: boolean
  onClose: () => void
}

interface FormData {
  nome: string
  empresa: string
  contato: string
  email: string
  estado: string
}

export function FormModal({ open, onClose }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({ nome: "", empresa: "", contato: "", email: "", estado: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Fechar com ESC
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Foco no primeiro campo ao abrir
  useEffect(() => {
    if (open) setTimeout(() => firstInputRef.current?.focus(), 100)
    else setForm({ nome: "", empresa: "", contato: "", email: "", estado: "" })
  }, [open])

  // Travar scroll do body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/solicitar-orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      let data: { ok?: boolean; error?: string } = {}
      try { data = await res.json() } catch {}
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Formulario Revenda",
          content_category: "Revenda B2B",
        })
      }
      router.push("/obrigado")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClass =
    "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2BAAD4] focus:outline-none focus:ring-2 focus:ring-[#2BAAD4]/20 transition-all"

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-[480px] rounded-2xl bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D3D5C] to-[#1B8DC0] px-6 pt-6 pb-5">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Fechar formulário"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2BAAD4]/80 mb-1">
                Fabricante Direto
              </p>
              <h2 className="text-[22px] font-bold text-white leading-tight">
                Solicite seu orçamento
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Preencha e nossa equipe entra em contato rapidamente.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Seu nome *
                </label>
                <input
                  ref={firstInputRef}
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  placeholder="Nome completo"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Nome da empresa *
                </label>
                <input
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  required
                  placeholder="Razão social ou nome fantasia"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    Contato (WhatsApp) *
                  </label>
                  <input
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                    type="tel"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    Estado *
                  </label>
                  <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">UF</option>
                    {ESTADOS.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  E-mail *
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="seu@email.com.br"
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-lg py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: loading ? "#94A3B8" : "linear-gradient(90deg, #00FFcc 0%, #00FF66 100%)" }}
              >
                {loading ? "Enviando…" : "Solicitar Orçamento →"}
              </button>

              <p className="text-center text-[11px] text-[#94A3B8]">
                Seus dados são confidenciais e nunca serão compartilhados.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
