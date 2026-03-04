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
          className="font-medium text-white/90 leading-[1.2] max-w-[900px] text-balance tracking-tight text-3xl md:text-5xl lg:text-[56px]"
          variants={fadeUp}
        >
          Fortaleça seu estoque de peças para plantadeiras com <span className="font-bold text-[#2BAAD4]">quem fabrica há mais de 25 Anos.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-6 text-white/70 leading-relaxed max-w-[800px] text-balance font-normal text-base md:text-lg lg:text-[20px]"
          variants={fadeUp}
        >
          Somos a solução definitiva para sua revenda. Mais de 150 referências entre Semeato, Vence Tudo, Jumil e muito mais a pronta entrega com alta durabilidade e margem.
        </motion.p>

        {/* Buttons and Icon (Matching Reference) */}
        <motion.div className="mt-10 md:mt-12 flex gap-4 md:gap-6 flex-wrap justify-center items-center" variants={fadeUp}>
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:from-[#4facfe] hover:to-[#00f2fe] px-10 py-5 text-[16px] font-black italic text-black uppercase transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(0,242,254,0.4)] tracking-wide"
              style={{
                background: "linear-gradient(90deg, #00FFcc 0%, #00FF66 100%)",
              }}
            >
              GARANTA SEU ESTOQUE
            </a>

            {/* Circular decorative icon next to button */}
            <a href="#categorias" className="hidden sm:flex relative items-center justify-center w-14 h-14 rounded-full border-2 border-dashed border-[#00FF66]/50 bg-black/20 backdrop-blur-sm group hover:border-[#00FF66] transition-colors cursor-pointer">
              <svg
                className="w-6 h-6 text-[#00FFcc] group-hover:scale-110 group-hover:translate-y-1 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  )
}
