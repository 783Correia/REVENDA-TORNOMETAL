"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

export function About() {
  return (
    <section id="sobre" className="bg-[#0E1E33] py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
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
      </div>
    </section>
  )
}
