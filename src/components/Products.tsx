"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WHATSAPP_URL } from "@/lib/constants"
import { fadeUp } from "@/lib/animations"

interface Product {
  name: string
  category: string
  brand: string
  image: string
  code: string
}

const products: Product[] = [
  {
    name: "Base Dosador",
    category: "Base",
    brand: "Semeato",
    code: "06070034",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-125/375.png",
  },
  {
    name: "Base Dosador",
    category: "Base",
    brand: "Semeato",
    code: "DI02010001",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-124/371.png",
  },
  {
    name: "Base Dosador",
    category: "Base",
    brand: "Semeato",
    code: "06070059",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-119/355.png",
  },
  {
    name: "Bocal Reto",
    category: "Bocal",
    brand: "Semeato",
    code: "26100001",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-122/365.png",
  },
  {
    name: "Condutor Vence Tudo",
    category: "Condutor",
    brand: "Vence Tudo",
    code: "90003701",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-121/362.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Kuhn / Metasa",
    code: "YD065907",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-126/379.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Semeato",
    code: "15070066",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-123/368.png",
  },
  {
    name: "Condutor Curvo",
    category: "Condutor",
    brand: "Semeato",
    code: "26120001",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-127/383.png",
  },
  {
    name: "Condutor Curto",
    category: "Condutor",
    brand: "AGCO / Massey / Valtra",
    code: "33070004",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-131/399.png",
  },
  {
    name: "Condutor",
    category: "Condutor",
    brand: "Vence Tudo",
    code: "900100557",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-129/392.png",
  },
  {
    name: "Condutor de Adubo Reto",
    category: "Condutor",
    brand: "Semeato",
    code: "62010020",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-128/387.png",
  },
  {
    name: "Condutor de Adubo",
    category: "Condutor",
    brand: "Vence Tudo",
    code: "35180006",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-130/396.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Jumil",
    code: "2749448",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-114/342.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Jumil",
    code: "2748209",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-106/315.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Semeato",
    code: "28040011",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-102/301.png",
  },
  {
    name: "Condutor de Adubo",
    category: "Condutor",
    brand: "Semeato",
    code: "25070017",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-103/304.webp",
  },
  {
    name: "Condutor Longo",
    category: "Condutor",
    brand: "Case",
    code: "0066001234",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-101/300.png",
  },
  {
    name: "Condutor da Semente",
    category: "Condutor",
    brand: "Jumil",
    code: "2749448",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-108/321.png",
  },
  {
    name: "Fixador Y",
    category: "Fixador",
    brand: "Imasa",
    code: "50300000113",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-110/327.png",
  },
  {
    name: "Condutor de Sementes",
    category: "Condutor",
    brand: "Semeato",
    code: "15070029",
    image: "https://lozduuvplbfiduaigjth.supabase.co/storage/v1/object/public/product-images/product-117/351.png",
  },
]

const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category))).sort()]

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory)

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
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#0A1628] text-white border-[#0A1628]"
                  : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={`${product.code}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group bg-[#F7F8FA] rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#1B8DC0]/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-square bg-white p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.brand} - ${product.code}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1B8DC0]">
                    {product.brand}
                  </span>
                  <h3 className="mt-1 text-[13px] md:text-[14px] font-semibold text-[#0F172A] leading-tight">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#64748B] font-mono">
                    Cód: {product.code}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-[#475569] text-[15px] mb-4">
            São mais de 150 referências disponíveis. Consulte nosso catálogo completo.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A1628] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-[#162240]"
          >
            Solicitar Catálogo Completo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
