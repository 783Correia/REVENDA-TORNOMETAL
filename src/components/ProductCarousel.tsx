"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"
import { WHATSAPP_URL } from "@/lib/constants"
import produtosExtraidos from "../../produtos_extraidos.json"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"

interface StoreProductFromJson {
    name: string
    price: string
    link: string
}

interface Product {
    name: string
    category: string
    link: string
}

const jsonProducts: StoreProductFromJson[] = produtosExtraidos as StoreProductFromJson[]

// Seleciona um subconjunto de produtos do JSON para destacar no carrossel
const featuredFromJson: Product[] = jsonProducts.slice(0, 11).map((item) => {
    const firstWord = item.name.trim().split(" ")[0]
    return {
        name: item.name,
        category: firstWord,
        link: item.link,
    }
})

const products: Product[] = featuredFromJson

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
                        href="/produtos"
                        className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#334155] px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#113d5e] hover:text-white hover:border-[#113d5e]"
                    >
                        Ver catálogo completo
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
        <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver detalhes do produto ${product.name} na loja Torno Metal`}
            className="flex-shrink-0 w-[220px] md:w-[260px] group"
        >
            <div className="rounded-xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#1B8DC0]/30 hover:-translate-y-1">
                <ImagePlaceholder
                    label={product.name}
                    className="aspect-[4/3] sm:aspect-square w-full"
                />
                <div className="px-4 py-3 border-t border-[#F1F5F9] relative z-20 bg-white">
                    <p className="text-[13px] font-medium text-[#0F172A] truncate">
                        {product.name}
                    </p>
                    <p className="text-[11px] text-[#1B8DC0] font-semibold mt-1">
                        {product.category}
                    </p>
                </div>
            </div>
        </a>
    )
}
