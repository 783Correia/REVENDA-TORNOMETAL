"use client"

import { motion } from "framer-motion"
import { DollarSign, Package, Zap, Wrench } from "lucide-react"
import { fadeUp, staggerWide } from "@/lib/animations"

const cards = [
  {
    icon: DollarSign,
    title: "Margem real em cada peça",
    text: "Sem distribuidor no meio. Preço de fábrica, a diferença fica no seu caixa.",
  },
  {
    icon: Package,
    title: "+150 referências catalogadas",
    text: "Condutor, bucha, dosador, pinhão, rolete e mais. Semeato, Vence Tudo e outras.",
  },
  {
    icon: Zap,
    title: "Prazo que você repassa pro cliente",
    text: "Quando dizemos que tem, tem. Quando dizemos quando chega, chega.",
  },
  {
    icon: Wrench,
    title: "Fala direto com quem fabrica",
    text: "Sem intermediário. Você resolve na mesma conversa.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="bg-[#F8FAFC] py-16 md:py-24 border-t border-[#E2E8F0]">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.span
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2BAAD4]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          O que você encontra aqui
        </motion.span>

        <motion.h2
          className="mt-4 font-semibold text-[#0F172A] leading-[1.2] max-w-[480px]"
          style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          As razões pelas quais revendas compram da Torno Metal pedido após pedido.
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={staggerWide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="group rounded-xl p-6 bg-white border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#1B8DC0]/30 hover:-translate-y-1"
                variants={fadeUp}
              >
                <div className="w-9 h-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
                  <Icon size={18} className="text-[#0284C7]" />
                </div>

                <h3 className="mt-4 text-[15px] font-semibold text-[#0F172A]">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
