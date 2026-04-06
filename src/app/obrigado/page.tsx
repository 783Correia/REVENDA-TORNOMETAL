"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp, stagger } from "@/lib/animations"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export default function Obrigado() {
  useEffect(() => {
    window.fbq?.("track", "Lead")
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5 py-24">
        <motion.div
          className="text-center max-w-[480px]"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Check icon animado */}
          <motion.div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#00FF66]/15"
            variants={fadeUp}
          >
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <motion.path
                d="M8 20l8 8 16-16"
                stroke="#00CC55"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.p
            className="text-[11px] font-semibold uppercase tracking-widest text-[#2BAAD4] mb-3"
            variants={fadeUp}
          >
            Formulário recebido
          </motion.p>

          <motion.h1
            className="text-[32px] md:text-[40px] font-bold text-[#0F172A] leading-tight"
            variants={fadeUp}
          >
            Recebemos seu contato!
          </motion.h1>

          <motion.p
            className="mt-4 text-[#475569] text-[16px] leading-relaxed"
            variants={fadeUp}
          >
            Nossa equipe vai analisar seu perfil e entrar em contato em breve
            para passar disponibilidade, preços e condições.
          </motion.p>

          <motion.div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center" variants={fadeUp}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#20BD5A]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp agora
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-6 py-3.5 text-sm font-semibold text-[#475569] transition-all duration-200 hover:border-[#2BAAD4] hover:text-[#1B8DC0]"
            >
              ← Voltar ao site
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
