"use client"

import { motion } from "framer-motion"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp, stagger } from "@/lib/animations"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Professional Overlay Gradients - Made lighter */}
      <div className="absolute inset-0 z-0 bg-[#0A1628]/30 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A1628]/60 via-[#0A1628]/20 to-transparent" />

      {/* Subtle blue accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(43,170,212,0.3), transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-[1120px] mx-auto px-5 pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Label (Pill style, close proximity to title) */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold uppercase tracking-widest text-[#2BAAD4] mb-5 backdrop-blur-sm"
          variants={fadeUp}
        >
          <span>Fabricante Direto</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Passo Fundo, RS</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-bold text-white leading-[1.1] max-w-[850px] text-balance tracking-tight text-3xl md:text-4xl lg:text-[40px]"
          variants={fadeUp}
        >
          Fortaleça seu estoque de peças para plantadeiras com quem fabrica há mais de 25 Anos.
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-5 text-white/80 leading-relaxed max-w-[750px] text-balance font-normal text-base md:text-lg lg:text-xl"
          variants={fadeUp}
        >
          Somos a solução definitiva para sua revenda. Mais de 150 referências entre Semeato, Vence Tudo, Jumil e muito mais a pronta entrega com alta durabilidade e margem.
        </motion.p>

        {/* Buttons (Clear separation from text block) */}
        <motion.div className="mt-8 md:mt-10 flex gap-4 flex-wrap justify-center items-center" variants={fadeUp}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#20BD5A] hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.15)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar Estoque e Preços
          </a>
          <a
            href="#categorias"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-white/15"
          >
            Ver Catálogo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  )
}
