"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { fadeUp } from "@/lib/animations"
import { WHATSAPP_URL } from "@/lib/constants"

interface Product {
    name: string
    category: string
    image: string
    ref?: string
}

const products: Product[] = [
    { name: "Condutor Vence Tudo", category: "Condutor", image: "/products/condutor-vence-tudo.webp", ref: "900100091" },
    { name: "Dosador de Adubo Universal", category: "Dosador", image: "/products/dosador-adubo.png" },
    { name: "Engrenagem 6-Z Semeato", category: "Engrenagem", image: "/products/engrenagem-6z.png", ref: "35050005" },
    { name: "Condutor Semeato", category: "Condutor", image: "/products/condutor-semeato-1.webp", ref: "61070014" },
    { name: "Revestimento Dosador", category: "Revestimento", image: "/products/revestimento-dosador.png" },
    { name: "Telescópio 5 Estágios", category: "Telescópio", image: "/products/telescopio-semeato.webp", ref: "15075602" },
    { name: "Condutor Semeato", category: "Condutor", image: "/products/condutor-semeato-2.webp", ref: "70080006" },
    { name: "Condutor Semeato", category: "Condutor", image: "/products/condutor-semeato-3.webp", ref: "56020072" },
    { name: "Condutor de Semente", category: "Condutor", image: "/products/condutor-semeato-4.webp", ref: "28460049" },
    { name: "Condutor Curvo Semeato", category: "Condutor", image: "/products/condutor-curvo.webp", ref: "37090001" },
    { name: "Condutor Semeato", category: "Condutor", image: "/products/condutor-semeato-5.webp", ref: "15070025" },
]

// Get unique categories for filter chips
const categories = Array.from(new Set(products.map((p) => p.category)))

export function ProductCarousel() {
    // Duplicate products for seamless infinite scroll
    const duplicatedProducts = [...products, ...products]

    return (
        <section id="categorias" className="bg-[#F7F8FA] py-16 md:py-24 overflow-hidden">
            <div className="max-w-[1120px] mx-auto px-5">
                <motion.div
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
                        Mais de 150 referências prontas para entrega
                    </h2>

                    <p className="mt-3 text-[#475569] text-[15px] max-w-[520px]">
                        Peças para as principais marcas de plantadeiras do mercado.
                        Semeato, Vence Tudo, Imasa, Jumil e mais.
                    </p>
                </motion.div>

                {/* Category chips */}
                <motion.div
                    className="mt-8 flex flex-wrap gap-2"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {categories.map((cat) => (
                        <span
                            key={cat}
                            className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[13px] text-[#334155] font-medium"
                        >
                            {cat}
                        </span>
                    ))}
                    <span className="bg-[#113d5e] text-white rounded-lg px-4 py-2 text-[13px] font-medium">
                        +20 categorias
                    </span>
                </motion.div>
            </div>

            {/* Infinite Carousel - Row 1 (left to right) */}
            <div className="mt-10 relative">
                <div className="carousel-track">
                    <div className="carousel-slide animate-scroll-left">
                        {duplicatedProducts.map((product, index) => (
                            <ProductCard key={`row1-${index}`} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Infinite Carousel - Row 2 (right to left, reversed order) */}
            <div className="mt-4 relative">
                <div className="carousel-track">
                    <div className="carousel-slide animate-scroll-right">
                        {[...duplicatedProducts].reverse().map((product, index) => (
                            <ProductCard key={`row2-${index}`} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-[1120px] mx-auto px-5">
                <motion.div
                    className="mt-10 flex flex-wrap gap-3"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#113d5e] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-[#0c2f4a]"
                    >
                        Consultar Disponibilidade
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a
                        href="https://tornometalevertonlopes.com.br/loja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#334155] px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#113d5e] hover:text-white hover:border-[#113d5e]"
                    >
                        Ver Loja Completa
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex-shrink-0 w-[220px] md:w-[260px] group">
            <div className="rounded-xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#1B8DC0]/30 hover:-translate-y-1">
                <div className="relative aspect-[4/3] sm:aspect-square w-full bg-white overflow-hidden flex items-center justify-center">
                    <div className="relative w-[80%] h-[80%]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 200px, 240px"
                            className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                        />
                    </div>
                    {/* subtle gradient overlay to ensure badge readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm text-[#1B8DC0] px-2 py-1 rounded-md z-10">
                        {product.category}
                    </span>
                </div>
                <div className="px-4 py-3 border-t border-[#F1F5F9] relative z-20 bg-white">
                    <p className="text-[13px] font-medium text-[#0F172A] truncate">
                        {product.name}
                    </p>
                    {product.ref && (
                        <p className="text-[11px] text-[#94A3B8] mt-0.5">
                            Ref: {product.ref}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
