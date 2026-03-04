"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

export function About() {
  return (
    <section id="sobre" className="bg-[#0E1E33] py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-[640px]">
            <motion.span
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2BAAD4]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              Por que a Torno Metal
            </motion.span>

            <motion.h2
              className="mt-4 font-semibold text-white leading-[1.2]"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              +25 anos de tradição.
              <br />
              Qualidade que o campo confia.
            </motion.h2>

            <motion.p
              className="mt-5 text-white/40 text-[15px] leading-[1.8]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              Com mais de 25 anos de história, a Tornometal é uma empresa familiar
              localizada em Passo Fundo, RS, reconhecida pela excelência na
              fabricação de peças agrícolas de reposição para plantadeiras.
            </motion.p>

            <motion.p
              className="mt-4 text-white/40 text-[15px] leading-[1.8]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              Cada peça é desenvolvida com rigor técnico, garantindo alto
              desempenho, resistência e compatibilidade. Fabricamos direto,
              mantemos estoque das principais referências do mercado e atendemos
              quem compra com consistência — não com promessa.
            </motion.p>

            <motion.p
              className="mt-4 text-white/40 text-[15px] leading-[1.8]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              Guiada pelos princípios da família Everton Lopes, a Tornometal
              mantém um atendimento próximo, profissional e sempre voltado a
              entender as necessidades reais do campo.
            </motion.p>
          </div>

          <motion.div
            className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(43,170,212,0.1)] border border-white/10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <img
              src="/fachada.png"
              alt="Fachada da fábrica Tornometal"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
            {/* Elegant overlay gradient connecting image to background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E33] via-transparent to-transparent opacity-90" />

            {/* Location Badge */}
            <div className="absolute bottom-6 left-6">
              <div className="px-5 py-3 bg-[#0a1628]/80 backdrop-blur-md rounded-xl border border-white/10 inline-block shadow-lg inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2BAAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className="flex flex-col">
                  <p className="text-white font-medium text-[13px] leading-tight">Sede Principal</p>
                  <p className="text-white/60 text-[11px] leading-tight">Passo Fundo, RS</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
