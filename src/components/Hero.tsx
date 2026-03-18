"use client"

import { motion } from "framer-motion"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp, stagger } from "@/lib/animations"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628]">
      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(27,141,192,0.15), transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-[1120px] mx-auto px-5 pt-32 pb-20 md:pt-40 md:pb-28"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2BAAD4] mb-5"
          variants={fadeUp}
        >
          Fabricante direto · Lagoa Vermelha, RS
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="font-semibold text-white leading-[1.15] max-w-[680px]"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          variants={fadeUp}
        >
          Quem Revende Peça para Plantadeira Sabe o Valor de um Fornecedor que{" "}
          <span className="text-[#2BAAD4]">Não Decepciona</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-5 text-white/40 text-[15px] md:text-base leading-relaxed max-w-[520px]"
          variants={fadeUp}
        >
          Fabricante direto de peças para Semeato, Vence Tudo e outras marcas.
          Preço de fábrica, +150 referências em estoque e entrega que cumpre
          prazo — pedido após pedido.
        </motion.p>

        {/* Buttons */}
        <motion.div className="mt-8 flex gap-3 flex-wrap" variants={fadeUp}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#20BD5A]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar Estoque e Preços
          </a>
          <a
            href="#categorias"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition-all duration-200 hover:text-white hover:border-white/25"
          >
            Ver Catálogo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom border */}
      <div className="h-px bg-white/[0.06]" />
    </section>
  )
}
