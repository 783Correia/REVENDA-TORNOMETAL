"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { fadeUp, staggerWide } from "@/lib/animations"

const provas = [
    {
        src: "/prova-social-1.jpg",
        alt: "Cliente satisfeito — pedido saindo com peças de qualidade",
        caption: "\"Seus preços são top meu amigo\"",
    },
    {
        src: "/prova-social-2.jpg",
        alt: "Feedback real — preço de fábrica com maior margem de lucros",
        caption: "\"Teu posso vender 10to lucro bom\"",
    },
    {
        src: "/prova-social-3.jpg",
        alt: "Feedback do cliente — dosadores com melhor preço do mercado",
        caption: "\"Produto top e o melhor preço que encontrei\"",
    },
    {
        src: "/prova-social-4.jpg",
        alt: "Cliente satisfeito — mercadoria de qualidade chegou",
        caption: "\"Mercadoria de vcs é muito boa\"",
    },
]

export function SocialProof() {
    return (
        <section className="bg-[#0A1628] py-16 md:py-24 border-t border-white/[0.06]">
            <div className="max-w-[1120px] mx-auto px-5">
                <motion.div
                    className="text-center mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2BAAD4]">
                        Provas Sociais
                    </span>
                    <h2
                        className="mt-4 font-semibold text-white leading-[1.2] mx-auto max-w-[560px]"
                        style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
                    >
                        Feedback real de quem já compra da Torno Metal
                    </h2>
                    <p className="mt-3 text-white/35 text-[15px] max-w-[480px] mx-auto">
                        Prints reais de clientes no WhatsApp — sem filtro, sem edição.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    variants={staggerWide}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {provas.map((prova) => (
                        <motion.div
                            key={prova.src}
                            className="group relative rounded-xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:border-white/[0.15] hover:scale-[1.02]"
                            variants={fadeUp}
                        >
                            <div className="relative aspect-[9/16]">
                                <Image
                                    src={prova.src}
                                    alt={prova.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Caption on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <p className="text-white text-[13px] font-medium leading-snug">
                                    {prova.caption}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    className="text-center mt-8 text-white/20 text-[13px]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    Prints de conversas reais no WhatsApp com clientes da Torno Metal
                </motion.p>
            </div>
        </section>
    )
}
