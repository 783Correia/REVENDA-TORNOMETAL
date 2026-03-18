"use client"

import { motion } from "framer-motion"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp, fadeUpGrouped } from "@/lib/animations"

const chips = [
  "Base", "Batente", "Bocal", "Bucha", "Calota", "Chaveta",
  "Condutor", "Dosador", "Engrenagem", "Fixador", "Flange", "Interruptor",
  "Lingueta", "Mancal", "Mangote", "Manopla", "Obstacularizador",
  "Pinhão Conduzido/Coroa", "Pinhão Dosador", "Revestimento", "Rolete",
  "Tampa", "Telescópio", "Tubo", "Voltante",
]

export function Categories() {
  return (
    <section id="categorias" className="bg-[#F7F8FA] py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          className="max-w-[480px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B8DC0]">
            Catálogo
          </span>

          <h2
            className="mt-4 font-semibold text-[#0F172A] leading-[1.2]"
            style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
          >
            Mais de 150 referências organizadas por categoria
          </h2>

          <p className="mt-3 text-[#475569] text-[15px]">
            Para as principais marcas de plantadeiras do mercado.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[13px] text-[#334155] font-medium transition-all duration-200 hover:bg-[#0A1628] hover:text-white hover:border-[#0A1628] cursor-default"
              variants={fadeUpGrouped}
              custom={Math.floor(i / 6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {chip}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-[#162240]"
          >
            Consultar Disponibilidade
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
