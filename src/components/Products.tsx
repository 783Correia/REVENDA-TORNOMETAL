"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp } from "@/lib/animations"
import { products } from "@/lib/products-data"

const ITEMS_PER_PAGE = 20

const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category))).sort()]

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCount(ITEMS_PER_PAGE)
  }

  return (
    <section id="produtos" className="bg-white py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-5">
        <motion.div
          className="max-w-[520px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B8DC0]">
            Produtos
          </span>

          <h2
            className="mt-4 font-semibold text-[#0F172A] leading-[1.2]"
            style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}
          >
            Peças para plantadeiras das principais marcas
          </h2>

          <p className="mt-3 text-[#475569] text-[15px]">
            Fabricação própria com mais de 25 anos de experiência. Consulte disponibilidade e condições especiais para revendas.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#0A1628] text-white border-[#0A1628]"
                  : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]"
              }`}
            >
              {cat}
              <span className="ml-1 text-[11px] opacity-60">
                ({cat === "Todos" ? products.length : products.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.div
                key={`${product.image}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6) }}
                className="group bg-[#F7F8FA] rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#1B8DC0]/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-square bg-white p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name}${product.code ? ` - ${product.code}` : ""}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B8DC0]">
                    {product.brand || product.category}
                  </span>
                  <h3 className="mt-1 text-[13px] md:text-[14px] font-semibold text-[#0F172A] leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  {product.code && (
                    <p className="mt-0.5 text-[11px] text-[#64748B] font-mono">
                      Cód: {product.code}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load more button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#334155] px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-[#F1F5F9]"
            >
              Ver mais produtos ({filtered.length - visibleCount} restantes)
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-[#162240]"
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
