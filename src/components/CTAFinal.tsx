"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { fadeUp } from "@/lib/animations"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
]

interface FormData {
  nome: string
  empresa: string
  contato: string
  email: string
  estado: string
}

export function CTAFinal() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({ nome: "", empresa: "", contato: "", email: "", estado: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
    <section id="formulario" className="bg-white py-16 md:py-24 border-t border-[#E2E8F0]">
      <motion.div
        className="max-w-[1120px] mx-auto px-5"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 flex flex-col md:flex-row md:items-start gap-8 md:gap-12 shadow-[0_10px_40px_-10px_rgba(43,170,212,0.15)] border border-[#2BAAD4]/20 bg-gradient-to-br from-[#F0F9FF]/80 to-white/60 backdrop-blur-xl">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2BAAD4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00FFcc]/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 max-w-[440px]">
            <h2
              className="font-semibold text-[#0F172A] leading-[1.2]"
              style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
            >
              Faça seu primeiro pedido — ou mande a lista do que você já compra em outro lugar.
            </h2>
            <p className="mt-4 text-[#475569] text-[15px] leading-relaxed">
              A gente verifica o que temos em estoque, passa os preços e você decide. Sem compromisso, sem enrolação.
            </p>
          </div>

          {/* Inline form card */}
          <div className="relative z-10 flex-1 w-full">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.10)] border border-[#E2E8F0] p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                    Seu nome *
                  </label>
                  <input
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
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
